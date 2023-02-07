import useToast from '@hooks/useToast'

import {
  AcondicionamientoInput,
  AnalisisCalidadUpdateinput,
  EspecializacionInput,
  ExperienciaInput,
  InformacionCultivoInput,
  ProfesionalInput,
  SolicitanteInput,
  TierraCultivoInput,
  useCreateEspecializacionesMutation,
  useCreateExperienciasMutation,
  useCreateInfoCultivoMutation,
  useCreateTierraCultivosMutation,
  useDeleteEspecializacionMutation,
  useDeleteExperienciaMutation,
  useDeleteInfoCultivoMutation,
  useDeleteTierraCultivoMutation,
  useGetObservacionesByExpedienteQuery,
  useGetTramiteByRegistroIdQuery,
  useUpdateAcondicionamientoMutation,
  useUpdateAnalisisCalidadMutation,
  useUpdateEspecializacionMutation,
  useUpdateExperienciaMutation,
  useUpdateInfoCultivoMutation,
  useUpdateProfesionalMutation,
  useUpdateSolicitanteMutation,
  useUpdateTierraCultivoMutation
} from '@generated/graphql'

import { SuccessMessages, ErrorMessages } from '@validation/messages'

const useUpdateRegistroProductor = (registroId: string | number) => {
  const toast = useToast()
  // const [isLoading, setIsLoading] = useState(false)

  const [datos, reexecuteQuery] = useGetTramiteByRegistroIdQuery({
    variables: { expedienteId: +registroId },
    pause: !registroId
  })

  const [dataTramiteEstObs, reexecuteQueryObs] =
    useGetObservacionesByExpedienteQuery({
      variables: { expedienteId: +registroId },
      pause: !registroId,
      requestPolicy: 'network-only'
    })

  const fetching = datos.fetching
  const SOLICITANTE = datos.data?.getTramiteByRegistroId?.SOLICITANTE
  const INFO_CULTIVO = datos.data?.getTramiteByRegistroId?.INFO_CULTIVO
    ? datos.data?.getTramiteByRegistroId?.INFO_CULTIVO
    : []
  const PROFESIONAL = datos.data?.getTramiteByRegistroId?.PROFESIONAL
  const TIERRAS_CULTIVOS = datos.data?.getTramiteByRegistroId?.TIERRAS_CULTIVOS
    ? datos.data?.getTramiteByRegistroId?.TIERRAS_CULTIVOS
    : []

  const [, updateSoli] = useUpdateSolicitanteMutation()

  const [, createInfoCultivo] = useCreateInfoCultivoMutation()
  const [, updateInfoCultivo] = useUpdateInfoCultivoMutation()
  const [, deleteInfoCultivo] = useDeleteInfoCultivoMutation()

  const [, updatePro] = useUpdateProfesionalMutation()

  const [, addEspec] = useCreateEspecializacionesMutation()
  const [, updateEspec] = useUpdateEspecializacionMutation()
  const [, deleteEspec] = useDeleteEspecializacionMutation()

  const [, createExp] = useCreateExperienciasMutation()
  const [, updateExp] = useUpdateExperienciaMutation()
  const [, deleteExp] = useDeleteExperienciaMutation()

  const [, createTierra] = useCreateTierraCultivosMutation()
  const [, updateTierra] = useUpdateTierraCultivoMutation()
  const [, deleteTierra] = useDeleteTierraCultivoMutation()

  const [, updateAcond] = useUpdateAcondicionamientoMutation()

  const [, updateAnalisis] = useUpdateAnalisisCalidadMutation()

  // UPDATE SOLICITANTE FORM
  const updateSolicitante = async (value: SolicitanteInput) => {
    try {
      const res = await updateSoli({ input: value })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.updateData })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // INFORMACION CULTIVO FORM

  // CREATE INFO CULTIVO
  const createInfoCult = async (value: InformacionCultivoInput) => {
    try {
      const res = await createInfoCultivo({
        input: {
          ...value,
          INFORMACION_CULTIVO_ID: 0,
          EXPEDIENTE_ID: +registroId!
        }
      })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.addedElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // UPDATE INFORMACION DE CULTIVO
  const updateInfoCult = async (value: InformacionCultivoInput) => {
    try {
      const res = await updateInfoCultivo({
        input: value
      })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.updateElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // DELETE INFO CULTIVO BY ID
  const deleteInfoCult = async (id: number) => {
    try {
      const res = await deleteInfoCultivo({ infoCultivoId: id })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.deleteElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // UPDATE PROFESIONAL FORM
  const updateProfesional = async (value: ProfesionalInput) => {
    try {
      const resp = await updatePro({ input: value })
      if (resp.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.updateData })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // ESPECIALIZACION COMPONENT //

  // CREATE ESPECIALIZACION
  const createEspecializacion = async (value: EspecializacionInput) => {
    try {
      const res = await addEspec({ input: value })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.addedElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // UPDATE ESPECIALIZACION
  const updateEspecializacion = async (value: EspecializacionInput) => {
    try {
      const res = await updateEspec({
        input: value
      })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.updateElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // DELETE ESPECIALIZACION BY ID
  const deleteEspecializacion = async (id: number) => {
    try {
      const res = await deleteEspec({ especializacionId: id })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.deleteElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // EXPERIENCIA COMPONENT //

  // CREATE EXPERIENCIA
  const createExperiencia = async (value: ExperienciaInput) => {
    try {
      const res = await createExp({ input: value })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.addedElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // UPDATE EXPERIENCIA
  const updateExperiencia = async (value: ExperienciaInput) => {
    try {
      const res = await updateExp({ input: value })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.updateElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // DELETE EXPERIENCIA
  const deleteExperiencia = async (id: number) => {
    try {
      const res = await deleteExp({ experienciaId: id })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.deleteElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // TIERRA CULTIVO //

  // CREATE TIERRA CULTIVO
  const createTierraCult = async (value: TierraCultivoInput) => {
    try {
      const res = await createTierra({ input: [value] })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.addedElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // UPDATE TIRRA CULTIVO
  const updateTierraCult = async (value: TierraCultivoInput) => {
    try {
      const res = await updateTierra({
        input: {
          ...value,
          EXPEDIENTE_ID: +registroId
        }
      })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.updateElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // DELETE TIERRA CULTIVO
  const deleteTierraCult = async (id: number) => {
    try {
      const res = await deleteTierra({
        tierraCultivoId: id
      })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.deleteElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // ACONDICIONAMIENTO UPDATE
  const updateAcondicionamiento = async (value: AcondicionamientoInput) => {
    try {
      const res = await updateAcond({ input: value })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.updateData })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  // ANALISIS CALIDAD

  const updateAnalisisCalidad = async (value: AnalisisCalidadUpdateinput) => {
    try {
      const res = await updateAnalisis({
        input: value
      })
      if (res.error) {
        toast({ title: ErrorMessages.error, type: 'error' })
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' })
        reexecuteQueryObs({ requestPolicy: 'network-only' })
        toast({ title: SuccessMessages.updateData })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }
  return {
    datos,
    fetching,
    SOLICITANTE,
    INFO_CULTIVO,
    PROFESIONAL,
    TIERRAS_CULTIVOS,

    updateSolicitante,

    createInfoCult,
    updateInfoCult,
    deleteInfoCult,

    updateProfesional,

    createEspecializacion,
    updateEspecializacion,
    deleteEspecializacion,

    createExperiencia,
    updateExperiencia,
    deleteExperiencia,

    createTierraCult,
    updateTierraCult,
    deleteTierraCult,

    updateAcondicionamiento,

    updateAnalisisCalidad,

    dataTramiteEstObs
  }
}

export default useUpdateRegistroProductor
