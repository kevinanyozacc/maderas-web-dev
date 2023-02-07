import React, { ChangeEvent, useId } from 'react'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.pe'

import { isEmpty } from '@utils/isEmpty'
import { classNames } from '@utils/classNames'

interface Props {
  type?: 'date' | 'phone'
  name?: string
  label?: string
  error?: string
  value?: string | number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeText?: ({ raw, pretty }: { raw?: string; pretty?: string }) => void
}

const listOptions = {
  date: {
    date: true,
    delimiter: '-',
    datePattern: ['d', 'm', 'Y']
  },
  phone: {
    blocks: [3, 3, 3],
    numericOnly: true
    // numeral: true
  }
}

const InputCleave = ({
  name,
  label,
  value,
  type = 'date',
  onChange,
  onChangeText,
  ...props
}: Props) => {
  const uid = useId()

  const isValueEmpty = isEmpty(String(value))
  const hasError = props.error && !isEmpty(props.error)

  // const handleChange = (e: any) => {
  //   onChangeText?.({ raw: e.target.rawValue, pretty: e.target.value })
  // }

  return (
    <div className="relative bg-gray-200 dark:bg-slate-700 bg-opacity-50 h-[60px] rounded shadow w-full">
      <Cleave
        id={`input-${uid}`}
        name={name}
        value={value}
        onChange={(e) => {
          onChange?.(e)
          // console.log(isNaN(parseInt(e.target.value)))
          // if (type === 'phone') {
          //   if (!isNaN(parseInt(e.target.value))) {
          //     return onChange?.(e)
          //   }
          //   // e.target.value = e.target.value.replace(/\D/g, '')
          //   return undefined
          // }
          // console.log('is letter')
          // onChange?.(e)
        }}
        options={listOptions[type]}
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

export default InputCleave
