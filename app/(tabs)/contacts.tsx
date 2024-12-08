import { getContact } from '@/api'
import { Contact } from '@/api/types'
import { Heading, Widget, List, ContactItem, ExpenseItem, Button, Layout } from '@/components'
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'

export default function Contacts() {
  const { push } = useRouter()

  const [contacts, setContacts] = useState<(Contact & { amount: number })[]>([])

  useEffect(() => {
    getContact(1).then((data) => setContacts(data || []))
  }, [])

  return (
    <Layout>
      <Heading text="Všichni dlužníci" showBack={false} showSearch={false} />
      <Widget.dept dept={1230} youOwe={321} oweYou={432} />
      <List label="Dlužníci" buttons={<Button type="transparent" label="Přidat" icon={<IconPlus />} onPress={() => push('/contact_add')} />}>
        {contacts.map((contact, i) => (
          <ContactItem key={i} user={{ firstName: contact.first_name || '', lastName: contact.last_name || '' }} amount={contact.amount} />
        ))}
      </List>
    </Layout>
  )
}
