import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Box, Input, Layout, ThemedText } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { IconBrandGoogleFilled } from '@tabler/icons-react-native'
import { TextInput, View } from 'react-native'
import { useRouter } from 'expo-router'
import { get } from '@/api'
import * as WebBrowser from 'expo-web-browser'
import { useAuthRequest } from 'expo-auth-session'
import { API_BASE_URL, GOOGLE_CLIENT_ID, REDIRECT_URI } from '@/config'

WebBrowser.maybeCompleteAuthSession()

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Heslo je povinné').min(8, 'Heslo musí být minimálně 8 znaků dlouhé'),
  email: Yup.string().required('Email je povinný').email('Zadejte platný email'),
})

export default function Login() {
  const { push } = useRouter()

  const inputRef = useRef<TextInput>(null)

  const [googleAuthUrl, setGoogleAuthUrl] = useState('')

  useEffect(() => {
    const fetchGoogleAuthUrl = async () => {
      const response = await get<{ url: string }>('auth/google/redirect')
      if (response.status == 200) setGoogleAuthUrl(response.data.url)
    }

    fetchGoogleAuthUrl()
  }, [])

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      redirectUri: 'https://itu.matejkrenek.cz/login',
      scopes: ['openid', 'profile', 'email'],
      usePKCE: false,
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    }
  )

  useEffect(() => {
    console.log('sfesfse', REDIRECT_URI)
    console.log('request', request)
    console.log('response', response)
  })

  const handleSubmit = (values: any) => {
    push('/(tabs)')
  }

  return (
    <Layout.login>
      <ThemedText style={tw('textWhite')}>Přihlášení</ThemedText>
      <Box style={tw('borderTransparent', { gap: 12 })}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <>
              <Input
                name="email"
                label="Váš email"
                inputProps={{
                  inputMode: 'email',
                  autoFocus: true,
                }}
                focusNext={() => inputRef.current?.focus()}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
              />
              <Input
                ref={inputRef}
                name="password"
                label="Vaše heslo"
                inputProps={{ secureTextEntry: true, onSubmitEditing: () => handleSubmit() }}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
              />
              <View style={tw('flexRow', 'justifyEnd', { gap: 16 })}>
                <Button
                  type="white"
                  label="Přihlásit se přes"
                  iconAfter
                  onPress={() => promptAsync()}
                  icon={<IconBrandGoogleFilled size={18} color="black" fill="white" />}
                />
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
