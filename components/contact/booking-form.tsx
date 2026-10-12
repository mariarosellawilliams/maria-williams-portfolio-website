'use client'

import { useActionState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { sendBookingInquiry } from '@/app/contact/actions'
import { budgetRanges, projectTypes, type BookingState } from '@/lib/booking'
import { cn } from '@/lib/utils'

const initialState: BookingState = { status: 'idle' }

const inputClass =
  'w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus-visible:outline-none aria-invalid:border-destructive'

export function BookingForm() {
  const [state, formAction, pending] = useActionState(sendBookingInquiry, initialState)
  const v = state.values ?? {}
  const err = state.fieldErrors ?? {}

  if (state.status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-5 border border-primary bg-card p-8 md:p-10">
        <CheckCircle2 className="size-8 text-primary" aria-hidden />
        <h2 className="font-serif text-4xl">Inquiry received</h2>
        <p className="leading-relaxed">
          {"Thank you — your inquiry has been delivered. Maria's team will reply to the email address you provided. Please note this starts the conversation; it isn't a confirmed booking."}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary underline-offset-4 hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        const field = e.currentTarget.elements.namedItem('submissionId') as HTMLInputElement
        field.value = crypto.randomUUID()
      }}
      noValidate
      className="flex flex-col gap-8"
      aria-describedby="form-note"
    >
      <input type="hidden" name="submissionId" defaultValue="" />
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && state.message && (
        <p role="alert" className="border-l-2 border-destructive bg-secondary px-4 py-3 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field id="name" label="Name" required error={err.name}>
          <input id="name" name="name" autoComplete="name" defaultValue={v.name} required aria-invalid={!!err.name} aria-describedby={err.name ? 'name-error' : undefined} className={inputClass} />
        </Field>
        <Field id="email" label="Email" required error={err.email}>
          <input id="email" name="email" type="email" autoComplete="email" defaultValue={v.email} required aria-invalid={!!err.email} aria-describedby={err.email ? 'email-error' : undefined} className={inputClass} />
        </Field>
        <Field id="company" label="Company, brand, or organization" error={err.company}>
          <input id="company" name="company" autoComplete="organization" defaultValue={v.company} className={inputClass} />
        </Field>
        <Field id="projectType" label="Project type" required error={err.projectType}>
          <select id="projectType" name="projectType" defaultValue={v.projectType ?? ''} required aria-invalid={!!err.projectType} aria-describedby={err.projectType ? 'projectType-error' : undefined} className={cn(inputClass, 'cursor-pointer')}>
            <option value="" disabled>Select a type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Proposed date or range</legend>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Field id="dateStart" label="Start date" error={err.dateStart}>
            <input id="dateStart" name="dateStart" type="date" defaultValue={v.dateStart} className={inputClass} />
          </Field>
          <Field id="dateEnd" label="End date (optional)" error={err.dateEnd}>
            <input id="dateEnd" name="dateEnd" type="date" defaultValue={v.dateEnd} aria-invalid={!!err.dateEnd} aria-describedby={err.dateEnd ? 'dateEnd-error' : undefined} className={inputClass} />
          </Field>
        </div>
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input type="checkbox" name="flexible" defaultChecked={v.flexible === 'on'} className="size-4 accent-primary" />
          My dates are flexible
        </label>
      </fieldset>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field id="location" label="Shoot or event location" error={err.location}>
          <input id="location" name="location" defaultValue={v.location} placeholder="City, studio, or venue" className={inputClass} />
        </Field>
        <Field id="budget" label="Budget range (optional)" error={err.budget}>
          <select id="budget" name="budget" defaultValue={v.budget ?? ''} className={cn(inputClass, 'cursor-pointer')}>
            <option value="">Prefer not to say</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Project details" required error={err.message}>
        <textarea id="message" name="message" rows={6} defaultValue={v.message} required aria-invalid={!!err.message} aria-describedby={err.message ? 'message-error' : undefined} placeholder="Concept, deliverables, usage, call times, and anything else helpful." className={cn(inputClass, 'resize-y leading-relaxed')} />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-sm leading-relaxed text-muted-foreground sm:max-w-xs">
          Submitting an inquiry starts a conversation — it does not confirm a booking.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="flex items-center justify-center gap-2 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {pending ? 'Sending…' : 'Send Booking Inquiry'}
        </button>
      </div>
    </form>
  )
}

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
        {required && <span className="text-primary" aria-hidden> *</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
