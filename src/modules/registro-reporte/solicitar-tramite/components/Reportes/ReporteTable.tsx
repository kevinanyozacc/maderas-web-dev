import Table from '@components/shared/Table'
import { IconEdit, IconTrash } from '@icons'
import { RegistroFormato } from '../../interfaces/index'

interface Props {
  data: RegistroFormato[]
  onAdd: () => void
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
}

const ReporteTable = ({ data, onAdd, onDelete, onUpdate }: Props) => {
  return (
    <div className="min-h-50">
      {data.length !== 0 && (
        <Table className="min-h-50">
          <thead>
            <tr className="dark:border-b-slate-700">
              <th>Fecha Tratamiento</th>
              <th className="text-center">Lote</th>
              <th className="text-center min-w-[130px]">Especie Madera</th>
              <th className="text-center min-w-[130px]">Certificado</th>
              <th className="text-center">Cantidad(m3)</th>
              <th className="text-center min-w-[130px]">Tipo Embalaje</th>
              <th className="text-center min-w-[130px]">Total Unidades Fab.</th>
              <th className="text-center">Guía de Remision</th>
              <th className="text-center min-w-[130px]">Exportador/usuario</th>
              <th className="text-center min-w-[130px]">Uso</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item?.ind!} className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700">
                <td>{item?.FECHA_TRATAMIENTO!}</td>
                <td className="text-center">{item?.LOTE!}</td>
                <td className="text-center">{item?.ESPECIE_MADERA_TRATADA!}</td>
                <td className="text-center">{item?.NUME_REGI_ARC!}</td>
                <td className="text-center">{item?.CANTIDAD_TRATADA!}</td>
                <td className="text-center">{item?.TIPO_EMBALAJE!}</td>
                <td className="text-center">{item?.TOTAL_UNID_FAB!}</td>
                <td className="text-center">{item?.NUMERO_GUIA!}</td>
                <td className="text-center">{item?.EXPORTADOR!}</td>
                <td className="text-center">{item?.USO!}</td>
                <td>
                  <div className="flex justify-center gap-x-3">
                    <button
                      type='button'
                      onClick={() => onUpdate(item?.ind!)}
                      className="btn-icon btn-ghost-primary"
                    >
                      <IconEdit />
                    </button>
                    <button
                      type='button'
                      onClick={() => onDelete(item?.ind!)}
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

export default ReporteTable
