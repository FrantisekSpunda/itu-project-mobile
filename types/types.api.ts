export type CallbackRes = {
  token: string
  user: {
    avatar: string | null
    email: string | null
    bank_account: string | null
    bank_iban: string | null
    currency_id: number | null
    email_notifications_on: boolean | null
    first_name: string | null
    last_name: string | null
    google_id: string | null
    id: string | null
    updated_at: string | null
    created_at: string | null
  }
}
