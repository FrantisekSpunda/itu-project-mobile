import { tw } from '@/utils/utils.tailwind'
import { FormikHelpers, useFormikContext } from 'formik'
import React, { forwardRef, JSXElementConstructor, ReactElement, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { TextInput, Text, View, TouchableOpacity, Keyboard, ViewProps, TextInputProps, Modal, FlatList } from 'react-native'
import { ThemedText } from './ThemedText'

type SelectOption = { label: string; value: string }

type SelectProps = ViewProps & {
  name: string
  label: string
  inputProps?: TextInputProps
  icon?: ReactElement<any, string | JSXElementConstructor<any>>
  value?: string
  options: SelectOption[]
  setValue?: FormikHelpers<any>['setFieldValue']
  onBlur?: (params?: any) => any
  error?: any
}

export const Select = ({ name, label, icon, value, setValue, onBlur, options }: SelectProps) => {
  const [optionsVisible, setOptionsVisible] = useState(false)

  const handleSelect = (item: SelectOption) => {
    if (setValue) setValue(name, item.value)
    setOptionsVisible(false)
  }

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <View style={tw('relative')}>
      <TouchableOpacity style={tw('flex', 'rounded', 'border', 'borderLightGray', 'pX3')} onPress={() => setOptionsVisible(true)}>
        <ThemedText style={[...tw('textGray', 'fontBold'), ...[value ? tw('textCaption', { paddingTop: 6 }) : tw('textBody1', 'pT4')]]}>{label}</ThemedText>
        <ThemedText type="body1" style={[...tw('pB2', 'fontMedium'), ...(value ? tw('pB3') : tw('h0', 'pB2'))]}>
          {options.find((option) => option.value === value)?.label || ''}
        </ThemedText>
      </TouchableOpacity>
      {optionsVisible && (
        <View style={tw('flex', 'rounded', 'justifyCenter', 'itemsCenter', 'p2', 'absolute', { top: 30 })}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <ThemedText>{item.label}</ThemedText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  )
}
