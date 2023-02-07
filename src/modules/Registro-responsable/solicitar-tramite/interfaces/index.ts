import {
    Estados,
    ResponsableInput,
    InformacionResponsableInput
  } from '@generated/graphql'
  

  export type DatosGenerales = Omit<
  ResponsableInput, 'ID'
>

  export type InformacionResponsable =Omit<
  InformacionResponsableInput, 'ID'
  >


export interface RegistroResponsableState {
  datosGenerales: DatosGenerales
  informacionResponsable: InformacionResponsable
  // informacionCultivos: InformacionCultivoItem[]
  // profesional: Profesional
  // especializacion: Especialidad[]
  // experiencia: Experiencia[]
  // tierrasCultivo: TierraCultivo[]
  // acondicionamiento: Acondicionamiento
  // analisisCalidad: AnalisisCalidad
}