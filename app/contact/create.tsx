import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Layout, Heading, Button, Box, Input, BottomActionBar, Select, SelectRef, UserImage } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { IconCheck } from '@tabler/icons-react-native'
import { useGetContactsUsers, usePostContacts } from '@/api/api.helpers'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Jméno je povinné').min(2, 'Jméno musí mít alespoň 2 znaky'),
})

export default function ContactAdd() {
  const initialValues = {
    name: '',
  }
  const [search, setSearch] = useState('')
  const [users] = useGetContactsUsers(search)

  const submitContact = usePostContacts()
  const handleSubmit = (values: typeof initialValues) => {
    const selectedUser = Number(values.name) ? users.find((user) => user.id === Number(values.name)) : null

    submitContact({ name: !Number(values.name) ? values.name : `${selectedUser?.first_name} ${selectedUser?.last_name}`, user_id: Number(values.name) || null })
  }

  return (
    <Layout scrollEnabled={false}>
      <Heading text="Přidat kontakt" showSearch={false} />
      <Box label="Základní informace" style={tw('borderBlue', { gap: 12 })}>
        <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
          {({ handleSubmit, setFieldValue, values, errors, touched, dirty }) => (
            <>
              <Select
                name="name"
                label="Jméno"
                value={values.name}
                searchable={{ value: search, creatable: true, onChange: (text) => setSearch(text) }}
                setValue={setFieldValue}
                options={users.map((user) => ({
                  value: String(user.id),
                  label: `${user.first_name} ${user.last_name}`,
                  caption: user.email,
                  image: <UserImage contact={{ name: `${user.first_name} ${user.last_name}`, user: user }} />,
                }))}
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
