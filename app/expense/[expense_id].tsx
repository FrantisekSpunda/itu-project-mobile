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
import { formatPrice } from '@/utils'

export default function SettlementAdd() {
  const { expense_id } = useLocalSearchParams<{ expense_id: string }>()

  const [expense] = useGetExpense(Number(expense_id))

  if (!expense) return null

  return (
    <Layout scrollEnabled={false}>
      <Heading text="Detail výdaje" showSearch={false} />
      {/* <Widget.settlement settlement={} /> */}
      <Box label="Výdaj" style={tw({ gap: 16 })}>
        <View style={tw('flexCol', { gap: 2 })}>
          <ThemedText type="caption">Název</ThemedText>
          <ThemedText>{expense.title}</ThemedText>
        </View>
        <View style={tw('flexCol', { gap: 2 })}>
          <ThemedText type="caption">Cena</ThemedText>
          <ThemedText>{formatPrice(expense.price)}</ThemedText>
        </View>

        <View style={tw('wFull', 'rounded', 'border', 'borderLightGray')}>
          <View style={tw('wFull', 'flexRow', 'p2')}>
            <View style={tw('w3_4')}>
              <ThemedText type="caption">Dlužník</ThemedText>
              {expense.deptors.map((deptor, i) => (
                <ThemedText key={i}>{deptor.deptor.name}</ThemedText>
              ))}
            </View>
            <View style={tw('w1_4')}>
              <ThemedText type="caption">Cena</ThemedText>
              {expense.deptors.map((deptor, i) => (
                <ThemedText key={i}>{formatPrice(deptor.price)}</ThemedText>
              ))}
            </View>
          </View>
        </View>
        <View style={tw('flexCol', { gap: 2 })}>
          <ThemedText type="caption">Plátce</ThemedText>
          <ThemedText>{expense.payer.name}</ThemedText>
        </View>
        <View style={tw('flexCol', { gap: 2 })}>
          <ThemedText type="caption">Popis</ThemedText>
          <ThemedText>{expense.description || '-'}</ThemedText>
        </View>
      </Box>
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
