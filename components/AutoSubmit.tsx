import { useFormikContext } from 'formik'
import { useEffect } from 'react'

/*
  This component is used to automatically submit the form when the form is valid
  and has been changed(dirty).
 */
export const AutoSubmit = () => {
  const { isValid, values, dirty, submitForm } = useFormikContext()

  useEffect(() => {
    if (isValid && dirty) {
      void submitForm()
    }
  }, [isValid, values, dirty, submitForm])

  return null
}
