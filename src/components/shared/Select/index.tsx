import { useState, ChangeEvent, useEffect, useMemo, useRef } from 'react'

import Input from '../Input'
import Option, { OptionProps } from './Option'

import { isEmpty } from '../../../utils/isEmpty'
import { IconChevronDown } from '../../../icons'
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

const Select = <T extends object>({
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
  const [isFiltering, setIsFiltering] = useState(false)
  const [innerData, setInnerData] = useState<InnerData>({
    value: '',
    label: null
  })

  const keyValue = dataExtractor ? dataExtractor.value : 'value'
  const keyLabel = dataExtractor ? dataExtractor.label : 'label'

  const innerValue = innerData.label ? innerData.label : innerData.value

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
        typeof innerData.value === 'string' ? innerData.value.toLowerCase() : ''
      return options?.filter((option) => {
        return (option as any)[keyLabel].toLowerCase().includes(_label)
      })
    }

    return options
  }, [innerValue, options, withFilter])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (innerData.label !== null) {
      onChange?.({ label: '', value: '' })
    }
    setInnerData({ label: null, value })
    setIsOpen(!isEmpty(value))
    setIsFiltering(true)
  }

  const handleSelect = (data: OptionProps) => {
    onChange?.(data)
    setInnerData(data)
    setIsOpen(false)
    setIsFiltering(false)
  }

  return (
    <div className="w-full">
      <div className="relative w-full">
        <OutsideContainer setIsOpen={setIsOpen}>
          <>
            <Input
              ref={inputRef}
              label={label}
              value={innerValue}
              error={props.error}
              onBlur={onBlur}
              onChange={handleChange}
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
            />

            <div
              className={classNames([
                isOpen ? 'max-h-[300px]' : 'max-h-0',
                'absolute z-40 w-full overflow-y-auto bg-white dark:bg-slate-700 dark:text-white rounded shadow top-[105%]'
              ])}
            >
              <div className="flex flex-col w-full">
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

export default Select
