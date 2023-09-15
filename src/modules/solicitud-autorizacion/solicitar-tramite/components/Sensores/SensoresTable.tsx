import Table from '@components/shared/Table'

import { IconEdit, IconTrash } from '@icons'
import moment from 'moment'
import { Sensores } from '../../interfaces/index'

interface Props {
  data: Sensores[]
  onAdd: () => void
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
}

const SensoresTable = ({ data, onAdd, onDelete, onUpdate }: Props) => {

  console.log(data);
  

  return (
    <div className="min-h-50">
     {data.length !== 0 && (
        <Table className="min-h-50">
          <thead>
            <tr className="dark:border-b-slate-700">
              <th>Número de Camara de Tratamiento</th>
              
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.ind} className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700">
                <td>{item.NUMERO}</td>
               
                <td>
                  <div className="flex justify-center gap-x-3">
                    <button
                      type='button'
                      onClick={() => onUpdate(item.ind)}
                      className="btn-icon btn-ghost-primary"
                    >
                      <IconEdit />
                    </button>
                    <button
                      type='button'
                      onClick={() => onDelete(item.ind)}
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

      {data.length === 0 && (
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

export default SensoresTable
