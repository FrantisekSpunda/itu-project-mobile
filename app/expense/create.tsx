import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, Select, SelectRef, ThemedText } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useRouter } from 'expo-router'
import {
  IconCheck,
  IconCoins,
  IconEdit,
  IconFilePencil,
  IconHeading,
  IconPencil,
  IconPlus,
  IconUser,
  IconUserDollar,
  IconUsers,
  IconX,
} from '@tabler/icons-react-native'
import { Modal, ScrollView, TextInput, View } from 'react-native'
import { useGetContacts, usePostExpense } from '@/api/api.helpers'

const validationSchema = Yup.object().shape({})

type DeptorValue = { deptor_id: string; price: string }

export default function ExpenseAdd() {
  const { back } = useRouter()

  const priceRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)
  const deptorsRef = useRef<SelectRef>(null)
  const payerRef = useRef<SelectRef>(null)

  const [deptors, setDeptors] = useState({
    show: false,
  })

  const handleSubmit = usePostExpense()

  const contactOptions = useGetContacts()[0]?.map((contact) => ({ label: contact.name, value: String(contact.id) })) || []

  return (
    <Layout scrollEnabled={false}>
      <Heading text="Přidat výdaj" showSearch={false} />
      <Box label="Detail Výdaje" style={tw({ gap: 12 })}>
        <Formik
          initialValues={{
            title: '',
            price: '',
            description: '',
            is_draft: false,
            payer_id: '',
            deptors: [] as DeptorValue[],
            currency_id: 1,
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
                  payerRef.current?.press()
                }}
                value={values.price}
                icon={<IconCoins />}
                onChange={handleChange('price')}
                onBlur={handleBlur('price')}
                error={touched.price && errors.price}
              />
              <Select
                ref={payerRef}
                name="payer_id"
                label="Zadejte plátce"
                setValue={setFieldValue}
                icon={<IconUserDollar />}
                value={values.payer_id}
                options={contactOptions}
              />
              <View
                style={tw('wFull', 'rounded', 'border', 'borderLightGray')}
                onTouchEnd={() => {
                  setDeptors((prev) => ({ ...prev, show: true }))
                  if (!values.deptors.length) setFieldValue('deptors', [...values.deptors, { price: '', deptor_id: '' }])
                }}
              >
                <View style={tw('wFull', 'flexRow', 'p2')}>
                  <View style={tw('w3_4')}>
                    <ThemedText type="caption">Dlužník</ThemedText>
                    {values.deptors.map((deptor, i) => (
                      <ThemedText key={i}>{contactOptions.find((option) => option.value == deptor.deptor_id)?.label || ''}</ThemedText>
                    ))}
                  </View>
                  <View style={tw('w1_4')}>
                    <ThemedText type="caption">Cena</ThemedText>
                    {values.deptors.map((deptor, i) => (
                      <ThemedText key={i}>{deptor.price}</ThemedText>
                    ))}
                  </View>
                </View>

                <View style={tw('flexRow', 'justifyEnd', 'borderT', 'borderLightGray', 'p3')}>
                  <Button label="Upravit" icon={<IconPencil />} type="transparent" />
                </View>
              </View>
              <Modal
                visible={deptors.show}
                animationType="slide"
                onRequestClose={() => setDeptors((prev) => ({ ...prev, show: false }))}
                transparent
                style={tw('relative')}
              >
                <View
                  onTouchEnd={() => setDeptors((prev) => ({ ...prev, show: false }))}
                  style={tw('wFull', 'bgGray', { top: 0, left: 0, opacity: 0.6, height: 128 })}
                />
                <Box style={tw('hFull', { gap: 12 })}>
                  <ThemedText type="heading2">Přidat dlužníky</ThemedText>
                  <ScrollView>
                    {values.deptors.map((_, i) => (
                      <View key={i} style={tw('flexRow', 'relative', 'itemsCenter', 'mB3', { gap: 12, width: '100%' })}>
                        <Select
                          style={tw('w1_2')}
                          name={`deptors[${i}]deptor_id`}
                          label="Dlužník"
                          setValue={setFieldValue}
                          icon={<IconUserDollar />}
                          value={values.deptors[i].deptor_id}
                          options={contactOptions.filter(
                            (contact) =>
                              contact.value === values.deptors[i].deptor_id || !values.deptors.map((value) => value.deptor_id).includes(contact.value)
                          )}
                        />
                        <Input
                          style={tw('w1_3')}
                          name={`deptors[${i}]price`}
                          label="Částka"
                          inputProps={{ inputMode: 'numeric' }}
                          value={values.deptors[i].price}
                          onChange={handleChange(`deptors[${i}]price`)}
                          onBlur={handleBlur(`deptors[${i}]price`)}
                          error={touched.price && errors.price}
                        />
                        <IconX
                          size={24}
                          style={tw('textRed')}
                          onPress={() =>
                            setFieldValue(
                              'deptors',
                              values.deptors.filter((_, index) => index != i)
                            )
                          }
                        />
                      </View>
                    ))}
                  </ScrollView>
                  <View style={tw('flexRow', 'justifyEnd', 'pY3', 'pX8', 'wFull', 'absolute', { bottom: 128, right: 0, gap: 16 })}>
                    <Button label="Zavřít" icon={<IconX />} type="white" onPress={() => setDeptors({ show: false })} />
                    <Button
                      label="Přidat dlužníka"
                      icon={<IconPlus />}
                      type="primary"
                      onPress={() => setFieldValue('deptors', [...values.deptors, { price: '', deptor_id: '' }])}
                    />
                  </View>
                </Box>
              </Modal>
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
