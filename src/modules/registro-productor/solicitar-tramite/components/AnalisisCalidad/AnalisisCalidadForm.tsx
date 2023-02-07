import { useState } from 'react'

import useForm, { FormError } from '@hooks/useForm'
import Select from '@components/shared/Select'
import Spinner from '@components/shared/Spinner'
import CheckBox from '@components/shared/Checkbox'
import RadioButton from '@components/shared/RadioButon'

import { SideMultistepComponentProps as Props } from '@pages/registro-productor'
import { Estados, useGetAllLaboratoriosQuery } from '@generated/graphql'
import { useRegistroProductor } from '../../store/useRegistroProductor'
import useToast from '@hooks/useToast'
import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'

const AnalisisCalidadForm = ({ back, submit, isLoading }: Props) => {
  const [isSubmited, setIsSubmited] = useState(false)
  const toast = useToast()

  const store = useRegistroProductor()

  const [datos] = useGetAllLaboratoriosQuery()
  const labs = datos.data?.getAllLaboratorios || []

  const { values, ...form } = useForm({
    initialValues: store.state.analisisCalidad,
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

  const handleSubmit = () => {
    if (values.SEMILLA_ASEXUAL === Estados.Inactivo && values.SEMILLA_SEXUAL === Estados.Inactivo) {
      toast({ title: 'Debe seleccionar el Tipo de Produccion', type: 'warning' })
      return
    }
    if (values.SEMILLA_SEXUAL === Estados.Activo && isEmpty(values.laboratorio)) {
      toast({ title: 'Debe seleccionar el Tipo de Laboratorio', type: 'warning' })
      return
    }

    store.loadAnalisisCalidad(values)
    setIsSubmited(true)
    submit()
  }

  const handleCheckBox = (value: Estados) => {
    if (Estados.Activo === value) return true
    if (Estados.Inactivo === value) return false
    return false
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col gap-3 mb-6">
        <p className="font-medium text-slate-400">Tipo de Producción</p>

        <CheckBox
          value={handleCheckBox(values.SEMILLA_ASEXUAL)}
          label="El tipo de producción es de semilla ASEXUAL ?"
          onClick={() => form.setField('SEMILLA_ASEXUAL',
            values.SEMILLA_ASEXUAL === Estados.Activo ? Estados.Inactivo : Estados.Activo
          )}
        />

        <CheckBox
          value={handleCheckBox(values.SEMILLA_SEXUAL)}
          label="El tipo de producción es de semilla SEXUAL ?"
          onClick={() => {
            form.setField('SEMILLA_SEXUAL',
              values.SEMILLA_SEXUAL === Estados.Activo ? Estados.Inactivo : Estados.Activo)
            form.setField('LABORATORIO_ID', '')
            form.setField('laboratorio', '')
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
            }}
            className="flex flex-col gap-3"
            options={[
              { label: 'Laboratorio Oficial', value: 'OFICIAL' },
              { label: 'Laboratorio Autorizado', value: 'AUTORIZADO' }
            ]}

          />

          {values.laboratorio === 'AUTORIZADO' && (
            <Select
              withFilter
              label="Seleccione el Laboratorio"
              value={values.LABORATORIO_ID!}
              onChange={({ value }) =>
                form.setField('LABORATORIO_ID', value)
              }
              options={labs}
              dataExtractor={{ label: 'SOLICITANTE', value: 'LABORATORIO_ID' }}
              error={form.errors.LABORATORIO_ID}
            />
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto">
        <button
          type="button"
          onClick={() => {
            store.loadAnalisisCalidad(values)
            back()
          }}
          className="btn btn-outline-primary"
        >
          Regresar
        </button>
        <button
          disabled={isLoading || isSubmited}
          type="button"
          onClick={() => form.onSubmit(handleSubmit)()}
          className="self-end btn btn-solid-primary"
        >
          Guardar
          {isLoading && <Spinner />}
        </button>
      </div>
    </div>
  )
}

export default AnalisisCalidadForm
