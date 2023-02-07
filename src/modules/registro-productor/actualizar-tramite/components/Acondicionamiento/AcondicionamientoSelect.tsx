import { useState } from 'react'
import Input from '@components/shared/Input'
import Select from '@components/shared/Select'

import { IconCloudArrowUp } from '@icons'
import { classNames } from '@utils/classNames'
import Tooltip from '@components/shared/ToolTip'
import UploadFiles from '@components/shared/UploadFiles'
import useToggle from '@hooks/useToggle'

interface AcondicionamientoSelectProps {
  label: string
  value: string
  error?: string
  className?: string
  onChange: (value: string) => void
  NUM_ARC: string,
  errorArc: string | undefined
}

const selectOptions = [
  { value: 'PROPIO', label: 'Propio' },
  { value: 'ALQUILADO', label: 'Alquilado' },
  { value: 'CESION', label: 'Cesión de uso' },
  { value: 'OTRO', label: 'Otro' }
]

const AcondicionamientoSelect = ({
  label,
  value,
  error,
  onChange,
  className,
  NUM_ARC,
  errorArc
}: AcondicionamientoSelectProps) => {
  const { isOpen, onOpen, onClose } = useToggle()
  const isStaticValue =
    value === 'PROPIO' || value === 'ALQUILADO' || value === 'CESION'

  const [inputValue, setInputValue] = useState(!isStaticValue ? value : '')
  const [selectValue, setSelectValue] = useState(isStaticValue ? value : 'OTRO')

  const isInputValue = selectValue === 'OTRO'

  return (
    <div
      className={classNames([
        'flex justify-between items-center gap-3',
        className
      ])}
    >
      <div
        className={classNames([
          'grid gap-3 md:gap-6 flex-1',
          isInputValue ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
        ])}
      >
        <Select
          error={error}
          label={label}
          value={selectValue}
          options={selectOptions}
          onChange={({ value }) => {
            onChange(value === 'OTRO' ? '' : value)
            setSelectValue(value)
            if (value !== '') setInputValue('')
          }}
        />

        {isInputValue && (
          <Input
            value={inputValue}
            label="Especificar"
            onChange={(e) => {
              onChange(e.target.value)
              setInputValue(e.target.value)
            }}
          />
        )}
      </div>

      <div>
        <Tooltip label={`${label}: Adjuntar titulo de propiedad o contrato de alquiler`} position='right'>
          <button
            type="button"
            className={classNames(['btn-icon transition ease-out duration-300', errorArc ? 'btn-outline-red' : 'btn-outline-primary'])}
            onClick={onOpen}
          >
            <IconCloudArrowUp />
          </button>
        </Tooltip>

        {isOpen && (
          <UploadFiles
            isOpen={isOpen}
            onClose={onClose}
            title={`Agregar Informacion de ${label}`}
            NUME_REGI_ARC={NUM_ARC}
          />
        )}
      </div>
    </div>
  )
}

export default AcondicionamientoSelect
