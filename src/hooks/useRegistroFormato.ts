import { useState } from 'react'
import {
  useCreateRegistroFormatoMutation,
  useCreateRegistroReporteMutation,
  useUpdateRegistroReporteMutation
} from '@generated/graphql'
import { RegistroReporteState } from '@modules/registro-reporte/solicitar-tramite/interfaces'
import useToast from './useToast'

const useRegistroFormatoMutation = () => {
  const [isLoading, setIsLoading] = useState(false)
  // const toast = useToast()
  const [, createSolicitud] = useCreateRegistroReporteMutation()
  const [, updateSolicitud] = useUpdateRegistroReporteMutation()
  const [, createReporteTratamientos] = useCreateRegistroFormatoMutation()

  const createRegistroReporte = async (values: RegistroReporteState) => {
    setIsLoading(true)
    const toast = useToast()
    console.log('entro create or update', values.datosGenerales.ID)

    let identidad = 0
    let expediente = ''

    if (values.datosGenerales.ID) {
      const { data: dataPro } = await updateSolicitud({
        input: { ...values.datosGenerales }
      })
      identidad = dataPro?.updateRegistroReporte.informacion?.ID!
      expediente = dataPro?.updateRegistroReporte.informacion?.EXPEDIENTE!
      toast({
        type: 'success',
        title: 'Exitoso !!',
        desc: 'Hemos Actualizado el Reporte con éxito.'
      })
    } else {
      const { data: dataPro } = await createSolicitud({
        input: { ...values.datosGenerales }
      })
      identidad = dataPro?.createRegistroReporte.informacion?.ID!
      expediente = dataPro?.createRegistroReporte.informacion?.EXPEDIENTE!
      toast({
        type: 'success',
        title: 'Exitoso !!',
        desc: 'Hemos Registrado el Reporte con éxito.'
      })
    }
    // expediente = values.datosGenerales.EXPEDIENTE?
    // REGISTROS VARIOS reportes tratamientos
    await Promise.all([
      createReporteTratamientos({
        input: values.registroFormato.map(({ ind, ...data }, index) => ({
          ...data,
          ID_REPORTE: identidad!
        }))
      })
    ])

    setIsLoading(false)
    return expediente
  }

  return { isLoading, createRegistroReporte }
}

export default useRegistroFormatoMutation
