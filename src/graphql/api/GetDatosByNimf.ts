import ENV from '@enviroment'

async function useGetSolicitudByNimf (nroNimf: string) {
  try {
    const results = await fetch(ENV.URL + '/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        query: `query GetSolicitudByNimf($nroNimf: String!) {
            getSolicitudByNimf(nroNimf: $nroNimf) {
              ID
              RUC
              DNI
              REPRESENTANTE_LEGAL
              RAZON_SOCIAL
              DOMICILIO
              DISTRITO
              DEPARTAMENTO
              PROVINCIA
              CORREO
              TELEFONO
              ESTADO
              EXPEDIENTE
              OBSERVACION
              FECHA_REVISION
              FECHA_REGISTRO
              ROLASIGNADO
              ROLPREASIGNADO
              SEDE_OPERADOR
            }
          }`,
        variables: {
            nroNimf
        }
      })
    })
    const data = await results.json()
    return data
  } catch (e) {
    return { error: 'ERROR' }
  }
}

export { useGetSolicitudByNimf }
