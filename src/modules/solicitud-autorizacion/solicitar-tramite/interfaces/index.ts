import {
    SolicitudAutorizacionInput,
    InformacionSolicitudInput,
    SolicitudSensorInput
  } from '@generated/graphql'

  export type DatosGenerales = Omit<
  SolicitudAutorizacionInput, 'ID'
>

  export type InformacionSolicitud =Omit<
  InformacionSolicitudInput, 'ID'
  >

  export interface Sensores
  extends Omit<
  SolicitudSensorInput, 'ID'
  > {
  ind: string
}

export interface SolicitudAutorizacionState {
  datosGenerales: DatosGenerales
  informacionSolicitud: InformacionSolicitud
   sensores: Sensores[]
  // informacionCultivos: InformacionCultivoItem[]
  // profesional: Profesional

  // experiencia: Experiencia[]
  // tierrasCultivo: TierraCultivo[]
  // acondicionamiento: Acondicionamiento
  // analisisCalidad: AnalisisCalidad
}
