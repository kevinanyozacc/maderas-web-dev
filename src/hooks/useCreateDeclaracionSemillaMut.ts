import { useState } from 'react'
import {
  TipoSolicitudExpedientes,
  useCreateAlmacenMutation,
  useCreateExpedienteMutation,
  useCreateInfoCultivoMutation,
  useCreateSolicitanteMutation,
  useCreateSucursalMutation
} from '@generated/graphql'

import { DeclaracionSemillaState } from '@modules/declaracion-semilla/solicitar-tramite/interfaces/declaracionSemilla'

import useToast from './useToast'

const useCreateDeclaracionSemillaMut = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const [, createExpediente] = useCreateExpedienteMutation()
  const [, createSolicitante] = useCreateSolicitanteMutation()
  const [, createInfoCultivo] = useCreateInfoCultivoMutation()
  const [, createSucursal] = useCreateSucursalMutation()
  const [, createAlmacen] = useCreateAlmacenMutation()

  const createDeclaracionSemilla = async (values: DeclaracionSemillaState) => {
    setIsLoading(true)

    const { data } = await createExpediente({
      input: {
        TIPO_SOLICITUD: TipoSolicitudExpedientes.DeclaracionSemilla,
        DEPARMENTO_ID: values.datosGenerales.DEPARTAMENTO,
        PROVINCIA_ID: values.datosGenerales.PROVINCIA,
        DISTRITO_ID: values.datosGenerales.DISTRITO
      }
    })

    if (!data?.createExpediente?.expedienteId) {
      toast({ title: 'Error al crear la declaracion de semilla', type: 'error' })
      return
    }

    const expedienteId = data.createExpediente.expedienteId

    await Promise.all([
      createSolicitante({
        input: {
          ...values.datosGenerales,
          EXPEDIENTE_ID: expedienteId
        }
      }),
      createInfoCultivo({
        input: values.informacionCultivos.map(({ id, ...data }) => ({
          ESPECIE_ID: data.ESPECIE_ID,
          CULTIVO_ID: data.CULTIVO_ID,
          CULTIVO_REGLAMENTARIO: data.CULTIVO_REGLAMENTARIO,
          INFORMACION_CULTIVO_ID: 0,
          EXPEDIENTE_ID: expedienteId
        }))
      }),
      createSucursal({
        input: values.sucursales.map(({ id, nameDep, nameDis, nameProv, ...data }) => ({
          ...data,
          EXPEDIENTE_ID: expedienteId
        }))
      }),
      createAlmacen({
        input: values.almacen.map(({ id, nameDep, nameDis, nameProv, ...data }) => ({
          ...data,
          EXPEDIENTE_ID: expedienteId
        }))
      })
    ])

    setIsLoading(false)
    return expedienteId
  }

  return { isLoading, createDeclaracionSemilla }
}

export default useCreateDeclaracionSemillaMut
