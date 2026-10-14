'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { profile } from '@/lib/content'
import { budgetRanges, projectTypes, type BookingState } from '@/lib/booking'

const schema = z
  .object({
    name: z.string().trim().min(2, 'Please enter your name.').max(120),
    email: z.string().trim().email('Please enter a valid email address.').max(200),
    company: z.string().trim().max(160).optional(),
    projectType: z.enum(projectTypes, { message: 'Please choose a project type.' }),
    dateStart: z.string().trim().optional(),
    dateEnd: z.string().trim().optional(),
    flexible: z.boolean(),
    location: z.string().trim().max(200).optional(),
    budget: z.enum(budgetRanges).optional().or(z.literal('')),
    message: z
      .string()
      .trim()
      .min(20, 'Please share a few details about the project (at least 20 characters).')
      .max(5000),
    submissionId: z.string().uuid(),
  })
  .refine((d) => !d.dateStart || !d.dateEnd || d.dateEnd >= d.dateStart, {
    path: ['dateEnd'],
    message: 'The end date should be on or after the start date.',
  })

// Must match the Resend account owner's email while using the onboarding@resend.dev sender.
const INQUIRY_INBOX = 'mariawil@usc.edu'

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function sendBookingInquiry(_prev: BookingState, formData: FormData): Promise<BookingState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    company: String(formData.get('company') ?? ''),
    projectType: String(formData.get('projectType') ?? ''),
    dateStart: String(formData.get('dateStart') ?? ''),
    dateEnd: String(formData.get('dateEnd') ?? ''),
    flexible: formData.get('flexible') === 'on',
    location: String(formData.get('location') ?? ''),
    budget: String(formData.get('budget') ?? ''),
    message: String(formData.get('message') ?? ''),
    submissionId: String(formData.get('submissionId') ?? ''),
  }
  const values = { ...raw, flexible: raw.flexible ? 'on' : '' }

  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get('website') ?? '') !== '') {
    return { status: 'error', message: 'Your inquiry could not be sent.', values }
  }

  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0])
      fieldErrors[key] ??= issue.message
    }
    return { status: 'error', message: 'Please correct the highlighted fields.', fieldErrors, values }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return {
      status: 'error',
      message: `Online inquiries are temporarily unavailable. Please email ${profile.email} directly.`,
      values,
    }
  }

  const d = parsed.data
  const dates = d.flexible
    ? `Flexible${d.dateStart ? ` (around ${d.dateStart}${d.dateEnd ? ` – ${d.dateEnd}` : ''})` : ''}`
    : d.dateStart
      ? `${d.dateStart}${d.dateEnd ? ` – ${d.dateEnd}` : ''}`
      : 'Not specified'

  const rows: [string, string][] = [
    ['Name', d.name],
    ['Email', d.email],
    ['Company / brand', d.company || '—'],
    ['Project type', d.projectType],
    ['Dates', dates],
    ['Location', d.location || '—'],
    ['Budget', d.budget || 'Not shared'],
  ]

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nProject details:\n${d.message}`
  const html = `
    <div style="font-family:Arial,sans-serif;color:#23201f;max-width:600px">
      <h2 style="color:#e60073;font-weight:normal">New booking inquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#5c5553;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 0">${escape(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <h3 style="margin-top:24px;font-weight:normal;color:#e60073">Project details</h3>
      <p style="white-space:pre-wrap;line-height:1.6">${escape(d.message)}</p>
    </div>`

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send(
    {
      // Resend's shared test sender needs no verified domain, but can only deliver to the account owner's address.
      from: 'Maria Williams Portfolio <onboarding@resend.dev>',
      to: [INQUIRY_INBOX],
      replyTo: d.email,
      subject: `Booking inquiry: ${d.projectType} — ${d.name}`,
      text,
      html,
    },
    { idempotencyKey: `booking-inquiry/${d.submissionId}` },
  )

  if (error) {
    console.error('[booking] Resend delivery failed:', error.message)
    return {
      status: 'error',
      message: `We couldn't deliver your inquiry just now. Please try again, or email ${profile.email} directly.`,
      values,
    }
  }

  return { status: 'success', message: 'Thank you — your inquiry has been delivered.' }
}
