import React, { useRef, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, Select, SelectRef, Badge, List, ExpenseItem, SettlementItem, Widget } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { IconCheck, IconCreditCard } from '@tabler/icons-react-native'
import { TextInput, View } from 'react-native'
import { Contact, useGetContact, usePutContact } from '@/api'
import { AutoSubmit } from './../../components/AutoSubmit'

const validationSchema = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required('Jméno je povinné').min(2, 'Jméno musí mít alespoň 2 znaky'),
  bank_iban: Yup.string()
    .optional()
    .matches(/^\d{1,10}\/\d{4}$/, 'IBAN musí obsahovat pouze velká písmena a číslice'),
})

export default function ContactDetail() {
  const { push, back } = useRouter()
  const { contact_id } = useLocalSearchParams<{ contact_id: string }>()

  const [contact] = useGetContact(Number(contact_id))

  const bankAccountRef = useRef<TextInput>(null)

  const filters: { label: string; value: 'all' | 'expenses' | 'settlements' }[] = [
    { label: 'Vše', value: 'all' },
    { label: 'Výdaje', value: 'expenses' },
    { label: 'Vyrovnání', value: 'settlements' },
  ]

  const [filter, setFilter] = useState<(typeof filters)[0]['value']>('all')

  const handleSubmit = usePutContact(contact_id)

  if (!contact) return null

  return (
    <Layout>
      <Heading text="Detail kontaktu" showSearch={false} />
      <Widget.contact contact={contact} />
      <Box label="Základní informace" style={tw('borderTransparent', { gap: 12 })}>
        <Formik
          initialValues={{
            id: String(contact_id),
            name: contact?.name || '',
            bank_iban: '',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, dirty }) => (
            <>
              <AutoSubmit />
              <Input
                name="name"
                label="Jméno"
                value={values.name}
                inputProps={{ autoCapitalize: 'words' }}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                focusNext={() => bankAccountRef.current?.focus()}
                error={touched.name && errors.name}
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
              <BottomActionBar show={true}>
                <Button type="white" label="Vyrovnat se" icon={<IconCreditCard />} onPress={() => push('/settlement/create')} />
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
      <List label="Poslední výdaje s tímto uživatelem">
        {(contact.expenses || []).map((expense, i) =>
          expense.type === 'payment' ? <ExpenseItem key={i} expense={expense} /> : <SettlementItem key={i} expense={expense} />
        )}
      </List>
      <BottomActionBar show={contact}>
        <Button type="white" label="Vyrovnat se" icon={<IconCreditCard />} onPress={() => push(`/settlement/create/${contact.id}`)} />
      </BottomActionBar>
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
