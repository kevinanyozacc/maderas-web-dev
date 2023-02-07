import Input from '@components/shared/Input'
import Select from '@components/shared/Select'
import RadioButton from '@components/shared/RadioButon'
import InputCleave from '@components/shared/InputCleave'

import useForm from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'

import { SideMultistepComponentProps as Props } from '@pages/registro-productor'
import { profesionalValid } from '../../../validation/ProfesionalValid'
import { useRegistroProductor } from '../../store/useRegistroProductor'
import EspecializacionForm from '../Especializacion/EspecializacionForm'
import ExperienciaForm from '../Experiencia/ExperienciaForm'
import { patterns } from '@utils/patterns'
import { textProfesional } from '@modules/registro-productor/utils/textContent'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'

const ProfesionalResponsableForm = ({ next, back }: Props) => {
  const { state, loadProfesional } = useRegistroProductor()

  const { values, ...form } = useForm({
    initialValues: state.profesional,
    validate: profesionalValid
  })

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO,
    codProv: values.PROVINCIA
  })

  const handleSubmit = () => {
    loadProfesional(values)
    next()
  }

  const handleMaxLen = () => {
    if (values.TIPO_DOCUMENTO === 'CE') return 9
    if (values.TIPO_DOCUMENTO === 'DNI') return 8
    return 8
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-6 flex-1"
    >
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">{textProfesional.titleForm}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Select
          label="Tipo documento"
          error={form.errors.TIPO_DOCUMENTO}
          value={values.TIPO_DOCUMENTO}
          onChange={({ value }) => form.setFields({
            TIPO_DOCUMENTO: value,
            NUMERO_DOCUMENTO: ''
          })}
          options={[
            { label: 'DNI', value: 'DNI' },
            { label: 'Carnet de Extranjeria', value: 'CE' }
          ]}
        />
        <Input
          label="N° de documento"
          value={values.NUMERO_DOCUMENTO}
          maxLength={handleMaxLen()}
          pattern={patterns.onlyNumbers}
          onChange={(e) => {
            e.target.validity.valid && form.setField('NUMERO_DOCUMENTO', e.target.value)
          }}
          error={form.errors.NUMERO_DOCUMENTO}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Nombres"
          value={values.NOMBRES!}
          pattern={patterns.onlyLetters}
          onChange={e =>
            e.target.validity.valid && form.setField('NOMBRES', e.target.value)
          }
          error={form.errors.NOMBRES}
        />
        <Input
          label="Apellidos"
          value={values.APELLIDOS!}
          pattern={patterns.onlyLetters}
          onChange={e =>
            e.target.validity.valid && form.setField('APELLIDOS', e.target.value)
          }
          error={form.errors.APELLIDOS}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          type='email'
          label="Email"
          {...form.inputProps('EMAIL')}
        />
        <InputCleave
          type="phone"
          label="Teléfono"
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
          onChange={({ value }) => form.setField('DISTRITO', value)}
          dataExtractor={{ label: 'NOMB_DIST_TDI', value: 'CODI_DIST_TDI' }}
        />
      </div>

      <div>
        <Input
          label="Dirección legal"
          {...form.inputProps('DOMICILIO_LEGAL')}
        />
      </div>

      <EspecializacionForm />
      <ExperienciaForm />

      <div className="flex items-center justify-between mt-auto">
        <button
          type="button"
          onClick={() => {
            loadProfesional(values)
            back()
          }}
          className="btn btn-outline-primary"
        >
          Regresar
        </button>
        <button type="submit" className="btn btn-solid-primary">
          Siguiente
        </button>
      </div>
    </form>
  )
}

export default ProfesionalResponsableForm
