import useArchivosMutation from '@hooks/useArchivosMutation'
import useToggle from '@hooks/useToggle'
import { IconCheck, IconCloudArrowUp } from '@icons'
import { classNames } from '@utils/classNames'
import { useState } from 'react'
import Tooltip from '../ToolTip'
import UploadFilesModal from '../UploadFiles'

interface IProps {
  text: string
  NUME_REGI_ARC: string
  title: string
  onUpload: (NUM_ARC: string) => void
  toolTip: string
  DESC_ARC: {
    REGISTRO: string
    DESCRIPCION_REGISTRO: string
  }
}

const ButtonUploadFiles = ({
  text,
  NUME_REGI_ARC,
  title,
  onUpload,
  toolTip,
  DESC_ARC
}: IProps) => {
  const { isOpen, onClose, onOpen } = useToggle()
  const [isLoading, setIsLoading] = useState(false)

  const { createArchivo } = useArchivosMutation()

  const handleUploadFiles = async (files: File[]): Promise<boolean> => {
    setIsLoading(true)
    const fileList = []

    for (const file of files) {
      fileList.push({
        DATAOBJECT: file,
        DESCRIPCION: 'File'
      })
    }

    const { DESCRIPCION_REGISTRO, REGISTRO } = DESC_ARC

    const res = await createArchivo({
      REGISTRO,
      DESCRIPCION_REGISTRO,
      ArchivosFisicos: fileList
    })

    if (res.data?.data?.NUME_REGI_ARC) {
      onUpload(res.data.data.NUME_REGI_ARC)
    }

    setIsLoading(false)
    onClose()
    return res.ok
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-3 text-slate-500 dark:text-white">
      <div className="">
        <Tooltip label={toolTip}>
          <button
            type="button"
            className="btn btn-outline-primary transition ease-out duration-300 min-w-[240px]"
            onClick={onOpen}
          >
            Subir Archivos
            <span
              className={classNames([
                'text-2xl',
                NUME_REGI_ARC ? 'text-green-500' : ''
              ])}
            >
              {NUME_REGI_ARC ? <IconCheck /> : <IconCloudArrowUp />}
            </span>
          </button>
        </Tooltip>
      </div>

      {NUME_REGI_ARC ? (
        <div className="text-center">
          Los archivos se agregaron correctamente
        </div>
      ) : (
        <div className="text-center">{text}</div>
      )}

      {isOpen && (
        <UploadFilesModal
          isLoading={isLoading}
          isOpen={isOpen}
          onClose={onClose}
          title={title}
          onUpload={handleUploadFiles}
          NUME_REGI_ARC={NUME_REGI_ARC!}
        />
      )}
    </div>
  )
}

export default ButtonUploadFiles
