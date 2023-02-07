import Select from '../Select'

import {
  InformacionCultivoInput,
  useGetAllEspeciesQuery,
  useGetCultivarByEspecieQuery
} from '@generated/graphql'

import { IconMinus, IconPlus } from '@icons'
import useForm, { FormError } from '@hooks/useForm'
import { ErrorMessages } from '@validation/messages'
import { useState } from 'react'
import Input from '../Input'

interface InputListValue extends InformacionCultivoInput {
  REGLAMENTARIO?: string
}

interface Props {
  isLast: boolean
  onDelete: () => void
  data: InputListValue
  onAdd: (item: InputListValue) => void
}

const InputListItem = ({ data, isLast, onAdd, onDelete }: Props) => {
  const [isInput, setIsInput] = useState(false)

  const { values, ...form } = useForm({
    initialValues: { ...data },
    validate: (values) => {
      const errors: Partial<FormError<typeof values>> = {}

      if (!values.ESPECIE_ID) {
        errors.ESPECIE_ID = ErrorMessages.empty
      }

      if (!values.CULTIVO_ID && values.REGLAMENTARIO === 'INACTIVO') {
        errors.CULTIVO_ID = ErrorMessages.empty
      }

      if (!values.CULTIVO_REGLAMENTARIO && values.REGLAMENTARIO !== 'INACTIVO') {
        errors.CULTIVO_REGLAMENTARIO = ErrorMessages.empty
      }

      return errors
    }
  })

  const [especieData] = useGetAllEspeciesQuery({
    variables: {
      page: 1,
      pageSize: 10
    }
  })

  const [cultivarData] = useGetCultivarByEspecieQuery({
    variables: { codEspecie: +values.ESPECIE_ID }
  })

  const especies = especieData.data?.getAllEspecies?.data ?? []
  const cultivares = cultivarData.data?.getCultivarByEspecie ?? []

  const handleSubmit = () => onAdd(values)

  const handleChange = (value: string | number | undefined) => {
    const isInputValue = especies.find(i => i.ESPECIE_ID === +value!)
    isInputValue?.REGLAMENTARIO === 'INACTIVO' ? setIsInput(false) : setIsInput(true)
    form.setField('REGLAMENTARIO', isInputValue?.REGLAMENTARIO)
    !isInput ? form.setField('ESPECIE_ID', value) : form.setField('CULTIVO_ID', value)
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex items-center w-full gap-4"
    >
      <div className='flex w-full gap-4'>
        <div className='w-1/2'>
          <Select
            withFilter
            label="Especie"
            value={values.ESPECIE_ID}
            error={form.errors.ESPECIE_ID}
            onChange={({ value }) => handleChange(value)}
            options={especies}
            dataExtractor={{ label: 'NOMBRE_CIENTIFICO', value: 'ESPECIE_ID' }}
          />
        </div>
        <div className='w-1/2'>
          {values.REGLAMENTARIO === 'INACTIVO'
            ? (
                <Select
                  withFilter
                  label="Cultivar"
                  options={cultivares}
                  value={values.CULTIVO_ID!}
                  error={form.errors.CULTIVO_ID}
                  onChange={({ value }) => {
                    form.setField('CULTIVO_ID', value)
                  }}
                  dataExtractor={{ label: 'NOMBRE_CULTIVAR', value: 'CULTIVO_ID' }}
                />
              )
            : (
                <Input
                  value={values.CULTIVO_REGLAMENTARIO!}
                  label="Especificar"
                  onChange={(e) => {
                    form.setField('CULTIVO_REGLAMENTARIO', e.target.value)
                  }}
                />
              )
          }
        </div>
      </div>

      {isLast && (
        <button type="submit" className="btn-icon btn-solid-primary">
          <IconPlus />
        </button>
      )}

      {!isLast && (
        <button
          type="button"
          onClick={onDelete}
          className="btn-icon btn-outline-primary"
        >
          <IconMinus />
        </button>
      )}
    </form>
  )
}

export default InputListItem
