import React, { useCallback, useMemo, useRef } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, Select, SelectRef } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useRouter } from 'expo-router'
import { IconCheck } from '@tabler/icons-react-native'
import { TextInput } from 'react-native'
import { Api } from '@/api'
import { useStore } from '@/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { usePostContacts } from '@/api/api.helpers'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Jméno je povinné').min(2, 'Jméno musí mít alespoň 2 znaky'),
})

export default function ContactAdd() {
  const initialValues = {
    name: '',
    user_id: null,
  }
  const handleSubmit = usePostContacts()

  return (
    <Layout scrollEnabled={false}>
      <Heading text="Přidat kontakt" showSearch={false} />
      <Box label="Základní informace" style={tw('borderBlue', { gap: 12 })}>
        <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, dirty }) => (
            <>
              <Input
                name="name"
                label="Jméno"
                value={values.name}
                inputProps={{ autoFocus: true, autoCapitalize: 'words', onSubmitEditing: () => handleSubmit() }}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name}
              />
              <BottomActionBar show={dirty}>
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
