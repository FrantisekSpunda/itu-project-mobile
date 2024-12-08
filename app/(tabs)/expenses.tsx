import { dbLocalData } from '@/api/db'
import { Expense } from '@/api/types'
import { Badge, Button, ContactItem, ExpenseItem, Heading, Layout, List, Widget, SettlementItem } from '@/components'
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

  const [filter, setFilter] = useState<(typeof filters)[0]['value']>('all')

  return (
    <Layout>
      <Heading text="Všechny výdaje" showBack={false} />
      <Widget.dept dept={1340} oweYou={410} youOwe={503} />
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
        {dbLocalData.expenses.map((expense, i) =>
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
        {dbLocalData.expenses.map((expense, i) =>
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
