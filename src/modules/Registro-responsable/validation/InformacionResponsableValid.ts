import { FormError } from '@hooks/useForm'
import { InformacionResponsable } from '../solicitar-tramite/interfaces'
import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'

const InformacionResponsableValid = (values: InformacionResponsable) => {
    const errors: FormError<typeof values> = {}

    if (isEmpty(values.DNI)) {
        errors.DNI = ErrorMessages.empty
      }

      if (values.DNI.length !== 8) {
        errors.DNI = ErrorMessages.badDNI
      }

      // if (isEmpty(values.APENOMB)) {
      //   errors.APENOMB = ErrorMessages.empty
      // }

      if (isEmpty(values.DOMICILIO)) {
        errors.DOMICILIO = ErrorMessages.empty
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
      if (isEmpty(values.TITULOPROFESIONAL)) {
        errors.TITULOPROFESIONAL = ErrorMessages.empty
      }
      if (isEmpty(values.COLEGIATURA)) {
        errors.COLEGIATURA = ErrorMessages.empty
      }
      // if (isEmpty(values.CURRICULUM)) {
      //   errors.CURRICULUM = ErrorMessages.empty
      // }
      if (isEmpty(values.CORREO)) {
        errors.CORREO = ErrorMessages.empty
      }
      if (isEmpty(values.TELEFONO)) {
        errors.TELEFONO = ErrorMessages.empty
      }

  return errors
}

export default InformacionResponsableValid
