import Input from '@components/shared/Input'
import InputCleave from '@components/shared/InputCleave'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'
import { useGetDatosRuc } from '@graphql/api/GetDatosRuc'
import useForm from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import useToast from '@hooks/useToast'
import { textResponsable } from '@modules/registro-productor/utils/textContent'
import datosGeneralesValid from '@modules/solicitud-autorizacion/validation/datosGeneralesValid'
import { SideMultistepComponentProps as props } from '@pages/solicitud-autorizacion'
import React, { useState } from 'react'
import { useRegistroSolicitud } from '../../store/useRegistroAutorizacion'
import { useGetDatosReniec } from '@graphql/api/GetDatosReniec'
import { sedesOptions } from '@utils/textSedes'

const DatosGeneralesForm = ({ next }: props) => {
  const [currentRadioValue] = useState<string>('')

  const toast = useToast()
  const store = useRegistroSolicitud()
  const { values, ...form } = useForm({
    validate: (values) => datosGeneralesValid(values, currentRadioValue),
    initialValues: store.state.datosGenerales
  })

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO,
    codProv: values.PROVINCIA
  })

  const sedes = sedesOptions

  const handleruc = async () => {
    const res = await useGetDatosRuc(values.RUC)
    if (res) {
      form.setFields({
        RAZON_SOCIAL: res?.nombreRazonSocial,
        ROLPREASIGNADO: '0'
      })
      toast({ title: 'Se encontro RUC ingresado', type: 'success' })
    } else {
      toast({ title: 'No se encontro RUC ingresado', type: 'warning' })
    }
  }

  const handleDNI = async () => {
    const res = await useGetDatosReniec(values.DNI)
    console.log(res)

    if (res) {
      form.setFields({
        REPRESENTANTE_LEGAL: res?.nombreRazonSocial
      })
      toast({ title: 'Se encontro DNI ingresado', type: 'success' })
    } else {
      toast({ title: 'No se encontro DNI ingresado', type: 'warning' })
    }
  }

  const handleSubmit = () => {
    // const response = datos.data?.isDocumentoUnique
    // if (response) {
     values.ESTADO = '1'
     store.loadDatosGenerales(values)
     console.log(values)

    // submitprueba()
    next()
    // } else {
    //   toast({
    //     title: 'Ya existe un Resonsable con este numero de documento',
    //     type: 'error'
    //   })
    // }
  }

  return (
    <form className="flex flex-col gap-6"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <div className="border-b dark:border-b-slate-700">

        <p className="font-medium text-slate-400">
          {textResponsable.titleForm}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="N° RUC"
          // value={values.RUC}
          // type="ruc"
          {...form.inputProps('RUC')}
          // maxLength={handleMaxLen()}
          pattern="[0-9]{0,11}"
          // onChange={(e) => {
          //   e.target.validity.valid &&
          //     form.setField('NUMERO_DOCUMENTO', e.target.value)
          // }}
          error={form.errors.RUC}
        />

        <button className="self-end btn btn-solid-primary"
          onClick={handleruc}>
          Consultar Sunat
        </button>
      </div>
      <div>
        <Input
          label="Razon social"
          type="razon"
          {...form.inputProps('RAZON_SOCIAL')}
          // value={values.RAZON_SOCIAL!}
          // pattern={patterns.onlyLetters}
          // onChange={(e) =>
          //   e.target.validity.valid &&
          //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
          // }
          error={form.errors.RAZON_SOCIAL}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="DNI"
          // value={values.DNI!}
          {...form.inputProps('DNI')}
          // pattern={patterns.onlyLetters}
          // onChange={(e) =>
          //   e.target.validity.valid &&
          //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
          // }
          error={form.errors.DNI}
        />

        <button className="self-end btn btn-solid-primary"
          onClick={handleDNI}>
          Buscar
        </button>

      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">

        <Input
          label="Representante Legal"
          // value={values.REPRESENTANTE_LEGAL!}
          {...form.inputProps('REPRESENTANTE_LEGAL')}
          // pattern={patterns.onlyLetters}
          // onChange={(e) =>
          //   e.target.validity.valid &&
          //   form.setField('APELLIDOS_SOLICITANTE', e.target.value)
          // }
          error={form.errors.REPRESENTANTE_LEGAL}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
        <Input
          label="Domicilio del representante legal"
          // value={values.DOMICILIO!}
          {...form.inputProps('DOMICILIO')}
          // pattern={patterns.onlyLetters}
          // onChange={(e) =>
          //   e.target.validity.valid &&
          //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
          // }
          error={form.errors.DOMICILIO}
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          type="email"
          label="Correo Electrónico"
          {...form.inputProps('CORREO')}
        />
        <InputCleave
          type="phone"
          label="Numero Telefónico"
          {...form.inputProps('TELEFONO')}
        />
      </div>
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          {'Sede donde operará la camara de tratamiento y/o Planta fabricación de embalajes de madera'}
        </p>
      </div>
      <SelectWithFilter
        withFilter
        label="Seleccionar Sede"
        value={values.SEDE_OPERADOR!}
        error={form.errors.DEPARTAMENTO}
        onChange={({ value }) => form.setField('SEDE_OPERADOR', value)}
        options={sedes}
      />
      <button type="submit" className="self-end btn btn-solid-primary">
        Guardar y Siguiente
      </button>

    </form>
  )
}

export default DatosGeneralesForm
