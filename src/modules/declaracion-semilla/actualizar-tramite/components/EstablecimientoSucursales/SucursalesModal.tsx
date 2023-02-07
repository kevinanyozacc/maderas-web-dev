import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import ModalHeader from '@components/shared/ModalHeader'

import useForm, { FormError } from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import { SucursalCreateInput, SucursalUpdateInput, TramiteSucursal } from '@generated/graphql'
import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'
import { useEffect } from 'react'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: SucursalCreateInput | SucursalUpdateInput) => void
  dataToUpdate?: TramiteSucursal
  isUpdate?: boolean
}

const initialValues: SucursalCreateInput = {
  NOMBRE_SUCURSAL: '',
  DIRECCION_SUCURSAL: '',
  DEPARTAMENTO_ID: '',
  DISTRITO_ID: '',
  EXPEDIENTE_ID: 0,
  PROVINCIA_ID: ''
}

const SucursalesModal = ({ isOpen, onClose, onSubmit, isUpdate, dataToUpdate }: Props) => {
  const { values, ...form } = useForm({
    initialValues,
    validate: (values) => {
      const errors: FormError<SucursalCreateInput> = {}
      if (isEmpty(values.NOMBRE_SUCURSAL)) errors.NOMBRE_SUCURSAL = ErrorMessages.empty
      if (isEmpty(values.DIRECCION_SUCURSAL)) errors.DIRECCION_SUCURSAL = ErrorMessages.empty
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
        __typename,
        FECHA_REGISTRO,
        ...rest
      } = dataToUpdate

      form.setFields(rest)
    }
  }, [dataToUpdate])

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO_ID,
    codProv: values.PROVINCIA_ID
  })

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleSubmit = () => {
    onSubmit(values)
    clearForm()
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
              ? 'Actualizar Informacion Del Establecimiento'
              : 'Agregar Informacion Del Establecimiento'
            }
          />

          <Input label="Nombre Comercial" {...form.inputProps('NOMBRE_SUCURSAL')} />
          <Input label="Ubicacion del Establecimiento" {...form.inputProps('DIRECCION_SUCURSAL')} />

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

export default SucursalesModal
