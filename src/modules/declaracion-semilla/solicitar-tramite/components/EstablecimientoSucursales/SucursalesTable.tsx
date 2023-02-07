import Table from '@components/shared/Table'

import { IconEdit, IconTrash } from '@icons'
import { SucursalesInput } from '../../interfaces/declaracionSemilla'

interface Props {
  data: SucursalesInput[]
  onAdd: () => void
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
}

const EstablecimientoSucursalesTable = ({ data, onAdd, onDelete, onUpdate }: Props) => {
  return (
    <>
      {data.length !== 0 && (
        <Table>
          <thead>
            <tr className="dark:border-b-slate-700">
              <th>Nombre Comercial</th>
              <th className="text-center">Ubicacion del Establecimiento</th>
              <th className="text-center">Acciones</th>
              <th className="text-center">Provincia</th>
              <th className="text-center">Distrito</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700">
                <td>{item.NOMBRE_SUCURSAL}</td>
                <td className="text-center">{item.DIRECCION_SUCURSAL}</td>
                <td className='text-center'>{item.nameDep}</td>
                <td className='text-center'>{item.nameProv}</td>
                <td className='text-center'>{item.nameDis}</td>
                <td>
                  <div className="flex justify-center gap-x-3">
                    <button
                      type='button'
                      onClick={() => onUpdate(item.id)}
                      className="btn-icon btn-ghost-primary">
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
    </>
  )
}

export default EstablecimientoSucursalesTable
