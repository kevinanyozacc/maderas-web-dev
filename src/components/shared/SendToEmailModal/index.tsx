import Input from '@components/shared/Input'
import Modal from '@components/shared/Modal'
import ModalHeader from '@components/shared/ModalHeader'
import {
  TipoSolicitudExpedientes,
  useSendResumenToEmailMutation
} from '@generated/graphql'
import useForm, { FormError } from '@hooks/useForm'
import useToast from '@hooks/useToast'
import { ErrorMessages } from '@validation/messages'
import { useState } from 'react'

import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import Spinner from '../Spinner'

interface Props {
  isOpen: boolean
  onClose: () => void
  tipoTramite: TipoSolicitudExpedientes
  expedienteId: number
}

interface SendToEmailInput {
  EMAIL: string
}

const SendToEmailModal = ({
  isOpen,
  onClose,
  tipoTramite,
  expedienteId
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const { values, ...form } = useForm({
    initialValues: {
      EMAIL: ''
    },
    validate: (values) => {
      const errors: FormError<SendToEmailInput> = {}
      if (!isEmail(values.EMAIL) || isEmpty(values.EMAIL))
        errors.EMAIL = ErrorMessages.badEmail
      return errors
    }
  })

  const [, sendResumen] = useSendResumenToEmailMutation()
  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await sendResumen({
        email: values.EMAIL,
        expedienteId,
        tipoTramite
      })
      if (res.error) {
        toast({
          desc: 'Ocurrió un error al enviar el resumen al email',
          title: 'Error',
          type: 'error'
        })
        setIsLoading(false)
        return
      }
      toast({
        desc: 'El resumen se envió al email correctamente',
        title: 'Resumen enviado'
      })
    } catch (error) {
      toast({
        desc: 'Ocurrió un error al enviar el resumen al email',
        title: 'Error',
        type: 'error'
      })
    }
    setIsLoading(false)
    clearForm()
  }

  return (
    <Modal isOpen={isOpen} onClose={clearForm} hasOverlay>
      <div className="flex z-[70] w-full h-full sm:h-max sm:w-[90%] max-w-[550px] sm:rounded-xl shadow-lg bg-white dark:bg-slate-800 sm:pt-0">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col justify-between gap-5 flex-1 px-5 py-3 md:p-10"
        >
          <ModalHeader
            closeBtn={clearForm}
            title="Enviar Información del expediente al correo"
          />

          <div className="">
            <Input
              type="email"
              label="Email"
              {...form.inputProps('EMAIL')}
              area-label="email"
            />
          </div>

          <div className="flex w-full justify-between mt-auto">
            <button
              type="button"
              onClick={clearForm}
              className="btn btn-ghost-red"
            >
              Cerrar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-outline-primary"
            >
              Enviar {isLoading ? <Spinner /> : null}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default SendToEmailModal
