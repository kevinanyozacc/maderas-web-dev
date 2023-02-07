import { useState } from 'react'

import useToast from '@hooks/useToast'
import useToggle from '@hooks/useToggle'
import useUpdateDeclaracionSemilla from '@hooks/useUpdateDeclaracionSemilla'
import { IconPlus } from '@icons'

import { SideMultistepComponentProps as Props } from '@pages/declaracion-semilla/actualizar-tramite'
import WarningAlert from '@components/shared/WarningAlert'
import ButtonsForm from '@components/shared/ButtonsForm'

import ModalInformacionCultivo from './InformacionCultivoModal'
import InformacionCultivoTable from './InformacionCultivoTable'

import { InformacionCultivoInput } from '@generated/graphql'

const InformacionCultivoForm = ({ next, back, registroId }: Props) => {
  const [isChangedForm, setIsChangedForm] = useState(false)
  const [idInfCult, setIdInfCult] = useState<number>()
  const [dataUpdate, setDataUpdate] = useState({})
  const { isOpen, onOpen, onClose } = useToggle()
  const updateInfCultToggle = useToggle()
  const toast = useToast()
  const {
    INFO_CULTIVO,
    createInfoCult,
    updateInfoCult,
    deleteInfoCult,
    observacion
  } = useUpdateDeclaracionSemilla(+registroId)

  const handleAdd = (values: InformacionCultivoInput) => {
    const info = INFO_CULTIVO.find(item => (
      item.ESPECIE_ID === values.ESPECIE_ID &&
      item.CULTIVO_ID === values.CULTIVO_ID &&
      !!item.CULTIVO_ID &&
      !!values.CULTIVO_ID
    ))
    if (!info) {
      createInfoCult(values)
      setIsChangedForm(true)
    } else {
      toast({ title: 'Ya existe este elemento', type: 'error' })
    }
  }

  const handleDelete = (id: number) => deleteInfoCult(id)

  const handleUpdate = (value: InformacionCultivoInput) => {
    updateInfoCult(value)
  }

  const handleSubmit = () => toast({ title: 'Los datos se actualizarion correctamente' })

  return (
    <div className="flex flex-col flex-1">
      {!!observacion?.OBS_INFO_CULTIVO && <WarningAlert message={observacion?.OBS_INFO_CULTIVO!} />}

      <div className="border-b dark:border-b-slate-700 mb-4">
        <p className="font-medium text-slate-400">Informacíon del Cultivo</p>
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

      <div className="mb-4">
        <InformacionCultivoTable
          data={INFO_CULTIVO}
          onAdd={onOpen}
          onDelete={handleDelete}
          onUpdate={(id) => {
            setDataUpdate(INFO_CULTIVO.find(i => i.INFORMACION_CULTIVO_ID === id)!)
            setIdInfCult(id)
            id && updateInfCultToggle.onOpen()
          }}
        />
      </div>

      {isOpen &&
        <ModalInformacionCultivo
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleAdd}
        />
      }

      {updateInfCultToggle.isOpen && !!idInfCult && (
        <ModalInformacionCultivo
          isOpen={updateInfCultToggle.isOpen}
          onClose={() => {
            setIdInfCult(undefined)
            setDataUpdate({})
            updateInfCultToggle.onClose()
          }}
          onSubmit={handleUpdate}
          idToUpdate={idInfCult}
          isUpdate
          dataUpdate={dataUpdate}
        />
      )}

      <ButtonsForm
        back={back}
        next={next}
        handleDisable={!isChangedForm}
        onSubmitSave={handleSubmit}
      />
    </div>
  )
}

export default InformacionCultivoForm
