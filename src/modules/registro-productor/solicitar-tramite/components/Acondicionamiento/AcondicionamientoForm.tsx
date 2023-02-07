import isEmpty from 'validator/lib/isEmpty'
import useForm, { FormError } from '@hooks/useForm'
import { SideMultistepComponentProps as Props } from '@pages/registro-productor'
import { ErrorMessages } from '@validation/messages'
import { useRegistroProductor } from '../../store/useRegistroProductor'
import AcondicionamientoSelect from './AcondicionamientoSelect'
import useToast from '@hooks/useToast'
import { textAcondicionamiento } from '@modules/registro-productor/utils/textContent'

const AcondicionamientoForm = ({ next, back }: Props) => {
  const toast = useToast()
  const store = useRegistroProductor()
  const { values, ...form } = useForm({
    initialValues: store.state.acondicionamiento,
    validate: (values) => {
      const errors: FormError<typeof values> = {}
      if (isEmpty(values.ALMACENAMIENTO)) errors.ALMACENAMIENTO = ErrorMessages.empty
      if (isEmpty(values.CLASIFICACION)) errors.CLASIFICACION = ErrorMessages.empty
      if (isEmpty(values.ENVASADO)) errors.ENVASADO = ErrorMessages.empty
      if (isEmpty(values.LIMPIEZA)) errors.LIMPIEZA = ErrorMessages.empty
      if (isEmpty(values.OPERACIONES_ESPECIALES)) errors.OPERACIONES_ESPECIALES = ErrorMessages.empty
      if (isEmpty(values.RECEPCION)) errors.RECEPCION = ErrorMessages.empty
      if (isEmpty(values.TRATAMIENTO)) errors.TRATAMIENTO = ErrorMessages.empty

      if (isEmpty(values.ALMACENAMIENTO_ARC!)) errors.ALMACENAMIENTO_ARC = ErrorMessages.empty
      if (isEmpty(values.CLASIFICACION_ARC!)) errors.CLASIFICACION_ARC = ErrorMessages.empty
      if (isEmpty(values.ENVASADO_ARC!)) errors.ENVASADO_ARC = ErrorMessages.empty
      if (isEmpty(values.LIMPIEZA_ARC!)) errors.LIMPIEZA_ARC = ErrorMessages.empty
      if (isEmpty(values.OPERACIONES_ESPECIALES_ARC!)) errors.OPERACIONES_ESPECIALES_ARC = ErrorMessages.empty
      if (isEmpty(values.RECEPCION_ARC!)) errors.RECEPCION_ARC = ErrorMessages.empty
      if (isEmpty(values.TRATAMIENTO_ARC!)) errors.TRATAMIENTO_ARC = ErrorMessages.empty

      return errors
    }
  })

  const handleSubmit = () => {
    store.addAcondicionamiento(values)
    next()
  }

  return (
    <form
      className="flex flex-col gap-3 md:gap-6 flex-1"
      onSubmit={(e) => {
        e.preventDefault()
        if (
          isEmpty(values.ALMACENAMIENTO_ARC!) ||
          isEmpty(values.CLASIFICACION_ARC!) ||
          isEmpty(values.ENVASADO_ARC!) ||
          isEmpty(values.LIMPIEZA_ARC!) ||
          isEmpty(values.OPERACIONES_ESPECIALES_ARC!) ||
          isEmpty(values.RECEPCION_ARC!) ||
          isEmpty(values.TRATAMIENTO_ARC!)
        ) {
          toast({ title: 'Agregar documentos', type: 'warning' })
        }
        form.onSubmit(handleSubmit)()
      }}
    >
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">{textAcondicionamiento.titleForm}</p>
      </div>

      <AcondicionamientoSelect
        label="Recepción"
        value={values.RECEPCION}
        error={form.errors.RECEPCION}
        onChange={(value) => form.setField('RECEPCION', value)}
        className="border-b border-slate-700 pb-3 md:pb-0 md:border-0"
        NUM_ARC={values.RECEPCION_ARC!}
        setNumArc={(value) => form.setField('RECEPCION_ARC', value)}
        errorArc={form.errors.RECEPCION_ARC}
      />

      <AcondicionamientoSelect
        label="Limpieza"
        value={values.LIMPIEZA}
        error={form.errors.LIMPIEZA}
        onChange={(value) => form.setField('LIMPIEZA', value)}
        className="border-b border-slate-700 pb-3 md:pb-0 md:border-0"
        NUM_ARC={values.LIMPIEZA_ARC!}
        setNumArc={(value) => form.setField('LIMPIEZA_ARC', value)}
        errorArc={form.errors.LIMPIEZA_ARC}
      />

      <AcondicionamientoSelect
        label="Clasificación"
        value={values.CLASIFICACION}
        error={form.errors.CLASIFICACION}
        onChange={(value) => form.setField('CLASIFICACION', value)}
        className="border-b border-slate-700 pb-3 md:pb-0 md:border-0"
        NUM_ARC={values.CLASIFICACION_ARC!}
        setNumArc={(value) => form.setField('CLASIFICACION_ARC', value)}
        errorArc={form.errors.CLASIFICACION_ARC}
      />

      <AcondicionamientoSelect
        label="Tratamiento"
        value={values.TRATAMIENTO}
        error={form.errors.TRATAMIENTO}
        onChange={(value) => form.setField('TRATAMIENTO', value)}
        className="border-b border-slate-700 pb-3 md:pb-0 md:border-0"
        NUM_ARC={values.TRATAMIENTO_ARC!}
        setNumArc={(value) => form.setField('TRATAMIENTO_ARC', value)}
        errorArc={form.errors.TRATAMIENTO_ARC}
      />

      <AcondicionamientoSelect
        label="Envasado"
        value={values.ENVASADO}
        error={form.errors.ENVASADO}
        onChange={(value) => form.setField('ENVASADO', value)}
        className="border-b border-slate-700 pb-3 md:pb-0 md:border-0"
        NUM_ARC={values.ENVASADO_ARC!}
        setNumArc={(value) => form.setField('ENVASADO_ARC', value)}
        errorArc={form.errors.ENVASADO_ARC}
      />

      <AcondicionamientoSelect
        label="Almacenamiento"
        value={values.ALMACENAMIENTO}
        error={form.errors.ALMACENAMIENTO}
        onChange={(value) => form.setField('ALMACENAMIENTO', value)}
        NUM_ARC={values.ALMACENAMIENTO_ARC!}
        setNumArc={(value) => form.setField('ALMACENAMIENTO_ARC', value)}
        errorArc={form.errors.ALMACENAMIENTO_ARC}
      />

      <AcondicionamientoSelect
        label="Operaciones Especiales"
        value={values.OPERACIONES_ESPECIALES}
        error={form.errors.OPERACIONES_ESPECIALES}
        onChange={(value) => form.setField('OPERACIONES_ESPECIALES', value)}
        NUM_ARC={values.OPERACIONES_ESPECIALES_ARC!}
        setNumArc={(value) => form.setField('OPERACIONES_ESPECIALES_ARC', value)}
        errorArc={form.errors.OPERACIONES_ESPECIALES_ARC}
      />

      <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between mt-auto">
        <button
          type="button"
          onClick={() => {
            store.addAcondicionamiento(values)
            back()
          }}
          className="w-full md:w-max md:self-end btn btn-outline-primary"
        >
          Regresar
        </button>
        <button
          type="submit"
          className="w-full md:w-max md:self-end btn btn-solid-primary"
        >
          Siguiente
        </button>
      </div>
    </form>
  )
}

export default AcondicionamientoForm
