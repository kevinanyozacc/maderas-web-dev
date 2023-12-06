import React, { useMemo, useState } from 'react'
import { InformacionSolicitudInput, RegistroFormato, RegistroReporteInput, SolicitudAutorizacionInput } from '@generated/graphql'
import { useGetSolicitudTramiteByNimf } from '@graphql/api/GetSolicitudTramiteByNimf'
import { useGetReporteFormatoById } from '@graphql/api/GetReporteFormatobyid'
import RadioButton from '@components/shared/RadioButon'
import Select from '@components/shared/Select'
import Input from '@components/shared/Input'
import useForm from '@hooks/useForm'
import useToast from '@hooks/useToast'
import { textResponsable } from '@modules/registro-productor/utils/textContent'
import datosGeneralesValid from '@modules/registro-reporte/validation/datosGeneralesValid'
import { SideMultistepComponentProps as props } from '@pages/registro-reporte'
import { useRegistroReporte } from '../../store/useRegistroReporte'
import ReporteForm from '../Reportes/ReporteForm'
import moment from 'moment'

const DatosGeneralesForm = ({ next, submit }: props) => {
  const [sdatasolicitud, setsSdatasolicitud] = useState<SolicitudAutorizacionInput>()
  const [sdatainfsolicitud, setsSdatainfsolicitud] = useState<InformacionSolicitudInput>()
  const [sdatareporte, setsSdatareporte] = useState<RegistroReporteInput[]>()
  const [sdataformato, setsSdataformato] = useState<RegistroFormato[]>()
  const [idreporte] = useState('')
  const toast = useToast()
  const store = useRegistroReporte()
  const { values, isChanged, setIsChanged, ...form } = useForm({
    validate: (values) => datosGeneralesValid(values),
    initialValues: store.state.datosGenerales
  })

  const newdate = new Date()
  const mesnum = (moment(newdate, 'YYYY/MM/DD').month() + 1).toString()
  const mesname = setMes((moment(newdate, 'YYYY/MM/DD').month() + 1).toString())

  function getmes (date:any) {
    const newdate = date.substring(5, 7)
    return newdate
  }
  const handleGetDatosNimf = async () => {
    if (!values.CODIGO_NIMF) {
      toast({ type: 'warning', title: 'No se encontró el Empresa, revisar Codigo Nimf: ' })
      return
    }
    const { data } = await useGetSolicitudTramiteByNimf(values.CODIGO_NIMF)

    const datatramite = data?.getTramiteSolcitudByCodigoNimf!
    if (!datatramite.SOLICITUD) {
      toast({ type: 'warning', title: 'No se encontró el Empresa, revisar Codigo Nimf: ' })
    } else {
      toast({ type: 'success', title: 'Se encontró informacion de la Empresa: ' })
      setsSdatasolicitud(datatramite.SOLICITUD!)
      setsSdatainfsolicitud(datatramite.INFSOLICITUD!)
      setsSdatareporte(datatramite.REPORTE!)
      form.setFields({ ID_SOLICITUD: datatramite.SOLICITUD!.ID || '' })
    }
  }

  function setMes (est: string) {
    if (est === '1') return 'ENERO'
    if (est === '2') return 'FEBRERO'
    if (est === '3') return 'MARZO'
    if (est === '4') return 'ABRIL'
    if (est === '5') return 'MAYO'
    if (est === '6') return 'JUNIO'
    if (est === '7') return 'JULIO'
    if (est === '8') return 'AGOSTO'
    if (est === '9') return 'SETIEMBRE'
    if (est === '10') return 'OCTUBRE'
    if (est === '11') return 'NOVIEMBRE'
    if (est === '12') return 'DICIEMBRE'
    return ''
  }

  const especialistas = useMemo(() => {
    if (sdatareporte?.length) {
      return sdatareporte.map((item) => (
       {
        ...item,
        value: `${item.ID}`,
        label: `${setMes(item.FECHA_REGISTRO.substring(5, 7))}`
       }
      ))
    }
  }, [sdatareporte])

  const handleGetDatos = async (id: number) => {
    form.setFields({ ID: id })
    const { data } = await useGetReporteFormatoById(id)

    if (data?.getReporteFormatoById!) {
      setsSdataformato(data.getReporteFormatoById!)
    }
  }

  const handleSubmit = () => {
    store.loadDatosGenerales(values)
    console.log(values)
    submit()
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
          value={sdatasolicitud?.RAZON_SOCIAL}
          readOnly
        />
        <Input
          label="Dirección"
          value={sdatasolicitud?.DOMICILIO}
          readOnly
        />
      </div>
      <div className='hidden'>
        <input type="text" {...form.inputProps('ID')} />
        <input type="text" {...form.inputProps('EXPEDIENTE')}/>
        <input type="text" {...form.inputProps('ESTADO')}/>
      </div>

      {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Dirección"
           value={sdatasolicitud?.NOMBRE_DEPARTAMENTO!  sdatasolicitud?.PROVINCIA &&  sdatasolicitud?.DISTRITO}
          readOnly
        />
      </div> */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <RadioButton
          value={sdatainfsolicitud?.TIPOAUTORIZACION}
          className="flex flex-col gap-3"
          options={[
            { label: 'Reporte de tratamiento de camara de tratamiento', value: 'CT' },
            { label: 'Reporte de Fabricacion de embalajes de madera con tratamiento térmico', value: 'PF' }
          ]}
        />
      </div>

      {!sdatareporte?.length ? (
        <div>
          <Input
            label="MES"
            value={mesname}
            readOnly
          />
        </div>

      ) : (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Select
          label="Fecha Reporte"
          onChange={(e) => {
            handleGetDatos(Number(e.value))
          }}
          options={especialistas?.find((item) => getmes(item.FECHA_REGISTRO) === mesnum)
            ? especialistas : especialistas?.concat({ value: mesnum, label: mesname })
          }
        />
      </div>
      ) }
      <ReporteForm
        idreporte={idreporte}
        data={sdataformato!}
      />
      <button type="submit" className="self-end btn btn-solid-primary">
        Guardar
      </button>
    </form>
  )
}

export default DatosGeneralesForm
