import ENV from '@enviroment'

async function useGetRegistroReporteByExp (expediente: string) {
  try {
    const results = await fetch(ENV.URL + '/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        query: `query GetRegistroReporteByExp($expediente: String!) {
          getRegistroReporteByExp(expediente: $expediente) {
            ID
            FECHA_REGISTRO
            CODIGO_NIMF
            ID_SOLICITUD
            EXPEDIENTE
            ESTADO
            OBSERVACION
            TIPO_REPORTE
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

export { useGetRegistroReporteByExp }
