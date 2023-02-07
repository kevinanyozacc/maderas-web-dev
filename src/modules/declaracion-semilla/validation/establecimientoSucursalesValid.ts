import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'
import { FormError } from '@hooks/useForm'
import { SucursalesInput } from '../solicitar-tramite/interfaces/declaracionSemilla'

export const establecimientoSucursalesValid = (values: SucursalesInput) => {
  const errors: FormError<typeof values> = {}

  if (isEmpty(values.NOMBRE_SUCURSAL)) {
    errors.NOMBRE_SUCURSAL = ErrorMessages.empty
  }

  if (isEmpty(values.DIRECCION_SUCURSAL)) {
    errors.DIRECCION_SUCURSAL = ErrorMessages.empty
  }

  if (isEmpty(values.DEPARTAMENTO_ID)) {
    errors.DEPARTAMENTO_ID = ErrorMessages.empty
  }

  if (isEmpty(values.PROVINCIA_ID)) {
    errors.PROVINCIA_ID = ErrorMessages.empty
  }

  if (isEmpty(values.DISTRITO_ID)) {
    errors.DISTRITO_ID = ErrorMessages.empty
  }

  return errors
}
