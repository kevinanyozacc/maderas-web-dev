import {
  RegistroFormatoInput,
  RegistroReporteInput
} from '@generated/graphql'

export type DatosGenerales = RegistroReporteInput

// Omit<
//   RegistroReporteInput, 'FECHA_REGISTRO'
// >

export interface RegistroFormato
  extends Omit<
    RegistroFormatoInput, 'ID'
  > {
  ind?: string
}

export interface RegistroReporteState {
  datosGenerales: DatosGenerales,
  registroFormato: RegistroFormato[]
}
