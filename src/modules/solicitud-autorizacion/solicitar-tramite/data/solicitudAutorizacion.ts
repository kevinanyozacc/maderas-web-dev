
import { SolicitudAutorizacionState } from '../interfaces/index'

export const registroSolicitud: SolicitudAutorizacionState = {
  datosGenerales: {
    RUC: '',
    DNI: '',
    RAZON_SOCIAL: '',
    TELEFONO: '',
    DEPARTAMENTO: '',
    PROVINCIA: '',
    DISTRITO: '',
    DOMICILIO: '',
    REPRESENTANTE_LEGAL: '',
    CORREO: '',
    OBSERVACION: '',
    ESTADO: ''

  },
  informacionSolicitud: {

      DNI: '',
      APENOMB: '',
      DOMICILIO: '',
      DEPARTAMENTO: '',
      PROVINCIA: '',
      DISTRITO: '',
      TIPOAUTORIZACION: '',
      NUME_REGI_FUNCIONAMIENTO: '',
      NUME_REGI_MEMORIA: '',
      SENSORES: '',
      NUME_REGI_SENSOR: '',
      NUME_REGI_TRAMITE: '',
      NUME_REGI_PLANO: '',
      NUME_REGI_TERMICO: '',
      RESPONSABLE_ID: 0
  },
  sensores: []

}
