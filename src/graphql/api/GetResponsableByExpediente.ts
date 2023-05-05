import ENV from '@enviroment'

async function useGetResponsableByExp (expediente: string) {
  try {
    const results = await fetch(ENV.URL + '/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        query: `query GetResponsableByExp($expediente: String!) {
          getResponsableByExp(expediente: $expediente) {
             RUC
            RAZON_SOCIAL
            ESTADO
            OBSERVACION
            FECHA_REVISION
            FECHA_REGISTRO
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

export { useGetResponsableByExp }
