import { tw } from '@/utils'
import { Easing, KeyboardAvoidingView, Modal, Platform, ScrollView, TextInput, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Box } from './Box'
import { Input } from './Input'
import { Formik } from 'formik'
import { useStore } from '@/hooks'
import { Button } from './Button'
import { ExpenseItem } from './ExpenseItem'
import { IconArrowLeft, IconSearch } from '@tabler/icons-react-native'
import { useEffect, useRef, useState } from 'react'

export const SearchModal = () => {
  const { store, setStore } = useStore()
  const ref = useRef<TextInput>(null)

  const handleSubmit = () => {}

  const spaceFromTop = 128

  useEffect(() => {
    const timeout = setTimeout(() => ref.current?.focus(), 100)

    return () => clearTimeout(timeout)
  }, [store.modal.search])

  if (!store.modal.search) return null

  return (
    <KeyboardAvoidingView
      style={tw('flexCol', 'absolute', 'z10', 'hFull', 'wFull', { top: 0, left: 0, height: '100%' })}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <Modal transparent visible={store.modal.search} animationType="slide" onRequestClose={() => setStore('modal.search', false)}>
        <View onTouchStart={() => setStore('modal.search', false)} style={tw('absolute', 'wFull', 'hFull', 'bgGray', { top: 0, left: 0, opacity: 0.6 })}></View>
        <Box style={tw('absolute', 'hFull', { top: spaceFromTop })}>
          <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur }) => (
              <>
                <Input ref={ref} name="search" label="Vyhledávání" icon={<IconSearch />} onChange={handleChange('search')} onBlur={handleBlur('search')} />

                <ScrollView style={tw('h0', 'overflowHidden', 'flexCol', 'mB48', 'mT2')}>
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={123324} />
                  <ExpenseItem label="Lidl nákup" payer={{ firstName: 'Matěj', lastName: 'Křenek' }} amount={-32} />
                </ScrollView>
              </>
            )}
          </Formik>
          <Button
            type="primary"
            style={tw('absolute', { bottom: spaceFromTop + 16, right: 16 })}
            label="Zpět"
            icon={<IconArrowLeft style={tw('textBlack')} color="white" />}
            onPress={() => setStore('modal.search', false)}
          />
        </Box>
      </Modal>
    </KeyboardAvoidingView>
  )
}
