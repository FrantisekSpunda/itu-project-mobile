export type apiGetEndpoints = {
  profile: { profile: User }
  contacts: { contacts: { data: Contact[] } }
  expenses: { data: Expense[] }
  'overview/balance': OverviewBalance
  'contacts/users': { users: { data: User[] } }
} & Record<`contacts/${number}`, { contact: Contact }> &
  Record<`expenses/${number}`, { expense: Expense }>

export type apiPostEndpoints = {
  contacts: { contacts: Contact[] }
  expenses: any
  'settlements/preview': SettlementPreview
  'settlements/mark-as-paid': any
}

export type apiPutEndpoints = {
  profile: { profile: User }
} & Record<`contacts/${number}`, { contact: Contact }>

export type SettlementPreview = {
  currency: any
  payer: Participant
  deptor: Participant
  price: number
  expenses: Expense[]
  qrcode: string // Base64-encoded image string
}

export type Settlement = {
  id: number
  deptor_id: number
  price: number
  payer_id: number
  created_at: string
  updated_at: string
  is_paid: boolean
  qrcode: string
  token: string
  payer: Contact
  deptor: Contact
  details: {
    deptor_id: string
    expense_id: string
    expense: Expense
    id: string
    price: string
    updated_at: string
    created_at: string
  }[]
}

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
  expenses?: Expense[]
  created_at: string
  bank_account: string | null
  bank_iban: string | null
  updated_at: string
}

export type Participant = {
  id: number
  owner_id: number
  user_id: number
  name: string
  created_at: string
  updated_at: string
  bank_iban: string | null
  bank_account: string | null
  user?: User // Optional if included
}

export type Deptor = {
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
  settlement: Settlement
  settlement_id: number
  updated_at: string
  user: User
  user_id: number
}
