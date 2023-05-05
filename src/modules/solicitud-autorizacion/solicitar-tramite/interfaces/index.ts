import {
    SolicitudAutorizacionInput,
    InformacionSolicitudInput
  } from '@generated/graphql'

  export type DatosGenerales = Omit<
  SolicitudAutorizacionInput, 'ID'
>

  export type InformacionSolicitud =Omit<
  InformacionSolicitudInput, 'ID'
  >

//   export interface Conocimiento
//   extends Omit<
//     ConocimientoInput, 'ID'
//   > {
//   ind: string
// }

export interface SolicitudAutorizacionState {
  datosGenerales: DatosGenerales
  informacionSolicitud: InformacionSolicitud
  // conocimiento: Conocimiento[]
  // informacionCultivos: InformacionCultivoItem[]
  // profesional: Profesional

  // experiencia: Experiencia[]
  // tierrasCultivo: TierraCultivo[]
  // acondicionamiento: Acondicionamiento
  // analisisCalidad: AnalisisCalidad
}
