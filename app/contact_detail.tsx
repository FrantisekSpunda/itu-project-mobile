import React, { useRef, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, Select, SelectRef, Badge, List, ExpenseItem, SettlementItem, Widget } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useRouter } from 'expo-router'
import { IconCheck, IconCreditCard } from '@tabler/icons-react-native'
import { TextInput, View } from 'react-native'

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Jméno je povinné').min(2, 'Jméno musí mít alespoň 2 znaky'),
  last_name: Yup.string().required('Příjmení je povinné').min(2, 'Příjmení musí mít alespoň 2 znaky'),
  email: Yup.string().required('Email je povinný').email('Zadejte platný email'),
  bank_iban: Yup.string()
    .required('Bankovní účet je povinný')
    .matches(/^\d{1,10}\/\d{4}$/, 'IBAN musí obsahovat pouze velká písmena a číslice'),
})

export default function ContactDetail() {
  const { back, push } = useRouter()

  const filters: { label: string; value: 'all' | 'expenses' | 'settlements' }[] = [
    { label: 'Vše', value: 'all' },
    { label: 'Výdaje', value: 'expenses' },
    { label: 'Vyrovnání', value: 'settlements' },
  ]

  const [filter, setFilter] = useState<(typeof filters)[0]['value']>('all')

  const lastNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const bankAccountRef = useRef<TextInput>(null)

  const handleSubmit = (values: any) => {
    console.log('Form Data: ', values)
    back()
    // Tady bys mohl volat API nebo jinou funkci pro zpracování dat
  }

  return (
    <Layout>
      <Heading text="Detail kontaktu" showSearch={false} />
      <Widget.dept dept={302} youOwe={123} oweYou={312} style={tw('borderBlue')} />
      <Box label="Základní informace" style={tw('borderTransparent', { gap: 12 })}>
        <Formik
          initialValues={{
            first_name: 'Pepa',
            last_name: 'Zdepa',
            email: 'pepa@tst.co',
            bank_iban: '123123123/1231',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, dirty }) => (
            <>
              <Input
                name="first_name"
                label="Jméno"
                value={values.first_name}
                onChange={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                focusNext={() => lastNameRef.current?.focus()}
                error={touched.first_name && errors.first_name}
              />
              <Input
                ref={lastNameRef}
                name="last_name"
                label="Příjmení"
                value={values.last_name}
                onChange={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                focusNext={() => emailRef.current?.focus()}
                error={touched.last_name && errors.last_name}
              />
              <Input
                ref={emailRef}
                name="email"
                label="Email"
                value={values.email}
                inputProps={{ inputMode: 'email' }}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                focusNext={() => bankAccountRef.current?.focus()}
                error={touched.email && errors.email}
              />
              <Input
                ref={bankAccountRef}
                name="bank_iban"
                label="Bankovní účet"
                value={values.bank_iban}
                onChange={handleChange('bank_iban')}
                onBlur={handleBlur('bank_iban')}
                error={touched.bank_iban && errors.bank_iban}
              />
              <BottomActionBar show={true || dirty}>
                {dirty ? (
                  <Button type="primary" label="Uložit" icon={<IconCheck />} onPress={() => handleSubmit()} />
                ) : (
                  <Button type="white" label="Vyrovnat se" icon={<IconCreditCard />} onPress={() => push('/expense_add')} />
                )}
              </BottomActionBar>
            </>
          )}
        </Formik>
      </Box>
      <View style={tw('flexRow', 'wFull', { gap: 12 })}>
        {filters.map((item, i) => (
          <Badge
            key={i}
            size="medium"
            label={item.label}
            style={filter == item.value ? tw('bgLightBlue') : tw('bgWhite')}
            onPress={() => setFilter(item.value)}
          />
        ))}
      </View>
      <List label="Listopad 2024">
        <ExpenseItem label="Lidl nákup" payer={{ firstName: 'František', lastName: 'Špunda' }} amount={-412} />
        <ExpenseItem label="Lidl nákup" payer={{ firstName: 'František', lastName: 'Špunda' }} amount={-412} />
        <SettlementItem payer={{ firstName: 'Pepa', lastName: 'B' }} amount={1000} />
      </List>
      <List label="Říjen 2024">
        <ExpenseItem label="Lidl nákup" payer={{ firstName: 'František', lastName: 'Špunda' }} amount={412} />
        <ExpenseItem label="Lidl nákup" payer={{ firstName: 'František', lastName: 'Špunda' }} amount={412} />
        <SettlementItem payer={{ firstName: 'Pepa', lastName: 'Špunda' }} amount={-1000} />
      </List>
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
