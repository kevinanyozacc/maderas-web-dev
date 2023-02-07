import { Fragment } from 'react'
import Table from '@components/shared/Table'

import { IconEdit, IconTrash } from '@icons'
import { TierraCultivo } from '../../interfaces/index'

interface Props {
  data: TierraCultivo[]
  onAdd: () => void
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
}

const TierraCultivoTable = ({ data, onAdd, onDelete, onUpdate }: Props) => {
  return (
    <Fragment>
      {data.length !== 0 && (
        <Table>
          <thead>
            <tr className="dark:border-b-slate-700">
              <th>Nombre del Predio</th>
              <th className="text-center">Area (Hectarea)</th>
              <th className="text-center">Tipo de Tenencia</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id} className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700">
                <td>{item.NOMBRE_PREDIO}</td>
                <td className="text-center">{item.AREA}</td>
                <td className="text-center">{item.TIPO_TENENCIA}</td>

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
          <p className="text-slate-500">
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
    </Fragment>
  )
}

export default TierraCultivoTable
