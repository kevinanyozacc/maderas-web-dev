import {
    BajaSolicitudInput,
  } from '@generated/graphql'

  export type DatosGenerales = Omit<
  BajaSolicitudInput, 'ID'
>

export interface bajasolicitudState {
  datosGenerales: DatosGenerales
}
