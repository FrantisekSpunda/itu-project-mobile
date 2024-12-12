import { tw } from '@/utils/utils.tailwind'
import { FormikHelpers, useFormikContext } from 'formik'
import React, { forwardRef, JSXElementConstructor, ReactElement, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { TextInput, Text, View, TouchableOpacity, Keyboard, ViewProps, TextInputProps, Modal, FlatList } from 'react-native'
import { ThemedText } from './ThemedText'

type SelectOption = { label: string; value: string }

export type SelectRef = View & { press?: any }

type SelectProps<T extends boolean> = ViewProps & {
  name: string
  label: string
  inputProps?: TextInputProps
  icon?: ReactElement<any, string | JSXElementConstructor<any>>
  multiple?: T
  value: T extends true ? string[] : string
  options: SelectOption[]
  setValue: FormikHelpers<any>['setFieldValue']
  onBlur?: (params?: any) => any
  error?: any
  style?: any[]
}

export const Select = forwardRef(
  <T extends boolean>(
    { name, label, icon, value, setValue, style, onBlur, options, multiple, error }: SelectProps<T>,
    globalRef: React.ForwardedRef<SelectRef>
  ) => {
    const ref = useRef<SelectRef>(null)

    const [optionsVisible, setOptionsVisible] = useState(false)
    useImperativeHandle(globalRef, () => ({ ...ref.current, press: () => setOptionsVisible((prev) => !prev) }) as SelectRef)

    const handleSelect = (item: SelectOption) => {
      if (setValue) setValue(name, multiple ? [...value, item.value] : item.value)
      if (!multiple) setOptionsVisible(false)
    }

    const handleRemove = (item: string) => {
      if (multiple) {
        setValue(
          name,
          (value as string[]).filter((v) => v !== item)
        )
      }
    }

    const optionsEdited = useMemo(() => {
      if (multiple) {
        const optionsFiltered = options.filter((option) => !(value as string[]).find((v) => v === option.value))
        if (optionsFiltered.length) return optionsFiltered
        return [{ label: 'Žádné možnosti k výběru', value: 'options-empty' }]
      } else {
        return options
      }
    }, [multiple, options, value])

    return (
      <View style={[...tw('relative', 'wFull'), ...(style || [])]}>
        <TouchableOpacity
          ref={ref}
          style={tw('flexRow', 'itemsCenter', 'rounded', 'border', 'borderLightGray', 'pX3')}
          onPress={() => {
            setOptionsVisible((prev) => !prev)
          }}
          activeOpacity={1}
        >
          {!!icon && React.cloneElement(icon, { style: tw('textBlack', icon.props.style, 'mR2'), strokeWidth: 2, size: 24 })}

          <View style={tw('flexCol')}>
            <ThemedText
              style={[
                ...tw('textGray', 'fontNormal'),
                ...[String(value) ? tw('textCaption', { paddingTop: 6, marginBottom: 2 }) : tw('textBody1', 'pT4', multiple ? 'pB1' : 'pB2')],
              ]}
            >
              {label}
            </ThemedText>
            <View style={[...tw('pB2', 'pL0', 'textBody1', 'flexRow', 'flexWrap', 'wFull', { gap: 4 }), ...(String(value) ? tw('pB3') : tw('h0', 'pB2'))]}>
              {multiple ? (
                (value as string[]).map((v, i) => (
                  <ThemedText type="body2" style={tw('pX2', 'pY0', 'roundedFull', 'bgLightGray', 'textBlack')} key={i} onPress={() => handleRemove(v)}>
                    {options.find((option) => option.value === v)?.label}
                  </ThemedText>
                ))
              ) : (
                <ThemedText>{options.find((option) => option.value === value)?.label || ''}</ThemedText>
              )}
            </View>
          </View>
        </TouchableOpacity>

        {error && (
          <ThemedText type="caption" style={tw('textRed')}>
            {error}
          </ThemedText>
        )}
        {optionsVisible && (
          <View
            style={tw('flex', 'rounded', 'bgWhite', 'wFull', 'absolute', 'overflowHidden', 'z100', { top: 60, boxShadow: '0 10 100 -50 gray', zIndex: 100 })}
          >
            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={false}
              data={optionsEdited}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item, index }) =>
                item.value === 'options-empty' ? (
                  <ThemedText style={tw('textCenter', 'pY6')}>{item.label}</ThemedText>
                ) : (
                  <TouchableOpacity
                    style={tw('pX4', 'pY3', 'borderLightGray', index + 1 != options.length ? 'borderB' : {}, item.value === value ? 'bgLightGray' : 'bgWhite')}
                    onPress={() => handleSelect(item)}
                  >
                    <ThemedText>{item.label}</ThemedText>
                  </TouchableOpacity>
                )
              }
            />
          </View>
        )}
      </View>
    )
  }
)
