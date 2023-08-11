import { useState } from 'react'
import {
  useCreateConocimientoMutation,
  useCreateInformacionResponsableMutation,
  useCreateInformacionSolicitudMutation,
  useCreateResponsableMutation,
  useCreateSolicitanteMutation,
  useCreateSolicitudAutorizacionMutation
} from '@generated/graphql'
import { SolicitudAutorizacionState } from '@modules/solicitud-autorizacion/solicitar-tramite/interfaces'

const useRegistroSolicitudMutation = () => {
  const [isLoading, setIsLoading] = useState(false)
  //const toast = useToast()
  //const [, createExpediente] = useCreateExpedienteMutation()
  //const [, createResponsable] = useCreateResponsableMutation()
  const [, createSolicitud] = useCreateSolicitudAutorizacionMutation()
  const [, createinformacionSolicitud] = useCreateInformacionSolicitudMutation()

  const createRegistroSolicitudAutorizacion = async (values: SolicitudAutorizacionState) => {
    setIsLoading(true)

    console.log(values);
    
    const expedienteId = ''

    const { data: dataPro } = await createSolicitud({
      input: { ...values.datosGenerales }
    })

    const responsableid =
      dataPro?.createSolicitudAutorizacion.informacion?.ID!

    const expediente =
      dataPro?.createSolicitudAutorizacion.informacion?.EXPEDIENTE!

    // REGISTROS VARIOS
    await Promise.all([
      createinformacionSolicitud({
        input: {
          ...values.informacionSolicitud
          //REGISTROID: responsableid
          // EXPEDIENTE_ID: expedienteId
        }
      }),
    ])

    setIsLoading(false)
    return expediente
  }

  return { isLoading, createRegistroSolicitudAutorizacion }
}

export default useRegistroSolicitudMutation
