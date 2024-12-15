import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, Select, SelectRef, Badge, Widget, List, ExpenseItem } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { IconArrowNarrowRight, IconCash, IconCheck, IconCoins, IconFilePencil, IconHeading, IconUser, IconUsers } from '@tabler/icons-react-native'
import { TextInput, View } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { useGetExpense } from '@/api'

export default function SettlementAdd() {
  const { back } = useRouter()

  const { expense_id } = useLocalSearchParams<{ expense_id: string }>()

  const [expense] = useGetExpense(Number(expense_id))

  if (!expense) return null

  return (
    <Layout scrollEnabled={false}>
      <Heading text="Detail vyrovnání" showSearch={false} />
      <Widget.settlement expense={expense} />
      <ThemedText type="body1" style={tw('textBlack')}>
        Od posledního vyrovnání přibyly tyto dluhy
      </ThemedText>
      <List label="Zahrnuté výdaje">
        {expense.settlement.details.map(({ expense }, i) => (
          <ExpenseItem key={i} expense={expense} />
        ))}
      </List>
    </Layout>
  )
}

export const getStaticProps = () => {
  return {
    options: {
      headerShown: false, // Skrytí headeru
    },
  }
}
