import { FormError } from '@hooks/useForm'
import { InformacionSolicitud } from '../solicitar-tramite/interfaces'
import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'
import useToast from '@hooks/useToast'

const InformacionSolicitudValid = (values: InformacionSolicitud) => {
    const errors: FormError<typeof values> = {}

    const toast = useToast()

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

      if (isEmpty(values.NUME_REGI_FUNCIONAMIENTO)) {
        //return toast({ title: 'Subir Licencia Municipal', type: 'warning' })
      }


      // if (nameInput == 1) form.setField('NUME_REGI_FUNCIONAMIENTO', res.data.data.NUME_REGI_ARC)
      // if (nameInput == 2) form.setField('NUME_REGI_MEMORIA', res.data.data.NUME_REGI_ARC)
      // if (nameInput == 3) form.setField('NUME_REGI_SENSOR', res.data.data.NUME_REGI_ARC)
      // if (nameInput == 4) form.setField('NUME_REGI_TRAMITE', res.data.data.NUME_REGI_ARC)
      // if (nameInput == 5) form.setField('NUME_REGI_PLANO', res.data.data.NUME_REGI_ARC)
      // if (nameInput == 6) form.setField('NUME_REGI_TERMICO', res.data.data.NUME_REGI_ARC)

  return errors
}

export default InformacionSolicitudValid
