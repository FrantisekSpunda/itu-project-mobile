import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { IconUser } from '@tabler/icons-react-native'
import { tw } from '@/utils/utils.tailwind'
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native'
import { Layout, Heading, Widget, Button, List, ContactItem, ExpenseItem, SettlementItem } from '@/components'
import { getContact, getContacts, getExpenses } from '@/api'
import { Contact, Expense } from '@/api/types'
import { useRouter } from 'expo-router'

export default function Overview() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [contacts, setContacts] = useState<(Contact & { amount: number })[]>([])
  const { push } = useRouter()

  useEffect(() => {
    getExpenses(1).then(setExpenses)
    getContact(1).then((data) => setContacts(data || []))
  }, [])

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
        {contacts.map((contact, i) => (
          <ContactItem key={i} user={{ firstName: contact.first_name || '', lastName: contact.last_name || '' }} amount={contact.amount} />
        ))}
      </List>
      <List label="Nedokončené">
        <ExpenseItem label="Cesta do Brna" payer={{ firstName: '', lastName: '' }} amount={80} draft />
      </List>
      <List
        label="Výdaje za poslední měsíc"
        buttons={<Button type="transparent" label="Výdaje" icon={<IconExternalLink />} onPress={() => push('/(tabs)/expenses')} />}
      >
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
