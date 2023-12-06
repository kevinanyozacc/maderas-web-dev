import { FormError } from '@hooks/useForm'
import { ErrorMessages } from '@validation/messages'
import isEmpty from 'validator/lib/isEmpty'
import { DatosGenerales } from '../solicitar-tramite/interfaces'

const datosGeneralesValid = (
  values: DatosGenerales
) => {
  const errors: FormError<typeof values> = {}

   const isSBA = values.TIPO_SOLICITUD === 'SBA'
   const isSBR = values.TIPO_SOLICITUD === 'SBR'
   const isSRT = values.TIPO_SOLICITUD === 'SRT'

  if (isEmpty(values.CODIGO_NIMF)) {
    errors.CODIGO_NIMF = ErrorMessages.empty
  }

  if (isSBA && isEmpty(values.FECHA_BAJA)) {
    errors.FECHA_BAJA = ErrorMessages.empty
  }

  if (isSBR && isEmpty(values.FECHA_BAJA)) {
    errors.FECHA_BAJA = ErrorMessages.empty
  }

  if (isSRT && isEmpty(values.DNI_RESPONSABLE)) {
    errors.DNI_RESPONSABLE = ErrorMessages.empty
  }

  return errors
}

export default datosGeneralesValid
