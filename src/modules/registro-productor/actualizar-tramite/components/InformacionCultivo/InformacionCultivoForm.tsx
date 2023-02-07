import { useState } from 'react'

import useToast from '@hooks/useToast'
import useToggle from '@hooks/useToggle'
import useUpdateRegistroProductor from '@hooks/useUpdateRegistroProductor'
import { IconPlus } from '@icons'

import { SideMultistepComponentProps as Props } from '@pages/registro-productor/actualizar-tramite'
import WarningAlert from '@components/shared/WarningAlert'
import ButtonsForm from '@components/shared/ButtonsForm'
import DeleteAlert from '@components/shared/DeleteAlert'

import ModalInformacionCultivo from './informacionCultivoModal'
import InformacionCultivoTable from './InformacionCultivoTable'

import { InformacionCultivoInput } from '@generated/graphql'
import { SuccessMessages } from '@validation/messages'
import { textInfoCult } from '@modules/registro-productor/utils/textContent'

const InformacionCultivoForm = ({ next, back, registroId }: Props) => {
  const [isChangedForm, setIsChangedForm] = useState(false)
  const [idToUpdate, setIdToUpdate] = useState<number>()
  const [idToDelete, setIdToDelete] = useState<number>()
  const [dataUpdate, setDataUpdate] = useState({})
  const { isOpen, onOpen, onClose } = useToggle()
  const updateInfCultToggle = useToggle()
  const deleteInfCultToggle = useToggle()
  const toast = useToast()

  const {
    INFO_CULTIVO,
    createInfoCult,
    updateInfoCult,
    deleteInfoCult,
    dataTramiteEstObs
  } = useUpdateRegistroProductor(registroId)

  const handleAdd = (value: InformacionCultivoInput) => {
    const info = INFO_CULTIVO.find(item => (
      item.ESPECIE_ID === value.ESPECIE_ID &&
      item.CULTIVO_ID === value.CULTIVO_ID &&
      !!item.CULTIVO_ID &&
      !!value.CULTIVO_ID)
    )

    if (value.CULTIVO_REGLAMENTARIO && value.CULTIVO_ID === 0) value.CULTIVO_ID = null
    if (!info) {
      createInfoCult(value)
      setIsChangedForm(true)
    } else {
      toast({ title: 'Ya existe este elemento', type: 'error' })
    }
  }

  const handleDelete = async () => {
    await deleteInfoCult(idToDelete!)
    deleteInfCultToggle.onClose()
  }

  const handleUpdate = (value: InformacionCultivoInput) => {
    updateInfoCult(value)
  }

  const handleSubmit = () => toast({ title: SuccessMessages.updateElement })

  return (
    <div className="flex flex-col flex-1">
      {!!dataTramiteEstObs.data?.getObservacionesByExpediente.OBS_INFO_CULTIVO && <WarningAlert message={dataTramiteEstObs.data?.getObservacionesByExpediente.OBS_INFO_CULTIVO!} />}

      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">{textInfoCult.titleForm}</p>
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

      {isOpen && (
        <ModalInformacionCultivo
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleAdd}
        />
      )}

      {updateInfCultToggle.isOpen && !!idToUpdate && (
        <ModalInformacionCultivo
          isOpen={updateInfCultToggle.isOpen}
          onClose={() => {
            setIdToUpdate(undefined)
            updateInfCultToggle.onClose()
          }}
          onSubmit={handleUpdate}
          idToUpdate={idToUpdate}
          isUpdate
          dataUpdate={dataUpdate}
        />
      )}

      <div className="mb-4">
        <InformacionCultivoTable
          data={INFO_CULTIVO}
          onAdd={onOpen}
          onUpdate={(id) => {
            setDataUpdate(INFO_CULTIVO.find(i => i.INFORMACION_CULTIVO_ID === id)!)
            setIdToUpdate(id)
            id && updateInfCultToggle.onOpen()
          }}
          onDelete={(id) => {
            setIdToDelete(id)
            id && deleteInfCultToggle.onOpen()
          }}
        />
      </div>

      <ButtonsForm
        back={back}
        next={next}
        handleDisable={!isChangedForm}
        onSubmitSave={handleSubmit}
      />

      {deleteInfCultToggle.isOpen && (
        <DeleteAlert
          title={textInfoCult.delete}
          isOpen={deleteInfCultToggle.isOpen}
          onClose={() => {
            deleteInfCultToggle.onClose()
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default InformacionCultivoForm
