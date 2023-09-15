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
import useToggle from '@hooks/useToggle'
import useToast from '@hooks/useToast'
import useArchivosMutation from '@hooks/useArchivosMutation'

import { IconCheck, IconCloudArrowUp } from '@icons'
import { Sensores } from '../../interfaces/index'
import { ErrorMessages } from '@validation/messages'
import { classNames } from '@utils/classNames'
import { textExperiencia } from '@modules/registro-productor/utils/textContent'
import { useRegistroSolicitud } from '../../store/useRegistroAutorizacion'
import { textSensores } from '@modules/solicitud-autorizacion/utils/textContent'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: Sensores) => void
  idToUpdate?: string
  isUpdate?: boolean
}

const initialState: Sensores = {
  ind: '',
  NUMERO: '',
  NUME_REGI_SENSOR: ''
  // HORAS: '',
  // FECHA_INICIO: '',
  // FECHA_TERMINO: '',
  // LUGAR: '',
  // NUME_REGI_ARC: ''
}

const SensoresModal = ({ isOpen, onClose, onSubmit, isUpdate, idToUpdate }: Props) => {
  const store = useRegistroSolicitud()

  const toggleCreateFile = useToggle()

  const toast = useToast()
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)

  const { values, ...form } = useForm({
    initialValues: isUpdate
      ? store.state.sensores.find(item => item.ind === idToUpdate)!
      : initialState,
    validate: (values) => {
      const errors: FormError<Sensores> = {}

      if (isEmpty( values.NUMERO.toString() )) {
        errors.NUMERO = ErrorMessages.empty
      }
      
      return errors
    }
  })

  // useEffect(() => {
  //   if (isUpdate) {
  //     form.setFields({
  //       FECHA_INICIO: moment(values.FECHA_INICIO).format('DD-MM-YYYY'),
  //       FECHA_TERMINO: moment(values.FECHA_TERMINO).format('DD-MM-YYYY')
  //     })
  //   }
  // }, [])

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
      form.setField('NUME_REGI_SENSOR', res.data.data.NUME_REGI_ARC)
    }

    setIsLoadingFiles(false)
    toggleCreateFile.onClose()
    return res.ok
  }

  const handleSubmit = () => {
    
    console.log(values);
    typeof(values.NUMERO)
    if (isUpdate) {
      onSubmit(values)
      onClose()
      return
    }

    if (values.NUME_REGI_SENSOR) {
     
      onSubmit({ ...values, ind: nanoid() })
      clearForm()
    } else {
      toast({ title: textSensores.filesEmpty, type: 'warning' })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={clearForm} hasOverlay>
      <div className="z-[70] w-full h-full md:h-max max-w-[770px] md:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <div className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10">
          <ModalHeader
            closeBtn={clearForm}
            title={isUpdate ? textSensores.update : textSensores.add}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input label="Numero de Sensor por cámara"
             type='number'
             {...form.inputProps('NUMERO')} />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 text-slate-500 dark:text-white">
            <div className=''>
              <Tooltip label={textSensores.messageAdd}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={toggleCreateFile.onOpen}
                >
                  Subir Archivos
                  <span className={classNames(['text-2xl', values.NUME_REGI_SENSOR && 'text-green-500'])}>
                    {values.NUME_REGI_SENSOR
                      ? <IconCheck />
                      : <IconCloudArrowUp />
                    }
                  </span>
                </button>
              </Tooltip>
            </div>
            {values.NUME_REGI_SENSOR
              ? <div className='text-center'>{textSensores.addedFiles}</div>
              : <div className='text-center'>{textSensores.messageAdd}</div>
            }

            {toggleCreateFile.isOpen && (
              isUpdate
                ? (
                  <UploadFiles
                    isLoading={isLoadingFiles}
                    isOpen={toggleCreateFile.isOpen}
                    onClose={toggleCreateFile.onClose}
                    title={textSensores.update}
                    NUME_REGI_ARC={values.NUME_REGI_SENSOR}
                  />
                )
                : (
                  <UploadFiles
                    isLoading={isLoadingFiles}
                    isOpen={toggleCreateFile.isOpen}
                    onClose={toggleCreateFile.onClose}
                    title={textSensores.add}
                    onUpload={handleUpload}
                    NUME_REGI_ARC={values.NUME_REGI_SENSOR}
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

export default SensoresModal
