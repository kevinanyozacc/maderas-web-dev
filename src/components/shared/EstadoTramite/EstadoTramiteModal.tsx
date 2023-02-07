import { useState } from 'react'
import isEmpty from 'validator/lib/isEmpty'

import Input from '@components/shared/Input'
import Modal from '@components/shared/Modal'
import Select from '@components/shared/Select'
import ModalHeader from '@components/shared/ModalHeader'

import useForm, { FormError } from '@hooks/useForm'
import useToast from '@hooks/useToast'
import useToggle from '@hooks/useToggle'
import { useGetExpedienteByIdEstado } from '@graphql/api/GetExpedienteById'

import { ErrorMessages } from '@validation/messages'

import EstadoTramiteInfoModal from '@components/shared/EstadoTramite/EstadoTramiteInfoModal'
import { TipoSolicitudExpedientes } from '@generated/graphql'

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
      const isRUC = values.TIPO_DOCUMENTO === 'RUC'
      const isDNI = values.TIPO_DOCUMENTO === 'DNI'
      const isCE = values.TIPO_DOCUMENTO === 'CE'

      if (isEmpty(values.TIPO_DOCUMENTO)) errors.TIPO_DOCUMENTO = ErrorMessages.empty
      if (isEmpty(values.NUMERO_DOCUMENTO)) errors.NUMERO_DOCUMENTO = ErrorMessages.empty
      if (isEmpty(values.NUMERO_EXPEDIENTE)) errors.NUMERO_EXPEDIENTE = ErrorMessages.empty
      if (isRUC && values.NUMERO_DOCUMENTO.length !== 11) errors.NUMERO_DOCUMENTO = ErrorMessages.badRUC
      if (isDNI && values.NUMERO_DOCUMENTO.length !== 8) errors.NUMERO_DOCUMENTO = ErrorMessages.badDNI
      if (isCE && values.NUMERO_DOCUMENTO.length !== 9) errors.NUMERO_DOCUMENTO = ErrorMessages.badCE
      return errors
    }
  })

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleSubmit = async () => {
    const tipo = values.TIPO_DOCUMENTO
    const numero = values.NUMERO_DOCUMENTO
    const tramite = values.NUMERO_EXPEDIENTE
    const data = await useGetExpedienteByIdEstado(tipo, numero, tramite)

    if (data?.data?.getExpedienteByBPM &&
      data?.data?.getExpedienteByBPM.TIPO_SOLICITUD === tipoTramite) {
      setEstadoDatos(data?.data?.getExpedienteByBPM)
      toggle.onOpen()
    } else {
      toast({ type: 'error', title: 'No se encontró el tramite' })
    }
  }

  const handleMaxLen = () => {
    if (values.TIPO_DOCUMENTO === 'RUC') return 11
    if (values.TIPO_DOCUMENTO === 'CE') return 9
    if (values.TIPO_DOCUMENTO === 'DNI') return 8
    return 8
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Select
              label="Tipo documento"
              value={values.TIPO_DOCUMENTO}
              error={form.errors.TIPO_DOCUMENTO}
              onChange={({ value }) => {
                form.setFields({
                  TIPO_DOCUMENTO: value,
                  NUMERO_DOCUMENTO: ''
                })
              }}
              options={[
                { label: 'DNI', value: 'DNI' },
                { label: 'RUC', value: 'RUC' },
                { label: 'Carnet de Extranjeria', value: 'CE' }
              ]}
            />
            <Input
              label="N° documento"
              value={values.NUMERO_DOCUMENTO}
              maxLength={handleMaxLen()}
              pattern="[0-9]{0,11}"
              onChange={(e) => {
                e.target.validity.valid && form.setField('NUMERO_DOCUMENTO', e.target.value)
              }}
              error={form.errors.NUMERO_DOCUMENTO}
            />
          </div>

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
        <EstadoTramiteInfoModal
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
