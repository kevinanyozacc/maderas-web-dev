import {
  FormEvent,
  FocusEvent,
  ChangeEvent,
  useCallback,
  useEffect,
  useState
} from 'react'

export type FormTouched<T> = Partial<Record<keyof T, boolean>>
export type FormError<T> = Partial<Record<keyof T, string | undefined>>

export type SelectPropsOptions<T> = {
  resetFields: {
    [P in keyof T]?: T[P]
  }
}

interface Props<T> {
  initialValues: T
  validate?: (values: T) => FormError<T>
}

const useForm = <T extends object>({ validate, initialValues }: Props<T>) => {
  const [isDirty, setIsDirty] = useState(false)
  const [state, setState] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormError<T>>({})
  const [touched, setTouched] = useState<FormTouched<T>>({})
  const [isChanged, setIsChanged] = useState<boolean>(false)

  // Settings values

  const clear = useCallback(() => {
    setState(initialValues)
    setIsDirty(false) // <- click
    setErrors({})
    setTouched({})
  }, [])

  const setField = useCallback(
    (
      nameOrCallback: keyof T | ((values: T) => Partial<T>),
      value?: string | number
    ) => {
      if (typeof nameOrCallback === 'function') {
        const _values = nameOrCallback(state)
        setState((prev) => ({ ...prev, ..._values }))
        return
      }

      setState((prev) => ({ ...prev, [nameOrCallback]: value }))
    },
    [state]
  )

  const setFields = useCallback((values?: Partial<T>) => {
    setState((prev) => ({ ...prev, ...values }))
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof T
    const value = e.target.value
    setState((prev) => ({ ...prev, [name]: value }))
    if (isChanged === false) setIsChanged(true)
  }, [])

  const handleBlur = useCallback((e: FocusEvent<HTMLInputElement, Element>) => {
    const name = e.target.name as keyof T
    setTouched((prev) => ({ ...prev, [name]: true }))
  }, [])

  const toggleDirty = useCallback((isDirty?: boolean) => {
    setIsDirty((prev) => (typeof isDirty === 'boolean' ? isDirty : !prev))
  }, [])

  // Validate Errors
  const hasErrors = useCallback((errors: FormError<T>) => {
    return Object.keys(errors).length !== 0
  }, [])

  // Inputs default props
  const inputProps = (name: keyof T) => {
    return {
      name,
      error: errors[name],
      value: state[name]!,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }

  // Select default props
  const selectProps = (name: keyof T, options?: SelectPropsOptions<T>) => {
    return {
      name,
      value: state[name]!,
      onBlur: handleBlur,
      onChange: ({
        value,
        label: _label
      }: {
        value: string
        label: string
      }) => {
        if (options?.resetFields) {
          setFields({ ...options?.resetFields, [name]: value })
          return
        }

        setField(name, value)
      }
    }
  }

  // OnSubmit middleware
  const onSubmit = useCallback(
    (cb: () => void) => {
      return (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        if (typeof validate === 'function') {
          toggleDirty(true)

          const newErrors = validate(state)

          if (hasErrors(newErrors)) {
            setErrors(newErrors)
            console.log(newErrors)
            return
          }

          cb()
          return
        }

        cb()
      }
    },
    [state]
  )

  useEffect(() => {
    if (isDirty) {
      if (typeof validate === 'function') {
        const newErrors = validate(state)
        setErrors(newErrors)
      }
    }
  }, [state, isDirty])

  return {
    values: state,
    errors,
    touched,
    hasErrors,
    clear,
    onSubmit,
    setField,
    setFields,
    setErrors,
    setTouched,
    handleBlur,
    inputProps,
    selectProps,
    toggleDirty,
    handleChange,
    isChanged,
    setIsChanged
  }
}

export default useForm
