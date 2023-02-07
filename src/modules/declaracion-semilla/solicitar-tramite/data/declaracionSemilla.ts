import { DeclaracionSemillaState } from '../interfaces/declaracionSemilla'

export const declaracionSemilla: DeclaracionSemillaState = {
  datosGenerales: {
    EXPEDIENTE_ID: 0,
    TIPO_DOCUMENTO: 'RUC',
    NUMERO_DOCUMENTO: '',
    RAZON_SOCIAL: '',
    PARTIDA_REGISTRAL: '',
    NOMBRES_SOLICITANTE: '',
    APELLIDOS_SOLICITANTE: '',
    EMAIL_SOLICITANTE: '',
    TELEFONO_SOLICITANTE: '',
    DEPARTAMENTO: '',
    PROVINCIA: '',
    DISTRITO: '',
    DOMICILIO_LEGAL: '',
    NOMBRE_REPRESENTANTE: '',
    APELLIDO_REPRESENTANTE: '',
    EMAIL_REPRESENTANTE: '',
    DNI_REPRESENTANTE: ''
  },
  informacionCultivos: [],
  sucursales: [],
  almacen: []
}
