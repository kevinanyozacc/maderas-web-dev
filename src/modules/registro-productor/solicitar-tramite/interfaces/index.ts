import {
  SolicitanteInput,
  ExperienciaInput,
  ProfesionalInput,
  TierraCultivoInput,
  EspecializacionInput,
  AcondicionamientoInput,
  InformacionCultivoInput,
  AnalisisCalidadCreateinput,
  Estados
} from '@generated/graphql'

export interface InformacionCultivoItem
  extends Omit<
    InformacionCultivoInput,
    'EXPEDIENTE_ID' | 'INFORMACION_REGISTRO_ID'
  > {
  id: string
  REGLAMENTARIO?: Estados
  NOMBRE_ESPECIE?: string
  NOMBRE_CULTIVO?: string
}

export interface Especialidad
  extends Omit<
    EspecializacionInput,
    'PROFESIONAL_RESPONSABLE_ID' | 'ESPECIALIZACION_RELACIONADA_ID'
  > {
  id: string
}

export interface Experiencia
  extends Omit<
    ExperienciaInput,
    'EXPERIENCIA_RELACIONADA_ID' | 'PROFESIONAL_RESPONSABLE_ID'
  > {
  id: string
}

export interface TierraCultivo
  extends Omit<
    TierraCultivoInput,
    'EXPEDIENTE_ID' | 'TIERRA_CULTIVO_ID'
  > {
  id: string
}

export interface AnalisisCalidad extends Omit<
  AnalisisCalidadCreateinput, 'EXPEDIENTE_ID'> {
    laboratorio: string
  }

export type Acondicionamiento = Omit<
  AcondicionamientoInput,
  'EXPEDIENTE_ID' | 'ACONDICIONAMIENTO_ID'
>

export type DatosGenerales = Omit<
  SolicitanteInput,
  'EXPEDIENTE_ID' | 'SOLITANTE_ID'
>

export type Profesional = Omit<
  ProfesionalInput,
  'EXPEDIENTE_ID' | 'PROFESIONAL_RESPONSABLE_ID'
>

export interface RegistroProductorState {
  datosGenerales: DatosGenerales
  informacionCultivos: InformacionCultivoItem[]
  profesional: Profesional
  especializacion: Especialidad[]
  experiencia: Experiencia[]
  tierrasCultivo: TierraCultivo[]
  acondicionamiento: Acondicionamiento
  analisisCalidad: AnalisisCalidad
}
