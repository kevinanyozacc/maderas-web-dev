import { useEffect, useState } from 'react'

import Input from '@components/shared/Input'
import Select from '@components/shared/Select'
import InputCleave from '@components/shared/InputCleave'
import WarningAlert from '@components/shared/WarningAlert'

import useForm from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'

import { SideMultistepComponentProps as Props } from '@pages/declaracion-semilla/actualizar-tramite'
import { SolicitanteInput } from '@generated/graphql'
import { datosGeneralesValid } from '../../../validation/datosGeneralesValid'
import useUpdateDeclaracionSemilla from '@hooks/useUpdateDeclaracionSemilla'
import ButtonsForm from '@components/shared/ButtonsForm'
// import { classNames } from '@utils/classNames'
import { patterns } from '@utils/patterns'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'
import InputRadio from '@components/shared/InputRadio'
import { isEmpty } from '@utils/isEmpty'
import { checkJuridico } from '@utils/checkJuridico'
import { validRuc } from '@utils/validRuc'

const initialValues: SolicitanteInput = {
  SOLICITANTE_ID: 0,
  RAZON_SOCIAL: '',
  PARTIDA_REGISTRAL: '',
  NOMBRES_SOLICITANTE: '',
  APELLIDOS_SOLICITANTE: '',
  TELEFONO_SOLICITANTE: '',
  TIPO_DOCUMENTO: '',
  NUMERO_DOCUMENTO: '',
  DOMICILIO_LEGAL: '',
  DISTRITO: '',
  DEPARTAMENTO: '',
  PROVINCIA: '',
  EMAIL_SOLICITANTE: '',
  NOMBRE_REPRESENTANTE: '',
  APELLIDO_REPRESENTANTE: '',
  EMAIL_REPRESENTANTE: '',
  EXPEDIENTE_ID: 0,
  DNI_REPRESENTANTE: ''
}

const DatosGeneralesForm = ({ next, registroId }: Props) => {
  const [isChangedForm, setIsChangedForm] = useState(false)
  const { fetching, SOLICITANTE, updateSolicitante, observacion } =
    useUpdateDeclaracionSemilla(registroId)
  const [currentRadioValue, setCurrentRadioValue] = useState<string>('')

  const { values, isChanged, setIsChanged, ...form } = useForm({
    validate: (values) => datosGeneralesValid(values, currentRadioValue),
    initialValues
  })

  useEffect(() => {
    const ruc = SOLICITANTE?.NUMERO_DOCUMENTO
    const isJudirico = checkJuridico(ruc!)
    const isValidRuc = validRuc(ruc!)

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

  useEffect(() => {
    if (SOLICITANTE) {
      const {
        __typename,
        NOMBRE_DEPARTAMENTO,
        NOMBRE_PROVINCIA,
        NOMBRE_DISTRITO,
        ...rest
      } = SOLICITANTE
      form.setFields(rest)
    }
  }, [fetching !== true])

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO,
    codProv: values.PROVINCIA
  })

  const handleSubmit = () => {
    updateSolicitante(values)
    setIsChanged(false)
    setIsChangedForm(false)
  }

  // const isRuc = values.TIPO_DOCUMENTO === 'RUC'

  const handleMaxLen = () => {
    if (values.TIPO_DOCUMENTO === 'RUC') return 11
    if (values.TIPO_DOCUMENTO === 'CE') return 9
    if (values.TIPO_DOCUMENTO === 'DNI') return 8
    return 8
  }

  const handleDisable = () => {
    if (isChanged) return false
    if (isChangedForm) return false
    return true
  }
  useEffect(() => {
    const ruc = SOLICITANTE?.NUMERO_DOCUMENTO
    const isJudirico = checkJuridico(ruc!)
    if (isJudirico && currentRadioValue === 'persona-natural') {
      console.log('entre', isJudirico)
      setIsChangedForm(true)
    }
    if (!isJudirico && currentRadioValue === 'persona-juridica') {
      setIsChangedForm(true)
    }
  }, [currentRadioValue])

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      {!!observacion?.OBS_DATOS_GENERALES && (
        <WarningAlert message={observacion?.OBS_DATOS_GENERALES!} />
      )}
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Datos Solicitante</p>
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
          onChange={({ value }) => {
            // form.setFields({
            //   TIPO_DOCUMENTO: value,
            //   RAZON_SOCIAL: '',
            //   PARTIDA_REGISTRAL: '',
            //   NOMBRES_SOLICITANTE: '',
            //   APELLIDOS_SOLICITANTE: '',
            //   // NUMERO_DOCUMENTO: '',
            //   NOMBRE_REPRESENTANTE: '',
            //   APELLIDO_REPRESENTANTE: '',
            //   EMAIL_REPRESENTANTE: ''
            // })
          }}
          options={[
            // { label: 'DNI', value: 'DNI' },
            { label: 'RUC', value: 'RUC' }
            // { label: 'Carnet de Extranjeria', value: 'CE' }
          ]}
        />
        <Input
          label="N° de documento"
          value={values.NUMERO_DOCUMENTO}
          maxLength={handleMaxLen()}
          pattern="[0-9]{0,11}"
          onChange={(e) => {
            e.target.validity.valid &&
              form.setField('NUMERO_DOCUMENTO', e.target.value)
            setIsChangedForm(true)
          }}
          error={form.errors.NUMERO_DOCUMENTO}
        />
      </div>

      {currentRadioValue === 'persona-juridica' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input label="Razon Social" {...form.inputProps('RAZON_SOCIAL')} />

          <Input
            label="N° Partida Registral"
            {...form.inputProps('PARTIDA_REGISTRAL')}
          />
        </div>
      ) : (
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
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          type="email"
          label="Email"
          {...form.inputProps('EMAIL_SOLICITANTE')}
        />
        <InputCleave
          type="phone"
          label="Telefono"
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
          label="Direccion legal"
          {...form.inputProps('DOMICILIO_LEGAL')}
        />
      </div>

      {currentRadioValue === 'persona-juridica' && (
        <>
          <div className="border-b dark:border-b-slate-700">
            <p className="font-medium text-slate-400">
              Datos Representante Legal
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Nombres"
              value={values.NOMBRE_REPRESENTANTE!}
              pattern="[A-Za-z ]{0,70}"
              onChange={(e) => {
                e.target.validity.valid &&
                  form.setField('NOMBRE_REPRESENTANTE', e.target.value)
                setIsChangedForm(true)
              }}
              error={form.errors.NOMBRE_REPRESENTANTE}
            />
            <Input
              label="Apellidos"
              value={values.APELLIDO_REPRESENTANTE!}
              pattern="[A-Za-z ]{0,70}"
              onChange={(e) => {
                e.target.validity.valid &&
                  form.setField('APELLIDO_REPRESENTANTE', e.target.value)
                setIsChangedForm(true)
              }}
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
                setIsChangedForm(true)
              }}
              error={form.errors.DNI_REPRESENTANTE}
            />
          </div>
        </>
      )}

      <ButtonsForm isFirst next={next} handleDisable={handleDisable()} />
    </form>
  )
}

export default DatosGeneralesForm
