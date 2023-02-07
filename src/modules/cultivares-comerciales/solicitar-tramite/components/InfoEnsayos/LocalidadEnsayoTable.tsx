import Table from '@components/shared/Table'

import { IconEdit, IconTrash } from '@icons'
import moment from 'moment'
import { LocalidadEnsayosInput } from '../../interfaces/cultivaresComerciales'

interface Props {
  data: LocalidadEnsayosInput[]
  onAdd: () => void
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
}

const LocalidadEnsayoTable = ({ data, onAdd, onDelete, onUpdate }: Props) => {
  return (
    <div className="min-h-50">
      {data.length !== 0 && (
        <Table>
          <thead>
            <tr className="dark:border-b-slate-700">
              {/* <th className="text-center">Departamento</th>
              <th className="text-center">Provincia</th>
              <th className="text-center">Distrito</th> */}
              <th className="text-center">Anexo/Sector</th>
              <th className="text-center">Altitud</th>
              <th className="text-center">Fecha de Inicio</th>
              <th className="text-center">Fecha Fin</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.id} className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700">
                  {/* <td className="text-center min-w-[130px]">
                    {item.DEPARTAMENTO_ID}
                  </td>
                  <td className="text-center min-w-[130px]">
                    {item.PROVINCIA_ID}
                  </td>
                  <td className="text-center min-w-[130px]">
                    {item.DISTRITO_ID}
                  </td> */}
                  <td className="text-center min-w-[130px]">
                    {item.SECTOR}
                  </td>
                  <td className="text-center min-w-[130px]">
                    {item.ALTITUD}
                  </td>
                  <td className="text-center min-w-[130px]">
                    {moment(item.FECHA_INICIO).format('DD-MM-YYYY')}
                  </td>
                  <td className="text-center min-w-[130px]">
                    {moment(item.FECHA_FIN).format('DD-MM-YYYY')}
                  </td>
                  <td>
                    <div className="flex justify-center gap-x-3">
                      <button
                        onClick={() => onUpdate(item.id)}
                        type='button'
                        className="btn-icon btn-ghost-primary"
                      >
                        <IconEdit />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        type='button'
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

export default LocalidadEnsayoTable
