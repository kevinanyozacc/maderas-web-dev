import { useState } from 'react'
import {
  useCreateConocimientoMutation,
  useCreateInformacionResponsableMutation,
  useCreateResponsableMutation
  // useCreateExpedienteMutation,
  // useCreateInfoCultivoMutation,
  // useCreateTierraCultivosMutation,
  // useCreateAcondicionamientoMutation,
  // useCreateProfesionalMutation,
  // useCreateExperienciasMutation,
  // useCreateEspecializacionesMutation,
  // TipoSolicitudExpedientes,
  // useCreateAnalisisCalidadMutation
} from '@generated/graphql'
import useToast from '@hooks/useToast'

import { RegistroResponsableState } from '@modules/Registro-responsable/solicitar-tramite/interfaces'

const useRegistroResponsableMutation = () => {
  const [isLoading, setIsLoading] = useState(false)
   const toast = useToast()

  // const [, createExpediente] = useCreateExpedienteMutation()
  const [, createResponsable] = useCreateResponsableMutation()
  const [, createInfResponsable] = useCreateInformacionResponsableMutation()
  const [, createConocimiento] = useCreateConocimientoMutation()
  // const [, createProfesional] = useCreateProfesionalMutation()
  // const [, createExperiencias] = useCreateExperienciasMutation()
  // const [, createEspecializaciones] = useCreateEspecializacionesMutation()
  // const [, createTierras] = useCreateTierraCultivosMutation()
  // const [, createAcondicionamiento] = useCreateAcondicionamientoMutation()
  // const [, createAnalisisCalidad] = useCreateAnalisisCalidadMutation()

  const createRegistroResponsable = async (values: RegistroResponsableState) => {
    setIsLoading(true)

    // const { data } = await createExpediente({
    //   input: {
    //     TIPO_SOLICITUD: TipoSolicitudExpedientes.RegistroProductor,
    //     DEPARMENTO_ID: values.datosGenerales.DEPARTAMENTO,
    //     PROVINCIA_ID: values.datosGenerales.PROVINCIA,
    //     DISTRITO_ID: values.datosGenerales.DISTRITO
    //   }
    // })

    const  conocimineto  = { ...values.conocimiento }

    if (conocimineto.length < 1) {
      toast({ title: 'Ingresar conocimiento de plagas', type: 'warning' })
      return
    }

    const expedienteId = ''

    // REGISTRO PROFESIONAL

    // const { data: dataPro } = await createProfesional({
    //   input: { ...values.profesional, EXPEDIENTE_ID: expedienteId }
    // })

    // const profesionalId =
    //   dataPro?.createProfesional.profesional?.PROFESIONAL_RESPONSABLE_ID!

    // if (!profesionalId) {
    //   toast({ title: 'Error al crear el profesional responsable', type: 'error' })
    //   return
    // }
    const { data: dataPro } = await createResponsable({
      input: { ...values.datosGenerales }
    })

    const responsableid =
      dataPro?.createResponsable.informacion?.ID!

    const expediente =
      dataPro?.createResponsable.informacion?.EXPEDIENTE!

    // REGISTROS VARIOS
    await Promise.all([
      createInfResponsable({
        input: {
          ...values.informacionResponsable
          // EXPEDIENTE_ID: expedienteId
        }
      }),
      createConocimiento({
        input: values.conocimiento.map(({ ind, ...data }) => ({
          ...data,
          RESPONSABLE_ID: responsableid
        }))
      })
    ])

    setIsLoading(false)
    return expediente
  }

  return { isLoading, createRegistroResponsable }
}

export default useRegistroResponsableMutation
