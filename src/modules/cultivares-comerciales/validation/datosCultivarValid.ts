import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'
import { FormError } from '@hooks/useForm'
import { DatosCultivar } from '../solicitar-tramite/interfaces/cultivaresComerciales'

export const datosCultivarValid = (values: DatosCultivar) => {
  const errors: FormError<typeof values> = {}

  if (!values.ESPECIE_ID) errors.ESPECIE_ID = ErrorMessages.empty

  if (isEmpty(values.NOMBRE_CULTIVAR))
    errors.NOMBRE_CULTIVAR = ErrorMessages.empty
  if (isEmpty(values.PAIS)) errors.PAIS = ErrorMessages.empty

  if (
    values.PAIS.trim().toLowerCase() !== 'peru' &&
    values.PAIS.trim().toLowerCase() !== 'perú' &&
    isEmpty(values.FECHA_INTERNAMIENTO)
  )
    errors.FECHA_INTERNAMIENTO = ErrorMessages.empty

  if (
    !isEmpty(values.FECHA_INTERNAMIENTO) &&
    (values.FECHA_INTERNAMIENTO as string).length !== 10
  ) {
    errors.FECHA_INTERNAMIENTO = ErrorMessages.badDate
  }

  if (isEmpty(values.TIPO_CULTIVAR)) errors.TIPO_CULTIVAR = ErrorMessages.empty
  if (isEmpty(values.GENEOLOGIA)) errors.GENEOLOGIA = ErrorMessages.empty

  if (isEmpty(values.NOMBRE_OBTENTOR))
    errors.NOMBRE_OBTENTOR = ErrorMessages.empty

  if (isEmpty(values.FINALIDAD_USO!)) errors.FINALIDAD_USO = ErrorMessages.empty

  if (isEmpty(values.rangoAdapMax || ''))
    errors.rangoAdapMax = ErrorMessages.empty

  if (isEmpty(values.rangoAdapMin || ''))
    errors.rangoAdapMin = ErrorMessages.empty

  return errors
}
