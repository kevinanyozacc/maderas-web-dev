import { nanoid } from 'nanoid'

import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import ModalHeader from '@components/shared/ModalHeader'

import useForm from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import { establecimientoSucursalesValid } from '../../../validation/establecimientoSucursalesValid'
import { SucursalesInput } from '../../interfaces/declaracionSemilla'
import { useDeclaracionSemilla } from '../../store/useDeclaracionSemilla'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: SucursalesInput) => void
  idToUpdate?: string
  isUpdate?: boolean
}

const initialState: SucursalesInput = {
  NOMBRE_SUCURSAL: '',
  DIRECCION_SUCURSAL: '',
  EXPEDIENTE_ID: 0,
  DEPARTAMENTO_ID: '',
  PROVINCIA_ID: '',
  DISTRITO_ID: '',
  id: '',
  nameDep: '',
  nameDis: '',
  nameProv: ''
}

const EstablecimientoSucursalesModal = ({ isOpen, onClose, onSubmit, isUpdate, idToUpdate }: Props) => {
  const store = useDeclaracionSemilla()

  const { values, ...form } = useForm({
    validate: establecimientoSucursalesValid,
    initialValues: isUpdate
      ? store.state.sucursales.find(item => item.id === idToUpdate)!
      : initialState
  })

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO_ID,
    codProv: values.PROVINCIA_ID
  })

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleSubmit = () => {
    if (isUpdate) {
      onSubmit(values)
      clearForm()
      return
    }
    onSubmit({ ...values, id: nanoid() })
    clearForm()
  }

  return (
    <Modal isOpen={isOpen} onClose={clearForm} hasOverlay>
      <div className="flex z-[70] w-full h-full md:h-max max-w-[770px] sm:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-5 flex-1 px-5 py-4 md:p-10"
        >
          <ModalHeader
            closeBtn={clearForm}
            title={`${isUpdate ? 'Actualizar' : 'Agregar'} informacion del establecimiento`}
          />

          <Input label="Nombre Comercial" {...form.inputProps('NOMBRE_SUCURSAL')} />
          <Input label="Ubicacion del Establecimiento" {...form.inputProps('DIRECCION_SUCURSAL')} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <SelectWithFilter
              withFilter
              label="Departamento"
              value={values.DEPARTAMENTO_ID}
              error={form.errors.DEPARTAMENTO_ID}
              onChange={({ value, label }) => {
                form.setFields({
                  DEPARTAMENTO_ID: value,
                  PROVINCIA_ID: '',
                  DISTRITO_ID: '',
                  nameDep: label
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
              onChange={({ value, label }) => {
                form.setFields({ PROVINCIA_ID: value, DISTRITO_ID: '', nameProv: label })
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
              onChange={({ value, label }) => {
                form.setField('DISTRITO_ID', value)
                form.setField('nameDis', label)
              }}
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
            <button type="submit" className="btn btn-outline-primary">
              {isUpdate ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
export default EstablecimientoSucursalesModal
