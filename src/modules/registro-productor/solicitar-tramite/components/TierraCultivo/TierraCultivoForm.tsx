import { useState } from 'react'
import { IconPlus } from '@icons'
import useToggle from '@hooks/useToggle'
import { SideMultistepComponentProps as Props } from '@pages/registro-productor'

import TierraCultivoModal from './TierraCultivoModal'
import TierraCultivoTable from './TierraCultivoTable'
import { useRegistroProductor } from '../../store/useRegistroProductor'
import useToast from '@hooks/useToast'
import { TierraCultivo } from '@modules/registro-productor/solicitar-tramite/interfaces'
import DeleteAlert from '@components/shared/DeleteAlert'
import { textTierraCult } from '@modules/registro-productor/utils/textContent'

const TierraCultivoForm = ({ next, back }: Props) => {
  const toast = useToast()
  const [idToUpdate, setIdToUpdate] = useState('')
  const [idToDelete, setIdToDelete] = useState('')
  const store = useRegistroProductor()
  const { isOpen, onOpen, onClose } = useToggle()
  const deleteTierraToggle = useToggle()
  const tierraUpdateToggle = useToggle()

  const handleNext = () => {
    store.state.tierrasCultivo.length !== 0
      ? next()
      : toast({ title: 'Debe Agregar un elemento', type: 'warning' })
  }

  const handleUpdate = (value: TierraCultivo) => {
    store.updateTierraCultivo(value)
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">{textTierraCult.titleForm}</p>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex">
          <button
            type="button"
            onClick={onOpen}
            className="btn btn-ghost-primary"
          >
            Agregar
            <IconPlus />
          </button>
        </div>

        <TierraCultivoTable
          data={store.state.tierrasCultivo}
          onAdd={onOpen}
          onUpdate={(id) => {
            setIdToUpdate(id)
            id && tierraUpdateToggle.onOpen()
          }}
          onDelete={(id) => {
            setIdToDelete(id)
            id && deleteTierraToggle.onOpen()
          }}
        />

        <div className="flex items-center justify-between mt-auto">
          <button
            type="button"
            onClick={back}
            className="self-end btn btn-outline-primary"
          >
            Regresar
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="self-end btn btn-solid-primary"
          >
            Siguiente
          </button>
        </div>
      </div>

      {isOpen && (
        <TierraCultivoModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={store.addTierraCultivo}
        />
      )}

      {tierraUpdateToggle && !!idToUpdate && (
        <TierraCultivoModal
          isOpen={tierraUpdateToggle.isOpen}
          onClose={() => {
            setIdToUpdate('')
            tierraUpdateToggle.onClose()
          }}
          idToUpdate={idToUpdate}
          onSubmit={handleUpdate}
          isUpdate
        />
      )}

      {deleteTierraToggle.isOpen && (
        <DeleteAlert
          title={textTierraCult.delete}
          isOpen={deleteTierraToggle.isOpen}
          onClose={() => {
            setIdToDelete('')
            deleteTierraToggle.onClose()
          }}
          onDelete={() => {
            store.deleteTierraCultivo(idToDelete)
            deleteTierraToggle.onClose()
          }}
        />
      )}
    </div>
  )
}

export default TierraCultivoForm
