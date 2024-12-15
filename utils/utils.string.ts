/**
 * Get avatar from name
 * @param name
 * @returns
 */
export const getAvatar = (name: string) => {
  const splited = name.split(' ')
  if (splited.length > 1) return splited[0][0] + splited[1][0]
  else return splited[0][0] + splited[0][1]
}

/**
 * Truncate text to a specified length and add ellipsis (...) if text exceeds the limit.
 *
 * @param text - The input text to be truncated.
 * @param maxLength - The maximum length of the text including the ellipsis.
 * @returns The truncated text with ellipsis if applicable.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength - 3) + '...'
}
