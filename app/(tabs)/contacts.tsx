import { getContact } from '@/api'
import { Contact } from '@/api/types'
import { Heading, MainDept, List, ContactItem, ExpenseItem, Button, Layout } from '@/components'
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native'
import React, { useEffect, useState } from 'react'

export default function Contacts() {
  const [contacts, setContacts] = useState<(Contact & { amount: number })[]>([])

  useEffect(() => {
    getContact(1).then((data) => setContacts(data || []))
  }, [])

  return (
    <Layout>
      <Heading text="Všichni dlužníci" showBack={false} showSearch={false} />
      <MainDept />
      <List label="Dlužníci" buttons={<Button type="transparent" label="Přidat" icon={<IconPlus />} />}>
        {contacts.map((contact, i) => (
          <ContactItem key={i} user={{ firstName: contact.first_name || '', lastName: contact.last_name || '' }} amount={contact.amount} />
        ))}
      </List>
    </Layout>
  )
}
