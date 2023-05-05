import Table from '@components/shared/Table'

import { IconEdit, IconTrash } from '@icons'
import moment from 'moment'
import { Conocimiento } from '../../interfaces/index'

interface Props {
  data: Conocimiento[]
  onAdd: () => void
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
}

const ConocimientoTable = ({ data, onAdd, onDelete, onUpdate }: Props) => {
  return (
    <div className="min-h-50">
      {data.length !== 0 && (
        <Table className="min-h-50">
          <thead>
            <tr className="dark:border-b-slate-700">
              <th>Institución</th>
              <th className="text-center">Nombre del Curso</th>
              <th className="text-center min-w-[130px]">Fecha Inicio</th>
              <th className="text-center min-w-[130px]">Fecha Termino</th>
              <th className="text-center min-w-[130px]">Horas</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.ind} className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700">
                <td>{item.LUGAR}</td>
                <td className="text-center">{item.NOMBRE}</td>
                <td className="text-center">{moment(item.FECHA_INICIO).format('DD-MM-YYYY')}</td>
                <td className="text-center">{moment(item.FECHA_TERMINO).format('DD-MM-YYYY')}</td>
                <td className="text-center">{item.HORAS}</td>
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

export default ConocimientoTable
