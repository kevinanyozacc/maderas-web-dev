import { useState, ChangeEvent, useEffect, useMemo, useRef } from 'react'

import Input from '../Input'
import Option, { OptionProps } from './Option'

import { IconChevronDown, IconSearch } from '../../../icons'
import { classNames } from '../../../utils/classNames'
import OutsideContainer from '@hooks/OutsideClick'

interface Data {
  value: string
  label: string
}

interface InnerData {
  value: string
  label: string | null
}

interface Props<T> {
  options?: T[]
  label?: string
  error?: string
  withFilter?: boolean
  value?: string | number
  dataExtractor?: { value: keyof T; label: keyof T }
  onBlur?: () => void
  onChange?: (data: Data) => void
}

const SelectWithFilter = <T extends object>({
  label,
  options,
  onBlur,
  onChange,
  withFilter,
  dataExtractor,
  ...props
}: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [isFiltering, setIsFiltering] = useState(false)
  const [innerData, setInnerData] = useState<InnerData>({
    value: '',
    label: null
  })

  const keyValue = dataExtractor ? dataExtractor.value : 'value'
  const keyLabel = dataExtractor ? dataExtractor.label : 'label'

  const innerValue = innerData.label ??= innerData.value

  useEffect(() => {
    if (Array.isArray(options)) {
      const i = options?.findIndex((o: any) => o[keyValue] === props.value)
      setInnerData({
        label: i === -1 ? '' : (options as any)[i][keyLabel],
        value: i === -1 ? '' : (options as any)[i][keyValue]
      })
    }
  }, [options?.length && options, props.value])

  const filterOptions = useMemo(() => {
    if (withFilter) {
      const _label =
        typeof searchInput === 'string' ? searchInput.toLowerCase() : ''
      return options?.filter((option) => {
        return (option as any)[keyLabel].toLowerCase().includes(_label)
      })
    }

    return options
  }, [innerValue, options, withFilter, searchInput])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
    setIsFiltering(true)
  }

  const handleSelect = (data: OptionProps) => {
    onChange?.(data)
    setSearchInput('')
    setInnerData(data)
    setIsOpen(false)
    setIsFiltering(false)
  }

  return (
    <div className="w-full">
      <div className="relative w-full">
        <OutsideContainer setIsOpen={setIsOpen} onAction={() => {
          setSearchInput('')
        }}>
          <>
            <Input readOnly
              label={label}
              onClick={() => {
                inputRef.current?.focus()
                setIsFiltering(false)
                setIsOpen((prev) => !prev)
              }}
              rightElement={
                <button
                  type="button"
                  className="btn-icon btn-ghost-primary"
                  onClick={() => {
                    inputRef.current?.focus()
                    setIsFiltering(false)
                    setIsOpen((prev) => !prev)
                  }}
                >
                  <IconChevronDown
                    className={classNames([
                      isOpen ? 'rotate-180' : 'rotate-0',
                      'transition-transform'
                    ])}
                  />
                </button>
              }
              error={props.error}
              ref={inputRef}
              value={innerData.label}
              onBlur={onBlur}
            />
            <div
              className={classNames([
                isOpen ? 'max-h-[300px]' : 'max-h-0',
                'absolute z-40 w-full overflow-y-auto bg-white dark:bg-slate-700 dark:text-white rounded shadow top-[115%]'
              ])}
            >
              <div className="flex flex-col w-full">
                <div className='relative bg-gray-200 dark:bg-slate-700 bg-opacity-50 h-[40px] rounded shadow w-11/12 mx-auto my-2 text-center'>
                  <input
                    value={searchInput}
                    onChange={handleChange}
                    className="mx-auto border-transparent focus:border-primary-500 peer bg-transparent
                      outline-none w-full h-full px-3 border-2 rounded transition-colors text-slate-800 dark:text-white"
                    placeholder='Buscar'
                  />
                  <div className="absolute top-[12px] right-4 w-4 text-slate-700 dark:text-white"><IconSearch/></div>
                </div>
                {isOpen &&
                  isFiltering &&
                  filterOptions?.map((data) => {
                    const value = (data as any)[keyValue]
                    const label = (data as any)[keyLabel]
                    return (
                      <Option
                        key={value}
                        label={label}
                        value={value}
                        onClick={() => handleSelect({ value, label })}
                      />
                    )
                  })}

                {isOpen &&
                  !isFiltering &&
                  options?.map((data) => {
                    const value = (data as any)[keyValue]
                    const label = (data as any)[keyLabel]
                    return (
                      <Option
                        key={value}
                        label={label}
                        value={value}
                        onClick={() => handleSelect({ value, label })}
                      />
                    )
                  })}
              </div>
            </div>
          </>
        </OutsideContainer>
      </div>
    </div>
  )
}

export default SelectWithFilter
