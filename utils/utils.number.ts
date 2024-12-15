/**
 * Get sign of number
 * @param number
 * @returns
 */
export const getSign = (number: number) => {
  if (number < 0) return '-'
  else if (number > 0) return '+'
  else return ''
}
