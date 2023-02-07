import { useEffect } from 'react'
import moment from 'moment'
import isEmpty from 'validator/lib/isEmpty'

import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import Select from '@components/shared/Select'
import InputCleave from '@components/shared/InputCleave'
import ModalHeader from '@components/shared/ModalHeader'
import Tooltip from '@components/shared/ToolTip'
import UploadFilesModal from '@components/shared/UploadFiles'

import useForm, { FormError } from '@hooks/useForm'
import useToggle from '@hooks/useToggle'

import { ErrorMessages } from '@validation/messages'
import {
  EspecializacionInput,
  useGetEspecializacionByIdQuery
} from '@generated/graphql'
import { classNames } from '@utils/classNames'
import { IconCheck, IconCloudArrowUp } from '@icons'
import { textEspecializacion } from '@modules/registro-productor/utils/textContent'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  onSubmit: (values: any) => void
  idToUpdate: number
}

interface especUpdate extends Omit<EspecializacionInput, 'NUME_REGI_ARC'> {
  NUME_REGI_ARC: string | undefined | null
}

const initialState: especUpdate = {
  HORAS: '',
  LUGAR: '',
  NOMBRE: '',
  FECHA_INICIO: '',
  FECHA_TERMINO: '',
  NUME_REGI_ARC: '',
  TIPO_ESPECIALIDAD: ''
}

const EspecializacionUpdateModal = ({
  isOpen,
  onClose,
  onSubmit,
  idToUpdate
}: Props) => {
  const filesToggle = useToggle()

  const [data] = useGetEspecializacionByIdQuery({
    variables: {
      especializacionId: idToUpdate
    },
    pause: !idToUpdate,
    requestPolicy: 'network-only'
  })

  const { values, ...form } = useForm({
    initialValues: initialState,
    validate: (values) => {
      const errors: FormError<typeof values> = {}
      if (isEmpty(values.TIPO_ESPECIALIDAD))
        errors.TIPO_ESPECIALIDAD = ErrorMessages.empty
      if (isEmpty(values.NOMBRE)) errors.NOMBRE = ErrorMessages.empty
      if (isEmpty(values.LUGAR)) errors.LUGAR = ErrorMessages.empty

      if (isEmpty(values.FECHA_INICIO))
        errors.FECHA_INICIO = ErrorMessages.empty
      if (isEmpty(values.FECHA_TERMINO))
        errors.FECHA_TERMINO = ErrorMessages.empty
      if (values.FECHA_INICIO.length !== 10)
        errors.FECHA_INICIO = ErrorMessages.badDate
      if (values.FECHA_TERMINO.length !== 10)
        errors.FECHA_TERMINO = ErrorMessages.badDate
      return errors
    }
  })

  useEffect(() => {
    if (data.data?.getEspecializacionById) {
      const { __typename, ...rest } = data.data.getEspecializacionById!
      rest.FECHA_INICIO = moment(new Date(rest.FECHA_INICIO)).format(
        'DD-MM-YYYY'
      )
      rest.FECHA_TERMINO = moment(new Date(rest.FECHA_TERMINO)).format(
        'DD-MM-YYYY'
      )
      form.setFields(rest)
    }
  }, [data.fetching])

  const handleSubmit = () => {
    values.FECHA_INICIO = new Date(
      `${values.FECHA_INICIO.slice(3, 5)} ${values.FECHA_INICIO.slice(
        0,
        2
      )}, ${values.FECHA_INICIO.slice(-4)}`
    )
    values.FECHA_TERMINO = new Date(
      `${values.FECHA_TERMINO.slice(3, 5)} ${values.FECHA_TERMINO.slice(
        0,
        2
      )}, ${values.FECHA_TERMINO.slice(-4)}`
    )
    onSubmit(values)
    onClose?.()
  }

  return (
    <Modal hasOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex z-[100] w-full h-full md:h-max max-w-[770px] md:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <form className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10">
          <ModalHeader closeBtn={onClose} title={textEspecializacion.update} />

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

          <div className="flex justify-between items-center gap-6">
            <InputCleave
              label="Fecha Inicio"
              {...form.inputProps('FECHA_INICIO')}
            />
            <InputCleave
              label="Fecha Término"
              {...form.inputProps('FECHA_TERMINO')}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 text-slate-500 dark:text-white">
            <div className="">
              <Tooltip label={textEspecializacion.messageAdd}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={filesToggle.onOpen}
                >
                  Subir Archivos
                  <span
                    className={classNames([
                      'text-2xl',
                      values.NUME_REGI_ARC! && 'text-green-500'
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
            {filesToggle.isOpen && (
              <UploadFilesModal
                isOpen={filesToggle.isOpen}
                onClose={filesToggle.onClose}
                title={textEspecializacion.add}
                NUME_REGI_ARC={values.NUME_REGI_ARC!}
              />
            )}
          </div>

          <div className="flex w-full justify-between mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost-red"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => form.onSubmit(handleSubmit)()}
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EspecializacionUpdateModal
