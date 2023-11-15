import {
  RegistroFormatoInput,
  RegistroReporteInput,
} from '@generated/graphql'

export type DatosGenerales = Omit<
  RegistroReporteInput, 'ID'
>

export interface RegistroFormato
  extends Omit<
    RegistroFormatoInput, 'ID'
  > {
  ind: string
}

export interface RegistroReporteState {
  datosGenerales: DatosGenerales,
  registroFormato: RegistroFormato[]
}
