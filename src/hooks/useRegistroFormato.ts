import { useState } from 'react'
import {
  useCreateRegistroFormatoMutation,
  useCreateRegistroReporteMutation,
} from '@generated/graphql'
import { RegistroReporteState } from '@modules/registro-reporte/solicitar-tramite/interfaces'

const useRegistroFormatoMutation = () => {
  const [isLoading, setIsLoading] = useState(false)
  //const toast = useToast()
  const [, createSolicitud] = useCreateRegistroReporteMutation()
  const [, createSensores] = useCreateRegistroFormatoMutation()

  const createRegistroReporte = async (values: RegistroReporteState) => {
    setIsLoading(true)

    console.log(values);
    
    const expedienteId = ''

    const { data: dataPro } = await createSolicitud({
      input: { ...values.datosGenerales }
    })

    const solicitudid =
      dataPro?.createRegistroReporte.informacion?.ID!

    const expediente =
      dataPro?.createRegistroReporte.informacion?.EXPEDIENTE!

    // REGISTROS VARIOS
    await Promise.all([
      createSensores({
        input: values.registroFormato.map(({ ind, ...data },index) => ({
          ...data,
          ID_REPORTE: solicitudid,
          //NUMERO: 
          //
        }))
      })
    ])

    setIsLoading(false)
    return expediente
  }

  return { isLoading, createRegistroReporte }
}

export default useRegistroFormatoMutation
