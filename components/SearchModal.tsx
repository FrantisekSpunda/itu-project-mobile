import { tw } from '@/utils'
import { Easing, KeyboardAvoidingView, Modal, Platform, ScrollView, TextInput, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Box } from './Box'
import { Input } from './Input'
import { Formik } from 'formik'
import { useStore } from '@/hooks'
import { Button } from './Button'
import { ExpenseItem } from './ExpenseItem'
import { IconArrowLeft, IconSearch } from '@tabler/icons-react-native'
import { Dispatch, useEffect, useRef, useState } from 'react'
import { SettlementItem } from './SettlementItem'
import { AutoSubmit } from './AutoSubmit'
import { useGetExpense, useGetExpenses } from '@/api'
import { List } from './List'

type SearchModalProps = {
  show: boolean
  setShow: Dispatch<boolean>
}

export const SearchModal = ({ show, setShow }: SearchModalProps) => {
  const ref = useRef<TextInput>(null)

  const [search, setSearch] = useState('')
  const handleSubmit = (values: { search: string }) => {
    setSearch(values.search)
  }
  const [expenses] = useGetExpenses('all', search)

  const spaceFromTop = 128

  return (
    <Modal visible={show} animationType="slide" onRequestClose={() => setShow(false)} transparent onShow={() => ref.current?.focus()}>
      <View onTouchEnd={() => setShow(false)} style={tw('wFull', 'bgGray', { top: 0, left: 0, opacity: 0.6, height: spaceFromTop })}></View>
      <Box style={tw('hFull', { height: '100%' })}>
        <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur }) => (
            <>
              <AutoSubmit />
              <Input ref={ref} name="search" label="Vyhledávání" icon={<IconSearch />} onChange={handleChange('search')} onBlur={handleBlur('search')} />
            </>
          )}
        </Formik>
        <ScrollView style={tw('h0', 'overflowHidden', 'flexCol', 'mB48', 'mT2')}>
          <List>
            {expenses.map((expense, i) =>
              expense.type === 'payment' ? <ExpenseItem key={i} expense={expense} /> : <SettlementItem key={i} expense={expense} />
            )}
          </List>
        </ScrollView>
        <Button
          type="primary"
          style={tw('absolute', { bottom: spaceFromTop + 16, right: 16 })}
          label="Zpět"
          icon={<IconArrowLeft style={tw('textBlack')} color="white" />}
          onPress={() => setShow(false)}
        />
      </Box>
    </Modal>
  )
}
