import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { IconUser } from '@tabler/icons-react-native'
import { tw } from '@/utils/utils.tailwind'
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native'
import { Layout, Heading, Widget, Button, List, ContactItem, ExpenseItem, SettlementItem } from '@/components'
import { Contact, Expense } from '@/api/types'
import { useRouter } from 'expo-router'
import { dbLocalData } from '@/api/db'

export default function Overview() {
  const { push } = useRouter()

  return (
    <Layout>
      <Heading text="Přehled" showBack={false} />
      <Widget.dept dept={1340} oweYou={410} youOwe={503} />
      <List
        label="Dlužníci"
        buttons={
          <>
            <Button type="transparent" label="Dlužníci" icon={<IconExternalLink />} onPress={() => push('/(tabs)/contacts')} />
            <Button type="transparent" label="Přidat" icon={<IconPlus />} onPress={() => push('/contact_add')} />
          </>
        }
      >
        {dbLocalData.users.map((contact, i) => (
          <ContactItem key={i} user={{ firstName: contact.first_name || '', lastName: contact.last_name || '' }} amount={120 * Math.pow(-1, i)} />
        ))}
      </List>
      <List label="Nedokončené">
        <ExpenseItem label="Cesta do Brna" payer={{ firstName: '', lastName: '' }} amount={80} draft />
      </List>
      <List
        label="Výdaje za poslední měsíc"
        buttons={<Button type="transparent" label="Výdaje" icon={<IconExternalLink />} onPress={() => push('/(tabs)/expenses')} />}
      >
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
