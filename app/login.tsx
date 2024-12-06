import React, { useEffect, useMemo, useState } from 'react'
import { Button, Box, Input, Layout } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { IconBrandGoogleFilled } from '@tabler/icons-react-native'
import { View } from 'react-native'
import { useRouter } from 'expo-router'

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Heslo je povinné').min(8, 'Heslo musí být minimálně 8 znaků dlouhé'),
  email: Yup.string().required('Email je povinný').email('Zadejte platný email'),
})

export default function Login() {
  const { push } = useRouter()

  const handleSubmit = (values: any) => {
    push('/(tabs)')
  }

  return (
    <Layout.login>
      <Box style={tw({ gap: 12 })} borderStyle={tw('hidden')}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Input
                name="email"
                label="Váš email"
                inputProps={{ autoComplete: 'email' }}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
              />
              <Input
                name="password"
                label="Vaše heslo"
                inputProps={{ secureTextEntry: true }}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
              />
              <View style={tw('flexRow', 'justifyEnd', { gap: 16 })}>
                <Button type="white" label="Přihlásit se přes" iconAfter icon={<IconBrandGoogleFilled size={18} color="black" fill="white" />} />
                <Button type="primary" onPress={() => handleSubmit()} label="Přihlásit se" />
              </View>
            </>
          )}
        </Formik>
      </Box>
    </Layout.login>
  )
}

export const getStaticProps = () => {
  return {
    options: {
      headerShown: false, // Skrytí headeru
    },
  }
}
