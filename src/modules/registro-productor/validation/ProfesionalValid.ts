import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'

import { ErrorMessages } from '@validation/messages'
import { FormError } from '@hooks/useForm'
import { Profesional } from '../solicitar-tramite/interfaces/index'

export const profesionalValid = (values: Profesional) => {
  const errors: FormError<Profesional> = {}

  if (isEmpty(values.TIPO_DOCUMENTO)) {
    errors.TIPO_DOCUMENTO = ErrorMessages.empty
  }
  if (isEmpty(values.NUMERO_DOCUMENTO)) {
    errors.NUMERO_DOCUMENTO = ErrorMessages.empty
  }
  if (isEmpty(values.NOMBRES)) {
    errors.NOMBRES = ErrorMessages.empty
  }
  if (isEmpty(values.APELLIDOS)) {
    errors.APELLIDOS = ErrorMessages.empty
  }
  if (!isEmail(values.EMAIL)) {
    errors.EMAIL = ErrorMessages.badEmail
  }
  if (isEmpty(values.TELEFONO)) {
    errors.TELEFONO = ErrorMessages.empty
  }
  if (isEmpty(values.ESPECIFICAR_PROFESION!)) {
    errors.ESPECIFICAR_PROFESION = ErrorMessages.empty
  }
  if (values.TIPO_PROFESIONAL === 'INGENIERO' && isEmpty(values.NUMERO_CIP!)) {
    errors.NUMERO_CIP = ErrorMessages.empty
  }
  if (isEmpty(values.DEPARTAMENTO)) {
    errors.DEPARTAMENTO = ErrorMessages.empty
  }
  if (isEmpty(values.PROVINCIA)) {
    errors.PROVINCIA = ErrorMessages.empty
  }
  if (isEmpty(values.DISTRITO)) {
    errors.DISTRITO = ErrorMessages.empty
  }
  if (isEmpty(values.DOMICILIO_LEGAL)) {
    errors.DOMICILIO_LEGAL = ErrorMessages.empty
  }

  return errors
}
