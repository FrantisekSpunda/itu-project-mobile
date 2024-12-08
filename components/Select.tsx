import { tw } from '@/utils/utils.tailwind'
import { FormikHelpers, useFormikContext } from 'formik'
import React, { forwardRef, JSXElementConstructor, ReactElement, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { TextInput, Text, View, TouchableOpacity, Keyboard, ViewProps, TextInputProps, Modal, FlatList } from 'react-native'
import { ThemedText } from './ThemedText'

type SelectOption = { label: string; value: string }

type SelectProps<T extends boolean> = ViewProps & {
  name: string
  label: string
  inputProps?: TextInputProps
  icon?: ReactElement<any, string | JSXElementConstructor<any>>
  multiple?: T
  value: T extends true ? string[] : string
  options: SelectOption[]
  setValue?: FormikHelpers<any>['setFieldValue']
  onBlur?: (params?: any) => any
  error?: any
}

export const Select = forwardRef(
  <T extends boolean>({ name, label, icon, value, setValue, onBlur, options, multiple, error }: SelectProps<T>, globalRef: React.ForwardedRef<TextInput>) => {
    const ref = useRef<TextInput>(null)

    useImperativeHandle(globalRef, () => ref.current as TextInput)

    const [optionsVisible, setOptionsVisible] = useState(false)

    const handleSelect = (item: SelectOption) => {
      console.log(multiple)
      if (setValue) setValue(name, multiple ? [...value, item.value] : item.value)
      setOptionsVisible(false)
    }

    useEffect(() => {
      console.log(!!String(value))
    }, [value])

    return (
      <View style={tw('relative')}>
        <TouchableOpacity
          style={tw('flexRow', 'itemsCenter', 'rounded', 'border', 'borderLightGray', 'pX3')}
          onPress={() => {
            setOptionsVisible(true)
          }}
          activeOpacity={1}
        >
          {!!icon && React.cloneElement(icon, { style: tw('textBlack', icon.props.style, 'mR2'), strokeWidth: 2, size: 24 })}

          <View style={tw('flexCol')}>
            <ThemedText
              style={[
                ...tw('textGray', 'fontNormal'),
                ...[String(value) ? tw('textCaption', { paddingTop: 6, marginBottom: 2 }) : tw('textBody1', 'pT4', 'pB1')],
              ]}
            >
              {label}
            </ThemedText>
            <View style={[...tw('pB2', 'pL0', 'textBody1', 'flexRow', 'flexWrap', { gap: 4 }), ...(value ? tw('pB3') : tw('h0', 'pB2'))]}>
              {multiple
                ? (value as string[]).map((v, i) => (
                    <ThemedText type="body2" style={tw('pX2', 'pY0', 'roundedFull', 'bgLightGray', 'textBlack')} key={i}>
                      {options.find((option) => option.value === v)?.label}
                    </ThemedText>
                  ))
                : options.find((option) => option.value === value)?.label || ''}
            </View>
          </View>
        </TouchableOpacity>

        {error && (
          <ThemedText type="caption" style={tw('textRed')}>
            {error}
          </ThemedText>
        )}
        {optionsVisible && (
          <View style={tw('flex', 'rounded', 'bgWhite', 'wFull', 'absolute', { top: 60, boxShadow: '0 10 100 -50 gray' })}>
            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={false}
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={tw('pX4', 'pY3', 'borderLightGray', index + 1 != options.length ? 'borderB' : {})} onPress={() => handleSelect(item)}>
                  <ThemedText>{item.label}</ThemedText>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    )
  }
)
