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
import { SettlementItem } from './SettlementItem'

export const SearchModal = () => {
  const { store, setStore } = useStore()
  const ref = useRef<TextInput>(null)

  const handleSubmit = () => {}

  const spaceFromTop = 128

  return (
    <Modal
      visible={store.modal.search}
      animationType="slide"
      onRequestClose={() => setStore('modal.search', false)}
      transparent
      onShow={() => ref.current?.focus()}
    >
      <View onTouchEnd={() => setStore('modal.search', false)} style={tw('wFull', 'bgGray', { top: 0, left: 0, opacity: 0.6, height: spaceFromTop })}></View>
      <Box style={tw('hFull', { height: '100%' })}>
        <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur }) => (
            <Input ref={ref} name="search" label="Vyhledávání" icon={<IconSearch />} onChange={handleChange('search')} onBlur={handleBlur('search')} />
          )}
        </Formik>
        <ScrollView style={tw('h0', 'overflowHidden', 'flexCol', 'mB48', 'mT2')}></ScrollView>
        <Button
          type="primary"
          style={tw('absolute', { bottom: spaceFromTop + 16, right: 16 })}
          label="Zpět"
          icon={<IconArrowLeft style={tw('textBlack')} color="white" />}
          onPress={() => setStore('modal.search', false)}
        />
      </Box>
    </Modal>
  )
}
