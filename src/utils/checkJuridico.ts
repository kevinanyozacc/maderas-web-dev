export const checkJuridico = (ruc: string) => {
  return ruc?.trim().slice(0, 2) === '20'
}
