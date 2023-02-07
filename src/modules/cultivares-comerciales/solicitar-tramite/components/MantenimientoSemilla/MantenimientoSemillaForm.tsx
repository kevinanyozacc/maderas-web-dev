import useForm, { FormError } from '@hooks/useForm'
import { useCultivaresComerciales } from '../../store/useCultivaresComerciales'
import { SideMultistepComponentProps as Props } from '@pages/cultivares-comerciales'
import Input from '@components/shared/Input'
import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'
import Spinner from '@components/shared/Spinner'
import { useState } from 'react'

const MantenimientoSemillaForm = ({ back, submit, isLoading }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const store = useCultivaresComerciales()

  const { values, ...form } = useForm({
    initialValues: store.state.mantenimientoSemilla,
    validate: (values) => {
      const errors: FormError<typeof values> = {}
      if (isEmpty(values.RAZON_SOCIAL))
        errors.RAZON_SOCIAL = ErrorMessages.empty
      if (isEmpty(values.AREA_RESPONSABLE))
        errors.AREA_RESPONSABLE = ErrorMessages.empty
      return errors
    }
  })

  const handleSubmit = () => {
    store.loadMantenimientoSemilla(values)
    setIsSubmitted(true)
    submit()
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          Mantenimiento de Semilla genética
        </p>
      </div>

      <Input
        label="Nombre o Razón Social del Solicitante"
        {...form.inputProps('RAZON_SOCIAL')}
      />

      <Input
        label="Area Responsable"
        {...form.inputProps('AREA_RESPONSABLE')}
      />

      <div className="flex items-center justify-between mt-auto">
        <button
          type="button"
          onClick={() => {
            store.loadMantenimientoSemilla(values)
            back()
          }}
          className="self-end btn btn-outline-primary"
        >
          Regresar
        </button>
        <button
          className="self-end btn btn-solid-primary"
          disabled={isLoading || isSubmitted}
        >
          Guardar
          {isLoading && <Spinner />}
        </button>
      </div>
    </form>
  )
}

export default MantenimientoSemillaForm
