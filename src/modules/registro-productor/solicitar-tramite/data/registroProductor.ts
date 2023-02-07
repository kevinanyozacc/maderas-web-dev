import { Estados } from '@generated/graphql'
import { RegistroProductorState } from '../interfaces/index'

export const registroProductor: RegistroProductorState = {
  datosGenerales: {
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
  profesional: {
    TIPO_DOCUMENTO: '',
    NUMERO_DOCUMENTO: '',
    NOMBRES: '',
    APELLIDOS: '',
    EMAIL: '',
    TELEFONO: '',
    TIPO_PROFESIONAL: '',
    ESPECIFICAR_PROFESION: '',
    NUMERO_CIP: '',
    DEPARTAMENTO: '',
    PROVINCIA: '',
    DISTRITO: '',
    DOMICILIO_LEGAL: ''
  },
  especializacion: [],
  experiencia: [],
  tierrasCultivo: [],
  acondicionamiento: {
    RECEPCION: 'PROPIO',
    LIMPIEZA: 'PROPIO',
    ENVASADO: 'PROPIO',
    TRATAMIENTO: 'PROPIO',
    CLASIFICACION: 'PROPIO',
    ALMACENAMIENTO: 'PROPIO',
    OPERACIONES_ESPECIALES: 'PROPIO',
    RECEPCION_ARC: '',
    LIMPIEZA_ARC: '',
    ENVASADO_ARC: '',
    TRATAMIENTO_ARC: '',
    CLASIFICACION_ARC: '',
    ALMACENAMIENTO_ARC: '',
    OPERACIONES_ESPECIALES_ARC: ''
  },
  analisisCalidad: {
    LABORATORIO_ID: null,
    SEMILLA_ASEXUAL: Estados.Inactivo,
    SEMILLA_SEXUAL: Estados.Inactivo,
    laboratorio: ''
  }
}
