import { getExpenses } from '@/api'
import { Expense } from '@/api/types'
import { Badge, Button, ContactItem, ExpenseItem, Heading, Layout, List, MainDept, SettlementItem } from '@/components'
import { tw } from '@/utils'
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native'
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'

export default function Expenses() {
  const filters: { label: string; value: 'all' | 'expenses' | 'settlements' }[] = [
    { label: 'Vše', value: 'all' },
    { label: 'Výdaje', value: 'expenses' },
    { label: 'Vyrovnání', value: 'settlements' },
  ]

  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filter, setFilter] = useState<(typeof filters)[0]['value']>('all')

  useEffect(() => {
    getExpenses(1).then(setExpenses)
  }, [])

  return (
    <Layout>
      <Heading text="Všechny výdaje" showBack={false} />
      <MainDept />
      <View style={tw('flexRow', 'wFull', { gap: 12 })}>
        {filters.map((item, i) => (
          <Badge
            key={i}
            size="medium"
            label={item.label}
            style={filter == item.value ? tw('bgLightBlue') : tw('bgWhite')}
            onPress={() => setFilter(item.value)}
          />
        ))}
      </View>
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
