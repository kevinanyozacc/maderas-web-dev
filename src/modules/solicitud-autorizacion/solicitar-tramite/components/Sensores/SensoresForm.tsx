import { IconPlus } from '@icons'
import useToggle from '@hooks/useToggle'
import { useState } from 'react'
import DeleteAlert from '@components/shared/DeleteAlert'
import { textConocimiento } from '@modules/registro-productor/utils/textContent'
import { useRegistroSolicitud } from '../../store/useRegistroAutorizacion'
import SensoresTable from './SensoresTable'
import SensoresModal from './SensoresModal'
import { textSensores } from '@modules/solicitud-autorizacion/utils/textContent'

const SensoresForm = () => {
  const [idExp, setIdExp] = useState('')
  //const store = useRegistroResponsable()
  const store = useRegistroSolicitud()
  const { isOpen, onClose, onOpen } = useToggle()
  const deleteExpToggle = useToggle()
  const expUpdateToggle = useToggle()

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">
          {textSensores.titleForm}
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

        <SensoresTable
          data={store.state.sensores}
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
        <SensoresModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={store.addSensores}
        />
      )}

      {expUpdateToggle.isOpen && !!idExp && (
        <SensoresModal
          isOpen={expUpdateToggle.isOpen}
          onClose={() => {
            setIdExp('')
            expUpdateToggle.onClose()
          }}
          idToUpdate={idExp}
          onSubmit={(values) => {
            store.updateSensores(values)
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
            store.deleteSensores(idExp)
            deleteExpToggle.onClose()
          }}
        />
      )}
    </div>
  )
}

export default SensoresForm
