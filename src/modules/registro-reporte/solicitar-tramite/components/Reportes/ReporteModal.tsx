import { useState } from 'react'
// import moment from 'moment'
import { nanoid } from 'nanoid'

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
import { RegistroFormato } from '../../interfaces/index'
import { classNames } from '@utils/classNames'
import { textSensores } from '@modules/solicitud-autorizacion/utils/textContent'
import { useRegistroReporte } from '../../store/useRegistroReporte'
import Select from '@components/shared/Select'
import { destino, especieMadera, listaEmbalaje } from '@modules/registro-reporte/utils/reporteutil'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: RegistroFormato) => void
  idToUpdate?: string
  isUpdate?: boolean
}

const initialState: RegistroFormato = {
  ind: '',
  CANTIDAD_TRATADA: '',
  ESPECIE_MADERA_TRATADA: '',
  EXPORTADOR: '',
  FECHA_TRATAMIENTO: '',
  ID_REPORTE: 0,
  LOTE: '',
  NUMERO_GUIA: '',
  NUME_REGI_ARC: '',
  PROCEDENCIA: '',
  TIPO_EMBALAJE: '',
  TOTAL_UNID_FAB: '',
  USO: ''
}

const ReporteModal = ({ isOpen, onClose, onSubmit, isUpdate, idToUpdate }: Props) => {
  const store = useRegistroReporte()

  const toggleCreateFile = useToggle()

  const toast = useToast()
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)

  const { values, ...form } = useForm({
    initialValues: isUpdate
      ? store.state.registroFormato.find(item => item.ind === idToUpdate)!
      : initialState,
    validate: (values) => {
      const errors: FormError<RegistroFormato> = {}
      return errors
    }
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
    const fechatratamiento = new Date(`${values.FECHA_TRATAMIENTO.slice(3, 5)} ${values.FECHA_TRATAMIENTO.slice(0, 2)}, ${values.FECHA_TRATAMIENTO.slice(-4)}`)
    values.FECHA_TRATAMIENTO = fechatratamiento.toISOString().slice(0, 10)
    console.log(values)
    if (isUpdate) {
      onSubmit(values)
      onClose()
      return
    }

    if (values.NUME_REGI_ARC) {
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
            title={isUpdate ? textSensores.update : textSensores.addedFiles}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <InputCleave
              label="Fecha(DD-MM-AAAA)"
              {...form.inputProps('FECHA_TRATAMIENTO')}
            />
            <Input
              label="Lote"
              {...form.inputProps('LOTE')} />

            <Select
              label="Especie Madera"
              value={values.ESPECIE_MADERA_TRATADA!}
              error={form.errors.ESPECIE_MADERA_TRATADA!}
              onChange={(d) => {
                form.setField('ESPECIE_MADERA_TRATADA', d.value)
                // d.value === 'GRADO' && form.setField('HORAS', '')
              }}
              options={especieMadera}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Input
              label="Cantidad Tratada Pie cubico"
              {...form.inputProps('CANTIDAD_TRATADA')}
            />

            <Select
              label="Tipo embalaje"
              value={values.TIPO_EMBALAJE!}
              error={form.errors.TIPO_EMBALAJE!}
              onChange={(d) => {
                form.setField('TIPO_EMBALAJE', d.value)
                // d.value === 'GRADO' && form.setField('HORAS', '')
              }}
              options={listaEmbalaje}
            />
            <Input
              label="Total Unidades"
              {...form.inputProps('TOTAL_UNID_FAB')}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Input
              label="Guia de Remisión"
              {...form.inputProps('NUMERO_GUIA')}
            />
            <Input
              label="Exportador"
              {...form.inputProps('EXPORTADOR')} />

            <Select
              label="Uso"
              value={values.USO!}
              error={form.errors.USO!}
              onChange={(d) => {
                form.setField('USO', d.value)
                // d.value === 'GRADO' && form.setField('HORAS', '')
              }}
              options={destino}
            />
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
                  <span className={classNames(['text-2xl', values.NUME_REGI_ARC! && 'text-green-500'])}>
                    {values.NUME_REGI_ARC
                      ? <IconCheck />
                      : <IconCloudArrowUp />
                    }
                  </span>
                </button>
              </Tooltip>
            </div>
            {values.NUME_REGI_ARC!
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
                    NUME_REGI_ARC={values.NUME_REGI_ARC!}
                  />
                )
                : (
                  <UploadFiles
                    isLoading={isLoadingFiles}
                    isOpen={toggleCreateFile.isOpen}
                    onClose={toggleCreateFile.onClose}
                    title={textSensores.add}
                    onUpload={handleUpload}
                    NUME_REGI_ARC={values.NUME_REGI_ARC!}
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

export default ReporteModal
