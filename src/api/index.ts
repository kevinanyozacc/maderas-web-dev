import { print } from 'graphql/language/printer'

import enviroment from '@enviroment'
import {
  GetTramiteByRegistroIdDocument,
  GetTramiteByRegistroIdQuery,
  GetTramiteByRegistroIdQueryVariables,
  GetTramiteCultiComercByRegIdDocument,
  GetTramiteCultiComercByRegIdQuery,
  GetTramiteCultiComercByRegIdQueryVariables,
  GetTramiteDeclaracionSemillaByRegIdDocument,
  GetTramiteDeclaracionSemillaByRegIdQuery,
  GetTramiteDeclaracionSemillaByRegIdQueryVariables
} from '@generated/graphql'

const request = async <T, V extends object>({
  body
}: {
  body: { query: string; variables: V }
}): Promise<{ data: T }> => {
  return fetch(enviroment.INTER_URL + '/graphql', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json())
}

export const getTramiteByRegistroId = async (
  props: GetTramiteByRegistroIdQueryVariables
) => {
  const res = await request<
    GetTramiteByRegistroIdQuery,
    GetTramiteByRegistroIdQueryVariables
  >({
    body: {
      query: print(GetTramiteByRegistroIdDocument),
      variables: { expedienteId: props.expedienteId }
    }
  })

  return res.data.getTramiteByRegistroId
}

export const getTramiteDeclaracionSemillaByRegId = async (
  props: GetTramiteDeclaracionSemillaByRegIdQueryVariables
) => {
  const res = await request<
    GetTramiteDeclaracionSemillaByRegIdQuery,
    GetTramiteDeclaracionSemillaByRegIdQueryVariables
  >({
    body: {
      query: print(GetTramiteDeclaracionSemillaByRegIdDocument),
      variables: { expedienteId: props.expedienteId }
    }
  })

  return res.data.getTramiteByRegistroId
}

export const getTramiteCultiComercByRegId = async (
  props: GetTramiteCultiComercByRegIdQueryVariables
) => {
  const res = await request<
    GetTramiteCultiComercByRegIdQuery,
    GetTramiteCultiComercByRegIdQueryVariables
  >({
    body: {
      query: print(GetTramiteCultiComercByRegIdDocument),
      variables: { expedienteId: props.expedienteId }
    }
  })

  return res.data.getTramiteByRegistroId
}
