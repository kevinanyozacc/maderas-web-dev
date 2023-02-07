import React, { Dispatch, useEffect } from 'react'

interface dataRadio {
  label: string
  value: string
}

interface Props {
  option: dataRadio[]
  currentRadioValue: string
  setCurrentRadioValue: Dispatch<React.SetStateAction<string>>
}

const InputRadio = ({
  option,
  currentRadioValue,
  setCurrentRadioValue
}: Props) => {
  // const [currentRadioValue, setCurrentRadioValue] = useState(option[0].value)
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.target.value)
  }
  useEffect(() => setCurrentRadioValue(option[0].value), [])

  return (
    <>
      {/* RadioButton */}
      <div className="mb-4 flex items-center flex-col">
        <div className="flex items-center gap-4">
          {option.map((item) => {
            return (
              <div key={item.value} className="flex items-center gap-2">
                <label
                  htmlFor={item.value}
                  className=" text-slate-500   leading-[28px]  transition-all "
                >
                  {item.label}
                </label>
                <input
                  id={item.value}
                  name={item.value}
                  type="radio"
                  value={item.value}
                  onChange={handleRadioChange}
                  checked={currentRadioValue === item.value}
                  className="w-4 h-4"
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default InputRadio
