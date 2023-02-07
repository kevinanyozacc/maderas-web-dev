export const isEmail = (email?: string) => {
  const regEmail = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi
  return regEmail.test(email ?? '')
}
