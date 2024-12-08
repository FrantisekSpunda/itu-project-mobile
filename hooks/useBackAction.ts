import { useEffect } from 'react'
import { Alert, BackHandler } from 'react-native'

export const useBackAction = (backAction: () => any) => {
  useEffect(() => {
    const backActionHandler = () => {
      backAction()
      return true
    }

    BackHandler.addEventListener('hardwareBackPress', backActionHandler)

    return () => BackHandler.removeEventListener('hardwareBackPress', backActionHandler)
  }, [])
}
