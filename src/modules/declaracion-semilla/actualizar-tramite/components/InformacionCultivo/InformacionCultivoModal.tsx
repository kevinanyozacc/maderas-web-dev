import { useEffect } from 'react'

import Input from '@components/shared/Input'
import Modal from '@components/shared/Modal'
import Select from '@components/shared/Select'
import ModalHeader from '@components/shared/ModalHeader'
import SelectEspecie from '@components/shared/Select/SelectEspecie'

import { Estados, InformacionCultivoInput, useGetInfoCulivoByIdQuery } from '@generated/graphql'

import useForm, { FormError } from '@hooks/useForm'
import useGetEspecieCultivar from '@hooks/useGetEspeciesCultivar'
import { ErrorMessages } from '@validation/messages'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  onSubmit: (values: InformacionCultivoInput) => void
  idToUpdate?: number
  isUpdate?: boolean
  dataUpdate?: any
}

interface InformacionCultivoItem extends InformacionCultivoInput {
  REGLAMENTARIO: Estados
  NOMBRE_ESPECIE: string
}

const initialState: InformacionCultivoItem = {
  ESPECIE_ID: 0,
  CULTIVO_ID: 0,
  CULTIVO_REGLAMENTARIO: '',
  REGLAMENTARIO: Estados.Inactivo,
  NOMBRE_ESPECIE: ''
}

const InformacionCultivoModal = ({ isOpen, onClose, onSubmit, idToUpdate, isUpdate = false, dataUpdate }: Props) => {
  const { values, ...form } = useForm({
    initialValues: initialState,
    validate: (values) => {
      const errors: Partial<FormError<typeof values>> = {}
      if (!values.ESPECIE_ID) errors.ESPECIE_ID = ErrorMessages.empty
      if (!values.CULTIVO_ID && values.REGLAMENTARIO === Estados.Activo) errors.CULTIVO_ID = ErrorMessages.empty
      if (!values.CULTIVO_REGLAMENTARIO && values.REGLAMENTARIO === Estados.Inactivo) errors.CULTIVO_REGLAMENTARIO = ErrorMessages.empty
      return errors
    }
  })

  const [data] = useGetInfoCulivoByIdQuery({
    variables: {
      infoCultivoId: idToUpdate!
    },
    pause: !idToUpdate,
    requestPolicy: 'network-only'
  })

  useEffect(() => {
    if (isUpdate) {
      form.setField('NOMBRE_ESPECIE', dataUpdate?.NOMBRE_ESPECIE)
    }
    if (isUpdate && data.data?.getInfoCulivoById) {
      const { __typename, ...rest } = data.data.getInfoCulivoById[0]
      form.setFields(rest)
      if (!rest.CULTIVO_REGLAMENTARIO && rest.CULTIVO_ID) {
        form.setField('REGLAMENTARIO', Estados.Activo)
      }
    }
  }, [data.fetching])

  const { especies, cultivares } = useGetEspecieCultivar({ values: +values.ESPECIE_ID })
  const allCultivares = cultivares.sort((a, b) => a.NOMBRE_CULTIVAR.localeCompare(b.NOMBRE_CULTIVAR))

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleSubmit = () => {
    if (values.REGLAMENTARIO === Estados.Inactivo) {
      values.CULTIVO_ID = null
    }
    const { REGLAMENTARIO, NOMBRE_ESPECIE, ...rest } = values
    onSubmit(rest)
    clearForm()
  }

  return (
    <Modal hasOverlay isOpen={isOpen} onClose={clearForm}>
      <div className="flex z-[70] w-full h-full md:h-max sm:w-[90%] max-w-[600px] md:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10"
        >
          <ModalHeader
            closeBtn={clearForm}
            title={`${isUpdate ? 'Actualizar' : 'Agregar'} informacion de cultivo`}
          />

          <div className="grid grid-cols-1 gap-6">
            <SelectEspecie
              value={values.NOMBRE_ESPECIE || ''}
              error={form.errors.ESPECIE_ID}
              onChange={({ especieId, nameEspecie, reglamentario }) => {
                form.setFields({
                  REGLAMENTARIO: reglamentario,
                  ESPECIE_ID: especieId,
                  CULTIVO_ID: 0,
                  CULTIVO_REGLAMENTARIO: '',
                  NOMBRE_ESPECIE: nameEspecie
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
                  onChange={({ value }) => { form.setField('CULTIVO_ID', value) }}
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
              {isUpdate ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
export default InformacionCultivoModal
