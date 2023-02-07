import {
  useId,
  useState,
  SVGProps,
  forwardRef,
  ReactElement,
  InputHTMLAttributes,
  ForwardedRef
} from 'react'

import { isEmpty } from '../../../utils/isEmpty'
import { classNames } from '../../../utils/classNames'
import { IconEye, IconEyeSlash } from '../../../icons'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  rightElement?: ReactElement
  icon?: (props: SVGProps<SVGSVGElement>) => ReactElement
}

const Input = (
  { label, icon: Icon, rightElement, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement> | null
) => {
  const uid = useId()
  const [show, setShow] = useState(false)

  const hasError = props.error && !isEmpty(props.error)
  const isValueEmpty = isEmpty(
    typeof props?.value === 'string' ? props.value : ''
  )

  return (
    <div>
      <div className="relative bg-gray-200 dark:bg-slate-700 bg-opacity-50 h-[60px] rounded shadow w-full">
        <input
          ref={ref}
          {...props}
          id={`input-${uid}`}
          autoComplete="off"
          type={
            props.type === 'password'
              ? show
                ? 'text'
                : 'password'
              : props.type
          }
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

        {props.type === 'password' && (
          <button
            onClick={() => setShow((prev) => !prev)}
            className="btn-icon btn-ghost-primary absolute right-3 top-[13px]"
          >
            {show ? <IconEyeSlash /> : <IconEye />}
          </button>
        )}

        {typeof Icon === 'function' && (
          <button className="btn-icon btn-ghost-primary absolute right-3 top-[13px]">
            {<Icon />}
          </button>
        )}

        {rightElement && (
          <div className="absolute right-3 top-[13px]">{rightElement}</div>
        )}

        <p className="text-sm text-red-500">{hasError ? props.error : ''}</p>
      </div>
    </div>
  )
}

export default forwardRef(Input)
