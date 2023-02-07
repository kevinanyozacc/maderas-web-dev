export const formatDateEsEn = (date: string): Date => {
  const res = new Date(
    `${date.slice(3, 5)} ${date.slice(0, 2)}, ${date.slice(-4)}`
  )
  return res
}
