import { getColor, tw } from '@/utils/utils.tailwind'
import { useFormik, useFormikContext } from 'formik'
import React, { JSXElementConstructor, ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { TextInput, Text, View, TouchableOpacity, Keyboard, ViewProps, TextInputProps } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

type InputPros = ViewProps & {
  name: string
  label: string
  type?: TextInputProps['autoComplete']
  inputProps?: TextInputProps
  icon?: ReactElement<any, string | JSXElementConstructor<any>>
  value?: string
  onChange?: (params?: any) => any
  onBlur?: (params?: any) => any
  error?: any
}

export const Input = ({ name, type = 'off', inputProps = {}, label, icon, value, onChange, onBlur, error, ...rest }: InputPros) => {
  const ref = useRef<TextInput>(null)
  const formik = useFormikContext<{ [key: string]: any }>()
  const [filled, setFilled] = useState(false)

  // Change input state
  useEffect(() => {
    setState(false)
  }, [formik.initialValues[name]])

  // Set state of focus depending on input focus and input value
  const setState = useCallback((focused: boolean) => setFilled(focused || formik.values[name]), [formik.values[name]])

  return (
    <View {...rest} style={tw('flexCol', 'wFull', { gap: 4 })}>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss()
          ref.current?.focus()
        }}
        style={tw('flex', 'rounded', 'border', 'borderLightGray', 'pX3')}
      >
        {!!icon && React.cloneElement(icon, { style: tw('textPrimary', icon.props.style, 'mR2'), strokeWidth: 2, size: 18 })}
        <View style={tw('flexCol')}>
          <Text style={[...tw('textGray', 'fontBold'), ...[filled ? tw('textCaption', { paddingTop: 6, marginBottom: -8 }) : tw('textBody1', 'pT4', 'pB0')]]}>
            {label}
          </Text>

          <TextInput
            {...inputProps}
            ref={ref}
            value={value}
            onChangeText={onChange}
            onFocus={() => setState(true)}
            onBlur={(e) => {
              if (onBlur) onBlur(e)
              setState(false)
            }}
            style={[...tw('pB2'), ...(filled ? tw('pB3') : tw('h0', 'pB2'))]}
          />
        </View>
      </TouchableOpacity>
      {error && <Text style={tw('textCaption', 'textRed', 'fontMedium')}>{error}</Text>}
    </View>
  )
}
