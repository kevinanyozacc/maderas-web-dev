import React, { useState } from 'react'
import Input from '@components/shared/Input'
import InputCleave from '@components/shared/InputCleave'
import RadioButton from '@components/shared/RadioButon'
import useForm from '@hooks/useForm'
import useToast from '@hooks/useToast'
import { textResponsable } from '@modules/registro-productor/utils/textContent'
import { SideMultistepComponentProps as props } from '@pages/solicitud-baja'
import { useBajaSolicitud } from '../../store/useBajaSolicitud'
import datosGeneralesValid from '@modules/solicitud-baja/validation/datosGeneralesValid'
import { useGetSolicitudByNimf } from '@graphql/api/GetDatosByNimf'
import { SolicitudAutorizacionInput } from '@generated/graphql'
import { useGetResponsableByDni } from '@graphql/api/GetResponsableByDni'
import { classNames } from '@utils/classNames'

interface IResponsable {
  DNI: string,
  APENOMB: string,
  ESTADO: string,
  ID: number,

}

const DatosGeneralesForm = ({ next, submit }: props) => {
  const [sdata, setsSdata] = useState<SolicitudAutorizacionInput>()
  const [sdataresponsable, setsSdataresponsable] = useState<IResponsable>()
  const [first, setfirst] = useState('')
  const [colorstyle, setColorstyle] = useState('')
  const toast = useToast()
  const store = useBajaSolicitud()
  const { values, isChanged, setIsChanged, ...form } = useForm({
    validate: (values) => datosGeneralesValid(values),
    initialValues: store.state.datosGenerales
  })

  function colorDoc (est: string): string {
    if (est === '1') return 'text-blue-600 bg-blue-200'
    if (est === '2') return 'text-green-600 bg-green-200'
    if (est === '3') return 'text-orange-500 bg-orange-200'
    if (est === '4') return 'text-red-600 bg-red-200'

    return est
  }

  function estadoDoc (est: string): string {
    if (est === '1') return 'EN TRAMITE'
    if (est === '2') return 'AUTORIZADO'
    if (est === '3') return 'DENEGADO'
    if (est === '4') return 'OBSERVADO'
    return est
  }

  const handleGetDatosNimf = async () => {
    const data = await useGetSolicitudByNimf(values.CODIGO_NIMF)
    console.log('a', data.data.getSolicitudByNimf)
    if (!data.data.getSolicitudByNimf!) {
      toast({ type: 'warning', title: 'No se encontró el Empresa, revisar Codigo Nimf: ' })
    } else {
      toast({ type: 'success', title: 'Se encontró informacion de la Empresa: ' })
      // setEstadoDatos(data?.data?.getBajaSolicitudByExp)
      setsSdata(data.data.getSolicitudByNimf)
      form.setFields({ CODIGO_SA: data.data.getSolicitudByNimf.ID || '' })
      // toggle.onOpen()
      console.log('data', sdata)
    }
  }

  const handleResponsableByDni = async () => {
    const { data } = await useGetResponsableByDni(values.DNI_RESPONSABLE)
    console.log(data)

    if (data?.getResponsableSolicitud!) {
      setsSdataresponsable(data.getResponsableSolicitud)
       setfirst(estadoDoc(data?.getResponsableSolicitud.ESTADO))
       setColorstyle(colorDoc(data?.getResponsableSolicitud.ESTADO))
       form.setFields({ ID_RESPONSABLE: data.getResponsableSolicitud.ID })
      toast({ title: 'Se encontro DNI ingresado', type: 'success' })
    } else {
      // setfirst('')
      // setColorstyle('')
      toast({ title: 'El DNI ingresado no se encuentra en los datos de Responsables Técnicos', type: 'warning' })
    }
  }

  const handleSubmit = () => {
    // const response = datos.data?.isDocumentoUnique
    if (values.FECHA_BAJA) {
      const fechaTermino = new Date(`${values.FECHA_BAJA.slice(3, 5)} ${values.FECHA_BAJA.slice(0, 2)}, ${values.FECHA_BAJA.slice(-4)}`)
      values.FECHA_BAJA = fechaTermino.toISOString().slice(0, 10)
    } else {
      values.FECHA_BAJA = null
    }
    console.log(first)
    if (!values.DNI_RESPONSABLE) {
      values.ID_RESPONSABLE = null
    }

    if (first !== 'AUTORIZADO' && values.TIPO_SOLICITUD === 'SRT') {
      toast({ title: 'El Responsable Tecnico no se encuentra autorizado para la solicitud.', type: 'warning' })
    } else {
      // values.DNI_RESPONSABLE = ''
      // values.ID_RESPONSABLE = null
      store.loadDatosGenerales(values)
      console.log(values)
      submit()
    }
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Input
          label="Código NIMF-15"
          {...form.inputProps('CODIGO_NIMF')}
          error={form.errors.CODIGO_NIMF}
        />
        <button className="self-end btn btn-solid-primary"
          onClick={handleGetDatosNimf}
          type='button'
        >
          Consultar
        </button>

      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Razon social"
          type="razon"
          value={sdata?.RAZON_SOCIAL}
          readOnly
        />
        <Input
          label="Dirección"
          value={sdata?.DOMICILIO}
          readOnly
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <RadioButton
          value={values.TIPO_SOLICITUD}
          className="flex flex-col gap-3"
          onChange={(value) => {
            form.setField('TIPO_SOLICITUD', value)
            !isChanged && setIsChanged(true)
          }}
          options={[
            { label: 'Solicitud de Baja de autorización', value: 'SBA' },
            { label: 'Solicitud de Baja de Responsable Técnico', value: 'SBR' },
            { label: 'Solicitud de nuevo Responsable Técnico', value: 'SRT' }
          ]}
        />
      </div>

      {values.TIPO_SOLICITUD === 'SBA' ? (
        <>
          <div className="border-b dark:border-b-slate-700">
            <p className="font-medium text-slate-400">
              {'Solicitud de Baja de autorización'}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputCleave
              label="Fecha fin operación (DD-MM-AAAA)"
              {...form.inputProps('FECHA_BAJA')}
            />
          </div>
        </>
      ) : (
        <div></div>
      )}

      {values.TIPO_SOLICITUD === 'SBR' ? (
        <>
          <div className="border-b dark:border-b-slate-700">
            <p className="font-medium text-slate-400">
              {'Solicitud de Baja de Responsable Técnico'}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputCleave
              label="Fecha fin operación RT(DD-MM-AAAA)"
              {...form.inputProps('FECHA_BAJA')}
            />
          </div>
        </>
      ) : (
        <div></div>
      )}

      {values.TIPO_SOLICITUD === 'SRT' ? (
        <>
          <div className="border-b dark:border-b-slate-700">
            <p className="font-medium text-slate-400">
              {'Solicitud de nuevo Responsable Técnico'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Input
              label="DNI"
              // value={values.DNI!}
              {...form.inputProps('DNI_RESPONSABLE')}
            // pattern={patterns.onlyLetters}
            // onChange={(e) =>
            //   e.target.validity.valid &&
            //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
            // }
            // error={"Igrese DNI"}
            />
            <button className="self-end btn btn-solid-primary"
              onClick={handleResponsableByDni}
              type='button'
            >
              Consultar
            </button>

          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
              label="Nombre y Apellido"
              value={sdataresponsable?.APENOMB}
              readOnly
            />

            <div
          className={classNames([
            colorstyle,
            ' text-center font-semibold py-1 px-4 rounded-full whitespace-nowrap'
          ])}
        >
          <div className='mt-3'>{first}</div>
        </div>
          </div>
        </>
      ) : (
        <div></div>
      )}

      <button type="submit" className="self-end btn btn-solid-primary">
        Guardar
      </button>

    </form>
  )
}

export default DatosGeneralesForm
