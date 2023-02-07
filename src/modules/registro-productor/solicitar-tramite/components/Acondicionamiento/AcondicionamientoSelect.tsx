import { useState } from 'react'
import Input from '@components/shared/Input'
import Select from '@components/shared/Select'

import { IconCheck, IconCloudArrowUp } from '@icons'
import { classNames } from '@utils/classNames'
import Tooltip from '@components/shared/ToolTip'
import UploadFiles from '@components/shared/UploadFiles'
import useToggle from '@hooks/useToggle'
import useArchivosMutation from '@hooks/useArchivosMutation'
import { textAcondicionamiento } from '@modules/registro-productor/utils/textContent'

interface AcondicionamientoSelectProps {
  uploadImage?: boolean
  label: string
  value: string
  error?: string
  className?: string
  onChange: (value: string) => void
  NUM_ARC?: string
  setNumArc?: (value: string) => void
  errorArc?: string | undefined
}

const selectOptions = [
  { value: 'PROPIO', label: 'Propio' },
  { value: 'ALQUILADO', label: 'Alquilado' },
  { value: 'CESION', label: 'Cesión de uso' },
  { value: 'OTRO', label: 'Otro' }
]

const AcondicionamientoSelect = ({
  uploadImage = true,
  label,
  value,
  error,
  onChange,
  className,
  NUM_ARC,
  setNumArc,
  errorArc
}: AcondicionamientoSelectProps) => {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)
  const { isOpen, onOpen, onClose } = useToggle()
  const isStaticValue =
    value === 'PROPIO' || value === 'ALQUILADO' || value === 'CESION'

  const [inputValue, setInputValue] = useState(!isStaticValue ? value : '')
  const [selectValue, setSelectValue] = useState(isStaticValue ? value : 'OTRO')

  const isInputValue = selectValue === 'OTRO'

  const { createArchivo } = useArchivosMutation()

  const handleUpload = async (files: File[]): Promise<boolean> => {
    setIsLoadingFiles(true)
    const fileList = []

    for (const file of files) {
      fileList.push({
        DATAOBJECT: file,
        DESCRIPCION: 'File'
      })
    }

    const res = await createArchivo({
      REGISTRO: 'Acondicionamiento',
      DESCRIPCION_REGISTRO: 'Acondicionamiento Info',
      ArchivosFisicos: fileList
    })

    if (res.data?.data?.NUME_REGI_ARC) {
      setNumArc?.(res.data.data.NUME_REGI_ARC)
    }
    setIsLoadingFiles(false)
    onClose()
    return res.ok
  }

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
          error={selectValue === 'OTRO' ? '' : error}
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
            error={selectValue === 'OTRO' ? error : ''}
          />
        )}
      </div>

      <div>
        <Tooltip label={`${label}: ${textAcondicionamiento.messageAdd}`} position='right'>
          <button
            type="button"
            className={classNames(['btn-icon transition ease-out duration-300', errorArc ? 'btn-outline-red' : 'btn-outline-primary'])}
            onClick={onOpen}
          >
            <span className={classNames([NUM_ARC && 'text-green-500'])}>
              {NUM_ARC ? <IconCheck /> : <IconCloudArrowUp />}
            </span>
          </button>
        </Tooltip>

        {uploadImage && (
          <UploadFiles
            isOpen={isOpen}
            onClose={onClose}
            title={`Agregar Información de ${label}`}
            onUpload={handleUpload}
            NUME_REGI_ARC={NUM_ARC}
            isLoading={isLoadingFiles}
          />
        )}
      </div>
    </div>
  )
}

export default AcondicionamientoSelect
