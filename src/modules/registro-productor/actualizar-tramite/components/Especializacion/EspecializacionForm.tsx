import { useState } from 'react'
import EspecializacionModal from './EspecializacionModal'
import EspecializacionTable from './EspecializacionTable'

import { IconPlus } from '@icons'
import useToggle from '@hooks/useToggle'

import {
  EspecializacionInput
} from '@generated/graphql'
import useUpdateRegistroProductor from '@hooks/useUpdateRegistroProductor'
import EspecializacionUpdateModal from './EspecializacionUpdateModal'
import DeleteAlert from '@components/shared/DeleteAlert'
import { textEspecializacion } from '@modules/registro-productor/utils/textContent'

const EspecializacionForm = ({ id }: any) => {
  const { isOpen, onOpen, onClose } = useToggle()
  const especUpdateToggle = useToggle()
  const deleteEspecToggle = useToggle()
  const [idToUpdate, setIdToUpdate] = useState<number>()
  const [idToDelete, setIdToDelete] = useState<number>()

  const {
    datos,
    createEspecializacion,
    deleteEspecializacion,
    updateEspecializacion
  } = useUpdateRegistroProductor(id)

  const handleAdd = (value: EspecializacionInput) => {
    Object.assign(value, {
      PROFESIONAL_RESPONSABLE_ID: datos.data?.getTramiteByRegistroId?.PROFESIONAL?.PROFESIONAL_RESPONSABLE_ID
    })
    createEspecializacion(value)
  }

  const handleDelete = async () => {
    await deleteEspecializacion(idToDelete!)
    deleteEspecToggle.onClose()
  }

  const handleUpdate = (value: any) => {
    updateEspecializacion(value)
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-4 border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          {textEspecializacion.titleForm}
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

        <EspecializacionTable
          data={datos.data?.getTramiteByRegistroId?.ESPECIALIDAD! || []}
          onAdd={onOpen}
          onUpdate={(id) => {
            setIdToUpdate(id)
            id && especUpdateToggle.onOpen()
          }}
          onDelete={id => {
            setIdToDelete(id)
            id && deleteEspecToggle.onOpen()
          }}
        />

        {isOpen && (
          <EspecializacionModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={(values) => handleAdd(values)}
          />
        )}

        {especUpdateToggle.isOpen && !!idToUpdate && (
          <EspecializacionUpdateModal
            isOpen={especUpdateToggle.isOpen}
            onClose={() => {
              setIdToUpdate(0)
              especUpdateToggle.onClose()
            }}
            idToUpdate={idToUpdate}
            onSubmit={handleUpdate}
          />
        )}
        {deleteEspecToggle.isOpen && (
          <DeleteAlert
            title={textEspecializacion.delete}
            isOpen={deleteEspecToggle.isOpen}
            onClose={() => {
              setIdToDelete(undefined)
              deleteEspecToggle.onClose()
            }}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default EspecializacionForm
