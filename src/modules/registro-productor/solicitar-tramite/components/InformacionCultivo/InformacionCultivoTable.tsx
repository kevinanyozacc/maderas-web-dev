import Table from '@components/shared/Table'
import { IconEdit, IconTrash } from '@icons'
import { InformacionCultivoItem } from '../../interfaces'

interface Props {
  data?: InformacionCultivoItem[]
  onAdd: () => void
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
}

const InformacionCultivoTable = ({ data, onAdd, onDelete, onUpdate }: Props) => {
  return (
    <div className="min-h-50">
      {data?.length !== 0 && (
        <Table>
          <thead>
            <tr className="dark:border-b-slate-700">
              <th>Especie</th>
              <th className="text-center">Cultivar</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.id} className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700">
                  <td>{item.NOMBRE_ESPECIE}</td>
                  <td className="text-center min-w-[130px]">
                    {item.NOMBRE_CULTIVO || item.CULTIVO_REGLAMENTARIO}
                  </td>
                  <td>
                    <div className="flex justify-center gap-x-3">
                      <button
                        type='button'
                        onClick={() => onUpdate(item.id)}
                        className="btn-icon btn-ghost-primary"
                      >
                        <IconEdit />
                      </button>
                      <button
                        type='button'
                        onClick={() => onDelete(item.id)}
                        className="btn-icon btn-ghost-primary"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}

      {data?.length === 0 && (
        <div className="w-full h-50 grid place-items-center">
          <p className="text-slate-500 text-center">
            No hay elementos, deseas{' '}
            <span
              onClick={onAdd}
              className="text-primary-500 hover:underline cursor-pointer"
            >
              agregar elementos
            </span>{' '}
            ?
          </p>
        </div>
      )}
  </div>
  )
}

export default InformacionCultivoTable
