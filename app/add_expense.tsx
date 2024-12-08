import React, { useEffect, useMemo, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, Select } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useRouter } from 'expo-router'
import { IconUser } from '@tabler/icons-react-native'

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Jméno je povinné').min(2, 'Jméno musí mít alespoň 2 znaky'),
  last_name: Yup.string().required('Příjmení je povinné').min(2, 'Příjmení musí mít alespoň 2 znaky'),
  email: Yup.string().required('Email je povinný').email('Zadejte platný email'),
  bank_iban: Yup.string()
    .required('Bankovní účet je povinný')
    .matches(/^\d{1,10}\/\d{4}$/, 'IBAN musí obsahovat pouze velká písmena a číslice'),
})

export default function AddExpense() {
  const { back } = useRouter()

  const handleSubmit = (values: any) => {
    console.log('Form Data: ', values)
    back()
    // Tady bys mohl volat API nebo jinou funkci pro zpracování dat
  }

  return (
    <Layout scrollEnabled={false}>
      <Heading text="Přidat výdaj" showSearch={false} />
      <Box style={tw('borderTransparent', { gap: 12 })}>
        <Formik
          initialValues={{
            title: '',
            price: '',
            description: '',
            payers: [],
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Input
                name="title"
                label="Název"
                value={values.title}
                onChange={handleChange('title')}
                onBlur={handleBlur('title')}
                error={touched.title && errors.title}
              />
              <Input
                name="price"
                label="Cena"
                inputProps={{ inputMode: 'numeric' }}
                value={values.price}
                onChange={handleChange('price')}
                onBlur={handleBlur('price')}
                error={touched.price && errors.price}
              />
              <Input
                name="description"
                label="Popis"
                inputProps={{ multiline: true }}
                value={values.description}
                onChange={handleChange('description')}
                onBlur={handleBlur('description')}
                error={touched.description && errors.description}
              />
              <Select
                name="payers"
                label="Zadejte kontakt"
                setValue={setFieldValue}
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
              <BottomActionBar>
                <Button type="primary" label="Uložit" onPress={() => handleSubmit()} />
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
