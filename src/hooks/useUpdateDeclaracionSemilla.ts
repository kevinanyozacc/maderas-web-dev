import useToast from '@hooks/useToast'

import {
  AlmacenCreateInput,
  AlmacenUpdateInput,
  InformacionCultivoInput,
  SolicitanteInput,
  SucursalCreateInput,
  SucursalUpdateInput,
  useCreateAlmacenMutation,
  useCreateInfoCultivoMutation,
  useCreateSucursalMutation,
  useDeleteAlmacenMutation,
  useDeleteInfoCultivoMutation,
  useDeleteSucursalMutation,
  useGetObservacionesByExpedienteQuery,
  useGetTramiteDeclaracionSemillaByRegIdQuery,
  useUpdateAlmacenMutation,
  useUpdateInfoCultivoMutation,
  useUpdateSolicitanteMutation,
  useUpdateSucursalMutation
} from '@generated/graphql'

import { SuccessMessages, ErrorMessages } from '@validation/messages'

const useUpdateDeclaracionSemilla = (registroId: string | number) => {
  const toast = useToast()

  const [datos, reexecuteQuery] = useGetTramiteDeclaracionSemillaByRegIdQuery({
    variables: { expedienteId: +registroId },
    pause: !registroId
  })

  const [dataTramiteEstObs, reexecuteQueryObs] = useGetObservacionesByExpedienteQuery({
    variables: { expedienteId: +registroId },
    pause: !registroId,
    requestPolicy: 'network-only'
  })

  const fetching = datos.fetching
  const SOLICITANTE = datos.data?.getTramiteByRegistroId?.SOLICITANTE
  const INFO_CULTIVO = datos.data?.getTramiteByRegistroId?.INFO_CULTIVO
    ? datos.data?.getTramiteByRegistroId?.INFO_CULTIVO
    : []
  const EST_SUCURSALES = datos.data?.getTramiteByRegistroId?.SUCURSALES
    ? datos.data?.getTramiteByRegistroId?.SUCURSALES
    : []
  const ALMACEN = datos.data?.getTramiteByRegistroId?.ALMACENES
    ? datos.data?.getTramiteByRegistroId?.ALMACENES
    : []

  const observacion = dataTramiteEstObs.data?.getObservacionesByExpediente

  const [, updateSoli] = useUpdateSolicitanteMutation()

  const [, createInfoCultivo] = useCreateInfoCultivoMutation()
  const [, updateInfoCultivo] = useUpdateInfoCultivoMutation()
  const [, deleteInfoCultivo] = useDeleteInfoCultivoMutation()

  const [, createSucur] = useCreateSucursalMutation()
  const [, updateSucur] = useUpdateSucursalMutation()
  const [, deleteSucur] = useDeleteSucursalMutation()

  const [, createAlmac] = useCreateAlmacenMutation()
  const [, updateAlmac] = useUpdateAlmacenMutation()
  const [, deleteAlmac] = useDeleteAlmacenMutation()

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

  // SUCURSALES

  const createSucursal = async (value: SucursalCreateInput) => {
    try {
      const res = await createSucur({
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
        toast({ title: SuccessMessages.addedElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  const updateSucursal = async (value: SucursalUpdateInput) => {
    try {
      const res = await updateSucur({ input: value })
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

  const deleteSucursal = async (id: number) => {
    try {
      const res = await deleteSucur({ sucursalId: id })
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

  const createAlmacen = async (value: AlmacenCreateInput) => {
    try {
      const res = await createAlmac({
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
        toast({ title: SuccessMessages.addedElement })
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
    }
  }

  const updateAlmacen = async (value: AlmacenUpdateInput) => {
    try {
      const res = await updateAlmac({
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

  const deleteAlmacen = async (id: number) => {
    try {
      const res = await deleteAlmac({ almacenId: id })
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

  return {
    datos,
    fetching,

    SOLICITANTE,
    INFO_CULTIVO,
    EST_SUCURSALES,
    ALMACEN,

    createSucursal,
    deleteSucursal,
    updateSucursal,

    updateSolicitante,

    createInfoCult,
    updateInfoCult,
    deleteInfoCult,

    createAlmacen,
    updateAlmacen,
    deleteAlmacen,

    observacion
  }
}

export default useUpdateDeclaracionSemilla
