import { useStore } from '@/hooks'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Api } from './api.service'
import { useCallback } from 'react'
import { useRouter } from 'expo-router'
import { Balance, Contact, User } from './types'

export const useGetUser = () => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['profile', 'get'],
    queryFn: () =>
      Api.get('profile', {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
      }),
    enabled: !!store.auth.token,
  })

  const profile = response.data?.data.profile
  return [profile, response] as [typeof profile, typeof response]
}

export const usePutUser = () => {
  const { store } = useStore()
  const queryClient = useQueryClient()

  return useCallback(
    async (profile: User) => {
      const response = await Api.put('profile', profile, {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
      })

      if (response) {
        queryClient.invalidateQueries({ queryKey: ['profile'] })
      }
    },
    [store.auth.token]
  )
}

export const useGetOverviewBalance = () => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['overview/balance', 'get'],
    queryFn: () =>
      Api.get('overview/balance', {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
      }),
    enabled: !!store.auth.token,
  })

  const overviewBalance = response.data?.data
  return [overviewBalance, response] as [typeof overviewBalance, typeof response]
}

export const useGetContact = (contact_id: string | number) => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['contacts', contact_id, 'get'],
    queryFn: () =>
      Api.get(`contacts/${Number(contact_id)}`, {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
      }),
    enabled: !!store.auth.token,
  })

  const contact = response.data?.data.contact
  return [contact, response] as [typeof contact, typeof response]
}

export const usePutContact = (contact_id: string | number) => {
  const { store } = useStore()
  const queryClient = useQueryClient()

  return useCallback(
    async (contact: { name: string }) => {
      const response = await Api.put(
        `contacts/${Number(contact_id)}`,
        { name: contact.name },
        {
          headers: {
            Authorization: `Bearer ${store.auth.token}`,
          },
        }
      )

      if (response) {
        queryClient.invalidateQueries({ queryKey: ['contacts', contact_id, 'get'] })
      }
    },
    [store.auth.token]
  )
}

export const useGetContacts = (filter?: Balance['type'][]) => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['contacts', 'get', filter],
    queryFn: () =>
      Api.get('contacts', {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
        params: {
          ignoreAuthed: true,
          type: filter,
          limit: 99999,
        },
      }),
    enabled: !!store.auth.token,
  })

  const contacts = response.data?.data.contacts.data || []
  return [contacts, response] as [typeof contacts, typeof response]
}

export const useGetExpenses = () => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['expenses', 'get'],
    queryFn: () =>
      Api.get('expenses', {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
      }),
    enabled: !!store.auth.token,
  })

  const expenses = response.data?.data.data || []
  return [expenses, response] as [typeof expenses, typeof response]
}

export const usePostContacts = () => {
  const { back } = useRouter()
  const { store } = useStore()
  const queryClient = useQueryClient()

  return useCallback(
    async (contact: { name: string; user_id: null }) => {
      const response = await Api.post(
        'contacts',
        { contacts: [contact] },
        {
          headers: {
            Authorization: `Bearer ${store.auth.token}`,
          },
        }
      )

      if (response) {
        queryClient.invalidateQueries({ queryKey: ['contacts'] })
        back()
      }
    },
    [store.auth.token]
  )
}

export const usePostExpense = () => {
  const { back } = useRouter()
  const { store } = useStore()
  const queryClient = useQueryClient()

  return useCallback(
    async (expense: any) => {
      const response = await Api.post('expenses', expense, {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
      })

      if (response) {
        queryClient.invalidateQueries({ queryKey: ['get'] })
        back()
      }
    },
    [store.auth.token, back]
  )
}
