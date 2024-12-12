import { useGetExpenses } from '@/api/api.helpers'
import { Badge, ExpenseItem, Heading, Layout, List, Widget } from '@/components'
import { tw } from '@/utils'
import React, { useState } from 'react'
import { View } from 'react-native'

export default function Expenses() {
  const filters: { label: string; value: 'all' | 'expenses' | 'settlements' }[] = [
    { label: 'Vše', value: 'all' },
    { label: 'Výdaje', value: 'expenses' },
    { label: 'Vyrovnání', value: 'settlements' },
  ]

  const [filter, setFilter] = useState<(typeof filters)[0]['value']>('all')

  const [expenses] = useGetExpenses()

  return (
    <Layout>
      <Heading text="Všechny výdaje" showBack={false} />
      <Widget.dept />
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
        {expenses.map((expense, i) => (
          <ExpenseItem key={i} expense={expense} />
        ))}
      </List>
    </Layout>
  )
}
