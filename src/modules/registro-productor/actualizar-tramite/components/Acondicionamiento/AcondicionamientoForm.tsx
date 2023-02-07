import { useState } from 'react'
import isEmpty from 'validator/lib/isEmpty'

import { Acondicionamiento, AcondicionamientoInput } from '@generated/graphql'
import { ErrorMessages } from '@validation/messages'
import useForm, { FormError } from '@hooks/useForm'
import useUpdateRegistroProductor from '@hooks/useUpdateRegistroProductor'
import { SideMultistepComponentProps as Props } from '@pages/registro-productor/actualizar-tramite'
import WarningAlert from '@components/shared/WarningAlert'
import ButtonsForm from '@components/shared/ButtonsForm'
import AcondicionamientoSelect from './AcondicionamientoSelect'

const initialValues: AcondicionamientoInput = {
  ACONDICIONAMIENTO_ID: 0,
  RECEPCION: '',
  OPERACIONES_ESPECIALES: '',
  LIMPIEZA: '',
  CLASIFICACION: '',
  TRATAMIENTO: '',
  ENVASADO: '',
  ALMACENAMIENTO: ''
}

const AcondicionamientoForm = ({ next, back, registroId }: Props) => {
  const [isChangedForm, setIsChangedForm] = useState(false)
  const { datos, updateAcondicionamiento, dataTramiteEstObs } = useUpdateRegistroProductor(registroId)

  const { values, isChanged, setIsChanged, ...form } = useForm({
    initialValues: datos.data?.getTramiteByRegistroId?.ACONDICIONAMIENTO! || initialValues,
    validate: (values) => {
      const errors: FormError<Acondicionamiento> = {}
      if (isEmpty(values.ALMACENAMIENTO)) errors.ALMACENAMIENTO = ErrorMessages.empty
      if (isEmpty(values.CLASIFICACION)) errors.CLASIFICACION = ErrorMessages.empty
      if (isEmpty(values.ENVASADO)) errors.ENVASADO = ErrorMessages.empty
      if (isEmpty(values.LIMPIEZA)) errors.LIMPIEZA = ErrorMessages.empty
      if (isEmpty(values.OPERACIONES_ESPECIALES)) errors.OPERACIONES_ESPECIALES = ErrorMessages.empty
      if (isEmpty(values.RECEPCION)) errors.RECEPCION = ErrorMessages.empty
      if (isEmpty(values.TRATAMIENTO)) errors.TRATAMIENTO = ErrorMessages.empty
      return errors
    }
  })

  const handleSubmit = () => {
    const { __typename, FECHA_REGISTRO, ...rest } = values
    updateAcondicionamiento(rest)
    setIsChangedForm(false)
    setIsChanged(false)
  }

  const handleDisable = () => {
    if (isChanged) return false
    if (isChangedForm) return false
    return true
  }

  return (
    <form
      className="flex flex-col gap-3 md:gap-6 flex-1"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      {!!dataTramiteEstObs.data?.getObservacionesByExpediente.OBS_ACONDICIONAMIENTO && <WarningAlert message={dataTramiteEstObs.data?.getObservacionesByExpediente.OBS_ACONDICIONAMIENTO!} />}
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Acondicionamiento de semillas</p>
      </div>

      <AcondicionamientoSelect
        label="Recepción"
        value={values.RECEPCION}
        error={form.errors.RECEPCION}
        onChange={(value) => {
          form.setField('RECEPCION', value)
          setIsChangedForm(true)
        }}
        className="border-b border-slate-700 pb-3 md:pb-0 md:border-0"
        NUM_ARC={values.RECEPCION_ARC!}
        errorArc={form.errors.RECEPCION_ARC}
      />

      <AcondicionamientoSelect
        label="Limpieza"
        value={values.LIMPIEZA}
        error={form.errors.LIMPIEZA}
        onChange={(value) => {
          form.setField('LIMPIEZA', value)
          setIsChangedForm(true)
        }}
        className="border-b border-slate-700 pb-3 md:pb-0 md:border-0"
        NUM_ARC={values.LIMPIEZA_ARC!}
        errorArc={form.errors.LIMPIEZA_ARC}
      />

      <AcondicionamientoSelect
        label="Clasificación"
        value={values.CLASIFICACION}
        error={form.errors.CLASIFICACION}
        onChange={(value) => {
          form.setField('CLASIFICACION', value)
          setIsChangedForm(true)
        }}
        className="border-b border-slate-700 pb-3 md:pb-0 md:border-0"
        NUM_ARC={values.CLASIFICACION_ARC!}
        errorArc={form.errors.CLASIFICACION_ARC}
      />

      <AcondicionamientoSelect
        label="Tratamiento"
        value={values.TRATAMIENTO}
        error={form.errors.TRATAMIENTO}
        onChange={(value) => {
          form.setField('TRATAMIENTO', value)
          setIsChangedForm(true)
        }}
        className="border-b border-slate-700 pb-3 md:pb-0 md:border-0"
        NUM_ARC={values.TRATAMIENTO_ARC!}
        errorArc={form.errors.TRATAMIENTO_ARC}
      />

      <AcondicionamientoSelect
        label="Envasado"
        value={values.ENVASADO}
        error={form.errors.ENVASADO}
        onChange={(value) => {
          form.setField('ENVASADO', value)
          setIsChangedForm(true)
        }}
        className="border-b border-slate-700 pb-3 md:pb-0 md:border-0"
        NUM_ARC={values.ENVASADO_ARC!}
        errorArc={form.errors.ENVASADO_ARC}
      />

      <AcondicionamientoSelect
        label="Almacenamiento"
        value={values.ALMACENAMIENTO}
        error={form.errors.ALMACENAMIENTO}
        onChange={(value) => {
          form.setField('ALMACENAMIENTO', value)
          setIsChangedForm(true)
        }}
        NUM_ARC={values.ALMACENAMIENTO_ARC!}
        errorArc={form.errors.ALMACENAMIENTO_ARC}
      />

      <AcondicionamientoSelect
        label="Operaciones Especiales"
        value={values.OPERACIONES_ESPECIALES}
        error={form.errors.OPERACIONES_ESPECIALES}
        onChange={(value) => {
          form.setField('OPERACIONES_ESPECIALES', value)
          setIsChangedForm(true)
        }}
        NUM_ARC={values.OPERACIONES_ESPECIALES_ARC!}
        errorArc={form.errors.OPERACIONES_ESPECIALES_ARC}
      />

      <ButtonsForm
        back={back}
        next={next}
        handleDisable={handleDisable()}
      />
    </form>
  )
}

export default AcondicionamientoForm
