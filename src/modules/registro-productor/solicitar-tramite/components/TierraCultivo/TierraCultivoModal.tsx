import { useState } from 'react'
import { nanoid } from 'nanoid'
import isEmpty from 'validator/lib/isEmpty'

import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import Select from '@components/shared/Select'
import ModalHeader from '@components/shared/ModalHeader'
import UploadFilesModal from '@components/shared/UploadFiles'
import Tooltip from '@components/shared/ToolTip'

import useForm, { FormError } from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import useArchivosMutation from '@hooks/useArchivosMutation'
import useToggle from '@hooks/useToggle'
import useToast from '@hooks/useToast'

import { ErrorMessages } from '@validation/messages'
import { IconCheck, IconCloudArrowUp } from '@icons'
import { TierraCultivo } from '../../interfaces/index'
import { useRegistroProductor } from '../../store/useRegistroProductor'
import { classNames } from '@utils/classNames'
import { textTierraCult } from '@modules/registro-productor/utils/textContent'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: TierraCultivo) => void
  isUpdate?: boolean
  idToUpdate?: string
}

const TierrasInitialState: TierraCultivo = {
  id: '',
  AREA: '',
  NOMBRE_PREDIO: '',
  DEPARTAMENTO: '',
  PROVINCIA: '',
  DISTRITO: '',
  TIPO_TENENCIA: 'PROPIO'
}

const TierraCultivoModal = ({ isOpen, onClose, onSubmit, isUpdate, idToUpdate }: Props) => {
  const filesToggle = useToggle()
  const toast = useToast()
  const store = useRegistroProductor()
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)

  const { values, ...form } = useForm({
    initialValues: isUpdate
      ? store.state.tierrasCultivo.find(item => item.id === idToUpdate)!
      : TierrasInitialState,
    validate: (values) => {
      const errors: FormError<typeof values> = {}

      if (isEmpty(values.NOMBRE_PREDIO)) {
        errors.NOMBRE_PREDIO = ErrorMessages.empty
      }
      if (isEmpty(values.AREA)) {
        errors.AREA = ErrorMessages.empty
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
      if (isEmpty(values.TIPO_TENENCIA)) {
        errors.TIPO_TENENCIA = ErrorMessages.empty
      }

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
      REGISTRO: 'Tierra cultivo',
      DESCRIPCION_REGISTRO: 'Tierra cultivo Info',
      ArchivosFisicos: fileList
    })

    if (res.data?.data?.NUME_REGI_ARC) {
      form.setField('NUME_REGI_ARC', res.data.data.NUME_REGI_ARC)
    }

    setIsLoadingFiles(false)
    filesToggle.onClose()
    return res.ok
  }

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO,
    codProv: values.PROVINCIA
  })

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleSubmit = () => {
    if (isUpdate) {
      onSubmit(values)
      onClose?.()
      return
    }
    if (values.NUME_REGI_ARC) {
      onSubmit({ ...values, id: nanoid() })
      clearForm()
    } else {
      toast({ title: textTierraCult.filesEmpty, type: 'warning' })
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
            title={isUpdate ? textTierraCult.update : textTierraCult.add}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="Nombre del Predio"
              {...form.inputProps('NOMBRE_PREDIO')}
            />
            <Input
              label="Area (Hectareas)"
              value={values.AREA}
              pattern="^[0-9,+.:]+([,][0-9]+)?$"
              onChange={(e) => {
                e.target.validity.valid && form.setField('AREA', e.target.value)
              }}
              error={form.errors.AREA}
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

          <Select
            label="Tipo de Tenencia"
            error={form.errors.TIPO_TENENCIA}
            value={values.TIPO_TENENCIA}
            onChange={({ value }) => form.setField('TIPO_TENENCIA', value)}
            options={[
              { value: 'PROPIO', label: 'Propio' },
              { value: 'ALQUILADO', label: 'Alquilado' },
              { value: 'CESION', label: 'Cesión de uso' },
              { value: 'OTRO', label: 'Otro' }
            ]}
          />

          <div className="flex flex-col md:flex-row items-center gap-3 text-slate-500 dark:text-white">
            <div className=''>
              <Tooltip label={textTierraCult.messageAdd}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={filesToggle.onOpen}
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
              ? <div className='text-center'>{textTierraCult.addedFiles}</div>
              : <div className='text-center'>{textTierraCult.messageAdd}</div>
            }
            {filesToggle.isOpen && (
              isUpdate
                ? <UploadFilesModal
                    isLoading={isLoadingFiles}
                    isOpen={filesToggle.isOpen}
                    onClose={filesToggle.onClose}
                    title={textTierraCult.add}
                    NUME_REGI_ARC={values.NUME_REGI_ARC!}
                  />
                : <UploadFilesModal
                    isLoading={isLoadingFiles}
                    isOpen={filesToggle.isOpen}
                    onClose={filesToggle.onClose}
                    title={textTierraCult.add}
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
            <button type="submit" className="btn btn-outline-primary">
              {isUpdate ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default TierraCultivoModal
