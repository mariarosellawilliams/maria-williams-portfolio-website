export const projectTypes = [
  'Agency Representation',
  'Editorial',
  'Fashion / Campaign',
  'Runway',
  'Commercial',
  'Beauty / Fragrance',
  'Music Video',
  'Film / On-camera',
  'Other',
] as const

export const budgetRanges = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000+',
  'To be discussed',
] as const

export type BookingState = {
  status: 'idle' | 'error' | 'success'
  message?: string
  fieldErrors?: Record<string, string>
  values?: Record<string, string>
}
