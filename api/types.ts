export type apiGetEndpoints = {
  profile: { profile: User }
  contacts: { contacts: { data: Contact[] } }
  expenses: { data: Expense[] }
  'overview/balance': OverviewBalance
} & Record<`contacts/${number}`, { contact: Contact }>

export type apiPostEndpoints = {
  contacts: Contact
  expenses: any
}

export type apiPutEndpoints = {
  profile: { profile: User }
} & Record<`contacts/${number}`, { contact: Contact }>

export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
  bank_account: string | null
  bank_iban: string | null
  created_at: string
  updated_at: string
  currency_id: number | null
  email_notifications_on: boolean
  google_id: string | null
}

export type Balance = { balance: number; total_dept: string; total_paid: number; type: 'settled' | 'owed' | 'owe' }

export type OverviewBalance = { balance: number; total_owed: number; total_paid: number }

export type Contact = {
  id: number
  name: string
  owner_id: number
  user_id: number
  user: User
  balance_detail: Balance
  created_at: string
  updated_at: string
}

type Deptor = {
  id: number
  expense_id: number
  deptor_id: number
  deptor: Contact
  price: number
  created_at: string
  updated_at: string
}

export type Expense = {
  author_id: number
  created_at: string
  currency_id: number
  deptors: Deptor[]
  description: string | null
  id: number
  is_draft: boolean
  payer: Contact
  payer_id: number
  price: number
  price_calculated: number
  title: string
  type: 'payment' | 'settlement'
  updated_at: string
  user: User
  user_id: number
}
