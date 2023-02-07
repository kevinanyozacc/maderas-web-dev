import { DragEvent, useEffect, useId, useRef, useState } from 'react'
import { nanoid } from 'nanoid'

import DropOrSelect from './DropOrSelect'
import DashboardFiles from './DashboardFiles'
import OverlayDropFiles from './OverlayDropFiles'
import Loading from '../Loading'
import Spinner from '../Spinner'
import ModalHeader from '../ModalHeader'

import Modal from '@components/shared/Modal'
import useToast from '@hooks/useToast'
import { ArchivoFisico } from '@generated/graphql'
import useArchivosMutation from '@hooks/useArchivosMutation'

export interface FileToUpload {
  id: string
  file: File
  createdAt: Date
}

export interface FileDb {
  id: string
  filename: string
  createdAt: Date
  NUME_REGI_ARC: string
  SECU_REGI_ARC: number
}

interface Props {
  isLoading?: boolean
  onUpload?: (files: File[]) => Promise<boolean>
  isOpen: boolean
  onClose: () => void
  title: string
  NUME_REGI_ARC?: string
}

const UploadFilesModal = ({
  isOpen,
  onClose,
  onUpload,
  isLoading,
  title,
  NUME_REGI_ARC
}: Props) => {
  const uid = useId()
  const dragCounterRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)
  // const [isLoadingData, setIsLoadingData] = useState(false)
  const [files, setFiles] = useState<FileToUpload[]>([])
  const [dbFiles, setDbFiles] = useState<FileDb[]>([])
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const toast = useToast()

  const { allFiles: data, fetching, updateArchivo, deleteArchivo } = useArchivosMutation(NUME_REGI_ARC)

  useEffect(() => {
    if (fetching === false && data) {
      const datos = data?.ArchivosFisicos! || []
      const newDbFiles: FileDb[] = datos.map((res: ArchivoFisico) => ({
        id: res.SECU_REGI_ARC.toString(),
        filename: res.FILENAME,
        createdAt: new Date(res.FECH_CARG_ARC),
        NUME_REGI_ARC: res.NUME_REGI_ARC,
        SECU_REGI_ARC: res.SECU_REGI_ARC
      }))

      setDbFiles(newDbFiles)
    }
  }, [
    fetching &&
    data?.ArchivosFisicos.length
  ])

  const kbToMb = (kb: number) => parseFloat(String(Math.floor(kb / 1000)))

  const handleReset = () => {
    setFiles([])
  }

  const handleUpload = async () => {
    if (NUME_REGI_ARC) {
      setIsLoadingUpdate(true)
      const rawFiles = files.map(({ file }) => file)
      for (const file of rawFiles) {
        await updateArchivo({
          DATAOBJECT: file,
          DESCRIPCION: 'file',
          NUME_REGI_ARC
        })
      }
      setIsLoadingUpdate(false)
      handleReset()
    } else {
      if (typeof onUpload === 'function') {
        const rawFiles = files.map(({ file }) => file)
        if (Array.from(rawFiles).length + dbFiles.length > 2) {
          toast({ title: 'Solo se puede subir 2 archivos', type: 'warning' })
        } else {
          await onUpload(rawFiles)
          handleReset()
        }
      }
    }
  }

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter(({ id: _id }) => _id !== id))
  }

  const handleAdd = (filesValue: FileList | null) => {
    if ((files.length + dbFiles.length + Array.from(filesValue!).length) > 2) {
      toast({ title: 'Solo se puede subir 2 archivos', type: 'warning' })
      return
    }

    if (!filesValue) return

    let hasNotIncludeValidFile = false
    const newFiles: FileToUpload[] = []

    for (const file of Array.from(filesValue)) {
      if (kbToMb(file.size) > 3000) {
        toast({
          title: 'Archivo no compatible',
          desc: 'Solo puedes agregrar archivos que pesen menos de 3mbs',
          type: 'warning'
        })
        break
      }

      if (!file.type.includes('image') && !file.type.includes('pdf')) {
        hasNotIncludeValidFile = true
        continue
      }

      newFiles.push({ file, id: nanoid(), createdAt: new Date() })
    }

    setFiles((prev) => [...prev, ...newFiles])

    if (hasNotIncludeValidFile) {
      toast({
        type: 'warning',
        title: 'Solo se deben seleccionar imagenes o pdf',
        desc: 'Se han omitido los archivos que no son imagenes o pdf.'
      })
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e?.dataTransfer?.files && e?.dataTransfer?.files.length > 0) {
      handleAdd(e?.dataTransfer?.files)
      e?.dataTransfer.clearData()
      dragCounterRef.current = 0
    }
  }

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current += 1
    if (e?.dataTransfer?.items && e?.dataTransfer?.items.length > 0) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current -= 1
    if (dragCounterRef.current > 0) return
    setIsDragging(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} hasOverlay>
      <div className="z-[70] w-full h-full md:h-max md:max-h-[600px] max-w-[770px] md:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <div className=" flex flex-col justify-between p-5 md:px-10 md:py-7 h-full">
          <div className="flex flex-col">
            <ModalHeader
              closeBtn={onClose}
              title={title}
            />

            <div className="flex w-full h-full my-4">
              <input
                className="hidden"
                hidden
                type="file"
                id={`input-file-${uid}`}
                onChange={(e) => {
                  const _files = e.target.files
                  handleAdd(_files)
                }}
              />
              <div
                className="flex p-2 w-full bg-gray-50 dark:bg-slate-700 rounded-xl
                relative border-gray-300 border-2 dark:border-gray-700 h-full"
                onDrop={handleDrop}
                onDragOver={handleDrag}
                onDragLeave={handleDragLeave}
                onDragEnter={handleDragEnter}
              >

                {isDragging && <OverlayDropFiles isDragging={isDragging} />}

                {fetching ? <div className='w-full h-full flex min-h-[300px]'><Loading className='mt-0'/></div> : files.length === 0 && dbFiles.length === 0 && <DropOrSelect inputId={uid} />}

                {((files.length !== 0 || dbFiles.length !== 0) && !fetching) && (
                  <DashboardFiles
                    inputId={uid}
                    files={files}
                    dbFiles={dbFiles}
                    onDelete={handleDelete}
                    onDeleteDb={(NUME_REGI_ARC, SECU_REGI_ARC) => {
                      deleteArchivo(NUME_REGI_ARC, SECU_REGI_ARC)
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost-red"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={files.length === 0 || isLoading || isLoadingUpdate}
              onClick={handleUpload}
              className="btn btn-solid-primary"
            >
              Subir
              {(isLoading || isLoadingUpdate) && <Spinner />}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default UploadFilesModal
