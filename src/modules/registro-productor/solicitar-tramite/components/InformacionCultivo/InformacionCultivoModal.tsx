import { nanoid } from 'nanoid'

import Input from '@components/shared/Input'
import Modal from '@components/shared/Modal'
import Select from '@components/shared/Select'
import ModalHeader from '@components/shared/ModalHeader'
import SelectEspecie from '@components/shared/Select/SelectEspecie'

import useForm from '@hooks/useForm'
import useGetEspecieCultivar from '@hooks/useGetEspeciesCultivar'

import { InformacionCultivoItem } from '../../interfaces'
import { Estados } from '@generated/graphql'
import { InformacionCultivoValid } from '@modules/registro-productor/validation/InformacionCultivoValid'
import { useRegistroProductor } from '../../store/useRegistroProductor'
import { textInfoCult } from '@modules/registro-productor/utils/textContent'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  onSubmit: (values: InformacionCultivoItem) => void
  isUpdate?: boolean
  id?: string
}

const initialState: InformacionCultivoItem = {
  id: '',
  ESPECIE_ID: 0,
  CULTIVO_ID: null,
  CULTIVO_REGLAMENTARIO: '',
  REGLAMENTARIO: Estados.Inactivo,
  NOMBRE_CULTIVO: '',
  NOMBRE_ESPECIE: ''
}

const InformacionCultivoModal = ({ isOpen, onClose, onSubmit, isUpdate, id }: Props) => {
  const { state } = useRegistroProductor()
  const data = state.informacionCultivos.find(item => item.id === id)

  const { values, ...form } = useForm({
    initialValues: isUpdate ? data! : initialState,
    validate: InformacionCultivoValid
  })

  const { especies, cultivares } = useGetEspecieCultivar({ values: +values.ESPECIE_ID })

  const allCultivares = cultivares.sort((a, b) => a.NOMBRE_CULTIVAR.localeCompare(b.NOMBRE_CULTIVAR))

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleSubmit = () => {
    if (isUpdate) {
      onSubmit?.(values)
      onClose?.()
    } else {
      onSubmit({ ...values, id: nanoid() })
      clearForm()
    }
  }

  return (
    <Modal hasOverlay isOpen={isOpen} onClose={clearForm}>
      <div className="flex z-[70] w-full h-full sm:h-max sm:w-[90%] max-w-[600px] sm:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10"
        >
          <ModalHeader
            closeBtn={clearForm}
            title={isUpdate ? textInfoCult.update : textInfoCult.add}
          />

          <div className="grid grid-cols-1 gap-6">
            <SelectEspecie
              value={values.NOMBRE_ESPECIE || ''}
              error={form.errors.ESPECIE_ID}
              onChange={({ especieId, nameEspecie, reglamentario }) => {
                form.setFields({
                  REGLAMENTARIO: reglamentario,
                  ESPECIE_ID: especieId,
                  CULTIVO_ID: undefined,
                  CULTIVO_REGLAMENTARIO: '',
                  NOMBRE_ESPECIE: nameEspecie,
                  NOMBRE_CULTIVO: ''
                })
              }}
              options={especies}
              dataExtractor={{ label: 'NOMBRE_CIENTIFICO', value: 'ESPECIE_ID', reglamentario: 'REGLAMENTARIO' }}
              isUpdate={!!isUpdate}
              dataUpdate={{
                especieId: values.ESPECIE_ID,
                nameEspecie: values.NOMBRE_ESPECIE!,
                reglamentario: values.REGLAMENTARIO!
              }}
            />

            {values.REGLAMENTARIO === Estados.Activo
              ? <Select
                  withFilter
                  label="Cultivar"
                  options={allCultivares}
                  value={values.CULTIVO_ID!}
                  error={form.errors.CULTIVO_ID}
                  onChange={({ value, label }) => {
                    form.setField('CULTIVO_ID', value)
                    form.setField('NOMBRE_CULTIVO', label)
                  }}
                  dataExtractor={{ label: 'NOMBRE_CULTIVAR', value: 'CULTIVO_ID' }}
                />
              : <Input
                  label="Especificar Cultivar"
                  {...form.inputProps('CULTIVO_REGLAMENTARIO')}
                />
            }
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
              type="submit"
              className="btn btn-outline-primary"
            >
              {isUpdate
                ? 'Actualizar'
                : 'Agregar'
              }
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default InformacionCultivoModal
