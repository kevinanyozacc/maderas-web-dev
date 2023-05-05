import ConocimientoModal from './ConocimientoModal'
import ConocimientoTable from './ConocimientoTable'

import { IconPlus } from '@icons'
import useToggle from '@hooks/useToggle'
import { useRegistroResponsable } from '../../store/useRegistroResponsable'
import { useState } from 'react'
import DeleteAlert from '@components/shared/DeleteAlert'
import { textConocimiento } from '@modules/registro-productor/utils/textContent'

const ConocimientoForm = () => {
  const [idExp, setIdExp] = useState('')
  const store = useRegistroResponsable()
  const { isOpen, onClose, onOpen } = useToggle()
  const deleteExpToggle = useToggle()
  const expUpdateToggle = useToggle()

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">
          {textConocimiento.titleForm}
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

        <ConocimientoTable
          data={store.state.conocimiento}
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
        <ConocimientoModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={store.addConocimiento}
        />
      )}

      {expUpdateToggle.isOpen && !!idExp && (
        <ConocimientoModal
          isOpen={expUpdateToggle.isOpen}
          onClose={() => {
            setIdExp('')
            expUpdateToggle.onClose()
          }}
          idToUpdate={idExp}
          onSubmit={(values) => {
            store.updateConocimiento(values)
          }}
          isUpdate
        />
      )}

      {deleteExpToggle.isOpen && (
        <DeleteAlert
          title={textConocimiento.delete}
          isOpen={deleteExpToggle.isOpen}
          onClose={() => {
            setIdExp('')
            deleteExpToggle.onClose()
          }}
          onDelete={() => {
            store.deleteConocimiento(idExp)
            deleteExpToggle.onClose()
          }}
        />
      )}
    </div>
  )
}

export default ConocimientoForm
