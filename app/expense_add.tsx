import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, Select, SelectRef } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useRouter } from 'expo-router'
import { IconCheck, IconCoins, IconFilePencil, IconHeading, IconUser, IconUsers } from '@tabler/icons-react-native'
import { TextInput, View } from 'react-native'

const validationSchema = Yup.object().shape({})

export default function ExpenseAdd() {
  const { back } = useRouter()

  const priceRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)
  const payersRef = useRef<SelectRef>(null)

  const handleSubmit = (values: any) => {
    console.log('Form Data: ', values)
    back()
    // Tady bys mohl volat API nebo jinou funkci pro zpracování dat
  }

  return (
    <Layout scrollEnabled={false}>
      <Heading text="Přidat výdaj" showSearch={false} />
      <Box label="Detail Výdaje" style={tw({ gap: 12 })}>
        <Formik
          initialValues={{
            title: '',
            price: '',
            description: '',
            payers: '',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, errors, touched, dirty }) => (
            <>
              <Input
                name="title"
                label="Název"
                value={values.title}
                inputProps={{ autoFocus: true }}
                focusNext={() => priceRef.current?.focus()}
                icon={<IconHeading />}
                onChange={handleChange('title')}
                onBlur={handleBlur('title')}
                error={touched.title && errors.title}
              />
              <Input
                ref={priceRef}
                name="price"
                label="Cena"
                inputProps={{ inputMode: 'numeric' }}
                focusNext={() => {
                  priceRef.current?.blur()
                  payersRef.current?.press()
                }}
                value={values.price}
                icon={<IconCoins />}
                onChange={handleChange('price')}
                onBlur={handleBlur('price')}
                error={touched.price && errors.price}
              />
              <Select
                ref={payersRef}
                name="payers"
                label="Zadejte dlužníky"
                setValue={setFieldValue}
                icon={<IconUsers />}
                multiple
                value={values.payers || []}
                options={[
                  { label: 'Matěj Křenek', value: '1' },
                  { label: 'Pepa zDepa', value: '2' },
                  { label: 'Bc. Tomáš Zavadil', value: '3' },
                  { label: 'Borec Nakonec', value: '4' },
                  { label: 'Frajer Franta', value: '5' },
                ]}
              />
              <Input
                ref={descriptionRef}
                name="description"
                label="Popis"
                inputProps={{ multiline: true }}
                value={values.description}
                onChange={handleChange('description')}
                onBlur={handleBlur('description')}
                error={touched.description && errors.description}
              />
              <BottomActionBar show={dirty}>
                <Button type="white" label="Uložit nedokončené" icon={<IconFilePencil />} onPress={() => handleSubmit()} />
                <Button type="primary" label="Uložit" icon={<IconCheck />} onPress={() => handleSubmit()} />
              </BottomActionBar>
            </>
          )}
        </Formik>
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
