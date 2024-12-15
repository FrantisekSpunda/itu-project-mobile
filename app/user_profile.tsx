import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, ThemedText } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { User } from '@/api/types'
import { useRouter } from 'expo-router'
import { TextInput } from 'react-native-gesture-handler'
import { useGetUser, usePutUser } from '@/api/api.helpers'
import { AutoSubmit } from './../components/AutoSubmit'

/**
 * Validation schema for user profile form
 */
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Jméno je povinné').min(2, 'Jméno musí mít alespoň 2 znaky'),
  last_name: Yup.string().required('Příjmení je povinné').min(2, 'Příjmení musí mít alespoň 2 znaky'),
  email: Yup.string().required('Email je povinný').email('Zadejte platný email'),
  bank_iban: Yup.string()
    .nullable()
    .matches(/^\d{1,10}\/\d{4}$/, 'IBAN musí obsahovat pouze velká písmena a číslice'),
})

/**
 * User profile page to edit user information
 */
export default function UserProfile() {
  const [user] = useGetUser()

  const lastNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const bankAccountRef = useRef<TextInput>(null)

  const handleSubmit = usePutUser()

  return (
    <Layout>
      <Heading text="Úprava vašeho profilu" showSearch={false} />
      <Box style={tw('borderBlue', { gap: 12 })}>
        <ThemedText>Základní informace</ThemedText>
        <Formik
          initialValues={
            {
              first_name: user?.first_name || '',
              last_name: user?.last_name || '',
              email: user?.email || '',
              bank_iban: user?.bank_iban || '',
            } as User
          }
          enableReinitialize
          validateOnChange
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <AutoSubmit />
              <Input
                name="first_name"
                label="Vaše jméno"
                value={values.first_name}
                onChange={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                focusNext={() => lastNameRef.current?.focus()}
                error={touched.first_name && errors.first_name}
              />
              <Input
                ref={lastNameRef}
                name="last_name"
                label="Vaše příjmení"
                value={values.last_name}
                onChange={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                focusNext={() => emailRef.current?.focus()}
                error={touched.last_name && errors.last_name}
              />
              <Input
                ref={emailRef}
                name="email"
                label="Váš email"
                value={values.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                focusNext={() => bankAccountRef.current?.focus()}
                error={touched.email && errors.email}
              />
              <Input
                ref={bankAccountRef}
                name="bank_iban"
                label="Váš bankovní účet"
                value={values.bank_iban || undefined}
                inputProps={{ onSubmitEditing: () => handleSubmit() }}
                onChange={handleChange('bank_iban')}
                onBlur={handleBlur('bank_iban')}
                error={touched.bank_iban && errors.bank_iban}
              />
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
