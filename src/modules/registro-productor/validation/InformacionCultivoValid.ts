import { ErrorMessages } from '@validation/messages'
import { FormError } from '@hooks/useForm'
import { InformacionCultivoItem } from '../solicitar-tramite/interfaces/index'
import { Estados } from '@generated/graphql'

export const InformacionCultivoValid = (values: InformacionCultivoItem) => {
  const errors: Partial<FormError<typeof values>> = {}
  if (!values.ESPECIE_ID) errors.ESPECIE_ID = ErrorMessages.empty
  if (!values.CULTIVO_ID && values.REGLAMENTARIO === Estados.Activo) {
    errors.CULTIVO_ID = ErrorMessages.empty
  }
  if (!values.CULTIVO_REGLAMENTARIO && values.REGLAMENTARIO === Estados.Inactivo) {
    errors.CULTIVO_REGLAMENTARIO = ErrorMessages.empty
  }
  return errors
}
