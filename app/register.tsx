import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Box, Input, Layout } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik, useFormikContext } from 'formik'
import { TextInput, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useBackAction } from '@/hooks'

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Heslo je povinné').min(8, 'Heslo musí být minimálně 8 znaků dlouhé'),
  password_again: Yup.string().required('Heslo je povinné').min(8, 'Heslo musí být minimálně 8 znaků dlouhé'),
  email: Yup.string().required('Email je povinný').email('Zadejte platný email'),
  first_name: Yup.string().required('Jméno je povinné'),
  last_name: Yup.string().required('Příjmení je povinné'),
})

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_again: '',
}

export default function Register() {
  const { push } = useRouter()
  const [formStep, setFormStep] = useState<'step1' | 'step2' | 'step3'>('step1')

  const handleSubmit = (values: any) => {
    push('/(tabs)')
  }

  return (
    <Layout.login>
      <Box style={tw('border0', { gap: 12 })}>
        <Formik initialValues={initialValues} enableReinitialize={true} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {
            {
              step1: <Register.step1 setFormStep={setFormStep} />,
              step2: <Register.step2 setFormStep={setFormStep} />,
              step3: <Register.step3 setFormStep={setFormStep} />,
            }[formStep]
          }
        </Formik>
      </Box>
    </Layout.login>
  )
}

Register.step1 = ({ setFormStep }: { setFormStep: React.Dispatch<React.SetStateAction<'step1' | 'step2' | 'step3'>> }) => {
  const { handleBlur, handleChange, touched, errors } = useFormikContext<typeof initialValues>()

  const inputRef = useRef<TextInput>(null)

  return (
    <>
      <Input
        name="first_name"
        label="Váše jméno"
        inputProps={{ autoFocus: true }}
        focusNext={() => inputRef.current?.focus()}
        onChange={handleChange('first_name')}
        onBlur={handleBlur('first_name')}
        error={touched.first_name && errors.first_name}
      />
      <Input
        ref={inputRef}
        name="last_name"
        label="Váše příjmení"
        inputProps={{ onSubmitEditing: () => setFormStep('step2') }}
        onChange={handleChange('last_name')}
        onBlur={handleBlur('last_name')}
        error={touched.last_name && errors.last_name}
      />
      <View style={tw('flexRow', 'justifyEnd', { gap: 16 })}>
        <Button type="primary" onPress={() => setFormStep('step2')} label="Další krok" />
      </View>
    </>
  )
}

Register.step2 = ({ setFormStep }: { setFormStep: React.Dispatch<React.SetStateAction<'step1' | 'step2' | 'step3'>> }) => {
  const { handleChange, handleBlur, errors, touched } = useFormikContext<typeof initialValues>()

  useBackAction(() => setFormStep('step1'))

  return (
    <>
      <Input
        name="email"
        label="Váš email"
        inputProps={{ autoComplete: 'email', keyboardType: 'email-address', autoFocus: true, onSubmitEditing: () => setFormStep('step3') }}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={touched.email && errors.email}
      />
      <View style={tw('flexRow', 'justifyEnd', { gap: 16 })}>
        <Button type="white" onPress={() => setFormStep('step1')} label="Zpět" />
        <Button type="primary" onPress={() => setFormStep('step3')} label="Další krok" />
      </View>
    </>
  )
}

Register.step3 = ({ setFormStep }: { setFormStep: React.Dispatch<React.SetStateAction<'step1' | 'step2' | 'step3'>> }) => {
  const { handleChange, handleBlur, errors, touched, handleSubmit } = useFormikContext<typeof initialValues>()

  const inputRef = useRef<TextInput>(null)

  useBackAction(() => setFormStep('step2'))

  return (
    <>
      <Input
        name="password"
        label="Váše heslo"
        inputProps={{ autoComplete: 'password', autoFocus: true }}
        focusNext={() => inputRef.current?.focus()}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        error={touched.password && errors.password}
      />
      <Input
        ref={inputRef}
        name="password_again"
        label="Váše heslo"
        inputProps={{ autoComplete: 'password', onSubmitEditing: () => handleSubmit() }}
        onChange={handleChange('password_again')}
        onBlur={handleBlur('password_again')}
        error={touched.password_again && errors.password_again}
      />
      <View style={tw('flexRow', 'justifyEnd', { gap: 16 })}>
        <Button type="white" onPress={() => setFormStep('step2')} label="Zpět" />
        <Button type="primary" onPress={() => handleSubmit()} label="Další krok" />
      </View>
    </>
  )
}

export const getStaticProps = () => {
  return {
    options: {
      headerShown: false, // Skrytí headeru
    },
  }
}
