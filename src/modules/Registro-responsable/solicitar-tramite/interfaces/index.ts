import {
    ResponsableInput,
    InformacionResponsableInput,
    ConocimientoInput
  } from '@generated/graphql'

  export type DatosGenerales = Omit<
  ResponsableInput, 'ID'
>

  export type InformacionResponsable =Omit<
  InformacionResponsableInput, 'ID'
  >

  export interface Conocimiento
  extends Omit<
    ConocimientoInput, 'ID'
  > {
  ind: string
}

export interface RegistroResponsableState {
  datosGenerales: DatosGenerales
  informacionResponsable: InformacionResponsable
  conocimiento: Conocimiento[]
  // informacionCultivos: InformacionCultivoItem[]
  // profesional: Profesional

  // experiencia: Experiencia[]
  // tierrasCultivo: TierraCultivo[]
  // acondicionamiento: Acondicionamiento
  // analisisCalidad: AnalisisCalidad
}
