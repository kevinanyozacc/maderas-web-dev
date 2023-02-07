import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import moment from 'moment'

import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import ModalHeader from '@components/shared/ModalHeader'

import useForm, { FormError } from '@hooks/useForm'
import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'
import useGetUbigeo from '@hooks/useGetUbigeo'
import { LocalidadEnsayosInput } from '../../interfaces/cultivaresComerciales'
import InputCleave from '@components/shared/InputCleave'
import { useCultivaresComerciales } from '../../store/useCultivaresComerciales'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  onSubmit: (values: LocalidadEnsayosInput) => void
  idToUpdate?: string
  isUpdate?: boolean
}

const initialState: LocalidadEnsayosInput = {
  DEPARTAMENTO_ID: '',
  PROVINCIA_ID: '',
  DISTRITO_ID: '',
  ALTITUD: '',
  FECHA_INICIO: '',
  FECHA_FIN: '',
  SECTOR: '',
  id: ''
}

const LocalidadEnsayoModal = ({
  isOpen,
  onClose,
  onSubmit,
  idToUpdate,
  isUpdate = false
}: Props) => {
  const { state } = useCultivaresComerciales()
  const { values, ...form } = useForm({
    initialValues: isUpdate
      ? state.localidadEnsayos.find((i) => i.id === idToUpdate)!
      : initialState,
    validate: (values) => {
      const errors: FormError<typeof values> = {}

      if (isEmpty(values.DEPARTAMENTO_ID.trim()))
        errors.DEPARTAMENTO_ID = ErrorMessages.empty

      if (isEmpty(values.PROVINCIA_ID.trim()))
        errors.PROVINCIA_ID = ErrorMessages.empty

      if (isEmpty(values.DISTRITO_ID.trim()))
        errors.DISTRITO_ID = ErrorMessages.empty

      if (isEmpty(values.ALTITUD.trim())) errors.ALTITUD = ErrorMessages.empty

      if (isEmpty(values.FECHA_INICIO.trim()))
        errors.FECHA_INICIO = ErrorMessages.empty

      if (isEmpty(values.FECHA_FIN.trim()))
        errors.FECHA_FIN = ErrorMessages.empty

      if (isEmpty(values.SECTOR.trim())) errors.SECTOR = ErrorMessages.empty

      return errors
    }
  })

  useEffect(() => {
    if (isUpdate) {
      form.setField(
        'FECHA_INICIO',
        moment(values.FECHA_INICIO).format('DD-MM-YYYY')
      )
      form.setField('FECHA_FIN', moment(values.FECHA_FIN).format('DD-MM-YYYY'))
    }
  }, [])

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO_ID,
    codProv: values.PROVINCIA_ID
  })

  const handleSubmit = () => {
    const fechaInicio = new Date(
      `${values.FECHA_INICIO.slice(3, 5)} ${values.FECHA_INICIO.slice(
        0,
        2
      )}, ${values.FECHA_INICIO.slice(-4)}`
    )
    const fechaFin = new Date(
      `${values.FECHA_FIN.slice(3, 5)} ${values.FECHA_FIN.slice(
        0,
        2
      )}, ${values.FECHA_FIN.slice(-4)}`
    )
    if (`${fechaInicio}` === 'Invalid Date') {
      form.setErrors({ FECHA_INICIO: 'Ingresa una fecha valida' })
      return
    }

    if (`${fechaFin}` === 'Invalid Date') {
      form.setErrors({ FECHA_FIN: 'Ingresa una fecha valida' })
      return
    }

    onSubmit({
      ...values,
      FECHA_INICIO: fechaInicio,
      FECHA_FIN: fechaFin,
      id: nanoid()
    })

    form.clear()
    onClose?.()
  }

  return (
    <Modal hasOverlay isOpen={isOpen} onClose={clearForm}>
      <div className="flex z-[70] w-full h-full sm:h-max sm:w-[90%] max-w-[750px] sm:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <div className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10">
          <ModalHeader
            closeBtn={clearForm}
            title="Localidades donde se realizaron los ensayos"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
              error={form.errors.DISTRITO_ID}
              onChange={({ value }) => form.setField('DISTRITO_ID', value)}
              options={ubigeo.distritos}
              dataExtractor={{ label: 'NOMB_DIST_TDI', value: 'CODI_DIST_TDI' }}
            />
          </div>

          <Input label="Altitud" {...form.inputProps('ALTITUD')} />

          <Input label="Anexo / Sector" {...form.inputProps('SECTOR')} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputCleave
              type="date"
              label="Fecha de Inicio"
              {...form.inputProps('FECHA_INICIO')}
            />
            <InputCleave
              type="date"
              label="Fecha Fin"
              {...form.inputProps('FECHA_FIN')}
            />
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

export default LocalidadEnsayoModal
