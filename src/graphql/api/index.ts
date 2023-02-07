import ENV from '@enviroment'

interface Props {
  tipo: string
  numero: string
  expediente: string
}

async function useGetProductorByExpediente ({ tipo, numero, expediente }: Props) {
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
              TIPO_SOLICITUD
              ESTADO
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
    return { ok: true, data }
  } catch (e) {
    return { error: 'ERROR' }
  }
}

export { useGetProductorByExpediente }
