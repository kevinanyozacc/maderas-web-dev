import { useState } from 'react'

import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import Select from '@components/shared/Select'
import InputCleave from '@components/shared/InputCleave'
import ModalHeader from '@components/shared/ModalHeader'
import UploadFilesModal from '@components/shared/UploadFiles'
import Tooltip from '@components/shared/ToolTip'

import useForm, { FormError } from '@hooks/useForm'

import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'
import { EspecializacionInput } from '@generated/graphql'
import { classNames } from '@utils/classNames'
import { IconCheck, IconCloudArrowUp } from '@icons'
import useToggle from '@hooks/useToggle'
import useArchivosMutation from '@hooks/useArchivosMutation'
import useToast from '@hooks/useToast'
import { textEspecializacion } from '@modules/registro-productor/utils/textContent'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  onSubmit: (values: EspecializacionInput) => void
}

const initialState: EspecializacionInput = {
  HORAS: '',
  LUGAR: '',
  NOMBRE: '',
  FECHA_INICIO: '',
  FECHA_TERMINO: '',
  NUME_REGI_ARC: '',
  TIPO_ESPECIALIDAD: ''
}

const ModalAddEspecialization = ({ isOpen, onClose, onSubmit }: Props) => {
  const filesToggle = useToggle()
  const toast = useToast()

  const [isLoadingFiles, setIsLoadingFiles] = useState(false)

  const { values, ...form } = useForm({
    initialValues: initialState,
    validate: (values) => {
      const errors: FormError<EspecializacionInput> = {}
      if (isEmpty(values.TIPO_ESPECIALIDAD)) errors.TIPO_ESPECIALIDAD = ErrorMessages.empty
      if (isEmpty(values.NOMBRE)) errors.NOMBRE = ErrorMessages.empty
      if (isEmpty(values.LUGAR)) errors.LUGAR = ErrorMessages.empty
      if (isEmpty(values.FECHA_INICIO)) errors.FECHA_INICIO = ErrorMessages.empty
      if (isEmpty(values.FECHA_TERMINO)) errors.FECHA_TERMINO = ErrorMessages.empty
      if (values.FECHA_INICIO.length !== 10) errors.FECHA_INICIO = ErrorMessages.badDate
      if (values.FECHA_TERMINO.length !== 10) errors.FECHA_TERMINO = ErrorMessages.badDate
      return errors
    }
  })

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
    filesToggle.onClose()
    return res.ok
  }

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleSubmit = () => {
    if (values.NUME_REGI_ARC) {
      values.FECHA_INICIO = new Date(`${values.FECHA_INICIO.slice(3, 5)} ${values.FECHA_INICIO.slice(0, 2)}, ${values.FECHA_INICIO.slice(-4)}`)
      values.FECHA_TERMINO = new Date(`${values.FECHA_TERMINO.slice(3, 5)} ${values.FECHA_TERMINO.slice(0, 2)}, ${values.FECHA_TERMINO.slice(-4)}`)
      onSubmit(values)
      clearForm()
    } else {
      toast({ title: textEspecializacion.filesEmpty, type: 'warning' })
    }
  }

  return (
    <Modal hasOverlay isOpen={isOpen} onClose={clearForm}>
      <div className="flex z-[100] w-full h-full md:h-max max-w-[770px] md:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <form className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10">
          <ModalHeader
            closeBtn={clearForm}
            title={textEspecializacion.add}
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
              label="Nombre / Especilidad"
              {...form.inputProps('NOMBRE')}
            />
          </div>

          <div className={classNames([
            'grid grid-cols-1 gap-6',
            values.TIPO_ESPECIALIDAD !== 'GRADO' ? 'sm:grid-cols-2' : 'sm:grid-cols-1']
          )}>
            <Input label="Lugar" {...form.inputProps('LUGAR')} />
            {values.TIPO_ESPECIALIDAD !== 'GRADO' && (
              <Input
                label="Horas"
                value={values.HORAS!}
                pattern="^[0-9,+.:]+([,][0-9]+)?$"
                onChange={e => {
                  e.target.validity.valid && form.setField('HORAS', e.target.value)
                }}
                error={form.errors.HORAS}
              />
            )}
          </div>

          <div className="flex justify-between items-center gap-6">
            <InputCleave
              type="date"
              label="Fecha Inicio"
              {...form.inputProps('FECHA_INICIO')}
            />
            <InputCleave
              type="date"
              label="Fecha Término"
              {...form.inputProps('FECHA_TERMINO')}
            />
          </div>

          <div className='flex flex-col md:flex-row items-center gap-3 text-slate-500 dark:text-white'>
            <div className=''>
              <Tooltip label={textEspecializacion.messageAdd}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={filesToggle.onOpen}
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
              ? <div className='text-center'>{textEspecializacion.addedFiles}</div>
              : <div className='text-center'>{textEspecializacion.messageAdd}</div>
            }
            {filesToggle.isOpen && (
              <UploadFilesModal
                isLoading={isLoadingFiles}
                isOpen={filesToggle.isOpen}
                onClose={filesToggle.onClose}
                title={textEspecializacion.add}
                onUpload={handleUpload}
                NUME_REGI_ARC={values.NUME_REGI_ARC}
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
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => form.onSubmit(handleSubmit)()}
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ModalAddEspecialization
