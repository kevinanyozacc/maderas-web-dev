import { useEffect, useState } from 'react'
import moment from 'moment'
import { nanoid } from 'nanoid'
import isEmpty from 'validator/lib/isEmpty'

import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import ModalHeader from '@components/shared/ModalHeader'
import InputCleave from '@components/shared/InputCleave'
import Tooltip from '@components/shared/ToolTip'
import UploadFiles from '@components/shared/UploadFiles'

import useForm, { FormError } from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import useToggle from '@hooks/useToggle'
import useToast from '@hooks/useToast'
import useArchivosMutation from '@hooks/useArchivosMutation'

import { IconCheck, IconCloudArrowUp } from '@icons'
import { Experiencia } from '../../interfaces/index'
import { ErrorMessages } from '@validation/messages'
import { useRegistroProductor } from '../../store/useRegistroProductor'
import { classNames } from '@utils/classNames'
import { textExperiencia } from '@modules/registro-productor/utils/textContent'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: Experiencia) => void
  idToUpdate?: string
  isUpdate?: boolean
}

const initialState: Experiencia = {
  id: '',
  ACTIVIDAD_DESARROLLADA: '',
  RAZON_SOCIAL: '',
  DEPARTAMENTO: '',
  PROVINCIA: '',
  DISTRITO: '',
  FECHA_INICIO: '',
  FECHA_TERMINO: '',
  NUME_REGI_ARC: ''
}

const ExperienciaModal = ({ isOpen, onClose, onSubmit, isUpdate, idToUpdate }: Props) => {
  const store = useRegistroProductor()

  const toggleCreateFile = useToggle()

  const toast = useToast()
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)

  const { values, ...form } = useForm({
    initialValues: isUpdate
      ? store.state.experiencia.find(item => item.id === idToUpdate)!
      : initialState,
    validate: (values) => {
      const errors: FormError<Experiencia> = {}

      if (isEmpty(values.RAZON_SOCIAL)) {
        errors.RAZON_SOCIAL = ErrorMessages.empty
      }
      if (isEmpty(values.ACTIVIDAD_DESARROLLADA)) {
        errors.ACTIVIDAD_DESARROLLADA = ErrorMessages.empty
      }
      if (isEmpty(values.DEPARTAMENTO)) {
        errors.DEPARTAMENTO = ErrorMessages.empty
      }
      if (isEmpty(values.PROVINCIA)) {
        errors.PROVINCIA = ErrorMessages.empty
      }
      if (isEmpty(values.DISTRITO)) {
        errors.DISTRITO = ErrorMessages.empty
      }
      if (isEmpty(values.FECHA_INICIO)) {
        errors.FECHA_INICIO = ErrorMessages.empty
      }
      if (isEmpty(values.FECHA_TERMINO)) {
        errors.FECHA_TERMINO = ErrorMessages.empty
      }
      if (values.FECHA_INICIO.length !== 10) errors.FECHA_INICIO = ErrorMessages.badDate
      if (values.FECHA_TERMINO.length !== 10) errors.FECHA_TERMINO = ErrorMessages.badDate
      return errors
    }
  })

  useEffect(() => {
    if (isUpdate) {
      form.setFields({
        FECHA_INICIO: moment(values.FECHA_INICIO).format('DD-MM-YYYY'),
        FECHA_TERMINO: moment(values.FECHA_TERMINO).format('DD-MM-YYYY')
      })
    }
  }, [])

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO,
    codProv: values.PROVINCIA
  })

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

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
      REGISTRO: 'Experiencia',
      DESCRIPCION_REGISTRO: 'Experiencia Info',
      ArchivosFisicos: fileList
    })

    if (res.data?.data?.NUME_REGI_ARC) {
      form.setField('NUME_REGI_ARC', res.data.data.NUME_REGI_ARC)
    }

    setIsLoadingFiles(false)
    toggleCreateFile.onClose()
    return res.ok
  }

  const handleSubmit = () => {
    if (isUpdate) {
      const fechaInicio = new Date(`${values.FECHA_INICIO.slice(3, 5)} ${values.FECHA_INICIO.slice(0, 2)}, ${values.FECHA_INICIO.slice(-4)}`)
      const fechaTermino = new Date(`${values.FECHA_TERMINO.slice(3, 5)} ${values.FECHA_TERMINO.slice(0, 2)}, ${values.FECHA_TERMINO.slice(-4)}`)
      values.FECHA_INICIO = fechaInicio.toISOString().slice(0, 10)
      values.FECHA_TERMINO = fechaTermino.toISOString().slice(0, 10)
      onSubmit(values)
      onClose()
      return
    }

    if (values.NUME_REGI_ARC) {
      const fechaInicio = new Date(`${values.FECHA_INICIO.slice(3, 5)} ${values.FECHA_INICIO.slice(0, 2)}, ${values.FECHA_INICIO.slice(-4)}`)
      const fechaTermino = new Date(`${values.FECHA_TERMINO.slice(3, 5)} ${values.FECHA_TERMINO.slice(0, 2)}, ${values.FECHA_TERMINO.slice(-4)}`)
      values.FECHA_INICIO = fechaInicio
      values.FECHA_TERMINO = fechaTermino
      onSubmit({ ...values, id: nanoid() })
      clearForm()
    } else {
      toast({ title: textExperiencia.filesEmpty, type: 'warning' })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={clearForm} hasOverlay>
      <div className="z-[70] w-full h-full md:h-max max-w-[770px] md:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <div className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10">
          <ModalHeader
            closeBtn={clearForm}
            title={isUpdate ? textExperiencia.update : textExperiencia.add}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input label="Razón Social" {...form.inputProps('RAZON_SOCIAL')} />
            <Input
              label="Actividad Desarrollada"
              {...form.inputProps('ACTIVIDAD_DESARROLLADA')}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <SelectWithFilter
              withFilter
              label="Departamento"
              value={values.DEPARTAMENTO}
              error={form.errors.DEPARTAMENTO}
              onChange={({ value }) => {
                form.setFields({
                  DEPARTAMENTO: value,
                  PROVINCIA: '',
                  DISTRITO: ''
                })
              }}
              options={ubigeo.departamentos}
              dataExtractor={{ label: 'NOMB_DPTO_DPT', value: 'CODI_DEPA_DPT' }}
            />
            <SelectWithFilter
              withFilter
              label="Provincia"
              value={values.PROVINCIA}
              error={form.errors.PROVINCIA}
              onChange={({ value }) => {
                form.setFields({ PROVINCIA: value, DISTRITO: '' })
              }}
              options={ubigeo.provincias}
              dataExtractor={{ label: 'NOMB_PROV_TPR', value: 'CODI_PROV_TPR' }}
            />
            <SelectWithFilter
              withFilter
              label="Distrito"
              value={values.DISTRITO}
              options={ubigeo.distritos}
              error={form.errors.DISTRITO}
              onChange={({ value }) => form.setField('DISTRITO', value)}
              dataExtractor={{ label: 'NOMB_DIST_TDI', value: 'CODI_DIST_TDI' }}
            />
          </div>

          <div className="grid gap-6 flex-1 grid-cols-1 md:grid-cols-2">
            <InputCleave
              label="Fecha Inicio (DD-MM-AAAA)"
              {...form.inputProps('FECHA_INICIO')}
            />
            <InputCleave
              label="Fecha Término (DD-MM-AAAA)"
              {...form.inputProps('FECHA_TERMINO')}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 text-slate-500 dark:text-white">
            <div className=''>
              <Tooltip label={textExperiencia.messageAdd}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={toggleCreateFile.onOpen}
                >
                  Subir Archivos
                  <span className={classNames(['text-2xl', values.NUME_REGI_ARC && 'text-green-500'])}>
                    {values.NUME_REGI_ARC
                      ? <IconCheck />
                      : <IconCloudArrowUp />
                    }
                  </span>
                </button>
              </Tooltip>
            </div>
            {values.NUME_REGI_ARC
              ? <div className='text-center'>{textExperiencia.addedFiles}</div>
              : <div className='text-center'>{textExperiencia.messageAdd}</div>
            }

            {toggleCreateFile.isOpen && (
              isUpdate
                ? (
                  <UploadFiles
                    isLoading={isLoadingFiles}
                    isOpen={toggleCreateFile.isOpen}
                    onClose={toggleCreateFile.onClose}
                    title={textExperiencia.update}
                    NUME_REGI_ARC={values.NUME_REGI_ARC}
                  />
                  )
                : (
                  <UploadFiles
                    isLoading={isLoadingFiles}
                    isOpen={toggleCreateFile.isOpen}
                    onClose={toggleCreateFile.onClose}
                    title={textExperiencia.add}
                    onUpload={handleUpload}
                    NUME_REGI_ARC={values.NUME_REGI_ARC}
                  />
                  )
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
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => form.onSubmit(handleSubmit)()}
            >
              {isUpdate ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ExperienciaModal
