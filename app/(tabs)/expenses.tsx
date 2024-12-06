import { getExpenses } from '@/api'
import { Expense } from '@/api/types'
import { Button, ContactItem, ExpenseItem, Heading, Layout, List, MainDept, SettlementItem } from '@/components'
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native'
import React, { useState, useEffect } from 'react'

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    getExpenses(1).then(setExpenses)
  }, [])
  return (
    <Layout>
      <Heading text="Přehled" showBack={false} />
      <MainDept />
      <List label="Listopad 2024">
        {expenses.map((expense, i) =>
          expense.type == 'expense' ? (
            <ExpenseItem
              key={i}
              label={expense.title || ''}
              payer={{ firstName: String(expense.payer_id), lastName: '' }}
              amount={expense.amount * (expense.payer_id == 1 ? 1 : -1)}
            />
          ) : (
            <SettlementItem key={i} payer={{ firstName: String(expense.payer_id), lastName: '' }} amount={expense.amount} />
          )
        )}
      </List>
      <List label="Říjen 2024">
        {expenses.map((expense, i) =>
          expense.type == 'expense' ? (
            <ExpenseItem
              key={i}
              label={expense.title || ''}
              payer={{ firstName: String(expense.payer_id), lastName: '' }}
              amount={expense.amount * (expense.payer_id == 1 ? 1 : -1)}
            />
          ) : (
            <SettlementItem key={i} payer={{ firstName: String(expense.payer_id), lastName: '' }} amount={expense.amount} />
          )
        )}
      </List>
    </Layout>
  )
}
