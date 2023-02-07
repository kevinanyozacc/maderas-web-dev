import { useEffect } from 'react'

import useForm, { FormError } from '@hooks/useForm'
import { SideMultistepComponentProps as Props } from '@pages/cultivares-comerciales/actualizar-tramite'
import Input from '@components/shared/Input'
import ButtonsForm from '@components/shared/ButtonsForm'
import WarningAlert from '@components/shared/WarningAlert'
import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'
import {
  EstadosExpedientes,
  MantSemillaUpdateInput,
  useUpdateEstadoExpedienteMutation
} from '@generated/graphql'
import useUpdateCultivarComercial from '@hooks/useUpdateCultivarComercial'
import { useRouter } from 'next/router'

const initialValues: MantSemillaUpdateInput = {
  RAZON_SOCIAL: '',
  AREA_RESPONSABLE: '',
  MANTENIMIENTO_SEMILLA_ID: 0
}

const MantenimientoSemillaForm = ({ back, registroId }: Props) => {
  const router = useRouter()
  const { datos, updateMantSemilla, datosObs } =
    useUpdateCultivarComercial(registroId)
  const [{ fetching }, updateEstado] = useUpdateEstadoExpedienteMutation()

  const { values, isChanged, setIsChanged, ...form } = useForm({
    initialValues,
    validate: (values) => {
      const errors: FormError<typeof values> = {}
      if (isEmpty(values.RAZON_SOCIAL))
        errors.RAZON_SOCIAL = ErrorMessages.empty
      if (isEmpty(values.AREA_RESPONSABLE))
        errors.AREA_RESPONSABLE = ErrorMessages.empty
      return errors
    }
  })

  useEffect(() => {
    if (datos.data?.getTramiteByRegistroId?.MANTENIMIENTO_SEMILLA) {
      const { __typename, FECHA_REGISTRO, EXPEDIENTE_ID, ...rest } =
        datos.data.getTramiteByRegistroId.MANTENIMIENTO_SEMILLA
      form.setFields(rest)
    }
  }, [datos.fetching === false])

  const handleSubmit = async () => {
    await updateMantSemilla(values)
    setIsChanged(false)
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      {!!datosObs.data?.getObservacionesByExpediente.OBS_MANT_SEMILLA && (
        <WarningAlert
          message={datosObs.data?.getObservacionesByExpediente.OBS_MANT_SEMILLA}
        />
      )}
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

      <ButtonsForm
        isLast
        back={back}
        handleDisable={!isChanged}
        isLoading={fetching}
        onEnd={async () => {
          await updateEstado({
            expedienteId: +registroId,
            estado: EstadosExpedientes.Actualizado
          })
          router.push('/')
        }}
      />
    </form>
  )
}

export default MantenimientoSemillaForm
