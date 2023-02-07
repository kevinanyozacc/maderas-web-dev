import { Especies, Estados, useGetEspeciesByNameQuery } from '@generated/graphql'
import OutsideContainer from '@hooks/OutsideClick'
import { useDebounce } from '@hooks/useDebounce'
import { IconCheck, IconSearch } from '@icons'
import { classNames } from '@utils/classNames'
import { useEffect, useRef, useState } from 'react'
import Input from '../Input'
import Spinner from '../Spinner'

interface innerDataInput {
  nameEspecie: string
  especieId: number
  reglamentario: Estados
}

interface OptionProps {
  label: string
  value: number
  onClick?: () => void
  reglamentario: Estados
}

interface PropsSelect<T> {
  options?: T[]
  error?: string
  value: string | number
  dataExtractor?: { value: keyof T; label: keyof T, reglamentario: keyof T }
  onBlur?: () => void
  onChange: (data: innerDataInput) => void
  isUpdate?: boolean
  dataUpdate?: innerDataInput
  queryOptions?: {
    estado: Estados,
    denominacion: Estados
  }
}

const Option = ({ label, onClick }: OptionProps) => {
  return (
    <li
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.()
      }}
      className="block w-full text-left border-b border-gray-100 dark:border-slate-600
      rounded-t cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-600 select-none"
    >
      <div className="relative flex items-center w-full p-2 pl-2 border-l-4 border-transparent hover:border-primary-700">
        <div className="flex items-center w-full">
          <div className="mx-2 -mt-1">{label}</div>
        </div>
      </div>
    </li>
  )
}

const SelectEspecie = <T extends object>({
  options,
  onBlur,
  onChange,
  dataExtractor,
  value,
  isUpdate,
  dataUpdate,
  queryOptions,
  ...props
}: PropsSelect<T>) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)
  const [dataByName, setDataByName] = useState<Especies[]>([])

  const [nameEspecie, setNameEspecie] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [innerData, setInnerData] = useState<innerDataInput>({
    especieId: 0,
    nameEspecie: '',
    reglamentario: Estados.Inactivo
  })

  const keyValue = dataExtractor ? dataExtractor.value : 'value'
  const keyLabel = dataExtractor ? dataExtractor.label : 'label'
  const keyReglamentario = dataExtractor ? dataExtractor.reglamentario : 'reglametario'

  useEffect(() => {
    if (isUpdate && dataUpdate) {
      setInnerData({
        especieId: dataUpdate.especieId,
        nameEspecie: dataUpdate.nameEspecie,
        reglamentario: dataUpdate.reglamentario
      })
    }
  }, [])

  const debounceSearch = useDebounce({ value: nameEspecie, delay: 500 })

  const [datos] = useGetEspeciesByNameQuery({
    variables: {
      query: debounceSearch,
      estado: Estados.Activo,
      denominacion: queryOptions?.denominacion || null
    },
    pause: debounceSearch.trim().length < 3
  })

  useEffect(() => {
    if (datos.data?.getEspeciesByName) {
      setDataByName(datos.data.getEspeciesByName)
    }
  }, [datos.data?.getEspeciesByName])

  useEffect(() => {
    setIsLoading(datos.fetching)
  }, [datos.fetching])

  const handleSelect = (data: OptionProps) => {
    onChange({
      especieId: data.value,
      nameEspecie: data.label,
      reglamentario: data.reglamentario
    })
    setInnerData({
      especieId: data.value,
      nameEspecie: data.label,
      reglamentario: data.reglamentario
    })
    setIsOpen(false)
    setIsFiltering(false)
  }

  return (
    <div className="w-full">
      <div className="relative w-full">
        <small className='text-slate-700 pl-2 dark:text-slate-300'>
          Escribe y selecciona el nombre científico de la especie
        </small>
        <OutsideContainer setIsOpen={setIsOpen}>
          <>
            <Input
              ref={inputRef}
              label={'Especies'}
              value={innerData.nameEspecie}
              error={props.error}
              onBlur={onBlur}
              onChange={(e) => {
                setInnerData({
                  reglamentario: Estados.Inactivo,
                  especieId: 0,
                  nameEspecie: e.target.value
                })
                onChange({
                  reglamentario: Estados.Inactivo,
                  especieId: 0,
                  nameEspecie: e.target.value
                })
                if (e.target.value.length > 0) {
                  setNameEspecie(e.target.value)
                  setIsFiltering(true)
                } else {
                  setNameEspecie('')
                  setIsFiltering(false)
                }
                if (e.target.value && !isOpen) {
                  setIsOpen(true)
                }
              }}
              onClick={e => setIsOpen(prev => !prev)}
              // onFocus={() => setIsOpen(true)}
              rightElement={
                isLoading
                  ? <Spinner />
                  : innerData.especieId
                    ? <div className='btn-icon text-green-500 border-none'><IconCheck /></div>
                    : <div className='btn-icon text-primary-500 border-none'><IconSearch /></div>
              }
            />

            <div
              className={classNames([
                isOpen ? 'max-h-[300px]' : 'max-h-0',
                'absolute z-40 w-full overflow-y-auto bg-white dark:bg-slate-700 dark:text-white rounded shadow top-[105%]'
              ])}
            >
              <ul className="flex flex-col w-full">
                {isLoading && (
                  <li
                    className="w-full text-left border-b border-gray-100 dark:border-slate-600 rounded-t select-none"
                  >
                    <div className="relative flex items-center w-full p-2 pl-2 border-l-4 border-transparent">
                      <div className="flex items-center w-full">
                        <div className="mx-auto"><Spinner /></div>
                      </div>
                    </div>
                  </li>
                )}
                {!isLoading && !dataByName.length && isFiltering && debounceSearch.length > 2 && (
                  <li
                    className="w-full text-left border-b border-gray-100 dark:border-slate-600 rounded-t select-none"
                  >
                    <div className="relative flex items-center w-full p-2 pl-2 border-l-4 border-transparent">
                      <div className="flex items-center w-full">
                        <div className="mx-auto text-slate-500">No hay resultados</div>
                      </div>
                    </div>
                  </li>
                )}

                {isOpen && !isFiltering && !isLoading &&
                  options?.map((data) => {
                    const value = (data as any)[keyValue]
                    const label = (data as any)[keyLabel]
                    const reglamentario = (data as any)[keyReglamentario]
                    return (
                      <Option
                        key={value}
                        label={label}
                        value={value}
                        reglamentario={reglamentario}
                        onClick={() => handleSelect({ value, label, reglamentario })}
                        />
                    )
                  })
                }
                {isOpen && !isLoading &&
                  isFiltering &&
                  dataByName?.map((data) => {
                    const value = (data as any)[keyValue]
                    const label = (data as any)[keyLabel]
                    const reglamentario = (data as any)[keyReglamentario]
                    return (
                      <Option
                      key={value}
                      label={label}
                      value={value}
                      reglamentario={reglamentario}
                      onClick={() => handleSelect({ value, label, reglamentario })}
                      />
                    )
                  })
                }
              </ul>
            </div>
          </>
        </OutsideContainer>
      </div>
    </div>
  )
}

export default SelectEspecie
