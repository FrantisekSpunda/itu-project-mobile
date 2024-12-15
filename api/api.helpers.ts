import { useStore } from '@/hooks'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Api } from './api.service'
import { useCallback } from 'react'
import { router, useRouter } from 'expo-router'
import { Balance, Contact, User } from './types'
import { objectToFormData } from '@/utils'

export const useGetUser = () => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['get', 'profile'],
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
        queryClient.invalidateQueries({
          queryKey: ['get'],
        })
      }
    },
    [store.auth.token]
  )
}

export const useGetOverviewBalance = () => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['get', 'overview/balance'],
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
    queryKey: ['get', 'contacts', contact_id],
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
    async (contact: any) => {
      const response = await Api.put(`contacts/${Number(contact_id)}`, contact, {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
      })

      if (response) {
        queryClient.invalidateQueries({
          queryKey: ['get'],
        })
      }
    },
    [store.auth.token]
  )
}

export const useGetContacts = ({ ignoreAuthed = true, filter }: { ignoreAuthed?: boolean; filter?: Balance['type'][] } = {}) => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['get', 'contacts', filter, ignoreAuthed],
    staleTime: 0,
    queryFn: () =>
      Api.get('contacts', {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
        params: {
          ...(ignoreAuthed ? { ignoreAuthed: true } : {}),
          type: filter,
          limit: 99999,
        },
      }),
    enabled: !!store.auth.token,
  })

  const contacts = response.data?.data.contacts.data || []
  return [contacts, response] as [typeof contacts, typeof response]
}

export const useGetContactsUsers = (search: string) => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['get', 'contacts', 'users', search],
    queryFn: () =>
      Api.get('contacts/users', {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
        params: {
          ignoreAuthed: true,
          search,
        },
      }),
    enabled: !!store.auth.token,
  })

  const users = response.data?.data.users.data || []
  return [users, response] as [typeof users, typeof response]
}

export const useGetExpenses = (type?: 'all' | 'payment' | 'settlement', search?: string) => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['get', 'expenses', type, search],
    staleTime: 0,
    queryFn: () =>
      Api.get('expenses', {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
        params: {
          type: type === 'all' ? '' : type,
          search: search || '',
        },
      }),
    enabled: !!store.auth.token,
  })

  const expenses = response.data?.data.data || []
  return [expenses, response] as [typeof expenses, typeof response]
}

export const useGetExpense = (expense_id: number) => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['get', 'expenses', expense_id],
    queryFn: () =>
      Api.get(`expenses/${expense_id}`, {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
        },
        params: { expense_id },
      }),
    enabled: !!store.auth.token,
  })

  const expense = response.data?.data.expense
  return [expense, response] as [typeof expense, typeof response]
}

export const usePostSettlementsPreview = (contact_id: number) => {
  const { store } = useStore()

  const response = useQuery({
    queryKey: ['post', 'settlements/preview'],
    queryFn: () =>
      Api.post(
        'settlements/preview',
        { contact_id: contact_id },
        {
          headers: {
            Authorization: `Bearer ${store.auth.token}`,
          },
        }
      ),
    enabled: !!store.auth.token,
  })

  const settlementPreview = response.data?.data
  return [settlementPreview, response] as [typeof settlementPreview, typeof response]
}

export const usePostSettlementsMarkAsPaid = () => {
  const { back } = useRouter()
  const { store } = useStore()
  const queryClient = useQueryClient()

  return useCallback(
    async (contact_id: number) => {
      const response = await Api.post(
        'settlements/mark-as-paid',
        { contact_id },
        {
          headers: {
            Authorization: `Bearer ${store.auth.token}`,
          },
        }
      )

      if (response) {
        queryClient.invalidateQueries({
          queryKey: ['get'],
        })
        back()
      }
    },
    [store.auth.token]
  )
}

export const usePostContacts = () => {
  const { back } = useRouter()
  const { store } = useStore()
  const queryClient = useQueryClient()

  return useCallback(
    async (contact: { name: string | null; user_id: number | null }) => {
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
        queryClient.invalidateQueries({
          queryKey: ['get'],
        })
        router.replace(`/contact/${response.data.contacts[0].id}`)
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
      // const formData = objectToFormData(expense)

      const response = await Api.post('expenses', expense, {
        headers: {
          Authorization: `Bearer ${store.auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      queryClient.invalidateQueries({
        queryKey: ['get'],
      })

      if (response) {
        back()
      }
    },
    [store.auth.token, back]
  )
}
