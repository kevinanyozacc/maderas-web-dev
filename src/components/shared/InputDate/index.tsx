import React, { ChangeEvent, useId } from 'react'
import Cleave from 'cleave.js/react'
import { classNames } from '@utils/classNames'

interface Props {
  label?: string
  error?: string
  value?: string
  onChange?: ({ raw, pretty }: { raw?: string; pretty?: string }) => void
}

const InputDate = ({ label, value, onChange, ...props }: Props) => {
  const uid = useId()

  const hasError = false
  const isValueEmpty = false

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.({ raw: (e.target as any).rawValue, pretty: e.target.value })
  }

  return (
    <div className="relative bg-gray-200 dark:bg-slate-700 bg-opacity-50 h-[60px] rounded shadow w-full">
      <Cleave
        options={{ date: true, delimiter: '/', datePattern: ['d', 'm', 'Y'] }}
        onChange={handleChange}
        className={classNames([
          hasError
            ? 'border-red-400 focus:border-red-600'
            : 'border-transparent focus:border-primary-500',
          'peer bg-transparent outline-none w-full h-full pt-5 px-3 border-2 rounded transition-colors dark: text-slate-800 dark:text-white'
        ])}
      />
      <label
        htmlFor={`input-${uid}`}
        className={classNames([
          isValueEmpty
            ? 'top-[19px] left-3 text-slate-500'
            : 'top-1 left-2 text-primary-500 dark:text-primary-400 text-opacity-80',
          hasError
            ? 'text-red-600'
            : 'peer-focus:text-primary-500 dark:peer-focus:text-primary-400',
          'absolute peer-focus:top-1 peer-focus:left-2 transition-all'
        ])}
      >
        {label}
      </label>

      <p className="text-sm text-red-500">{hasError ? props.error : ''}</p>
    </div>
  )
}

export default InputDate
