import Input from '@components/shared/Input'
import Select from '@components/shared/Select'
import InputCleave from '@components/shared/InputCleave'

import useForm from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import { datosGeneralesCultComValid } from '../../../validation/datosGeneralesValid'
import { SideMultistepComponentProps as Props } from '@pages/cultivares-comerciales'
import { useCultivaresComerciales } from '../../store/useCultivaresComerciales'
import { patterns } from '@utils/patterns'
// import { classNames } from '@utils/classNames'
import useDocumentUnique from '@hooks/useIsDocumentUnique'
import { TipoSolicitudExpedientes } from '@generated/graphql'
import useToast from '@hooks/useToast'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'
import { useEffect, useState } from 'react'
import InputRadio from '@components/shared/InputRadio'
import { isEmpty } from '@utils/isEmpty'
import { checkJuridico } from '@utils/checkJuridico'
import { validRuc } from '@utils/validRuc'

const DatosGeneralesForm = ({ next }: Props) => {
  // Estado para el input radio
  const [currentRadioValue, setCurrentRadioValue] = useState<string>('')

  const toast = useToast()
  const store = useCultivaresComerciales()

  const { values, ...form } = useForm({
    validate: (values) => datosGeneralesCultComValid(values, currentRadioValue),
    initialValues: store.state.datosGenerales
  })
  useEffect(() => {
    const ruc = store.state.datosGenerales.NUMERO_DOCUMENTO
    const isJudirico = checkJuridico(ruc)
    const isValidRuc = validRuc(ruc)

    if (!isEmpty(ruc)) {
      if (isValidRuc && isJudirico) {
        setCurrentRadioValue('persona-juridica')
      }
      if (isValidRuc && !isJudirico) {
        setCurrentRadioValue('persona-natural')
      }
    }
  }, [])
  useEffect(() => {
    if (currentRadioValue === 'persona-juridica') {
      form.setFields({
        NOMBRES_SOLICITANTE: '',
        APELLIDOS_SOLICITANTE: ''
      })
    }
    if (currentRadioValue === 'persona-natural') {
      form.setFields({
        RAZON_SOCIAL: '',
        APELLIDO_REPRESENTANTE: '',
        DNI_REPRESENTANTE: '',
        EMAIL_REPRESENTANTE: '',
        PARTIDA_REGISTRAL: '',
        NOMBRE_REPRESENTANTE: ''
      })
    }
  }, [currentRadioValue])
  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO,
    codProv: values.PROVINCIA
  })

  const { datos } = useDocumentUnique({
    nroDocumento: values.NUMERO_DOCUMENTO,
    tipoDocumento: values.TIPO_DOCUMENTO,
    tipoSolicitud: TipoSolicitudExpedientes.RegistroCultivarComercial
  })

  const handleSubmit = () => {
    const response = datos.data?.isDocumentoUnique
    if (response) {
      store.loadDatosGenerales(values)
      next()
    } else {
      toast({
        title: 'Ya existe un expediente con este numero de documento',
        type: 'error'
      })
    }
  }

  // const isRuc = values.TIPO_DOCUMENTO === 'RUC'

  const handleMaxLen = () => {
    if (values.TIPO_DOCUMENTO === 'RUC') return 11
    if (values.TIPO_DOCUMENTO === 'CE') return 9
    if (values.TIPO_DOCUMENTO === 'DNI') return 8
    return 8
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Datos del Solicitante</p>
      </div>

      <InputRadio
        option={[
          { label: 'Persona Jurídica', value: 'persona-juridica' },
          { label: 'Persona Natural', value: 'persona-natural' }
        ]}
        currentRadioValue={currentRadioValue}
        setCurrentRadioValue={setCurrentRadioValue}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Select
          label="Tipo de documento"
          value={values.TIPO_DOCUMENTO}
          error={form.errors.TIPO_DOCUMENTO}
          onChange={({ value }) => {}}
          options={[{ label: 'RUC', value: 'RUC' }]}
        />
        <Input
          label="N° de documento"
          value={values.NUMERO_DOCUMENTO}
          maxLength={handleMaxLen()}
          pattern="[0-9]{0,11}"
          onChange={(e) => {
            e.target.validity.valid &&
              form.setField('NUMERO_DOCUMENTO', e.target.value)
          }}
          error={form.errors.NUMERO_DOCUMENTO}
        />
      </div>

      {currentRadioValue === 'persona-juridica' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input label="Razón Social" {...form.inputProps('RAZON_SOCIAL')} />

          <Input
            label="N° Partida Registral"
            {...form.inputProps('PARTIDA_REGISTRAL')}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="Nombres"
              value={values.NOMBRES_SOLICITANTE!}
              pattern={patterns.onlyLetters}
              onChange={(e) =>
                e.target.validity.valid &&
                form.setField('NOMBRES_SOLICITANTE', e.target.value)
              }
              error={form.errors.NOMBRES_SOLICITANTE}
            />
            <Input
              label="Apellidos"
              value={values.APELLIDOS_SOLICITANTE!}
              pattern={patterns.onlyLetters}
              onChange={(e) =>
                e.target.validity.valid &&
                form.setField('APELLIDOS_SOLICITANTE', e.target.value)
              }
              error={form.errors.APELLIDOS_SOLICITANTE}
            />
          </div>
          {/* <Input label="Razón Social" {...form.inputProps('RAZON_SOCIAL')} /> */}
        </>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          type="email"
          label="Email"
          {...form.inputProps('EMAIL_SOLICITANTE')}
        />
        <InputCleave
          type="phone"
          label="Teléfono"
          {...form.inputProps('TELEFONO_SOLICITANTE')}
        />
      </div>

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

      {/* <Input label="Dirección legal" {...form.inputProps('DOMICILIO_LEGAL')} /> */}
      <div>
        <Input
          label="Dirección legal"
          {...form.inputProps('DOMICILIO_LEGAL')}
        />
        <p
          className={`text-[14px] text-primary-500 ${
            form.errors.DOMICILIO_LEGAL ? 'mt-4' : 'mt-1'
          } `}
        >
          {currentRadioValue === 'persona-juridica'
            ? 'El domicilio legal debe ser la misma que como fue inscrita en Registros públicos.'
            : 'La dirección debe ser la misma que aparece en su DNI'}
        </p>
      </div>

      {currentRadioValue === 'persona-juridica' && (
        <>
          <div className="border-b dark:border-b-slate-700">
            <p className="font-medium text-slate-400">
              Datos del Representante Legal
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Nombres"
              value={values.NOMBRE_REPRESENTANTE!}
              pattern={patterns.onlyLetters}
              onChange={(e) =>
                e.target.validity.valid &&
                form.setField('NOMBRE_REPRESENTANTE', e.target.value)
              }
              error={form.errors.NOMBRE_REPRESENTANTE}
            />
            <Input
              label="Apellidos"
              value={values.APELLIDO_REPRESENTANTE!}
              pattern={patterns.onlyLetters}
              onChange={(e) =>
                e.target.validity.valid &&
                form.setField('APELLIDO_REPRESENTANTE', e.target.value)
              }
              error={form.errors.APELLIDO_REPRESENTANTE}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input label="Email" {...form.inputProps('EMAIL_REPRESENTANTE')} />
            <Input
              label="N° de DNI"
              maxLength={handleMaxLen()}
              {...form.inputProps('DNI_REPRESENTANTE')}
              pattern="[0-9]{0,8}"
              onChange={(e) => {
                e.target.validity.valid &&
                  form.setField('DNI_REPRESENTANTE', e.target.value)
              }}
              error={form.errors.DNI_REPRESENTANTE}
            />
          </div>{' '}
        </>
      )}

      <button type="submit" className="self-end btn btn-solid-primary">
        Siguiente
      </button>
    </form>
  )
}

export default DatosGeneralesForm
