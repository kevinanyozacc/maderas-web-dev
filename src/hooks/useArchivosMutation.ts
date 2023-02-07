import {
  CreateArchivoFisicoInput,
  CreateArchivoInput,
  useCreateArchivoFisicoMutation,
  useCreateArchivoMutation,
  useDeleteArchivoFisicoMutation,
  useGetArchivosByNumeRegiArcQuery
} from '@generated/graphql'

import { ErrorMessages, SuccessMessages } from '@validation/messages'
import useToast from './useToast'

const useArchivosMutation = (NUME_REGI_ARC?: string) => {
  const toast = useToast()
  const [archivoState, createFile] = useCreateArchivoMutation()
  const [, deleteFile] = useDeleteArchivoFisicoMutation()
  const [, updateFile] = useCreateArchivoFisicoMutation()

  const [data, reexecuteQuery] = useGetArchivosByNumeRegiArcQuery({
    variables: { numeRegiArc: NUME_REGI_ARC! },
    pause: !NUME_REGI_ARC
  })

  const allFiles = data.data?.getArchivosByNumeRegiArc!
  const fetching = data.fetching

  const createArchivo = async ({
    REGISTRO,
    ArchivosFisicos,
    DESCRIPCION_REGISTRO
  }: CreateArchivoInput) => {
    try {
      const res = await createFile({
        input: {
          REGISTRO,
          DESCRIPCION_REGISTRO,
          ArchivosFisicos
        }
      },
      {
        fetchOptions: {
          headers: {
            'apollo-require-preflight': 'true'
          }
        }
      })
      if (res.data) {
        toast({ title: SuccessMessages.fileUploaded })
        return { ok: true, data: res.data.createArchivo }
      } else {
        toast({ title: `${res.error}`, type: 'error' })
        return { ok: false, data: null }
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
      return { ok: false, data: null }
    }
  }

  const updateArchivo = async ({
    DATAOBJECT,
    DESCRIPCION,
    NUME_REGI_ARC
  }: CreateArchivoFisicoInput) => {
    try {
      const res = await updateFile({
        input: {
          DATAOBJECT,
          DESCRIPCION,
          NUME_REGI_ARC
        }
      },
      {
        fetchOptions: {
          headers: {
            'apollo-require-preflight': 'true'
          }
        }
      })
      if (res.data) {
        toast({ title: SuccessMessages.fileUploaded })
        reexecuteQuery({ requestPolicy: 'network-only' })
        return { ok: true, data: res.data }
      } else {
        toast({ title: `${res.error}`, type: 'error' })
        return { ok: false, data: null }
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
      return { ok: false, data: null }
    }
  }

  const deleteArchivo = async (numeRegiArc: string, secuRegiArc: number) => {
    try {
      const res = await deleteFile({
        numeRegiArc,
        secuRegiArc
      })
      if (res.data) {
        toast({ title: SuccessMessages.fileDeleted })
        reexecuteQuery({ requestPolicy: 'network-only' })
        return { ok: true }
      } else {
        toast({ title: `${res.error}`, type: 'error' })
        return { ok: false, data: null }
      }
    } catch (e) {
      toast({ title: ErrorMessages.error, type: 'error' })
      return { ok: false, data: null }
    }
  }

  return {
    allFiles,
    fetching,
    archivoState,
    createArchivo,
    updateArchivo,
    deleteArchivo
  }
}

export default useArchivosMutation
