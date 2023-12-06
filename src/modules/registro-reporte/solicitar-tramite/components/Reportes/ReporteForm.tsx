import { IconPlus } from '@icons'
import useToggle from '@hooks/useToggle'
import { useRegistroReporte } from '../../store/useRegistroReporte'
import { useState } from 'react'
import DeleteAlert from '@components/shared/DeleteAlert'
import { textRegistroReporte } from '@modules/registro-reporte/utils/textContent'
import ReporteTable from './ReporteTable'
import ReporteModal from './ReporteModal'
import { RegistroFormato } from '@generated/graphql'

interface componentes {
  idreporte: string
  data: RegistroFormato[]
}

const ReporteForm = ({ idreporte, data }: componentes) => {
  const [idExp, setIdExp] = useState('')
  const store = useRegistroReporte()
  const { isOpen, onClose, onOpen } = useToggle()
  const deleteExpToggle = useToggle()
  const expUpdateToggle = useToggle()
  const datos = { data }

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">
          {/* {textRegistroReporte.titleForm} */}
        </p>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex">
          <button
            type="button"
            onClick={onOpen}
            className="btn btn-ghost-primary w-full md:w-max"
          >
            Agregar
            <IconPlus />
          </button>
        </div>

        <ReporteTable
          data={store.state.registroFormato.concat(datos?.data!)}
          onAdd={onOpen}
          onUpdate={(id) => {
            setIdExp(id)
            id && expUpdateToggle.onOpen()
          }}
          onDelete={(id) => {
            setIdExp(id)
            id && deleteExpToggle.onOpen()
          }}
        />
      </div>

      {isOpen && (
        <ReporteModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={store.addreporte}
        />
      )}

      {expUpdateToggle.isOpen && !!idExp && (
        <ReporteModal
          isOpen={expUpdateToggle.isOpen}
          onClose={() => {
            setIdExp('')
            expUpdateToggle.onClose()
          }}
          idToUpdate={idExp}
          onSubmit={(values) => {
            store.updatereporte(values)
          }}
          isUpdate
        />
      )}

      {deleteExpToggle.isOpen && (
        <DeleteAlert
          title={textRegistroReporte.add}
          isOpen={deleteExpToggle.isOpen}
          onClose={() => {
            setIdExp('')
            deleteExpToggle.onClose()
          }}
          onDelete={() => {
            store.deletereporte(idExp)
            deleteExpToggle.onClose()
          }}
        />
      )}
    </div>
  )
}

export default ReporteForm
