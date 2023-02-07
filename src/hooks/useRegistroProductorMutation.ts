import { useState } from 'react'
import {
  useCreateExpedienteMutation,
  useCreateInfoCultivoMutation,
  useCreateSolicitanteMutation,
  useCreateTierraCultivosMutation,
  useCreateAcondicionamientoMutation,
  useCreateProfesionalMutation,
  useCreateExperienciasMutation,
  useCreateEspecializacionesMutation,
  TipoSolicitudExpedientes,
  useCreateAnalisisCalidadMutation
} from '@generated/graphql'

import { RegistroProductorState } from '@modules/registro-productor/solicitar-tramite/interfaces'

import useToast from './useToast'

const useRegistroProductorMutation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const [, createExpediente] = useCreateExpedienteMutation()
  const [, createSolicitante] = useCreateSolicitanteMutation()
  const [, createInfoCultivo] = useCreateInfoCultivoMutation()
  const [, createProfesional] = useCreateProfesionalMutation()
  const [, createExperiencias] = useCreateExperienciasMutation()
  const [, createEspecializaciones] = useCreateEspecializacionesMutation()
  const [, createTierras] = useCreateTierraCultivosMutation()
  const [, createAcondicionamiento] = useCreateAcondicionamientoMutation()
  const [, createAnalisisCalidad] = useCreateAnalisisCalidadMutation()

  const createRegistroProductor = async (values: RegistroProductorState) => {
    setIsLoading(true)

    const { data } = await createExpediente({
      input: {
        TIPO_SOLICITUD: TipoSolicitudExpedientes.RegistroProductor,
        DEPARMENTO_ID: values.datosGenerales.DEPARTAMENTO,
        PROVINCIA_ID: values.datosGenerales.PROVINCIA,
        DISTRITO_ID: values.datosGenerales.DISTRITO
      }
    })

    if (!data?.createExpediente?.expedienteId) {
      toast({ title: 'Error al crear el Registro Productor', type: 'error' })
      return
    }

    const expedienteId = data.createExpediente.expedienteId

    // REGISTRO PROFESIONAL

    const { data: dataPro } = await createProfesional({
      input: { ...values.profesional, EXPEDIENTE_ID: expedienteId }
    })

    const profesionalId =
      dataPro?.createProfesional.profesional?.PROFESIONAL_RESPONSABLE_ID!

    if (!profesionalId) {
      toast({ title: 'Error al crear el profesional responsable', type: 'error' })
      return
    }

    // REGISTROS VARIOS
    await Promise.all([
      createSolicitante({
        input: {
          ...values.datosGenerales,
          EXPEDIENTE_ID: expedienteId
        }
      }),
      createInfoCultivo({
        input: values.informacionCultivos.map(({
          id,
          NOMBRE_CULTIVO,
          REGLAMENTARIO,
          NOMBRE_ESPECIE,
          INFORMACION_CULTIVO_ID,
          ...data
        }) => ({
          ESPECIE_ID: data.ESPECIE_ID,
          CULTIVO_ID: data.CULTIVO_ID,
          CULTIVO_REGLAMENTARIO: data.CULTIVO_REGLAMENTARIO,
          INFORMACION_CULTIVO_ID: 0,
          EXPEDIENTE_ID: expedienteId
        }))
      }),
      createTierras({
        input: values.tierrasCultivo.map(({ id, ...data }) => ({
          ...data,
          EXPEDIENTE_ID: expedienteId
        }))
      }),
      createAcondicionamiento({
        input: {
          ...values.acondicionamiento,
          EXPEDIENTE_ID: expedienteId
        }
      }),
      createExperiencias({
        input: values.experiencia.map(({ id, ...data }) => ({
          ...data,
          PROFESIONAL_RESPONSABLE_ID: profesionalId
        }))
      }),
      createEspecializaciones({
        input: values.especializacion.map(({ id, ...data }) => ({
          ...data,
          PROFESIONAL_RESPONSABLE_ID: profesionalId
        }))
      }),
      createAnalisisCalidad({
        input: {
          LABORATORIO_ID: values.analisisCalidad.LABORATORIO_ID
            ? values.analisisCalidad.LABORATORIO_ID
            : null,
          SEMILLA_ASEXUAL: values.analisisCalidad.SEMILLA_ASEXUAL,
          SEMILLA_SEXUAL: values.analisisCalidad.SEMILLA_SEXUAL,
          EXPEDIENTE_ID: expedienteId
        }
      })
    ])

    setIsLoading(false)
    return expedienteId
  }

  return { isLoading, createRegistroProductor }
}

export default useRegistroProductorMutation
