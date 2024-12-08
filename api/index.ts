// import { User, Expense, Contact } from './types'

// const API_URL = 'http://192.168.1.127:3000'

// // Funkce pro získání všech výdajů
// export const getExpenses = async (userId: number) => {
//   try {
//     const response = await fetch(`${API_URL}/expenses`)
//     if (!response.ok) throw new Error('Error fetching expenses')

//     return ((await response.json()) as Expense[]).filter((expense) => expense.deptors_ids.includes(userId))
//   } catch (error) {
//     console.error('Error fetching expenses:', error)
//     return []
//   }
// }

// // Funkce pro získání detailu konkrétního výdaje
// export const getExpense = async (id: number) => {
//   try {
//     const response = await fetch(`${API_URL}/expenses/${id}`)
//     if (!response.ok) throw new Error('Error fetching expense')
//     return await response.json()
//   } catch (error) {
//     console.error('Error fetching expense:', error)
//     return null
//   }
// }

// // Funkce pro vytvoření nového výdaje
// export const createExpense = async (expense: any) => {
//   try {
//     const response = await fetch(`${API_URL}/expenses`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(expense),
//     })

//     if (!response.ok) throw new Error('Error creating expense')
//     return await response.json()
//   } catch (error) {
//     console.error('Error creating expense:', error)
//     return null
//   }
// }

// // Funkce pro aktualizaci existujícího výdaje
// export const updateExpense = async (id: number, updatedExpense: any) => {
//   try {
//     const response = await fetch(`${API_URL}/expenses/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedExpense),
//     })
//     if (!response.ok) throw new Error('Error updating expense')
//     return await response.json()
//   } catch (error) {
//     console.error('Error updating expense:', error)
//     return null
//   }
// }

// // Funkce pro odstranění výdaje
// export const removeExpense = async (id: number) => {
//   try {
//     const response = await fetch(`${API_URL}/expenses/${id}`, {
//       method: 'DELETE',
//     })
//     if (!response.ok) throw new Error('Error deleting expense')
//     return { id }
//   } catch (error) {
//     console.error('Error deleting expense:', error)
//     return null
//   }
// }

// // Funkce pro získání všech kontaktů
// export const getContacts = async () => {
//   try {
//     const response = await fetch(`${API_URL}/contacts`)
//     if (!response.ok) throw new Error('Error fetching contacts')
//     return await response.json()
//   } catch (error) {
//     console.error('Error fetching contacts:', error)
//     return []
//   }
// }

// // Funkce pro získání detailu konkrétního kontaktu
// export const getContact = async (id: number): Promise<(Contact & { amount: number })[] | null> => {
//   try {
//     const response = await fetch(`${API_URL}/contacts`)
//     const response2 = await fetch(`${API_URL}/users`)
//     const response3 = await fetch(`${API_URL}/expenses`)

//     if (!response.ok || !response2.ok) throw new Error('Error fetching contact')

//     const users = (await response2.json()) as User[]
//     const expenses = (await response3.json()) as Expense[]

//     return await ((await response.json()) as Contact[])
//       .filter((contact) => contact.owner_id === id)
//       .map((contact) => {
//         if (contact.user_id) {
//           const user = users.find((user) => user.id == contact.user_id)
//           const amount = expenses
//             .filter((expense) => expense.deptors_ids.includes(id))
//             .map((expense) => (expense.payer_id === id ? expense.amount : -expense.amount) * (expense.distribution ? expense.distribution[0] / 100 : 0))
//             .reduce((sum, next) => sum + next)
//           return { ...contact, first_name: user?.first_name, last_name: user?.last_name, amount: amount } as Contact & { amount: number }
//         } else {
//           return { ...contact, amount: 0 }
//         }
//       })
//   } catch (error) {
//     console.error('Error fetching contact:', error)
//     return null
//   }
// }

// // Funkce pro vytvoření nového kontaktu
// export const createContact = async (contact: any) => {
//   try {
//     const response = await fetch(`${API_URL}/contacts`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(contact),
//     })
//     if (!response.ok) throw new Error('Error creating contact')
//     return await response.json()
//   } catch (error) {
//     console.error('Error creating contact:', error)
//     return null
//   }
// }

// // Funkce pro aktualizaci existujícího kontaktu
// export const updateContact = async (id: number, updatedContact: any) => {
//   try {
//     const response = await fetch(`${API_URL}/contacts/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedContact),
//     })
//     if (!response.ok) throw new Error('Error updating contact')
//     return await response.json()
//   } catch (error) {
//     console.error('Error updating contact:', error)
//     return null
//   }
// }

// // Funkce pro odstranění kontaktu
// export const removeContact = async (id: number) => {
//   try {
//     const response = await fetch(`${API_URL}/contacts/${id}`, {
//       method: 'DELETE',
//     })
//     if (!response.ok) throw new Error('Error deleting contact')
//     return { id }
//   } catch (error) {
//     console.error('Error deleting contact:', error)
//     return null
//   }
// }

// // Funkce pro získání profilu aktuálně přihlášeného uživatele
// export const getProfile = async (userId: number) => {
//   try {
//     const response = await fetch(`${API_URL}/users`)
//     if (!response.ok) throw new Error('Error fetching profile')

//     const users = (await response.json()) as User[]

//     return users.find((user) => user.id == userId) || null
//   } catch (error) {
//     console.error('Error fetching profile:', error)
//     return null
//   }
// }

// // Funkce pro aktualizaci profilu aktuálně přihlášeného uživatele
// export const updateProfile = async (userId: number, updatedProfile: any) => {
//   try {
//     const response = await fetch(`${API_URL}/users/${userId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedProfile),
//     })
//     if (!response.ok) throw new Error('Error updating profile')
//     return await response.json()
//   } catch (error) {
//     console.error('Error updating profile:', error)
//     return null
//   }
// }

// // Funkce pro získání detailu konkrétního vyrovnání
// export const getSettlement = async (id: number) => {
//   try {
//     const response = await fetch(`${API_URL}/settlements/${id}`)
//     if (!response.ok) throw new Error('Error fetching settlement')
//     return await response.json()
//   } catch (error) {
//     console.error('Error fetching settlement:', error)
//     return null
//   }
// }

// // Funkce pro vytvoření nového vyrovnání
// export const createSettlement = async (settlement: any) => {
//   try {
//     const response = await fetch(`${API_URL}/settlements`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(settlement),
//     })
//     if (!response.ok) throw new Error('Error creating settlement')
//     return await response.json()
//   } catch (error) {
//     console.error('Error creating settlement:', error)
//     return null
//   }
// }

// // Funkce pro odstranění vyrovnání
// export const removeSettlement = async (id: number) => {
//   try {
//     const response = await fetch(`${API_URL}/settlements/${id}`, {
//       method: 'DELETE',
//     })
//     if (!response.ok) throw new Error('Error deleting settlement')
//     return { id }
//   } catch (error) {
//     console.error('Error deleting settlement:', error)
//     return null
//   }
// }
