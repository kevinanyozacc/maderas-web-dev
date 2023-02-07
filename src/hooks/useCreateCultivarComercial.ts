import { useState } from 'react'
import {
  useCreateExpedienteMutation,
  useCreateSolicitanteMutation,
  TipoSolicitudExpedientes,
  useCreateCultivarComercialMutation,
  useCreateInfoEnsayoMutation,
  useCreateMantenimientoSemillaMutation,
  useCreateLocalidadEnsayoMutation
} from '@generated/graphql'

import useToast from './useToast'
import { ErrorMessages } from '@validation/messages'
import { CultivaresComercialesState } from '@modules/cultivares-comerciales/solicitar-tramite/interfaces/cultivaresComerciales'

const useCreateCultivarComercial = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const [, createExpediente] = useCreateExpedienteMutation()
  const [, createSolicitante] = useCreateSolicitanteMutation()

  const [, createCultivar] = useCreateCultivarComercialMutation()
  const [, createInfoEnsayo] = useCreateInfoEnsayoMutation()
  const [, createLocalidadEns] = useCreateLocalidadEnsayoMutation()
  const [, createMantenSemillas] = useCreateMantenimientoSemillaMutation()

  const createRegistroProductor = async (
    values: CultivaresComercialesState
  ) => {
    setIsLoading(true)

    const { data } = await createExpediente({
      input: {
        TIPO_SOLICITUD: TipoSolicitudExpedientes.RegistroCultivarComercial,
        DEPARMENTO_ID: values.datosGenerales.DEPARTAMENTO,
        PROVINCIA_ID: values.datosGenerales.PROVINCIA,
        DISTRITO_ID: values.datosGenerales.DISTRITO
      }
    })

    if (!data?.createExpediente?.expedienteId) {
      toast({ title: ErrorMessages.error, type: 'error' })
      return
    }

    const expedienteId = data.createExpediente.expedienteId

    const {
      nameEspecie,
      rangoAdapMax,
      rangoAdapMin,
      FECHA_INTERNAMIENTO,
      ...datCul
    } = values.datosCultivar

    // REGISTROS VARIOS
    await Promise.all([
      createSolicitante({
        input: {
          ...values.datosGenerales,
          EXPEDIENTE_ID: expedienteId
        }
      }),
      createCultivar({
        input: {
          ...datCul,
          EXPEDIENTE_ID: expedienteId,
          RANGO_ADAPTACION: `${rangoAdapMin}@${rangoAdapMax}`,
          FECHA_INTERNAMIENTO: FECHA_INTERNAMIENTO
            ? `${FECHA_INTERNAMIENTO.slice(3, 5)} ${FECHA_INTERNAMIENTO.slice(
                0,
                2
              )}, ${FECHA_INTERNAMIENTO.slice(-4)}`
            : null
        }
      }),
      createInfoEnsayo({
        input: {
          ...values.infoEnsayos,
          AMBITO_GEOGRAFICO: values.desarrolloCultivar.toString(),
          FINALIDAD_USO: values.finalidadUso.toString(),
          RANGO_ADAPTACION: JSON.stringify(
            values.rangosAdaptacion.map(({ id, ...data }) => ({ ...data }))
          ),
          EXPEDIENTE_ID: expedienteId
        }
      }),
      createLocalidadEns({
        input: values.localidadEnsayos.map(({ id, ...data }) => ({
          ...data,
          EXPEDIENTE_ID: expedienteId
        }))
      }),
      createMantenSemillas({
        input: {
          ...values.mantenimientoSemilla,
          EXPEDIENTE_ID: expedienteId
        }
      })
    ])

    setIsLoading(false)
    return expedienteId
  }

  return { isLoading, createRegistroProductor }
}

export default useCreateCultivarComercial
