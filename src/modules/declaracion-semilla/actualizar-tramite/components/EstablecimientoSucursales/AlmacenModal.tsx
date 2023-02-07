import { useEffect, useState } from 'react'

import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import ModalHeader from '@components/shared/ModalHeader'
import Tooltip from '@components/shared/ToolTip'
import UploadFilesModal from '@components/shared/UploadFiles'

import useForm, { FormError } from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import useToast from '@hooks/useToast'
import useToggle from '@hooks/useToggle'
import { AlmacenCreateInput, AlmacenUpdateInput, TramiteAlmacen } from '@generated/graphql'
import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'
import useArchivosMutation from '@hooks/useArchivosMutation'
import { IconCheck, IconCloudArrowUp } from '@icons'
import { classNames } from '@utils/classNames'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: AlmacenCreateInput | AlmacenUpdateInput) => void
  dataToUpdate?: TramiteAlmacen
  isUpdate?: boolean
}

const initialValues: AlmacenCreateInput = {
  DIRECCION: '',
  DEPARTAMENTO_ID: '',
  DISTRITO_ID: '',
  EXPEDIENTE_ID: 0,
  PROVINCIA_ID: '',
  NUME_REGI_ARC: ''
}

const AlmacenModal = ({ isOpen, onClose, onSubmit, isUpdate, dataToUpdate }: Props) => {
  const toast = useToast()
  const toggleCreateFile = useToggle()
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)
  const { values, ...form } = useForm({
    initialValues,
    validate: (values) => {
      const errors: FormError<typeof values> = {}
      if (isEmpty(values.DIRECCION)) errors.DIRECCION = ErrorMessages.empty
      if (isEmpty(values.DEPARTAMENTO_ID)) errors.DEPARTAMENTO_ID = ErrorMessages.empty
      if (isEmpty(values.PROVINCIA_ID)) errors.PROVINCIA_ID = ErrorMessages.empty
      if (isEmpty(values.DISTRITO_ID)) errors.DISTRITO_ID = ErrorMessages.empty
      return errors
    }
  })

  useEffect(() => {
    if (isUpdate && dataToUpdate) {
      const {
        NOMBRE_DEPARTAMENTO,
        NOMBRE_DISTRITO,
        NOMBRE_PROVINCIA,
        FECHA_REGISTRO,
        __typename,
        NUME_REGI_ARC,
        EXPEDIENTE_ID,
        ...rest
      } = dataToUpdate
      form.setFields({ ...rest, NUME_REGI_ARC: dataToUpdate.NUME_REGI_ARC! })
    }
  }, [dataToUpdate])

  const { createArchivo } = useArchivosMutation()

  const handleUpload = async (files: File[]): Promise<boolean> => {
    setIsLoadingFiles(true)
    const fileList = []

    for (const file of files) {
      fileList.push({
        DATAOBJECT: file,
        DESCRIPCION: 'File'
      })
    }

    const res = await createArchivo({
      REGISTRO: 'Especializacion',
      DESCRIPCION_REGISTRO: 'Especializacion Info',
      ArchivosFisicos: fileList
    })

    if (res.data?.data?.NUME_REGI_ARC) {
      form.setField('NUME_REGI_ARC', res.data.data.NUME_REGI_ARC)
    }

    setIsLoadingFiles(false)
    toggleCreateFile.onClose()
    return res.ok
  }

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO_ID,
    codProv: values.PROVINCIA_ID
  })

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleSubmit = () => {
    if (isUpdate && values.NUME_REGI_ARC) {
      const { EXPEDIENTE_ID, ...rest } = values
      onSubmit(rest as AlmacenUpdateInput)
      return
    }
    if (values.NUME_REGI_ARC) {
      onSubmit(values)
      clearForm()
    } else {
      toast({ title: 'Debe adjuntar informacion del establecimiento', type: 'warning' })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={clearForm} hasOverlay>
      <div className="flex z-[70] w-full h-full md:h-max max-w-[770px] md:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10"
        >
          <ModalHeader
            closeBtn={clearForm}
            title={isUpdate
              ? 'Actualizar Informacion del Almacen'
              : 'Agregar Informacion del Almacen'
            }
          />

          <Input label='Ubicación de Almacenes de Semillas' {...form.inputProps('DIRECCION')} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <SelectWithFilter
              withFilter
              label="Departamento"
              value={values.DEPARTAMENTO_ID}
              error={form.errors.DEPARTAMENTO_ID}
              onChange={({ value }) => {
                form.setFields({
                  DEPARTAMENTO_ID: value,
                  PROVINCIA_ID: '',
                  DISTRITO_ID: ''
                })
              }}
              options={ubigeo.departamentos}
              dataExtractor={{ label: 'NOMB_DPTO_DPT', value: 'CODI_DEPA_DPT' }}
            />
            <SelectWithFilter
              withFilter
              label="Provincia"
              value={values.PROVINCIA_ID}
              error={form.errors.PROVINCIA_ID}
              onChange={({ value }) => {
                form.setFields({ PROVINCIA_ID: value, DISTRITO_ID: '' })
              }}
              options={ubigeo.provincias}
              dataExtractor={{ label: 'NOMB_PROV_TPR', value: 'CODI_PROV_TPR' }}
            />
            <SelectWithFilter
              withFilter
              label="Distrito"
              value={values.DISTRITO_ID}
              options={ubigeo.distritos}
              error={form.errors.DISTRITO_ID}
              onChange={({ value }) => form.setField('DISTRITO_ID', value)}
              dataExtractor={{ label: 'NOMB_DIST_TDI', value: 'CODI_DIST_TDI' }}
            />
          </div>

          <div className='flex flex-col md:flex-row items-center gap-3 text-slate-500 dark:text-white'>
            <div className=''>
              <Tooltip label='Adjuntar croquis de Ubicación y descripción del almacén'>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={toggleCreateFile.onOpen}
                >
                  Subir Archivos
                  <span className={classNames(['text-2xl', values.NUME_REGI_ARC! && 'text-green-500'])}>
                    {values.NUME_REGI_ARC
                      ? <IconCheck />
                      : <IconCloudArrowUp />
                    }
                  </span>
                </button>
              </Tooltip>
            </div>
            {values.NUME_REGI_ARC
              ? <div className='text-center'>Los archivos se agregaron correctamente</div>
              : <div className='text-center'>Adjuntar croquis de Ubicación y descripción del almacén</div>
            }

            {toggleCreateFile.isOpen && (
              isUpdate
                ? <UploadFilesModal
                    isLoading={isLoadingFiles}
                    isOpen={toggleCreateFile.isOpen}
                    onClose={toggleCreateFile.onClose}
                    title={'Informacion del establecimiento'}
                    NUME_REGI_ARC={values.NUME_REGI_ARC!}
                  />
                : <UploadFilesModal
                    isLoading={isLoadingFiles}
                    isOpen={toggleCreateFile.isOpen}
                    onClose={toggleCreateFile.onClose}
                    title={'Informacion del establecimiento'}
                    onUpload={handleUpload}
                    NUME_REGI_ARC={values.NUME_REGI_ARC!}
                  />
            )}
          </div>

          <div className="flex w-full justify-between mt-auto">
            <button
              type="button"
              onClick={clearForm}
              className="btn btn-ghost-red"
            >
              Cerrar
            </button>
            <button type='submit' className="btn btn-outline-primary">
              {isUpdate ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
export default AlmacenModal
