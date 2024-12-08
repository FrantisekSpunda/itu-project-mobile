import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, Select, SelectRef, Badge } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useRouter } from 'expo-router'
import { IconArrowNarrowRight, IconCheck, IconCoins, IconFilePencil, IconHeading, IconUser, IconUsers } from '@tabler/icons-react-native'
import { TextInput, View } from 'react-native'
import { ThemedText } from '@/components/ThemedText'

export default function AddExpense() {
  const { back } = useRouter()

  const handleSubmit = () => {
    console.log('Form Data: ')
    back()
    // Tady bys mohl volat API nebo jinou funkci pro zpracování dat
  }

  return (
    <Layout scrollEnabled={false}>
      <Heading text="Vyrovnat se" showSearch={false} />
      <Box label="Detail dluhu" style={tw('borderTransparent', { gap: 16 })}>
        <ThemedText type="heading2">1 420 Kč</ThemedText>
        <View style={tw('flexRow', 'itemsCenter', { gap: 4 })}>
          <Badge label="Já" />
          <IconArrowNarrowRight size={14} style={tw('textGray')} />
          <Badge label="Pepaa Pepík" />
        </View>
        <ThemedText type="body2" style={tw('textGray', 'textCenter')}>
          Naskenute QR platby kód níže nebo označte jako zaplacené, pokud byl použit jiný způsob platby.
        </ThemedText>
        <View style={tw('flex', 'itemsCenter')}>
          <View style={tw('p4', 'border', 'borderGray', 'roundedLg', { borderStyle: 'dashed', borderRadius: 20 })}>
            <View style={tw('h40', 'w40', 'bgGray', { borderRadius: 1 })}></View>
          </View>
        </View>
        <Button type="primary" label="Uložit" icon={<IconCheck />} onPress={() => handleSubmit()} />
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
