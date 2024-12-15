import { Balance } from '@/api/types'
import { getSign } from './utils.number'

/**
 * Format price with currency and language
 * @param amount - price to format
 * @param type - type of price
 * @param currency - currency to format
 * @param language - language to format
 * @returns
 */
export const formatPrice = (amount: number, type?: Balance['type'], currency: string = 'CZK', language: string = 'cz') => {
  const filledType = type || ({ '+': 'owed', '-': 'owe', '': 'settled' }[getSign(amount)] as Balance['type'])

  const formatter = new Intl.NumberFormat(language, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  return formatter.format(Math.abs(amount) * (filledType == 'owe' ? -1 : 1))
}
