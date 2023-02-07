import ENV from '@enviroment'

async function useGetExpedienteByIdEstado (tipo: string, numero: string, expediente: string) {
  try {
    const results = await fetch(ENV.URL + '/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        query: `query GetExpedienteByBPM(
          $tipoDocumento: String!
          $nroExpediente: String!
          $nroDocumento: String!
        ) {
          getExpedienteByBPM(
            tipoDocumento: $tipoDocumento
            nroExpediente: $nroExpediente
            nroDocumento: $nroDocumento
          ) {
              EXPEDIENTE_ID
              NUMERO_EXPEDIENTE
              ESTADO
              SEDE_ID
              FECHA_REGISTRO
              TIPO_SOLICITUD
              SEDE {
                SEDE_ID
                DEPARTAMENTO_ID
                PROVINCIA_ID
                DISTRITO_ID
                DIRECCION
                NOMBRE_SEDE
                JEFE_AREA_ID
                FECHA_REGISTRO
              }
            }
          }`,
        variables: {
          tipoDocumento: tipo,
          nroDocumento: numero,
          nroExpediente: expediente
        }
      })
    })
    const data = await results.json()
    return data
  } catch (e) {
    return { error: 'ERROR' }
  }
}

export { useGetExpedienteByIdEstado }
