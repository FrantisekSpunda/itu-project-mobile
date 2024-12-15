import { tw } from '@/utils/utils.tailwind'
import { FormikHelpers, useFormikContext } from 'formik'
import React, { forwardRef, JSXElementConstructor, ReactElement, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { TextInput, View, TouchableOpacity, ViewProps, TextInputProps, FlatList } from 'react-native'
import { ThemedText } from './ThemedText'

export type SelectOption = { label: string; value: string; image?: React.ReactNode; caption?: string }

export type SelectRef = View & { press?: any }

type SelectProps<T extends boolean> = ViewProps & {
  name: string
  label: string
  inputProps?: TextInputProps
  icon?: ReactElement<any, string | JSXElementConstructor<any>>
  multiple?: T
  searchable?: { value: string; onChange: (text: string) => void; creatable?: boolean }
  value: T extends true ? string[] : string
  options: SelectOption[]
  setValue: FormikHelpers<any>['setFieldValue']
  onBlur?: (params?: any) => any
  error?: any
  style?: any[]
  onChange?: (item: SelectOption) => any
}

export const Select = forwardRef(
  <T extends boolean>(
    { name, label, icon, value, setValue, style, onChange, searchable, options, multiple, error }: SelectProps<T>,
    globalRef: React.ForwardedRef<SelectRef>
  ) => {
    const ref = useRef<SelectRef>(null)
    useImperativeHandle(globalRef, () => ({ ...ref.current, press: () => setOptionsVisible((prev) => !prev) }) as SelectRef)

    const inputRef = useRef<TextInput>(null)

    const formik = useFormikContext<{ [key: string]: any }>()
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [filled, setFilled] = useState(false)

    const setState = useCallback(
      (focused: boolean, value?: boolean) => {
        setFilled(!!(focused || value))
        setOptionsVisible(focused)
      },
      [value]
    )

    // Change select state
    useEffect(() => {
      setState(false, !!value)
    }, [formik.initialValues[name]])

    const handleSelect = (item: SelectOption) => {
      if (onChange) onChange(item)
      if (setValue) setValue(name, multiple ? [...value, item.value] : item.value === 'custom' ? item.label : item.value)
      if (!multiple) setOptionsVisible(false)
      if (searchable) {
        searchable.onChange(item.label)
      }
      setState(false, !!item.value)
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
        const optionsFiltered =
          searchable?.value && searchable?.creatable && options.every((v) => v.label != searchable.value)
            ? [{ label: `${searchable.value}`, value: 'custom' }, ...options]
            : options
        return optionsFiltered.length ? optionsFiltered : [{ label: 'Žádné možnosti k výběru', value: 'options-empty' }]
      }
    }, [multiple, options, value, searchable?.value])

    return (
      <View ref={ref} style={[...tw('relative', 'wFull'), ...(style || [])]}>
        <TouchableOpacity
          style={tw('flexRow', 'itemsCenter', 'rounded', 'border', 'borderLightGray', 'pX3')}
          onPress={() => {
            setOptionsVisible((prev) => !prev)
            if (searchable) inputRef.current?.focus()
          }}
          activeOpacity={1}
        >
          {!!icon && React.cloneElement(icon, { style: tw('textBlack', icon.props.style, 'mR2'), strokeWidth: 2, size: 24 })}

          <View style={tw('flexCol')}>
            <ThemedText
              style={[
                ...tw('textGray', 'fontNormal'),
                ...[filled ? tw('textCaption', { paddingTop: 6, marginBottom: 2 }) : tw('textBody1', 'pT4', multiple ? 'pB1' : 'pB2')],
              ]}
            >
              {label}
            </ThemedText>
            <View
              style={[
                ...tw('pB2', 'pL0', 'textBody1', 'flexRow', 'flexWrap', 'wFull', { gap: 4 }),
                ...(filled ? (searchable?.value ? tw('pB0') : []) : tw('h0', 'pB2')),
              ]}
            >
              {multiple ? (
                (value as string[]).map((v, i) => (
                  <ThemedText type="body2" style={tw('pX2', 'pY0', 'roundedFull', 'bgLightGray', 'textBlack')} key={i} onPress={() => handleRemove(v)}>
                    {options.find((option) => option.value === v)?.label}
                  </ThemedText>
                ))
              ) : searchable ? (
                <TextInput
                  ref={inputRef}
                  onChangeText={(text) => {
                    if (value && value < text) {
                      searchable.onChange('')
                      setValue(name, '')
                    } else searchable.onChange(text)
                  }}
                  onFocus={() => {
                    setState(true)
                  }}
                  // onBlur={(e) => {
                  //   if (onBlur) onBlur(e)
                  //   setState(false)
                  //   console.log();

                  // }}
                  value={searchable.value}
                  style={[...tw('pB2', 'p0', 'pL0', 'textBody1', 'fontMedium', 'wFull'), ...(filled ? tw('pB3') : tw('h0', 'pB2'))]}
                />
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
            style={tw('flex', 'rounded', 'bgWhite', 'wFull', 'absolute', 'overflowHidden', 'z100', { top: 60, boxShadow: '0 10 10 -10 gray', zIndex: 100 })}
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
                    style={tw(
                      'flexRow',
                      'itemsCenter',
                      'pX4',
                      'pY3',
                      'borderLightGray',
                      index + 1 != options.length ? 'borderB' : {},
                      item.value === value ? 'bgLightGray' : 'bgWhite'
                    )}
                    onPress={() => handleSelect(item)}
                  >
                    {!!item.image && item.image}
                    <View style={tw('flexCol', 'h6', 'justifyCenter')}>
                      <ThemedText type="body2">{item.value === 'custom' ? `Přidat "${item.label}"` : item.label}</ThemedText>
                      {item.caption && <ThemedText type="caption">{item.caption}</ThemedText>}
                    </View>
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
