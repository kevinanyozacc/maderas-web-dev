import ExperienciaModal from './ExperienciaModal'
import ExperienciaTable from './ExperienciaTable'

import { useState } from 'react'
import { IconPlus } from '@icons'
import useToggle from '@hooks/useToggle'
import { ExperienciaInput } from '@generated/graphql'
import useUpdateRegistroProductor from '@hooks/useUpdateRegistroProductor'
import ExperienciaUpdateModal from './ExperienciaUpdateModal'
import DeleteAlert from '@components/shared/DeleteAlert'
import { textExperiencia } from '@modules/registro-productor/utils/textContent'

const ExperienciaForm = ({ id }: any) => {
  const { isOpen, onClose, onOpen } = useToggle()
  const [idToUpdate, setIdToUpdate] = useState<number>()
  const [idToDelete, setIdToDelete] = useState<number>()
  const expUpdateToggle = useToggle()
  const deleteExpToggle = useToggle()
  const {
    datos,
    createExperiencia,
    deleteExperiencia,
    updateExperiencia
  } = useUpdateRegistroProductor(id)

  const handleAdd = (value: ExperienciaInput) => {
    Object.assign(value, {
      PROFESIONAL_RESPONSABLE_ID: datos.data?.getTramiteByRegistroId?.PROFESIONAL?.PROFESIONAL_RESPONSABLE_ID
    })
    createExperiencia(value)
  }

  const handleDelete = async () => {
    await deleteExperiencia(idToDelete!)
    deleteExpToggle.onClose()
  }

  const handleUpdate = (value: ExperienciaInput) => {
    updateExperiencia(value)
  }

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
          data={datos.data?.getTramiteByRegistroId?.EXPERIENCIA! || []}
          onAdd={onOpen}
          onUpdate={(id) => {
            setIdToUpdate(id)
            id && expUpdateToggle.onOpen()
          }}
          onDelete={id => {
            setIdToDelete(id)
            id && deleteExpToggle.onOpen()
          }}
        />
      </div>

      {isOpen && (
        <ExperienciaModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={(values) => handleAdd(values)}
        />
      )}

      {expUpdateToggle.isOpen && !!idToUpdate && (
        <ExperienciaUpdateModal
          isOpen={expUpdateToggle.isOpen}
          onClose={() => {
            setIdToUpdate(0)
            expUpdateToggle.onClose()
          }}
          idToUpdate={idToUpdate}
          onSubmit={handleUpdate}
        />
      )}

      {deleteExpToggle.isOpen && (
        <DeleteAlert
          isOpen={deleteExpToggle.isOpen}
          onClose={() => {
            setIdToDelete(undefined)
            deleteExpToggle.onClose()
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default ExperienciaForm
