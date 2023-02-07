import {
  useId,
  forwardRef,
  ForwardedRef,
  TextareaHTMLAttributes
} from 'react'

import { isEmpty } from '../../../utils/isEmpty'
import { classNames } from '../../../utils/classNames'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const TextArea = (
  { label, ...props }: Props,
  ref: ForwardedRef<HTMLTextAreaElement> | null
) => {
  const uid = useId()

  const hasError = props.error && !isEmpty(props.error)
  const isValueEmpty = isEmpty(
    typeof props?.value === 'string' ? props.value : ''
  )

  return (
    <div>
      <div className="relative">
        <textarea
          ref={ref}
          name=""
          // cols={0}
          // rows={10}
          id={`input-${uid}`}
          autoComplete="off"
          className={classNames([
            hasError
              ? 'border-red-400 focus:border-red-600'
              : 'border-transparent focus:border-primary-500',
            'bg-gray-200 dark:bg-slate-700 bg-opacity-50 rounded shadow block overflow-y-auto',
            'peer outline-none w-full min-h-[135px] h-max pt-6 px-3 border-2 transition-colors text-slate-800 dark:text-white resize-none'
          ])}
          {...props}
        >
        </textarea>
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
      </div>
      <p className="text-sm text-red-500">{hasError ? props.error : ''}</p>
    </div>
  )
}

export default forwardRef(TextArea)
