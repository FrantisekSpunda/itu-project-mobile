import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, Select, SelectRef, Badge, Widget, List, ExpenseItem } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useRouter } from 'expo-router'
import { IconArrowNarrowRight, IconCash, IconCheck, IconCoins, IconFilePencil, IconHeading, IconUser, IconUsers } from '@tabler/icons-react-native'
import { TextInput, View } from 'react-native'
import { ThemedText } from '@/components/ThemedText'

export default function SettlementAdd() {
  const { back } = useRouter()

  const handleSubmit = () => {
    console.log('Form Data: ')
    back()
    // Tady bys mohl volat API nebo jinou funkci pro zpracování dat
  }

  return (
    <Layout scrollEnabled={false}>
      <Heading text="Detail výdaje" showSearch={false} />
      <Widget.dept dept={1340} oweYou={123} youOwe={321} />
      <ThemedText type="body1" style={tw('textBlack')}>
        Detail výdaje
      </ThemedText>
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
