import React, { useEffect, useMemo, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, ThemedText } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { getProfile } from '@/api'
import { User } from '@/api/types'
import { useRouter } from 'expo-router'

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Jméno je povinné').min(2, 'Jméno musí mít alespoň 2 znaky'),
  last_name: Yup.string().required('Příjmení je povinné').min(2, 'Příjmení musí mít alespoň 2 znaky'),
  email: Yup.string().required('Email je povinný').email('Zadejte platný email'),
  bank_iban: Yup.string()
    .required('Bankovní účet je povinný')
    .matches(/^\d{1,10}\/\d{4}$/, 'IBAN musí obsahovat pouze velká písmena a číslice'),
})

export default function UserProfile() {
  const { back } = useRouter()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getProfile(1).then((data) => {
      setUser(data)
    })
  }, [])

  const handleSubmit = (values: any) => {
    console.log('Form Data: ', values)
    back()
    // Tady bys mohl volat API nebo jinou funkci pro zpracování dat
  }

  return (
    <Layout>
      <Heading text="Úprava vašeho profilu" showSearch={false} />
      <Box style={tw('borderBlue', { gap: 12 })}>
        <ThemedText>Základní informace</ThemedText>
        <Formik
          initialValues={{
            first_name: user?.first_name,
            last_name: user?.last_name,
            email: user?.email,
            bank_iban: user?.bank_iban,
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Input
                name="first_name"
                label="Vaše jméno"
                value={values.first_name}
                onChange={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                error={touched.first_name && errors.first_name}
              />
              <Input
                name="last_name"
                label="Vaše příjmení"
                value={values.last_name}
                onChange={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                error={touched.last_name && errors.last_name}
              />
              <Input
                name="email"
                label="Váš email"
                value={values.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
              />
              <Input
                name="bank_iban"
                label="Váš bankovní účet"
                value={values.bank_iban}
                onChange={handleChange('bank_iban')}
                onBlur={handleBlur('bank_iban')}
                error={touched.bank_iban && errors.bank_iban}
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
