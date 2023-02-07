import ExperienciaModal from './ExperienciaModal'
import ExperienciaTable from './ExperienciaTable'

import { IconPlus } from '@icons'
import useToggle from '@hooks/useToggle'
import { useRegistroProductor } from '../../store/useRegistroProductor'
import { useState } from 'react'
import DeleteAlert from '@components/shared/DeleteAlert'
import { textExperiencia } from '@modules/registro-productor/utils/textContent'

const ExperienciaForm = () => {
  const [idExp, setIdExp] = useState('')
  const store = useRegistroProductor()
  const { isOpen, onClose, onOpen } = useToggle()
  const deleteExpToggle = useToggle()
  const expUpdateToggle = useToggle()

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">
          {textExperiencia.titleForm}
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

        <ExperienciaTable
          data={store.state.experiencia}
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
        <ExperienciaModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={store.addExperiencia}
        />
      )}

      {expUpdateToggle.isOpen && !!idExp && (
        <ExperienciaModal
          isOpen={expUpdateToggle.isOpen}
          onClose={() => {
            setIdExp('')
            expUpdateToggle.onClose()
          }}
          idToUpdate={idExp}
          onSubmit={(values) => {
            store.updateExperiencia(values)
          }}
          isUpdate
        />
      )}

      {deleteExpToggle.isOpen && (
        <DeleteAlert
          title={textExperiencia.delete}
          isOpen={deleteExpToggle.isOpen}
          onClose={() => {
            setIdExp('')
            deleteExpToggle.onClose()
          }}
          onDelete={() => {
            store.deleteExperiencia(idExp)
            deleteExpToggle.onClose()
          }}
        />
      )}
    </div>
  )
}

export default ExperienciaForm
