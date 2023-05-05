import { FormError } from '@hooks/useForm'
import { InformacionSolicitud } from '../solicitar-tramite/interfaces'
import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'

const InformacionSolicitudValid = (values: InformacionSolicitud) => {
    const errors: FormError<typeof values> = {}

    if (isEmpty(values.DNI)) {
        errors.DNI = ErrorMessages.empty
      }

      if (values.DNI.length !== 8) {
        errors.DNI = ErrorMessages.badDNI
      }

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

  return errors
}

export default InformacionSolicitudValid
