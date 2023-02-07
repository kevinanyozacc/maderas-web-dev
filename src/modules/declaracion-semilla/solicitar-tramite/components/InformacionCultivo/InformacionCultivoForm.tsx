import { useState } from 'react'
import useToggle from '@hooks/useToggle'
import { IconPlus } from '@icons'
import useToast from '@hooks/useToast'
import { SideMultistepComponentProps as Props } from '@pages/declaracion-semilla'

import { useDeclaracionSemilla } from '../../store/useDeclaracionSemilla'
import InformacionCultivoModal from './InformacionCultivoModal'
import InformacionCultivoTable from './InformacionCultivoTable'

import { InformacionCultivoItem } from '../../interfaces/declaracionSemilla'

const InformacionCultivoForm = ({ next, back }: Props) => {
  const { isOpen, onOpen, onClose } = useToggle()
  const updateInfoCultToggle = useToggle()
  const toast = useToast()
  const [idToUpdate, setIdToUpdate] = useState('')
  const store = useDeclaracionSemilla()

  const allInfoCult = store.state.informacionCultivos

  const handleAddInfoCult = (values: InformacionCultivoItem) => {
    const info = store.state.informacionCultivos.find(item => (
      item.ESPECIE_ID === values.ESPECIE_ID &&
      item.CULTIVO_ID === values.CULTIVO_ID &&
      !!item.CULTIVO_ID &&
      !!values.CULTIVO_ID
    ))
    !info
      ? store.addInfoCultivo(values)
      : toast({ title: 'Ya existe este elemento', type: 'warning' })
  }

  const handleUpdate = (values: InformacionCultivoItem) => {
    store.updateInfoCultivo(values, idToUpdate)
  }

  const handleNext = () => {
    store.state.informacionCultivos.length === 0
      ? toast({ title: 'Debe agregar un elemento', type: 'warning' })
      : next()
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">Información del Cultivar</p>
      </div>

      <div className="flex">
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
      </div>

      {isOpen &&
        <InformacionCultivoModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleAddInfoCult}
        />
      }

      <div className="mb-4">
        <InformacionCultivoTable
          data={allInfoCult}
          onAdd={onOpen}
          onUpdate={(id) => {
            setIdToUpdate(id)
            updateInfoCultToggle.onOpen()
          }}
          onDelete={(value) => store.deleteInfoCultivo(value)}
        />
      </div>

      {updateInfoCultToggle.isOpen && idToUpdate && (
        <InformacionCultivoModal
          id={idToUpdate}
          onSubmit={handleUpdate}
          onClose={() => {
            setIdToUpdate('')
            updateInfoCultToggle.onClose()
          }}
          isOpen={updateInfoCultToggle.isOpen}
          isUpdate
        />
      )}

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
  )
}

export default InformacionCultivoForm
