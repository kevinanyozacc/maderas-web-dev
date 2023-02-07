import Table from '@components/shared/Table'

import { IconTrash } from '@icons'
import { RangosAdaptacionInput } from '@modules/cultivares-comerciales/solicitar-tramite/interfaces/cultivaresComerciales'

interface Props {
  data: RangosAdaptacionInput[]
  onAdd: () => void
  onDelete: (id: string) => void
}

const RangosAdaptTable = ({ data, onAdd, onDelete }: Props) => {
  return (
    <div className="min-h-50">
      {data.length !== 0 && (
        <Table>
          <thead>
            <tr className="dark:border-b-slate-700">
              <th className="text-center">MÍNIMO</th>
              <th className="text-center">MÁXIMO</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr
                  key={item.id}
                  className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700"
                >
                  <td className="text-center min-w-[130px]">{item.MIN}</td>
                  <td className="text-center min-w-[130px]">{item.MAX}</td>
                  <td>
                    <div className="flex justify-center gap-x-3">
                      <button
                        onClick={() => onDelete(item.id)}
                        type="button"
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

export default RangosAdaptTable
