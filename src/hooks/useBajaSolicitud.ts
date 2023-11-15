import { useState } from 'react'
import {
  useCreateBajaSolicitudMutation
} from '@generated/graphql'
import { bajasolicitudState } from '@modules/solicitud-baja/solicitar-tramite/interfaces'

const useBajaSolicitudMutation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [, createBajaSolicitud] = useCreateBajaSolicitudMutation()
  const createRegistroBajaSolicitud = async (values: bajasolicitudState) => {
    setIsLoading(true)
    const { data: dataPro } = await createBajaSolicitud({
      input: { ...values.datosGenerales }
    })

    const expediente =
      dataPro?.createBajaSolicitud.informacion?.EXPEDIENTE!

    setIsLoading(false)
    return expediente
  }

  return { isLoading, createRegistroBajaSolicitud }
}

export default useBajaSolicitudMutation
