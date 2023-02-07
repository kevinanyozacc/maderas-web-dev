import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'
import { FormError } from '@hooks/useForm'
import { InfoEnsayos } from '../solicitar-tramite/interfaces/cultivaresComerciales'

export const informacionEnsayosValid = (values: InfoEnsayos) => {
  const errors: FormError<typeof values> = {}

  if (isEmpty(values.INSTALACION)) errors.INSTALACION = ErrorMessages.empty
  if (isEmpty(values.CAMPANAS_ENSAYOS)) errors.CAMPANAS_ENSAYOS = ErrorMessages.empty
  if (isEmpty(values.CARACTERES_PRUEBA)) errors.CARACTERES_PRUEBA = ErrorMessages.empty
  if (isEmpty(values.PLANTAS_TIPO)) errors.PLANTAS_TIPO = ErrorMessages.empty
  if (isEmpty(values.PRIMERA_CAMPANA)) errors.PRIMERA_CAMPANA = ErrorMessages.empty
  if (isEmpty(values.SEGUNDA_CAMPANA)) errors.SEGUNDA_CAMPANA = ErrorMessages.empty
  if (isEmpty(values.COMPORTAMIENTO_BIOTICO)) errors.COMPORTAMIENTO_BIOTICO = ErrorMessages.empty
  if (isEmpty(values.COMPORTAMIENTO_ABIOTICO)) errors.COMPORTAMIENTO_ABIOTICO = ErrorMessages.empty
  // if (isEmpty(values.NUME_REGI_ARC!)) errors.NUME_REGI_ARC = ErrorMessages.empty

  return errors
}
