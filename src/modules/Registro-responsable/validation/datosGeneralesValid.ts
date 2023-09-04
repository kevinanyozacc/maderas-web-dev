import { FormError } from '@hooks/useForm'
import { ErrorMessages } from '@validation/messages'
import isEmpty from 'validator/lib/isEmpty'
import { DatosGenerales } from '../solicitar-tramite/interfaces'

const datosGeneralesValid = (
    values: DatosGenerales,
  currentRadioValue: string
) => {
  const errors: FormError<typeof values> = {}

  // const isRUC = values.TIPO_DOCUMENTO === 'RUC'
  // const isDNI = values.TIPO_DOCUMENTO === 'DNI'
  // const isCE = values.TIPO_DOCUMENTO === 'CE'

  if (isEmpty(values.RUC)) {
    errors.RUC = ErrorMessages.empty
  }

  if (values.RUC.length !== 11) {
    errors.RUC = ErrorMessages.badRUC
  }

  if (isEmpty(values.RAZON_SOCIAL)) {
    errors.RAZON_SOCIAL = ErrorMessages.empty
  }
  if (isEmpty(values.REPRESENTANTE_LEGAL)) {
    errors.REPRESENTANTE_LEGAL = ErrorMessages.empty
  }
  if (isEmpty(values.DEPARTAMENTO)) {
    errors.DEPARTAMENTO = ErrorMessages.empty
  }
  if (isEmpty(values.DISTRITO)) {
    errors.DISTRITO = ErrorMessages.empty
  }
  if (isEmpty(values.PROVINCIA)) {
    errors.PROVINCIA = ErrorMessages.empty
  }

  if (isEmpty(values.TELEFONO)) {
    errors.TELEFONO = ErrorMessages.empty
  }
  if (isEmpty(values.DNI)) {
    errors.DNI = ErrorMessages.empty
  }

  if (values.DNI.length !== 8) {
    errors.DNI = ErrorMessages.badDNI
  }

  if (isEmpty(values.DOMICILIO)) {
    errors.DOMICILIO = ErrorMessages.empty
  }

  if (isEmpty(values.CORREO)) {
    errors.CORREO = ErrorMessages.empty
  }

  if (values.TELEFONO.length !== 11) {
    errors.TELEFONO = ErrorMessages.badPhone
  }


  // if (!validRuc(values.NUMERO_DOCUMENTO)) {
  //   errors.NUMERO_DOCUMENTO = 'Tiene que ser un RUC valido'
  // }

  // if (isRUC20 && currentRadioValue === 'persona-natural') {
  //   errors.NUMERO_DOCUMENTO = 'El numero de ruc debe iniciar con 10'
  // }
  // if (!isRUC20 && currentRadioValue === 'persona-juridica') {
  //   errors.NUMERO_DOCUMENTO = 'El numero de ruc debe iniciar con 20'
  // }

    return errors
}

export default datosGeneralesValid
