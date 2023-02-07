import CheckBox from '../Checkbox'

interface CheckBoxProps {
  value: string
  label: string
}

interface Props {
  value?: string
  className?: string
  allowToggle?: boolean
  options?: CheckBoxProps[]
  onChange?: (value: string) => void
}

const RadioButton = ({
  value,
  className,
  onChange,
  options,
  allowToggle = true
}: Props) => {
  const handleChange = (data: CheckBoxProps) => {
    onChange?.(
      allowToggle ? (data.value === value ? '' : data.value) : data.value
    )
  }

  return (
    <div className={className}>
      {Array.isArray(options) &&
        options.map((data) => (
          <CheckBox
            key={data.value}
            {...data}
            value={data.value === value}
            onClick={() => handleChange(data)}
          />
        ))}
    </div>
  )
}

export default RadioButton
