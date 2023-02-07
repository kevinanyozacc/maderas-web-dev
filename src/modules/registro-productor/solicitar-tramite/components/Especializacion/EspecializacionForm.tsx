import { useState } from 'react'
import EspecializacionModal from './EspecializacionModal'
import EspecializacionTable from './EspecializacionTable'

import { IconPlus } from '@icons'
import useToggle from '@hooks/useToggle'
import { useRegistroProductor } from '../../store/useRegistroProductor'
import DeleteAlert from '@components/shared/DeleteAlert'
import { textEspecializacion } from '@modules/registro-productor/utils/textContent'

const EspecializacionForm = () => {
  const store = useRegistroProductor()
  const [idEspec, setIdEspec] = useState('')
  const { isOpen, onOpen, onClose } = useToggle()
  const especUpdateToggle = useToggle()
  const deleteEspecToggle = useToggle()
  const { updateEspecializacion } = useRegistroProductor()

  const handleUpdate = (values: any) => {
    updateEspecializacion(values)
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
          data={store.state.especializacion}
          onAdd={onOpen}
          onUpdate={(id) => {
            setIdEspec(id)
            especUpdateToggle.onOpen()
          }}
          onDelete={(id) => {
            setIdEspec(id)
            id && deleteEspecToggle.onOpen()
          }}
        />
      </div>

      {isOpen && (
        <EspecializacionModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={store.addEspecializacion}
        />
      )}

      {especUpdateToggle.isOpen && (
        <EspecializacionModal
          isOpen={especUpdateToggle.isOpen}
          onClose={() => {
            setIdEspec('')
            especUpdateToggle.onClose()
          }}
          onSubmit={handleUpdate}
          idToUpdate={idEspec}
          isUpdate
        />
      )}

      {deleteEspecToggle.isOpen && (
        <DeleteAlert
          title={textEspecializacion.delete}
          isOpen={deleteEspecToggle.isOpen}
          onClose={() => {
            setIdEspec('')
            deleteEspecToggle.onClose()
          }}
          onDelete={() => {
            store.deleteEspecializacion(idEspec)
            deleteEspecToggle.onClose()
          }}
        />
      )}
    </div>
  )
}

export default EspecializacionForm
