import { useState } from 'react'

import { IconPlus } from '@icons'
import useToggle from '@hooks/useToggle'
import useUpdateRegistroProductor from '@hooks/useUpdateRegistroProductor'
import useToast from '@hooks/useToast'

import { SideMultistepComponentProps as Props } from '@pages/registro-productor/actualizar-tramite'

import TierraCultivoModal from './TierraCultivoModal'
import TierraCultivoTable from './TierraCultivoTable'
import TierraCultivoUpdateModal from './TierraCultivoUpdateModal'

import { TierraCultivoInput } from '@generated/graphql'
import WarningAlert from '@components/shared/WarningAlert'
import ButtonsForm from '@components/shared/ButtonsForm'
import DeleteAlert from '@components/shared/DeleteAlert'

const TierraCultivoForm = ({ next, back, registroId }: Props) => {
  const [isChangedForm, setIsChangedForm] = useState(false)
  const [idToUpdate, setIdToUpdate] = useState<number>()
  const [idToDelete, setidToDelete] = useState<number>()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useToggle()
  const deleteTierraToggle = useToggle()

  const {
    isOpen: isOpenToUpdate,
    onOpen: onOpenToUpdate,
    onClose: onCloseToUpdate
  } = useToggle()

  const {
    TIERRAS_CULTIVOS,
    createTierraCult,
    updateTierraCult,
    deleteTierraCult,
    dataTramiteEstObs
  } = useUpdateRegistroProductor(registroId)

  const handleAddTierra = (value: TierraCultivoInput) => {
    Object.assign(value, {
      EXPEDIENTE_ID: +registroId!,
      TIERRA_CULTIVO_ID: 0
    })
    createTierraCult(value)
    setIsChangedForm(true)
  }

  const handleDelete = async () => {
    await deleteTierraCult(idToDelete!)
    deleteTierraToggle.onClose()
  }

  const handleUpdate = (value: TierraCultivoInput) => {
    updateTierraCult(value)
    setIdToUpdate(0)
  }

  const handleSubmit = () => {
    toast({ title: 'La informacion se actualizó con exito' })
  }

  return (
    <div className="flex flex-col flex-1">
      {!!dataTramiteEstObs.data?.getObservacionesByExpediente.OBS_TIERRAS && <WarningAlert message={dataTramiteEstObs.data?.getObservacionesByExpediente.OBS_TIERRAS!} />}
      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">Tierras de Cultivo</p>
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
          data={TIERRAS_CULTIVOS}
          onAdd={onOpen}
          onUpdate={id => {
            setIdToUpdate(id)
            id && onOpenToUpdate()
          }}
          onDelete={id => {
            setidToDelete(id)
            id && deleteTierraToggle.onOpen()
          }}
        />

        <ButtonsForm
          back={back}
          next={next}
          handleDisable={!isChangedForm}
          onSubmitSave={handleSubmit}
        />
      </div>

      <TierraCultivoModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddTierra}
      />

      {!!idToUpdate &&
        <TierraCultivoUpdateModal
          isOpen={isOpenToUpdate}
          onClose={() => {
            setIdToUpdate(0)
            onCloseToUpdate()
          }}
          onSubmit={handleUpdate}
          idToUpdate={idToUpdate!}
        />
      }
      {deleteTierraToggle.isOpen && (
        <DeleteAlert
          title='Eliminar Tierra de Cultivo'
          isOpen={deleteTierraToggle.isOpen}
          onClose={() => {
            setidToDelete(undefined)
            deleteTierraToggle.onClose()
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default TierraCultivoForm
