import {
  CultivarComercialCreateInput,
  InformacionEnsayoCreateInput,
  LocalidadEnsayoCreateInput,
  MantSemillaCreateInput,
  SolicitanteInput
} from '@generated/graphql'

export type DatosGenerales = Omit<
  SolicitanteInput,
  'EXPEDIENTE_ID' | 'SOLITANTE_ID'
>

export interface DatosCultivar extends Omit<
  CultivarComercialCreateInput, 'EXPEDIENTE_ID' | 'RANGO_ADAPTACION'> {
    rangoAdapMin?: string,
    rangoAdapMax?: string,
    nameEspecie?: string
  }

export interface LocalidadEnsayosInput extends Omit<
  LocalidadEnsayoCreateInput, 'EXPEDIENTE_ID'> {
    id: string
  }

export interface InfoEnsayos extends Omit<
  InformacionEnsayoCreateInput, 'EXPEDIENTE_ID'> {}

export type RangosAdaptacionInput = {
  MIN: string
  MAX: string
  id: string
}

export interface MantenimientoSemilla extends Omit<
  MantSemillaCreateInput, 'EXPEDIENTE_ID'> {}

export interface CultivaresComercialesState {
  datosGenerales: DatosGenerales
  datosCultivar: DatosCultivar
  infoEnsayos: InfoEnsayos
  localidadEnsayos: LocalidadEnsayosInput[]
  mantenimientoSemilla: MantenimientoSemilla
  desarrolloCultivar: string[]
  rangosAdaptacion: RangosAdaptacionInput[]
  finalidadUso: string[]
}
