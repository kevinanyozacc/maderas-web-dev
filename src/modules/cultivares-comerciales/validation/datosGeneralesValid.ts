import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'
import { ErrorMessages } from '@validation/messages'
import { FormError } from '@hooks/useForm'
import { DatosGenerales } from '../solicitar-tramite/interfaces/cultivaresComerciales'
import { validRuc } from '@utils/validRuc'

export const datosGeneralesCultComValid = (
  values: DatosGenerales,
  currentRadioValue: string
) => {
  const errors: FormError<typeof values> = {}

  const isRUC = values.TIPO_DOCUMENTO === 'RUC'
  const isDNI = values.TIPO_DOCUMENTO === 'DNI'
  const isCE = values.TIPO_DOCUMENTO === 'CE'

  const isRUC20 = isRUC && values.NUMERO_DOCUMENTO.slice(0, 2) === '20'

  if (isEmpty(values.TIPO_DOCUMENTO)) {
    errors.TIPO_DOCUMENTO = ErrorMessages.empty
  }

  if (isEmpty(values.NUMERO_DOCUMENTO)) {
    errors.NUMERO_DOCUMENTO = ErrorMessages.empty
  }
  if (!validRuc(values.NUMERO_DOCUMENTO)) {
    errors.NUMERO_DOCUMENTO = 'Tiene que ser un RUC valido'
  }

  if (isRUC20 && currentRadioValue === 'persona-natural') {
    errors.NUMERO_DOCUMENTO = 'El numero de ruc debe iniciar con 10'
  }
  if (!isRUC20 && currentRadioValue === 'persona-juridica') {
    errors.NUMERO_DOCUMENTO = 'El numero de ruc debe iniciar con 20'
  }
  if (
    currentRadioValue === 'persona-juridica' &&
    isEmpty(values.RAZON_SOCIAL!)
  ) {
    errors.RAZON_SOCIAL = ErrorMessages.empty
  }
  if (
    currentRadioValue === 'persona-juridica' &&
    isEmpty(values.PARTIDA_REGISTRAL!)
  ) {
    errors.PARTIDA_REGISTRAL = ErrorMessages.empty
  }

  if (
    currentRadioValue === 'persona-natural' &&
    isEmpty(values.NOMBRES_SOLICITANTE!)
  ) {
    errors.NOMBRES_SOLICITANTE = ErrorMessages.empty
  }

  if (
    currentRadioValue === 'persona-natural' &&
    isEmpty(values.APELLIDOS_SOLICITANTE!)
  ) {
    errors.APELLIDOS_SOLICITANTE = ErrorMessages.empty
  }

  if (isEmpty(values.EMAIL_SOLICITANTE)) {
    errors.EMAIL_SOLICITANTE = ErrorMessages.empty
  }

  if (!isEmail(values.EMAIL_SOLICITANTE)) {
    errors.EMAIL_SOLICITANTE = ErrorMessages.badEmail
  }

  if (isEmpty(values.TELEFONO_SOLICITANTE)) {
    errors.TELEFONO_SOLICITANTE = ErrorMessages.empty
  }

  if (values.TELEFONO_SOLICITANTE.length !== 11) {
    errors.TELEFONO_SOLICITANTE = ErrorMessages.badPhone
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
  if (
    currentRadioValue === 'persona-juridica' &&
    isEmpty(values.DNI_REPRESENTANTE!)
  ) {
    errors.DNI_REPRESENTANTE = ErrorMessages.empty
  }
  if (
    currentRadioValue === 'persona-juridica' &&
    isEmpty(values.NOMBRE_REPRESENTANTE!)
  ) {
    errors.NOMBRE_REPRESENTANTE = ErrorMessages.empty
  }

  if (
    currentRadioValue === 'persona-juridica' &&
    isEmpty(values.APELLIDO_REPRESENTANTE!)
  ) {
    errors.APELLIDO_REPRESENTANTE = ErrorMessages.empty
  }

  if (
    currentRadioValue === 'persona-juridica' &&
    isEmpty(values.EMAIL_REPRESENTANTE!)
  ) {
    errors.EMAIL_REPRESENTANTE = ErrorMessages.empty
  }

  if (
    currentRadioValue === 'persona-juridica' &&
    !isEmail(values.EMAIL_REPRESENTANTE!)
  ) {
    errors.EMAIL_REPRESENTANTE = ErrorMessages.badEmail
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
