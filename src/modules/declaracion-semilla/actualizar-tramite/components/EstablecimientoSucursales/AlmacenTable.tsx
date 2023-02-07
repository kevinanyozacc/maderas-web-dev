import Table from '@components/shared/Table'
import { TramiteAlmacen } from '@generated/graphql'

import { IconEdit, IconTrash } from '@icons'

interface Props {
  data: TramiteAlmacen[]
  onAdd: () => void
  onDelete: (id: number) => void
  onUpdate: (id: number) => void
}

const AlmacenTable = ({ data, onAdd, onDelete, onUpdate }: Props) => {
  return (
    <>
      {data.length !== 0 && (
        <Table>
          <thead>
            <tr className="dark:border-b-slate-700">
              <th className="text-center">Ubicación de Almacen de semilla</th>
              <th className="text-center">Departamento</th>
              <th className="text-center">Provincia</th>
              <th className="text-center">Distrito</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.ALMACEN_ID} className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700">
                <td className='text-center'>{item.DIRECCION}</td>
                <td className='text-center'>{item.NOMBRE_DEPARTAMENTO}</td>
                <td className='text-center'>{item.NOMBRE_PROVINCIA}</td>
                <td className='text-center'>{item.NOMBRE_DISTRITO}</td>
                <td>
                  <div className="flex justify-center gap-x-3">
                    <button
                      type='button'
                      onClick={() => onUpdate(item.ALMACEN_ID)}
                      className="btn-icon btn-ghost-primary">
                      <IconEdit />
                    </button>
                    <button
                      type='button'
                      onClick={() => onDelete(item.ALMACEN_ID)}
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
    </>
  )
}

export default AlmacenTable
