import { IconImage, IconPdf, IconPlus } from '@icons'
import moment from 'moment'
import { FileToUpload, FileDb } from '.'

interface Props {
  files?: FileToUpload[]
  inputId: string
  onDelete: (id: string) => void
  dbFiles: FileDb[]
  onDeleteDb: (NUME_REGI_ARC: string, SECU_REGI_ARC: number) => void
}

const DashboardFiles = ({
  files,
  inputId,
  onDelete,
  dbFiles,
  onDeleteDb
}: Props) => {
  return (
    <div className='flex flex-col h-auto z-[120] w-full'>
      <div
        className='flex flex-col md:flex-row pb-2 gap-3 items-center border-b-2 border-gray-200
        dark:border-white z-[120]'
      >
        <p className='text-center font-medium hidden md:block ml-4 dark:text-white'>
          {files?.length! + dbFiles.length} {(files?.length! + dbFiles.length === 1) ? 'archivo seleccionado' : 'archivos seleccionados'}
        </p>

        <label
          className='ml-auto w-full md:w-max btn btn-outline-primary cursor-pointer'
          htmlFor={`input-file-${inputId}`}
        >
          <IconPlus />
          Añadir mas
        </label>
      </div>

      <div className='grid py-2 gap-2 w-full overflow-y-auto max-h-[260px] grid-cols-1'>
        {files &&
          files.map(({ id, file, createdAt }) => (
            <div className='gap-3 md:gap-0 w-full h-full flex items-center'
              key={id}
            >
              <div className='relative rounded-sm w-20 h-20 mb-2'>
                {file.type.includes('image') && (
                  <div className="text-primary-500 w-full block p-4 inset-0 select-none">
                    <IconImage />
                  </div>
                )}

                {file.type.includes('pdf') && (
                  <div className="text-primary-500 w-full block p-4 inset-0 select-none">
                    <IconPdf />
                  </div>
                )}
              </div>

              <div className='ml-4 dark:text-white'>
                <p className='text-xs w-full overflow-x-hidden'>
                  {file.name}
                </p>
                <p className='text-xs w-full overflow-x-hidden'>
                  {moment(createdAt).format('DD-MM-YYYY')}
                </p>
                <button
                  className='text-red-600'
                  onClick={() => onDelete(id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

        {dbFiles &&
          dbFiles.map((item) => (
            <div className='gap-3 md:gap-0 w-full h-full flex items-center'
              key={item.id}
            >
              <div className='relative rounded-sm w-20 h-20 mb-2'>
                {item.filename.includes('pdf')
                  ? (
                    <div className="text-primary-500 w-full block p-4 inset-0 select-none">
                      <IconPdf />
                    </div>
                    )
                  : (
                    <div className="text-primary-500 w-full block p-4 inset-0 select-none">
                      <IconImage />
                    </div>
                    )
                }
              </div>

              <div className='ml-4 dark:text-white'>
                <p className='text-xs w-full overflow-x-hidden'>
                  {item.filename}
                </p>
                <p className='text-xs w-full overflow-x-hidden'>
                  {moment(item.createdAt).format('DD-MM-YYYY')}
                </p>
                <button
                  type='button'
                  className='text-red-600'
                  onClick={() => onDeleteDb(item.NUME_REGI_ARC, item.SECU_REGI_ARC)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DashboardFiles
