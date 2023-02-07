import { useState } from 'react'
import { useRouter } from 'next/router'

import { IconPlus } from '@icons'
import useToggle from '@hooks/useToggle'
import { SideMultistepComponentProps as Props } from '@pages/declaracion-semilla/actualizar-tramite'

import SucursalesTable from './SucursalesTable'
import useUpdateDeclaracionSemilla from '@hooks/useUpdateDeclaracionSemilla'

import {
  AlmacenCreateInput,
  AlmacenUpdateInput,
  EstadosExpedientes,
  SucursalCreateInput,
  SucursalUpdateInput,
  useUpdateEstadoExpedienteMutation
} from '@generated/graphql'

import WarningAlert from '@components/shared/WarningAlert'
import ButtonsForm from '@components/shared/ButtonsForm'
import SucursalesModal from './SucursalesModal'
import AlmacenTable from './AlmacenTable'
import AlmacenModal from './AlmacenModal'

const EstablecimientoSucursalesForm = ({ back, registroId }: Props) => {
  const {
    EST_SUCURSALES,
    ALMACEN,
    createSucursal,
    updateSucursal,
    deleteSucursal,
    observacion,
    createAlmacen,
    updateAlmacen,
    deleteAlmacen
  } = useUpdateDeclaracionSemilla(+registroId)

  const [{ fetching }, updateEstado] = useUpdateEstadoExpedienteMutation()
  const [idToUpdate, setIdToUpdate] = useState<number>()

  const sucursalCreToggle = useToggle()
  const sucursalUpdToggle = useToggle()
  const router = useRouter()

  const almacenCrToggle = useToggle()
  const almacenUpToggle = useToggle()

  const handleAddSucursal = (value: SucursalCreateInput) => {
    createSucursal(value)
  }

  const handleUpdateSucursal = (value: SucursalUpdateInput) => {
    updateSucursal(value)
    setIdToUpdate(undefined)
  }

  const handleDeleteSucursal = (id: number) => deleteSucursal(id)

  const handleCreateAlmacen = (value: AlmacenCreateInput) => {
    createAlmacen(value)
  }

  const handleUpdateAlmacen = (value: AlmacenUpdateInput) => {
    updateAlmacen(value)
    setIdToUpdate(undefined)
  }

  const handleDeleteAlmacen = async (id: number) => await deleteAlmacen(id)

  return (
    <div className="flex flex-col flex-1">
      {!!observacion?.OBS_SUCURSALES && <WarningAlert message={observacion?.OBS_SUCURSALES!} />}
      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">Sucursales</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex">
          <button
            type="button"
            onClick={sucursalCreToggle.onOpen}
            className="btn btn-ghost-primary"
          >
            Agregar
            <IconPlus />
          </button>
        </div>
        <div className="mb-4">
          <SucursalesTable
            data={EST_SUCURSALES}
            onAdd={sucursalCreToggle.onOpen}
            onUpdate={(id) => {
              setIdToUpdate(id)
              id && sucursalUpdToggle.onOpen()
            }}
            onDelete={handleDeleteSucursal}
          />
        </div>

        {/* CREATE SUCURSALES MODAL */}
        {sucursalCreToggle.isOpen &&
          <SucursalesModal
            isOpen={sucursalCreToggle.isOpen}
            onClose={sucursalCreToggle.onClose}
            onSubmit={handleAddSucursal}
          />
        }

        {/* UPDATE SUCURSAL MODAL */}
        {sucursalUpdToggle.isOpen &&
          <SucursalesModal
            isOpen={sucursalUpdToggle.isOpen}
            onClose={() => {
              setIdToUpdate(undefined)
              sucursalUpdToggle.onClose()
            }}
            dataToUpdate={EST_SUCURSALES.find(i => i.SUCURSAL_ID === idToUpdate)}
            isUpdate
            onSubmit={(value) => handleUpdateSucursal(value as SucursalUpdateInput)}
          />
        }
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
            data={ALMACEN}
            onAdd={almacenCrToggle.onOpen}
            onDelete={handleDeleteAlmacen}
            onUpdate={(id) => {
              setIdToUpdate(id)
              id && almacenUpToggle.onOpen()
            }}
          />
        </div>
      </div>

      {/* ALMACEN MODAL */}
      {almacenCrToggle.isOpen &&
        <AlmacenModal
          isOpen={almacenCrToggle.isOpen}
          onClose={almacenCrToggle.onClose}
          onSubmit={values => handleCreateAlmacen(values as AlmacenCreateInput)}
        />
      }
      {almacenUpToggle.isOpen &&
        <AlmacenModal
          isUpdate
          isOpen={almacenUpToggle.isOpen}
          onClose={() => {
            setIdToUpdate(undefined)
            almacenUpToggle.onClose()
          }}
          onSubmit={(value) => {
            handleUpdateAlmacen(value as AlmacenUpdateInput)
            setIdToUpdate(undefined)
            almacenUpToggle.onClose()
          }}
          dataToUpdate={ALMACEN.find(i => i.ALMACEN_ID === idToUpdate)}
        />
      }
      <ButtonsForm
        isLast
        back={back}
        isLoading={fetching}
        onEnd={async () => {
          await updateEstado({
            expedienteId: +registroId,
            estado: EstadosExpedientes.Actualizado
          })
          router.push('/')
        }}
      />
    </div>
  )
}

export default EstablecimientoSucursalesForm
