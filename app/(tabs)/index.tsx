import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { IconUser } from '@tabler/icons-react-native'
import { tw } from '@/utils/utils.tailwind'
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native'
import { Layout, Heading, Widget, Button, List, ContactItem, ExpenseItem, SettlementItem, useHideBottomActionBar, ThemedText } from '@/components'
import { Contact, Expense } from '@/api/types'
import { useRootNavigationState, useRouter } from 'expo-router'
import { dbLocalData } from '@/api/db'
import { useQuery } from '@tanstack/react-query'
import { Api } from '@/api'
import { useStore } from '@/hooks'
import { useGetContacts, useGetExpenses, useGetOverviewBalance } from '@/api/api.helpers'
import { View } from 'react-native-reanimated/lib/typescript/Animated'

export default function Overview() {
  const { push } = useRouter()

  useHideBottomActionBar()

  const [contacts] = useGetContacts({ filter: ['owe', 'owed'] })
  const [expenses] = useGetExpenses()

  return (
    <Layout>
      <Heading text="Přehled" showBack={false} />
      <Widget.dept />
      <List
        label="Dlužníci"
        buttons={
          <>
            <Button type="transparent" label="Dlužníci" icon={<IconExternalLink />} onPress={() => push('/(tabs)/contacts')} />
            <Button type="transparent" label="Přidat" icon={<IconPlus />} onPress={() => push('/contact/create')} />
          </>
        }
      >
        {!contacts.length && <ThemedText style={tw('wFull', 'pY3', 'textCenter')}>Žádné kontakty s dluhem</ThemedText>}
        {contacts.map((contact, i) => (
          <ContactItem key={i} contact={contact} />
        ))}
      </List>
      {/* <List label="Nedokončené">
        <ExpenseItem label="Cesta do Brna" payer={{ firstName: '', lastName: '' }} price={80} draft />
      </List> */}
      <List
        label="Výdaje za poslední měsíc"
        buttons={<Button type="transparent" label="Výdaje" icon={<IconExternalLink />} onPress={() => push('/(tabs)/expenses')} />}
      >
        {!expenses.length && <ThemedText style={tw('wFull', 'pY3', 'textCenter')}>Žádné výdaje</ThemedText>}
        {expenses.map((expense, i) => (expense.type === 'payment' ? <ExpenseItem key={i} expense={expense} /> : <SettlementItem key={i} expense={expense} />))}
      </List>
    </Layout>
  )
}
