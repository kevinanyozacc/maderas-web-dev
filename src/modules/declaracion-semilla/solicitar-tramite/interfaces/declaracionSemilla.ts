import {
  AlmacenCreateInput,
  Estados,
  InformacionCultivoInput,
  SolicitanteInput,
  SucursalCreateInput
} from '@generated/graphql'

export type DatosGenerales = Omit<
  SolicitanteInput,
  'SOLITANTE_ID'
>

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

export interface SucursalesInput
  extends SucursalCreateInput {
  id: string
  nameDep: string
  nameDis: string
  nameProv: string
}

export interface AlmacenInput
  extends AlmacenCreateInput {
  id: string
  nameDep: string
  nameDis: string
  nameProv: string
}

export interface DeclaracionSemillaState {
  datosGenerales: DatosGenerales
  informacionCultivos: InformacionCultivoItem[]
  sucursales: SucursalesInput[]
  almacen: AlmacenInput[]
}
