import useForm, { FormError } from '@hooks/useForm'
import Select from '@components/shared/Select'
import CheckBox from '@components/shared/Checkbox'
import RadioButton from '@components/shared/RadioButon'

import { SideMultistepComponentProps as Props } from '@pages/registro-productor/actualizar-tramite'
import useUpdateRegistroProductor from '@hooks/useUpdateRegistroProductor'
import WarningAlert from '@components/shared/WarningAlert'
import ButtonsForm from '@components/shared/ButtonsForm'
import {
  AnalisisCalidadUpdateinput,
  Estados,
  EstadosExpedientes,
  useGetAllLaboratoriosQuery,
  useUpdateEstadoExpedienteMutation
} from '@generated/graphql'
import { useEffect, useState } from 'react'
import { ErrorMessages } from '@validation/messages'
import useToast from '@hooks/useToast'
import isEmpty from 'validator/lib/isEmpty'
import { useRouter } from 'next/router'

interface AnalisisCalidad extends AnalisisCalidadUpdateinput {
  laboratorio: string
}

const initialValues: AnalisisCalidad = {
  ANALISIS_ID: 0,
  SEMILLA_ASEXUAL: Estados.Inactivo,
  SEMILLA_SEXUAL: Estados.Inactivo,
  LABORATORIO_ID: null,
  laboratorio: ''
}

const AnalisisCalidadForm = ({ back, registroId }: Props) => {
  const toast = useToast()
  const router = useRouter()

  const [isChangedForm, setIsChangedForm] = useState(false)
  const [{ fetching }, updateEstado] = useUpdateEstadoExpedienteMutation()
  const { datos, dataTramiteEstObs, updateAnalisisCalidad } =
    useUpdateRegistroProductor(registroId)

  const { values, isChanged, ...form } = useForm({
    initialValues,
    validate: (values) => {
      const errors: FormError<typeof values> = {}
      if (
        values.SEMILLA_SEXUAL === Estados.Activo &&
        !values.LABORATORIO_ID &&
        values.laboratorio === 'AUTORIZADO'
      ) {
        errors.LABORATORIO_ID = ErrorMessages.empty
      }
      return errors
    }
  })

  const [labos] = useGetAllLaboratoriosQuery()
  const labs = labos.data?.getAllLaboratorios || []

  useEffect(() => {
    form.setFields(datos.data?.getTramiteByRegistroId?.ANALISIS_CALIDAD!)
    if (datos.data?.getTramiteByRegistroId?.ANALISIS_CALIDAD?.LABORATORIO_ID) {
      form.setField('laboratorio', 'AUTORIZADO')
    } else {
      form.setField('laboratorio', 'OFICIAL')
    }
  }, [])

  const handleSubmit = () => {
    if (
      values.SEMILLA_ASEXUAL === Estados.Inactivo &&
      values.SEMILLA_SEXUAL === Estados.Inactivo
    ) {
      toast({
        title: 'Debe seleccionar el Tipo de Produccion',
        type: 'warning'
      })
      return
    }
    if (
      values.SEMILLA_SEXUAL === Estados.Activo &&
      isEmpty(values.laboratorio)
    ) {
      toast({
        title: 'Debe seleccionar el Tipo de Laboratorio',
        type: 'warning'
      })
      return
    }
    updateAnalisisCalidad({
      ANALISIS_ID: values.ANALISIS_ID,
      SEMILLA_ASEXUAL: values.SEMILLA_ASEXUAL,
      SEMILLA_SEXUAL: values.SEMILLA_SEXUAL,
      LABORATORIO_ID: values.LABORATORIO_ID ? values.LABORATORIO_ID : null
    })
    setIsChangedForm(true)
  }

  const handleCheckBox = (value: Estados) => {
    if (Estados.Activo === value) return true
    if (Estados.Inactivo === value) return false
    return false
  }

  const handleDisable = () => {
    if (isChanged) return false
    if (isChangedForm) return false
    return true
  }

  return (
    <div className="flex flex-col flex-1">
      {!!dataTramiteEstObs.data?.getObservacionesByExpediente.OBS_ANALISIS && (
        <WarningAlert
          message={
            dataTramiteEstObs.data?.getObservacionesByExpediente.OBS_ANALISIS!
          }
        />
      )}
      <div className="flex flex-col gap-3 mb-6">
        <p className="font-medium text-slate-400">Tipo de Producción</p>

        <CheckBox
          value={handleCheckBox(values.SEMILLA_ASEXUAL)}
          label="El tipo de producción es de semilla ASEXUAL ?"
          onClick={() => {
            form.setField(
              'SEMILLA_ASEXUAL',
              values.SEMILLA_ASEXUAL === Estados.Activo
                ? Estados.Inactivo
                : Estados.Activo
            )
            setIsChangedForm(true)
          }}
        />

        <CheckBox
          value={handleCheckBox(values.SEMILLA_SEXUAL)}
          label="El tipo de producción es de semilla SEXUAL ?"
          onClick={() => {
            form.setField(
              'SEMILLA_SEXUAL',
              values.SEMILLA_SEXUAL === Estados.Activo
                ? Estados.Inactivo
                : Estados.Activo
            )
            form.setField('LABORATORIO_ID', '')
            form.setField('laboratorio', '')
            setIsChangedForm(true)
          }}
        />
      </div>

      {values.SEMILLA_SEXUAL === Estados.Activo && (
        <div className="flex flex-col gap-3 mb-3">
          <p className="font-medium text-slate-400">Tipo de Laboratorio</p>

          <RadioButton
            value={values.laboratorio}
            onChange={(value) => {
              form.setField('laboratorio', value)
              form.setField('LABORATORIO_ID', '')
              setIsChangedForm(true)
            }}
            className="flex flex-col gap-3"
            options={[
              { label: 'Laboratorio Oficial', value: 'OFICIAL' },
              { label: 'Laboratorio Autorizado', value: 'AUTORIZADO' }
            ]}
          />

          {values.laboratorio === 'AUTORIZADO' && (
            <Select
              label="Seleccione el Laboratorio"
              value={values.LABORATORIO_ID!}
              onChange={({ value }) => {
                form.setField('LABORATORIO_ID', value)
                setIsChangedForm(true)
              }}
              options={labs}
              dataExtractor={{ label: 'SOLICITANTE', value: 'LABORATORIO_ID' }}
              error={form.errors.LABORATORIO_ID}
            />
          )}
        </div>
      )}

      <ButtonsForm
        isLast
        back={back}
        handleDisable={handleDisable()}
        onSubmitSave={form.onSubmit(handleSubmit)}
        isLoading={fetching}
        onEnd={async () => {
          await updateEstado({
            expedienteId: +registroId,
            estado: EstadosExpedientes.Actualizado
          })
          router.push('/')
        }}
      />
    </div>
  )
}

export default AnalisisCalidadForm
