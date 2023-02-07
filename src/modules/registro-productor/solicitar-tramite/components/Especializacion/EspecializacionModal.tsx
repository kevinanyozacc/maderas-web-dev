import { useEffect, useState } from 'react'
import moment from 'moment'
import { nanoid } from 'nanoid'
import isEmpty from 'validator/lib/isEmpty'

import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import Select from '@components/shared/Select'
import InputCleave from '@components/shared/InputCleave'
import ModalHeader from '@components/shared/ModalHeader'
import Tooltip from '@components/shared/ToolTip'
import UploadFiles from '@components/shared/UploadFiles'

import useForm, { FormError } from '@hooks/useForm'
import useToggle from '@hooks/useToggle'
import useArchivosMutation from '@hooks/useArchivosMutation'
import useToast from '@hooks/useToast'

import { ErrorMessages } from '@validation/messages'
import { classNames } from '@utils/classNames'
import { textEspecializacion } from '@modules/registro-productor/utils/textContent'

import { IconCheck, IconCloudArrowUp } from '@icons'
import { Especialidad } from '../../interfaces/index'
import { useRegistroProductor } from '../../store/useRegistroProductor'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  onSubmit: (values: Especialidad) => void
  idToUpdate?: string
  isUpdate?: boolean
}

const initialState: Especialidad = {
  id: '',
  HORAS: '',
  LUGAR: '',
  NOMBRE: '',
  FECHA_INICIO: '',
  FECHA_TERMINO: '',
  NUME_REGI_ARC: '',
  TIPO_ESPECIALIDAD: ''
}

const ModalAddEspecialization = ({
  isOpen,
  onClose,
  onSubmit,
  isUpdate,
  idToUpdate
}: Props) => {
  const store = useRegistroProductor()
  const toggleCreateFile = useToggle()

  const toast = useToast()
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)

  const { values, ...form } = useForm({
    initialValues: isUpdate
      ? store.state.especializacion.find((item) => item.id === idToUpdate)!
      : initialState,
    validate: (values) => {
      const errors: FormError<typeof values> = {}

      if (isEmpty(values.TIPO_ESPECIALIDAD)) {
        errors.TIPO_ESPECIALIDAD = ErrorMessages.empty
      }
      if (isEmpty(values.NOMBRE)) {
        errors.NOMBRE = ErrorMessages.empty
      }
      if (isEmpty(values.LUGAR)) {
        errors.LUGAR = ErrorMessages.empty
      }

      if (!values.FECHA_INICIO) {
        errors.FECHA_INICIO = ErrorMessages.empty
      }
      if (!values.FECHA_TERMINO) {
        errors.FECHA_TERMINO = ErrorMessages.empty
      }
      if (values.FECHA_INICIO.length !== 10)
        errors.FECHA_INICIO = ErrorMessages.badDate
      if (values.FECHA_TERMINO.length !== 10)
        errors.FECHA_TERMINO = ErrorMessages.badDate

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

  const handleSubmit = () => {
    const fechaInicio = new Date(
      `${values.FECHA_INICIO.slice(3, 5)} ${values.FECHA_INICIO.slice(
        0,
        2
      )}, ${values.FECHA_INICIO.slice(-4)}`
    )
    const fechaTermino = new Date(
      `${values.FECHA_TERMINO.slice(3, 5)} ${values.FECHA_TERMINO.slice(
        0,
        2
      )}, ${values.FECHA_TERMINO.slice(-4)}`
    )

    if (isUpdate) {
      values.FECHA_INICIO = fechaInicio.toISOString().slice(0, 10)
      values.FECHA_TERMINO = fechaTermino.toISOString().slice(0, 10)
      onSubmit(values)
      onClose?.()
      return
    }

    if (values.NUME_REGI_ARC) {
      values.FECHA_INICIO = fechaInicio.toISOString().slice(0, 10)
      values.FECHA_TERMINO = fechaTermino.toISOString().slice(0, 10)
      onSubmit({ ...values, id: nanoid() })
      clearForm()
    } else {
      toast({ title: textEspecializacion.filesEmpty, type: 'warning' })
    }
  }

  return (
    <Modal hasOverlay isOpen={isOpen} onClose={clearForm}>
      <div className="flex z-[70] w-full h-full md:h-max max-w-[770px] md:rounded-xl shadow-lg bg-white dark:bg-slate-800 overflow-y-auto">
        <div className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10">
          <ModalHeader
            closeBtn={clearForm}
            title={
              isUpdate ? textEspecializacion.update : textEspecializacion.add
            }
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Select
              label="Tipo de especialidad"
              value={values.TIPO_ESPECIALIDAD}
              error={form.errors.TIPO_ESPECIALIDAD}
              onChange={(d) => {
                form.setField('TIPO_ESPECIALIDAD', d.value)
                d.value === 'GRADO' && form.setField('HORAS', '')
              }}
              options={[
                { label: 'Curso', value: 'CURSO' },
                { label: 'Grado', value: 'GRADO' },
                { label: 'Especialidad', value: 'ESPECIALIDAD' }
              ]}
            />
            <Input
              label="Nombre / Especialidad"
              {...form.inputProps('NOMBRE')}
            />
          </div>

          <div
            className={classNames([
              'grid grid-cols-1 gap-6',
              values.TIPO_ESPECIALIDAD !== 'GRADO'
                ? 'sm:grid-cols-2'
                : 'sm:grid-cols-1'
            ])}
          >
            <Input label="Lugar" {...form.inputProps('LUGAR')} />
            {values.TIPO_ESPECIALIDAD !== 'GRADO' && (
              <Input
                label="Horas"
                value={values.HORAS!}
                pattern="^[0-9,+.:]+([,][0-9]+)?$"
                onChange={(e) => {
                  e.target.validity.valid &&
                    form.setField('HORAS', e.target.value)
                }}
                error={form.errors.HORAS}
              />
            )}
          </div>
          <div className="grid gap-6 flex-1 grid-cols-1 md:grid-cols-2">
            <InputCleave
              type="date"
              label="Fecha Inicio (DD-MM-AAAA)"
              {...form.inputProps('FECHA_INICIO')}
            />
            <InputCleave
              type="date"
              label="Fecha Término (DD-MM-AAAA)"
              {...form.inputProps('FECHA_TERMINO')}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 text-slate-500 dark:text-white">
            <div className="">
              <Tooltip label={textEspecializacion.messageAdd}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={toggleCreateFile.onOpen}
                >
                  Subir Archivos
                  <span
                    className={classNames([
                      'text-2xl',
                      values.NUME_REGI_ARC && 'text-green-500'
                    ])}
                  >
                    {values.NUME_REGI_ARC ? (
                      <IconCheck />
                    ) : (
                      <IconCloudArrowUp />
                    )}
                  </span>
                </button>
              </Tooltip>
            </div>
            {values.NUME_REGI_ARC ? (
              <div className="text-center">
                {textEspecializacion.addedFiles}
              </div>
            ) : (
              <div className="text-center">
                {textEspecializacion.messageAdd}
              </div>
            )}

            {toggleCreateFile.isOpen &&
              (isUpdate ? (
                <UploadFiles
                  isLoading={isLoadingFiles}
                  isOpen={toggleCreateFile.isOpen}
                  onClose={toggleCreateFile.onClose}
                  title={textEspecializacion.update}
                  NUME_REGI_ARC={values.NUME_REGI_ARC}
                />
              ) : (
                <UploadFiles
                  isLoading={isLoadingFiles}
                  isOpen={toggleCreateFile.isOpen}
                  onClose={toggleCreateFile.onClose}
                  title={textEspecializacion.add}
                  onUpload={handleUpload}
                  NUME_REGI_ARC={values.NUME_REGI_ARC}
                />
              ))}
          </div>

          <div className="flex w-full justify-between mt-auto self-end pb-4 md:pb-0">
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

export default ModalAddEspecialization
