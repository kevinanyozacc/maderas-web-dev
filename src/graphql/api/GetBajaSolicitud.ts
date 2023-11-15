import ENV from '@enviroment'

async function useGetBajaSolicitudByExp (expediente: string) {
  try {
    const results = await fetch(ENV.URL + '/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        query: `query GetBajaSolicitudByExp($expediente: String!) {
            getBajaSolicitudByExp(expediente: $expediente) {
              ID
              CODIGO_NIMF
              CODIGO_SA
              TIPO_SOLICITUD
              DNI_RESPONSABLE
              ID_RESPONSABLE
              ESTADO_BAJA
              FECHA_REGISTRO
              FECHA_BAJA
              OBSERVACION
              EXPEDIENTE
            }
          }`,
        variables: {
          expediente: expediente
        }
      })
    })
    const data = await results.json()
    return data
  } catch (e) {
    return { error: 'ERROR' }
  }
}

export { useGetBajaSolicitudByExp }
