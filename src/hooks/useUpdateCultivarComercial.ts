import {
  CultivarComercialUpdateInput,
  InformacionEnsayoUpdateInput,
  LocalidadEnsayoCreateInput,
  LocalidadEnsayoUpdateInput,
  MantSemillaUpdateInput,
  SolicitanteInput,
  useCreateLocalidadEnsayoMutation,
  useGetObsCultivarComercialExpedienteQuery,
  useGetTramiteCultiComercByRegIdQuery,
  useUpdateCultivarComercialMutation,
  useUpdateInfoEnsayoMutation,
  useUpdateLocalidadEnsayoMutation,
  useUpdateMantenimientoSemillaMutation,
  useUpdateSolicitanteMutation
} from '@generated/graphql'

import { ErrorMessages, SuccessMessages } from '@validation/messages'
import useToast from './useToast'

const useUpdateCultivarComercial = (expedienteId: number) => {
  const toast = useToast()

  const [datos, reexecuteQuery] = useGetTramiteCultiComercByRegIdQuery({
    variables: { expedienteId },
    pause: !expedienteId
  })

  const [datosObs, reexecuteQueryObs] =
    useGetObsCultivarComercialExpedienteQuery({
      variables: { expedienteId },
      pause: !expedienteId,
      requestPolicy: 'network-only'
    })

  const [, updateSoli] = useUpdateSolicitanteMutation()

  const [, updateCultCom] = useUpdateCultivarComercialMutation()

  const [, updateInfEnsayo] = useUpdateInfoEnsayoMutation()

  const [, updateLocalEnsayo] = useUpdateLocalidadEnsayoMutation()
  const [, createLocalidadEns] = useCreateLocalidadEnsayoMutation()

  const [, updateMantSem] = useUpdateMantenimientoSemillaMutation()

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

  const updateCultivarCom = async (values: CultivarComercialUpdateInput) => {
    try {
      const res = await updateCultCom({
        input: values
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

  const updateInfoEnsayos = async (values: InformacionEnsayoUpdateInput) => {
    try {
      const res = await updateInfEnsayo({
        input: values
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

  const createLocalidadEnsayo = async (values: LocalidadEnsayoCreateInput) => {
    try {
      const res = await createLocalidadEns({
        input: {
          ...values,
          EXPEDIENTE_ID: expedienteId
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

  const updateLocalidadEnsayo = async (values: LocalidadEnsayoUpdateInput) => {
    try {
      const res = await updateLocalEnsayo({
        input: values
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

  const updateMantSemilla = async (value: MantSemillaUpdateInput) => {
    try {
      const res = await updateMantSem({
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
    updateSolicitante,
    updateCultivarCom,
    updateInfoEnsayos,
    createLocalidadEnsayo,
    updateLocalidadEnsayo,
    updateMantSemilla,
    datosObs
  }
}

export default useUpdateCultivarComercial
