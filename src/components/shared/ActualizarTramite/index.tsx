import { useState } from 'react'
import { useRouter } from 'next/router'
import isEmpty from 'validator/lib/isEmpty'

import useForm, { FormError } from '@hooks/useForm'

import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import Select from '@components/shared/Select'
import ModalHeader from '@components/shared/ModalHeader'

import { ErrorMessages } from '@validation/messages'
import useToast from '@hooks/useToast'
import { useGetProductorByExpediente } from '@graphql/api'
import {
  EstadosExpedientes,
  TipoSolicitudExpedientes
} from '@generated/graphql'
import Spinner from '@components/shared/Spinner'

interface Props {
  isOpen: boolean
  onClose: () => void
  tipoTramite: TipoSolicitudExpedientes
}

interface ActualizarTramite {
  TIPO_DOCUMENTO: string
  NUMERO_DOCUMENTO: string
  NUMERO_EXPEDIENTE: string
}

const initialState: ActualizarTramite = {
  TIPO_DOCUMENTO: '',
  NUMERO_DOCUMENTO: '',
  NUMERO_EXPEDIENTE: ''
}

const ActualizarTramiteModal = ({ isOpen, onClose, tipoTramite }: Props) => {
  const toast = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { values, ...form } = useForm({
    initialValues: initialState,
    validate: (values) => {
      const errors: FormError<typeof values> = {}
      const isRUC = values.TIPO_DOCUMENTO === 'RUC'
      const isDNI = values.TIPO_DOCUMENTO === 'DNI'
      const isCE = values.TIPO_DOCUMENTO === 'CE'

      if (isEmpty(values.TIPO_DOCUMENTO)) {
        errors.TIPO_DOCUMENTO = ErrorMessages.empty
      }
      if (isEmpty(values.NUMERO_DOCUMENTO)) {
        errors.NUMERO_DOCUMENTO = ErrorMessages.empty
      }
      if (isEmpty(values.NUMERO_EXPEDIENTE)) {
        errors.NUMERO_EXPEDIENTE = ErrorMessages.empty
      }
      if (isRUC && values.NUMERO_DOCUMENTO.length !== 11) {
        errors.NUMERO_DOCUMENTO = ErrorMessages.badRUC
      }
      if (isDNI && values.NUMERO_DOCUMENTO.length !== 8) {
        errors.NUMERO_DOCUMENTO = ErrorMessages.badDNI
      }
      if (isCE && values.NUMERO_DOCUMENTO.length !== 9) {
        errors.NUMERO_DOCUMENTO = ErrorMessages.badCE
      }
      return errors
    }
  })

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const tipo = values.TIPO_DOCUMENTO
    const numero = values.NUMERO_DOCUMENTO
    const expediente = values.NUMERO_EXPEDIENTE

    const { data } = await useGetProductorByExpediente({
      tipo,
      numero,
      expediente
    })

    if (
      (data?.data === null && data?.errors) ||
      data?.data?.getExpedienteByBPM?.TIPO_SOLICITUD !== tipoTramite
    ) {
      toast({ type: 'error', title: 'No se encontró el tramite' })
      setIsLoading(false)
      return
    }

    if (
      data?.data?.getExpedienteByBPM?.ESTADO !== EstadosExpedientes.ObservadoJefearea &&
      data?.data?.getExpedienteByBPM?.ESTADO !==
        EstadosExpedientes.CierreJefearea
    ) {
      toast({
        type: 'info',
        title: 'Pendiente',
        desc: 'El tramite no se puede actualizar'
      })
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    clearForm()
    if (tipoTramite === TipoSolicitudExpedientes.RegistroProductor) {
      router.push({
        pathname: '/registro-productor/actualizar-tramite',
        query: { registroId: data?.data?.getExpedienteByBPM?.EXPEDIENTE_ID }
      })
    }
    if (tipoTramite === TipoSolicitudExpedientes.DeclaracionSemilla) {
      router.push({
        pathname: '/declaracion-semilla/actualizar-tramite',
        query: { registroId: data?.data?.getExpedienteByBPM?.EXPEDIENTE_ID }
      })
    }
    if (tipoTramite === TipoSolicitudExpedientes.RegistroCultivarComercial) {
      router.push({
        pathname: '/cultivares-comerciales/actualizar-tramite',
        query: { registroId: data?.data?.getExpedienteByBPM?.EXPEDIENTE_ID }
      })
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
          <ModalHeader closeBtn={clearForm} title="Actualizar Tramite" />

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
                e.target.validity.valid &&
                  form.setField('NUMERO_DOCUMENTO', e.target.value)
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
            <button
              type="submit"
              className="btn btn-outline-primary"
              disabled={isLoading}
            >
              Buscar
              {isLoading && <Spinner />}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ActualizarTramiteModal
