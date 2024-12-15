import { useGetContacts } from '@/api/api.helpers'
import { dbLocalData } from '@/api/db'
import { Heading, Widget, List, ContactItem, Button, Layout, useHideBottomActionBar, ThemedText } from '@/components'
import { tw } from '@/utils'
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'

export default function Contacts() {
  const { push } = useRouter()

  useHideBottomActionBar()
  const [contacts] = useGetContacts()

  return (
    <Layout>
      <Heading text="Všichni dlužníci" showBack={false} showSearch={false} />
      <Widget.dept />
      <List label="Dlužníci" buttons={<Button type="transparent" label="Přidat" icon={<IconPlus />} onPress={() => push('/contact/create')} />}>
        {!contacts.length && <ThemedText style={tw('wFull', 'pY3', 'textCenter')}>Žádné kontakty s dluhem</ThemedText>}
        {contacts.map((contact, i) => (
          <ContactItem key={i} contact={contact} />
        ))}
      </List>
    </Layout>
  )
}
