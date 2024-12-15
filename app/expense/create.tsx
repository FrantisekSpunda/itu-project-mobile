import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, Select, SelectRef, ThemedText, UserImage, Badge, FlashMessage } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik, FormikContextType, useFormikContext } from 'formik'
import { useRouter } from 'expo-router'
import {
  IconCheck,
  IconCoins,
  IconExclamationCircleFilled,
  IconFilePencil,
  IconHeading,
  IconPencil,
  IconPlus,
  IconSwitch,
  IconTrash,
  IconUserDollar,
  IconX,
} from '@tabler/icons-react-native'
import { Modal, ScrollView, TextInput, View, Image, TouchableOpacity } from 'react-native'
import { useGetContacts, useGetUser, usePostExpense } from '@/api/api.helpers'
import { formatPrice } from '@/utils'
import { useStore } from '@/hooks'

const validationSchema = Yup.object().shape({})

export type DeptorValue = { deptor_id: string; price: string }

const StoreForm = () => {
  const { values } = useFormikContext()
  const { setStore } = useStore()

  useEffect(() => {
    setStore('form.expenseCreate', values as any)
  }, [values])

  return null
}

export default function ExpenseAdd() {
  const { back } = useRouter()

  const priceRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)
  const deptorsRef = useRef<View>(null)
  const payerRef = useRef<SelectRef>(null)

  const [deptorsModal, setDeptorsModal] = useState(false)

  const { store, setStore } = useStore()

  const postExpense = usePostExpense()
  const handleSubmit = (values: any) => {
    setStore('form.expenseCreate', {
      title: '',
      price: '',
      description: '',
      is_draft: false,
      payer_id: '',
      deptors: [] as DeptorValue[],
      currency_id: 1,
    })
    postExpense(values)
  }

  const [contacts] = useGetContacts({ ignoreAuthed: false })
  const contactsOption =
    contacts.map((contact) => ({
      label: contact.name,
      caption: contact?.user?.email,
      image: <UserImage contact={contact} size="small" />,
      value: String(contact.id),
    })) || []

  const initialValues = useMemo(() => store.form.expenseCreate, [])

  const onCloseModal = (values: typeof initialValues) => {
    if (!values.deptors.every((deptor) => deptor.deptor_id && String(deptor.price)))
      setStore('flashMessage', {
        show: true,
        style: tw('bgRed'),
        content: (
          <View style={tw('flexRow', 'itemsCenter', 'p4', { gap: 12 })}>
            <IconExclamationCircleFilled size={24} fill="white" />
            <ThemedText style={tw('textWhite')}>Vyplňte všechna pole</ThemedText>
          </View>
        ),
      })
    else if (!(values.deptors.reduce((sum: number, deptor) => sum + Number(deptor.price), 0) === Number(values.price)))
      setStore('flashMessage', {
        show: true,
        style: tw('bgRed'),
        content: (
          <View style={tw('flexRow', 'itemsCenter', 'p4', { gap: 12 })}>
            <IconExclamationCircleFilled size={24} fill="white" />
            <ThemedText style={tw('textWhite')}>Cena výdaje musí být stejná jako součet podílu dlužníků</ThemedText>
          </View>
        ),
      })
    else setDeptorsModal(false)
  }

  return (
    <Layout scrollEnabled={false}>
      <Heading text="Přidat výdaj" showSearch={false} />
      <Box label="Detail Výdaje" style={tw({ gap: 12 })}>
        <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, errors, touched, dirty }) => (
            <>
              <StoreForm />
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
                  setDeptorsModal(true)
                }}
                value={values.price}
                icon={<IconCoins />}
                onChange={handleChange('price')}
                onBlur={handleBlur('price')}
                error={touched.price && errors.price}
              />
              <View
                ref={deptorsRef}
                style={tw('wFull', 'rounded', 'border', 'borderLightGray')}
                onTouchEnd={() => {
                  setDeptorsModal(true)
                }}
              >
                <View style={tw('wFull', 'flexRow', 'p2')}>
                  <View style={tw('w3_4')}>
                    <ThemedText type="caption">Dlužník</ThemedText>
                    {values.deptors
                      .filter((deptor) => deptor.deptor_id)
                      .map((deptor, i) => (
                        <ThemedText key={i}>{contactsOption.find((option) => option.value == deptor.deptor_id)?.label || ''}</ThemedText>
                      ))}
                  </View>
                  <View style={tw('w1_4')}>
                    <ThemedText type="caption">Cena</ThemedText>
                    {values.deptors
                      .filter((deptor) => deptor.price)
                      .map((deptor, i) => (
                        <ThemedText key={i}>{formatPrice(Number(deptor.price))}</ThemedText>
                      ))}
                  </View>
                </View>

                <View style={tw('flexRow', 'justifyEnd', 'borderT', 'borderLightGray', 'p3')}>
                  <Button label="Upravit" icon={<IconPencil />} type="transparent" />
                </View>
              </View>
              <Modal visible={deptorsModal} animationType="slide" onRequestClose={() => onCloseModal(values)} transparent style={tw('relative')}>
                <View onTouchEnd={() => onCloseModal(values)} style={tw('wFull', 'bgGray', { top: 0, left: 0, opacity: 0.6, height: 128 })} />
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
                          options={contactsOption.filter(
                            (contact) =>
                              contact.value === values.deptors[i].deptor_id || !values.deptors.map((value) => value.deptor_id).includes(contact.value)
                          )}
                        />
                        <Input
                          style={tw('w1_3')}
                          name={`deptors[${i}]price`}
                          label="Částka"
                          inputProps={{ inputMode: 'decimal' }}
                          value={values.deptors[i].price}
                          onChange={handleChange(`deptors[${i}]price`)}
                          onBlur={handleBlur(`deptors[${i}]price`)}
                          error={touched.price && errors.price}
                        />
                        <TouchableOpacity
                          style={tw({ width: 30, height: 30 }, 'flex', 'itemsCenter', 'justifyCenter', 'roundedFull', 'bgLightGray')}
                          onPress={() =>
                            setFieldValue(
                              'deptors',
                              values.deptors.filter((_, index) => index != i)
                            )
                          }
                        >
                          <IconTrash size={18} style={tw('textBlack')} />
                        </TouchableOpacity>
                      </View>
                    ))}
                    <View style={tw('flexRow', 'mB3', { gap: 12 })}>
                      <Badge size="small" label={`Cena výdaje: ${formatPrice(Number(values.price))}`} />
                      <Badge size="small" label={`Součet: ${formatPrice(values.deptors.reduce((sum: any, deptor) => sum + Number(deptor.price), 0))}`} />
                    </View>
                    <View style={tw('flexRow', 'justifyEnd', 'borderT', 'borderLightGray', 'pT3', { gap: 8 })}>
                      <Button
                        label="Rozdělit rovnoměrně"
                        icon={<IconSwitch />}
                        type="white"
                        onPress={() => {
                          values.deptors.forEach((_, i) => {
                            if (i == 0)
                              setFieldValue(
                                `deptors[${i}]price`,
                                String(Number(values.price) - (values.deptors.length - 1) * Math.floor(Number(values.price) / values.deptors.length))
                              )
                            else setFieldValue(`deptors[${i}]price`, String(Math.floor(Number(values.price) / values.deptors.length)))
                          })
                        }}
                      />
                      <Button
                        label="Přidat"
                        icon={<IconPlus />}
                        type="primary"
                        onPress={() =>
                          setFieldValue('deptors', [
                            ...values.deptors,
                            {
                              price: '',
                              deptor_id: '',
                            },
                          ])
                        }
                      />
                    </View>
                  </ScrollView>
                  <View style={tw('flexRow', 'justifyEnd', 'pY3', 'pX8', 'wFull', 'absolute', { bottom: 128, right: 0, gap: 16 })}>
                    <Button label="Zavřít" icon={<IconX />} type="white" onPress={() => onCloseModal(values)} />
                  </View>
                </Box>
                <FlashMessage />
              </Modal>
              <Select
                ref={payerRef}
                name="payer_id"
                label="Zadejte plátce"
                setValue={setFieldValue}
                icon={<IconUserDollar />}
                value={values.payer_id}
                options={contactsOption}
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
              <BottomActionBar show={values}>
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
