export type Expense = {
  id: number
  amount: number
  payer_id: number | null
  title: string | null
  description: string | null
  deptors_ids: number[]
  distribution: number[]
  type: 'expense' | 'settlement'
  created_at: string // ISO date string format
}

export type Contact = {
  id: number
  owner_id: number
  user_id: number | null
  first_name: string | null
  last_name: string | null
  bank_iban: string | null
}

export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  bank_iban: string
}
