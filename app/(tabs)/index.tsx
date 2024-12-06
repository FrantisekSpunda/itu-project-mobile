import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { IconUser } from '@tabler/icons-react-native'
import { tw } from '@/utils/utils.tailwind'
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native'
import { Layout, Heading, MainDept, Button, List, ContactItem, ExpenseItem, SettlementItem } from '@/components'
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
      <TouchableOpacity style={tw('roundedFull', 'bgGray100', 'p3')} onPress={() => push('/login')}>
        <IconUser size={24} color="black" />
      </TouchableOpacity>
      <MainDept />
      <List
        label="Dlužníci"
        buttons={
          <>
            <Button type="transparent" label="Dlužníci" icon={<IconExternalLink />} />
            <Button type="transparent" label="Přidat" icon={<IconPlus />} />
          </>
        }
      >
        {contacts.map((contact, i) => (
          <ContactItem key={i} user={{ firstName: contact.first_name || '', lastName: contact.last_name || '' }} amount={contact.amount} />
        ))}
      </List>
      <List
        label="Výdaje"
        buttons={
          <>
            <Button type="transparent" label="Výdaje" icon={<IconExternalLink />} />
          </>
        }
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
