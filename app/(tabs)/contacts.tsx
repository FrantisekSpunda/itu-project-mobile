import { dbLocalData } from '@/api/db'
import { Heading, Widget, List, ContactItem, ExpenseItem, Button, Layout } from '@/components'
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'

export default function Contacts() {
  const { push } = useRouter()

  return (
    <Layout>
      <Heading text="Všichni dlužníci" showBack={false} showSearch={false} />
      <Widget.dept dept={1230} youOwe={321} oweYou={432} />
      <List label="Dlužníci" buttons={<Button type="transparent" label="Přidat" icon={<IconPlus />} onPress={() => push('/contact_add')} />}>
        {dbLocalData.users.map((contact, i) => (
          <ContactItem key={i} user={{ firstName: contact.first_name || '', lastName: contact.last_name || '' }} amount={120 * Math.pow(-1, i)} />
        ))}
      </List>
    </Layout>
  )
}
