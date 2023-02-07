import Table from '@components/shared/Table'

import { IconEdit, IconTrash } from '@icons'
import moment from 'moment'
import { Especialidad } from '../../interfaces/index'

interface Props {
  data: Especialidad[]
  onAdd: () => void
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
}

const TableEspecialization = ({ data, onAdd, onDelete, onUpdate }: Props) => {
  return (
    <div className="min-h-50">
      {data.length !== 0 && (
        <Table>
          <thead>
            <tr className="dark:border-b-slate-700">
              <th>Nombre</th>
              <th className="text-center">Lugar</th>
              <th className="text-center">Horas</th>
              <th className="text-center">Fecha Inicio</th>
              <th className="text-center">Fecha Termino</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.id} className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700">
                  <td>{item.NOMBRE}</td>
                  <td className="text-center">{item.LUGAR}</td>
                  <td className="text-center">{item.HORAS}</td>
                  <td className="text-center">{moment(item.FECHA_INICIO).format('DD-MM-YYYY')}</td>
                  <td className="text-center">{moment(item.FECHA_TERMINO).format('DD-MM-YYYY')}</td>
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

export default TableEspecialization
