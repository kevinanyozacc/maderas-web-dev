import { useEffect, useState } from 'react'
import Input from '@components/shared/Input'
import Select from '@components/shared/Select'
import RadioButton from '@components/shared/RadioButon'
import InputCleave from '@components/shared/InputCleave'
import WarningAlert from '@components/shared/WarningAlert'
import ButtonsForm from '@components/shared/ButtonsForm'

import useForm from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import useUpdateRegistroProductor from '@hooks/useUpdateRegistroProductor'

import { SideMultistepComponentProps as Props } from '@pages/registro-productor/actualizar-tramite'
import EspecializacionForm from '../Especializacion/EspecializacionForm'
import ExperienciaForm from '../Experiencia/ExperienciaForm'
import { profesionalValid } from '../../../validation/ProfesionalValid'
import { ProfesionalInput } from '@generated/graphql'
import { patterns } from '@utils/patterns'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'

const initialValues: ProfesionalInput = {
  NOMBRES: '',
  APELLIDOS: '',
  TIPO_DOCUMENTO: '',
  NUMERO_DOCUMENTO: '',
  DOMICILIO_LEGAL: '',
  TIPO_PROFESIONAL: '',
  ESPECIFICAR_PROFESION: '',
  NUMERO_CIP: '',
  DISTRITO: '',
  DEPARTAMENTO: '',
  PROVINCIA: '',
  TELEFONO: '',
  EMAIL: '',
  EXPEDIENTE_ID: 0,
  PROFESIONAL_RESPONSABLE_ID: 0
}

const ProfesionalResponsableForm = ({ next, back, registroId }: Props) => {
  const [isChangedForm, setIsChangedForm] = useState(false)
  const { fetching, PROFESIONAL, updateProfesional, dataTramiteEstObs } = useUpdateRegistroProductor(registroId)

  const { values, isChanged, setIsChanged, ...form } = useForm({
    validate: profesionalValid,
    initialValues
  })

  useEffect(() => {
    const {
      __typename,
      NOMBRE_DEPARTAMENTO,
      NOMBRE_DISTRITO,
      NOMBRE_PROVINCIA,
      ...rest
    } = PROFESIONAL!
    form.setFields(rest)
  }, [fetching !== true])

  const ubigeo = useGetUbigeo({
    codDepa: values?.DEPARTAMENTO,
    codProv: values?.PROVINCIA
  })

  const handleSubmit = () => {
    updateProfesional(values)
    setIsChanged(false)
    setIsChangedForm(false)
  }

  const handleMaxLen = () => {
    if (values.TIPO_DOCUMENTO === 'CE') return 9
    if (values.TIPO_DOCUMENTO === 'DNI') return 8
    return 8
  }

  const handleDisable = () => {
    if (isChanged) return false
    if (isChangedForm) return false
    return true
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-6 flex-1"
    >
      {!!dataTramiteEstObs.data?.getObservacionesByExpediente.OBS_PROFESIONAL &&
        <WarningAlert message={dataTramiteEstObs.data?.getObservacionesByExpediente.OBS_PROFESIONAL!} />
      }

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Datos del Profesional</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Select
          label="Tipo de documento"
          error={form.errors.TIPO_DOCUMENTO}
          value={values.TIPO_DOCUMENTO}
          onChange={({ value }) => {
            form.setFields({
              TIPO_DOCUMENTO: value,
              NUMERO_DOCUMENTO: ''
            })
            setIsChangedForm(true)
          }}
          options={[
            { label: 'DNI', value: 'DNI' },
            { label: 'Carnet de Extranjeria', value: 'CE' }
          ]}
        />
        <Input
          label="N° de documento"
          value={values.NUMERO_DOCUMENTO}
          maxLength={handleMaxLen()}
          pattern="[0-9]{0,11}"
          onChange={(e) => {
            e.target.validity.valid && form.setField('NUMERO_DOCUMENTO', e.target.value); setIsChangedForm(true)
          }}
          error={form.errors.NUMERO_DOCUMENTO}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Nombres"
          value={values.NOMBRES!}
          pattern={patterns.onlyLetters}
          onChange={(e) => {
            e.target.validity.valid && form.setField('NOMBRES', e.target.value); setIsChangedForm(true)
          }}
          error={form.errors.NOMBRES}
        />
        <Input
          label="Apellidos"
          value={values.APELLIDOS!}
          pattern={patterns.onlyLetters}
          onChange={(e) => {
            e.target.validity.valid && form.setField('APELLIDOS', e.target.value); setIsChangedForm(true)
          }}
          error={form.errors.APELLIDOS}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input type='email' label="Email" {...form.inputProps('EMAIL')} />
        <InputCleave
          type="phone"
          label="Telefono"
          {...form.inputProps('TELEFONO')}
        />
      </div>

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Tipo de Profesional</p>
      </div>

      <div>
        <RadioButton
          allowToggle={false}
          value={values.TIPO_PROFESIONAL}
          onChange={(value) => {
            form.setField('TIPO_PROFESIONAL', value)
            form.setField('NUMERO_CIP', '')
            setIsChangedForm(true)
          }}
          className="flex items-center gap-3"
          options={[
            { value: 'INGENIERO', label: 'Ingeniero' },
            { value: 'OTRO', label: 'Otros' }
          ]}
        />
      </div>

      {values.TIPO_PROFESIONAL === 'INGENIERO' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            label="Especificar"
            {...form.inputProps('ESPECIFICAR_PROFESION')}
          />
          <Input label="N° CIP" {...form.inputProps('NUMERO_CIP')} />
        </div>
      )}

      {values.TIPO_PROFESIONAL === 'OTRO' && (
        <Input
          label="Especificar"
          {...form.inputProps('ESPECIFICAR_PROFESION')}
        />
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <SelectWithFilter
          withFilter
          label="Departamento"
          value={values.DEPARTAMENTO}
          error={form.errors.DEPARTAMENTO}
          onChange={({ value }) => {
            form.setFields({
              DEPARTAMENTO: value,
              PROVINCIA: '',
              DISTRITO: ''
            })
            setIsChangedForm(true)
          }}
          options={ubigeo.departamentos}
          dataExtractor={{ label: 'NOMB_DPTO_DPT', value: 'CODI_DEPA_DPT' }}
        />
        <SelectWithFilter
          withFilter
          label="Provincia"
          value={values.PROVINCIA}
          error={form.errors.PROVINCIA}
          onChange={({ value }) => {
            form.setFields({ PROVINCIA: value, DISTRITO: '' })
            setIsChangedForm(true)
          }}
          options={ubigeo.provincias}
          dataExtractor={{ label: 'NOMB_PROV_TPR', value: 'CODI_PROV_TPR' }}
        />
        <SelectWithFilter
          withFilter
          label="Distrito"
          value={values.DISTRITO}
          options={ubigeo.distritos}
          error={form.errors.DISTRITO}
          onChange={({ value }) => {
            form.setField('DISTRITO', value)
            setIsChangedForm(true)
          }}
          dataExtractor={{ label: 'NOMB_DIST_TDI', value: 'CODI_DIST_TDI' }}
        />
      </div>

      <div>
        <Input
          label="Dirección legal"
          {...form.inputProps('DOMICILIO_LEGAL')}
        />
      </div>

      <EspecializacionForm id={registroId} />
      <ExperienciaForm id={registroId} />

      <ButtonsForm
        back={back}
        next={next}
        handleDisable={handleDisable()}
      />
    </form>
  )
}

export default ProfesionalResponsableForm
