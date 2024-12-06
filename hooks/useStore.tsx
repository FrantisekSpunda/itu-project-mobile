import React, { createContext, ReactNode, useContext, useState } from 'react'
import { GenericObject, NestedPaths, TypeFromPath } from '@/types'
import { removeProperty, getProperty, merge, setProperty } from '@/utils'

type initialStateKeys = keyof typeof initialState

type StoreContextProps = {
  store: typeof initialState
  setStore: <P extends string>(
    prop: P,
    value: TypeFromPath<typeof initialState, P> | ((value: TypeFromPath<typeof initialState, P>) => TypeFromPath<typeof initialState, P>)
  ) => void
  withStore: (dispatch: (prev: typeof initialState) => typeof initialState) => void
}

const initialState = { form: { unsavedChanges: false } } // !!!! update

const StoreContext = createContext<StoreContextProps>({
  store: initialState,
  setStore: () => {},
  withStore: () => {},
})

export const Store: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  // Create state
  const [store, setState] = useState(initialState)

  // Functions for work with STORE
  const setStore: StoreContextProps['setStore'] = React.useCallback((prop, value) => {
    setState((prev) => {
      // @ts-ignore
      if (value instanceof Function) return { ...setProperty(prop, value(getProperty(prev, prop)), prev) }
      else return { ...setProperty(prop, value, prev) }
    })
  }, [])

  const withStore = (dispatch: (prev: typeof initialState) => typeof initialState) => {
    setState(dispatch)
  }

  return <StoreContext.Provider value={{ store, setStore, withStore }}>{children}</StoreContext.Provider>
}

/**
 * * Get access to store provider
 * @returns \{ store, setStore, withStore }
 */
export const useStore = (): StoreContextProps => useContext(StoreContext)
