import { useState } from 'react'

import useToggle from '@hooks/useToggle'
import useToast from '@hooks/useToast'
import { SideMultistepComponentProps as Props } from '@pages/declaracion-semilla'
import { IconPlus } from '@icons'

import EstablecimientoSucursalesModal from './SucursalesModal'
import EstablecimientoSucursalesTable from './SucursalesTable'

import { useDeclaracionSemilla } from '../../store/useDeclaracionSemilla'
import { SucursalesInput } from '../../interfaces/declaracionSemilla'
import Spinner from '@components/shared/Spinner'
import AlmacenModal from './AlmacenModal'
import AlmacenTable from './AlmacenTable'

const EstablecimientoSucursalesForm = ({ back, submit, isLoading }: Props) => {
  const [isSubmited, setIsSubmited] = useState(false)
  const [idToUpdate, setIdToUpdate] = useState('')
  const Toast = useToast()

  const store = useDeclaracionSemilla()
  const { isOpen, onOpen, onClose } = useToggle()
  const updateSucu = useToggle()

  const almacenCrToggle = useToggle()
  const almacenUpToggle = useToggle()

  const handleUpdate = (values: SucursalesInput) => {
    store.updateSucursales(values)
    setIdToUpdate('')
    updateSucu.onClose()
  }

  const handleSubmit = () => {
    if (store.state.sucursales.length === 0) {
      Toast({ type: 'warning', title: 'Agregar datos de sucursales' })
      return
    }
    if (store.state.almacen.length === 0) {
      Toast({ type: 'warning', title: 'Agregar datos de almacen' })
      return
    }
    setIsSubmited(true)
    submit()
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">Sucursales</p>
      </div>

      <div className="flex flex-col gap-4">
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
        <div className="mb-4">
          <EstablecimientoSucursalesTable
            data={store.state.sucursales}
            onAdd={onOpen}
            onUpdate={(id) => {
              setIdToUpdate(id)
              id && updateSucu.onOpen()
            }}
            onDelete={store.deleteSucursales}
          />
        </div>
      </div>

      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">Almacen</p>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex">
          <button
            type="button"
            onClick={almacenCrToggle.onOpen}
            className="btn btn-ghost-primary"
          >
            Agregar
            <IconPlus />
          </button>
        </div>

        <div className="mb-4">
          <AlmacenTable
            data={store.state.almacen}
            onAdd={almacenCrToggle.onOpen}
            onDelete={store.deleteAlmacen}
            onUpdate={(id) => {
              setIdToUpdate(id)
              id && almacenUpToggle.onOpen()
            }}
          />
        </div>
      </div>

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
          onClick={handleSubmit}
          className="self-end btn btn-solid-primary"
          disabled={isLoading || isSubmited}
        >
          Guardar
          {isLoading && <Spinner />}
        </button>
      </div>

      {/* CREATE SUCURSALES MODAL */}
      {isOpen &&
        <EstablecimientoSucursalesModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={store.addSucursales}
        />
      }

      {updateSucu.isOpen &&
        <EstablecimientoSucursalesModal
          isOpen={updateSucu.isOpen}
          onClose={() => {
            setIdToUpdate('')
            updateSucu.onClose()
          }}
          onSubmit={handleUpdate}
          idToUpdate={idToUpdate}
          isUpdate
        />
      }

      {/* ALMACEN MODAL */}
      {almacenCrToggle.isOpen &&
        <AlmacenModal
          isOpen={almacenCrToggle.isOpen}
          onClose={almacenCrToggle.onClose}
          onSubmit={store.createAlmacen}
        />
      }
      {almacenUpToggle.isOpen &&
        <AlmacenModal
          isUpdate
          isOpen={almacenUpToggle.isOpen}
          onClose={() => {
            setIdToUpdate('')
            almacenUpToggle.onClose()
          }}
          onSubmit={(value) => {
            store.updateAlmacen(value)
            setIdToUpdate('')
            updateSucu.onClose()
          }}
          idToUpdate={idToUpdate}
        />
      }
    </div>
  )
}

export default EstablecimientoSucursalesForm
