import { useEffect } from 'react'
import isEmpty from 'validator/lib/isEmpty'
import moment from 'moment'

import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import ModalHeader from '@components/shared/ModalHeader'
import InputCleave from '@components/shared/InputCleave'
import Tooltip from '@components/shared/ToolTip'
import UploadFilesModal from '@components/shared/UploadFiles'

import useForm, { FormError } from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import { ErrorMessages } from '@validation/messages'
import { ExperienciaInput, useGetExperienciasByIdQuery } from '@generated/graphql'
import { IconCheck, IconCloudArrowUp } from '@icons'
import useToggle from '@hooks/useToggle'
import { classNames } from '@utils/classNames'
import { textExperiencia } from '@modules/registro-productor/utils/textContent'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: any) => void
  idToUpdate: number
}

interface expUpdate extends
  Omit<ExperienciaInput, 'NUME_REGI_ARC'>{
    NUME_REGI_ARC: string | undefined | null
}

const initialState: expUpdate = {
  ACTIVIDAD_DESARROLLADA: '',
  RAZON_SOCIAL: '',
  DEPARTAMENTO: '',
  PROVINCIA: '',
  DISTRITO: '',
  FECHA_INICIO: '',
  FECHA_TERMINO: '',
  NUME_REGI_ARC: ''
}

const ExperienciaUpdateModal = ({ isOpen, onClose, onSubmit, idToUpdate }: Props) => {
  const filesToggle = useToggle()

  const [data] = useGetExperienciasByIdQuery({
    variables: {
      experienciaId: idToUpdate
    },
    pause: !idToUpdate,
    requestPolicy: 'network-only'
  })

  const { values, ...form } = useForm({
    initialValues: initialState,
    validate: (values) => {
      const errors: FormError<typeof values> = {}
      if (isEmpty(values.RAZON_SOCIAL)) errors.RAZON_SOCIAL = ErrorMessages.empty
      if (isEmpty(values.ACTIVIDAD_DESARROLLADA)) errors.ACTIVIDAD_DESARROLLADA = ErrorMessages.empty
      if (isEmpty(values.DEPARTAMENTO)) errors.DEPARTAMENTO = ErrorMessages.empty
      if (isEmpty(values.PROVINCIA)) errors.PROVINCIA = ErrorMessages.empty
      if (isEmpty(values.DISTRITO)) errors.DISTRITO = ErrorMessages.empty
      if (isEmpty(values.FECHA_INICIO)) errors.FECHA_INICIO = ErrorMessages.empty
      if (isEmpty(values.FECHA_TERMINO)) errors.FECHA_TERMINO = ErrorMessages.empty
      if (values.FECHA_INICIO.length !== 10) errors.FECHA_INICIO = ErrorMessages.badDate
      if (values.FECHA_TERMINO.length !== 10) errors.FECHA_TERMINO = ErrorMessages.badDate
      return errors
    }
  })

  useEffect(() => {
    if (data.data?.getExperienciasById) {
      const { __typename, ...rest } = data.data.getExperienciasById!
      const fechaInicio = moment(rest.FECHA_INICIO).format('DD-MM-YYYY')
      const fechaFin = moment(rest.FECHA_TERMINO).format('DD-MM-YYYY')
      rest.FECHA_INICIO = fechaInicio
      rest.FECHA_TERMINO = fechaFin
      form.setFields(rest)
    }
  }, [data.fetching])

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO,
    codProv: values.PROVINCIA
  })

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleUpdate = () => {
    // INPUT (DD-MM-YYYY) -> Output (MM-DD-YYYY) EN FORMAT
    const fechaInicio = new Date(`${values.FECHA_INICIO.slice(3, 5)} ${values.FECHA_INICIO.slice(0, 2)}, ${values.FECHA_INICIO.slice(-4)}`)
    const fechaTermino = new Date(`${values.FECHA_TERMINO.slice(3, 5)} ${values.FECHA_TERMINO.slice(0, 2)}, ${values.FECHA_TERMINO.slice(-4)}`)
    values.FECHA_INICIO = fechaInicio.toISOString().slice(0, 10)
    values.FECHA_TERMINO = fechaTermino.toISOString().slice(0, 10)
    onSubmit(values)
    clearForm()
  }

  return (
    <Modal isOpen={isOpen} onClose={clearForm} hasOverlay>
      <div className="flex z-[70] w-full h-full md:h-max max-w-[770px] sm:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <div className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10">
          <ModalHeader
            closeBtn={clearForm}
            title={textExperiencia.update}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input label="Razon Social" {...form.inputProps('RAZON_SOCIAL')} />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputCleave
              label="Fecha Inicio"
              {...form.inputProps('FECHA_INICIO')}
            />
            <InputCleave
              label="Fecha Término"
              {...form.inputProps('FECHA_TERMINO')}
            />
          </div>

          <div className='flex flex-col md:flex-row items-center gap-3 text-slate-500 dark:text-white'>
            <div className=''>
              <Tooltip label={textExperiencia.messageAdd}>
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
              ? <div className='text-center'>{textExperiencia.addedFiles}</div>
              : <div className='text-center'>{textExperiencia.messageAdd}</div>
            }
            {filesToggle.isOpen && (
              <UploadFilesModal
                isOpen={filesToggle.isOpen}
                onClose={filesToggle.onClose}
                title={textExperiencia.update}
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
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => form.onSubmit(handleUpdate)()}
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ExperienciaUpdateModal
