import Input from '@components/shared/Input'
import ToggleTheme from '@components/shared/ToggleTheme'

import { ErrorMessages } from '@validation/messages'
import useForm, { FormError } from '@hooks/useForm'
import { useAuth } from '@store/auth'
import { IconLogo } from '@icons'
import { LoginInput } from '@generated/graphql'
import { isEmpty } from '@utils/isEmpty'
import { useGetLoginSys } from '@graphql/api/GetLogin'

const initialValues: LoginInput = {
  USERNAME: '',
  PASSWORD: ''
}

const LoginPage = () => {
  const { loginAction } = useAuth()
  const { values, ...form } = useForm({
    initialValues,
    validate: (values) => {
      const errors: FormError<typeof values> = {}
      if (isEmpty(values.USERNAME)) errors.USERNAME = ErrorMessages.empty
      if (isEmpty(values.PASSWORD)) errors.PASSWORD = ErrorMessages.empty
      return errors
    }
  })
  // const from = ((location.state as any)?.from?.pathname as string) ?? '/'
  const handleSubmit = async () => {
    const res = await useGetLoginSys(values)
    if (Array.isArray(res.data?.login.errors)) {
      const errors: FormError<typeof initialValues> = {}

      for (const { field, message } of res.data?.login.errors!) {
        ; (errors as Record<string, string>)[field] = message
      }
      console.log(errors)
      form.setErrors(errors)
      return
    }

    const user = res.data?.login.data

    if (user?.token) {
      localStorage.setItem('token', user?.token)
    }

    loginAction({
      roles: res.data?.login.data?.ROLES!,
      userId: res.data?.login.data?.USER_ID!,
      username: res.data?.login.data?.USERNAME!,
      sedeId: res.data?.login.data?.SEDE_ID!
    })

    window.location.href = '/registro-reporte'
  }

  return (
    <div className="md:px-0 overflow-hidden">
      <div className="flex flex-col items-center justify-center  md:w-1/2  max-w-120 w-full md:mx-auto ">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="w-full max-w-lg py-8 px-6 md:px-8 "
        >
          <div className="w-48 mb-10">
            <IconLogo className="h-15 w-15 dark:fill-white" />
          </div>
          <h1 className="tracking-wide mb-3 text-left title-6 text-slate-800 dark:text-slate-200">
            Iniciar sesión
          </h1>
          <h2 className="tracking-wide mb-3 text-left">
            Responsables Técnicos Autorizados</h2>
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              label="Usuario"
              {...form.inputProps('USERNAME')}
            />
            <Input
              type="password"
              label="Contraseña"
              {...form.inputProps('PASSWORD')}
            />
            <button
              type="submit"
              // disabled={loading}
              className="btn btn-solid-primary"
            >
              Inicia sesión
              {/* {loading && <Spinner />} */}
            </button>
            <div className="flex flex-col gap-y-3 sm:flex-row justify-between">
            </div>
          </div>
        </form>
      </div>
      <ToggleTheme className="absolute top-5 left-5" />
    </div>
  )
}
export default LoginPage
