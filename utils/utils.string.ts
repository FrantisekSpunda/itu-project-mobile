export const getAvatar = (name: string) => {
  const splited = name.split(' ')
  if (splited.length > 1) return splited[0][0] + splited[1][0]
  else return splited[0][0] + splited[0][1]
}
