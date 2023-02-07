export const validRuc = (ruc: string) => {
  const firstTo = +ruc.trim().slice(0, 2)
  return firstTo >= 10 && firstTo <= 20
}
