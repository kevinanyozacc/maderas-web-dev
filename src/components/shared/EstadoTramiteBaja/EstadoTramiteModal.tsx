import { useState } from 'react'
import isEmpty from 'validator/lib/isEmpty'
import Input from '@components/shared/Input'
import Modal from '@components/shared/Modal'
import ModalHeader from '@components/shared/ModalHeader'
import useForm, { FormError } from '@hooks/useForm'
import useToast from '@hooks/useToast'
import useToggle from '@hooks/useToggle'
import { ErrorMessages } from '@validation/messages'
import { TipoSolicitudExpedientes } from '@generated/graphql'
import EstadoResponsableInfoModal from './EstadoTramiteInfoModal'
import { useGetBajaSolicitudByExp } from '@graphql/api/GetBajaSolicitud'

interface Props {
  isOpen: boolean
  onClose: () => void
  tipoTramite: TipoSolicitudExpedientes
}

interface EstadoTramite {
  TIPO_DOCUMENTO: string
  NUMERO_DOCUMENTO: string
  NUMERO_EXPEDIENTE: string
}

const initialValues: EstadoTramite = {
  TIPO_DOCUMENTO: '',
  NUMERO_DOCUMENTO: '',
  NUMERO_EXPEDIENTE: ''
}

const EstadoTramiteModal = ({ isOpen, onClose, tipoTramite }: Props) => {
  const [estadoDatos, setEstadoDatos] = useState({})
  const toggle = useToggle()
  const toast = useToast()
  const { values, ...form } = useForm({
    initialValues,
    validate: (values) => {
      const errors: FormError<EstadoTramite> = {}
      if (isEmpty(values.NUMERO_EXPEDIENTE)) errors.NUMERO_EXPEDIENTE = ErrorMessages.empty
      return errors
    }
  })

  const clearForm = () => {
    form.clear()
    onClose?.()
  }
  const handleSubmit = async () => {
    const tramite = values.NUMERO_EXPEDIENTE
    // console.log(tramite)
    const data = await useGetBajaSolicitudByExp(tramite)
    console.log(data.data)
    if (!data.data.getBajaSolicitudByExp!) {
      toast({ type: 'warning', title: 'No se encontró el tramite: ' })
    } else {
      toast({ type: 'success', title: 'Se encontró el tramite: ' })
      setEstadoDatos(data?.data?.getBajaSolicitudByExp)
      toggle.onOpen()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={clearForm} hasOverlay>
      <div className="flex z-[70] w-full h-full sm:h-max sm:w-[90%] max-w-xl sm:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10"
        >
          <ModalHeader
            closeBtn={clearForm}
            title='Estado De Tramite'
          />
          <Input
            label="N° de Expediente"
            {...form.inputProps('NUMERO_EXPEDIENTE')}
          />
          <div className="flex w-full justify-between mt-auto">
            <button
              type="button"
              onClick={clearForm}
              className="btn btn-ghost-red"
            >
              Cerrar
            </button>
            <button type="submit" className="btn btn-outline-primary">
              Buscar
            </button>
          </div>
        </form>
        {toggle.isOpen && !!estadoDatos && (
          <EstadoResponsableInfoModal
            isOpen={toggle.isOpen}
            data={estadoDatos}
            onClose={toggle.onClose}
          />
        )}
      </div>
    </Modal>
  )
}

export default EstadoTramiteModal
