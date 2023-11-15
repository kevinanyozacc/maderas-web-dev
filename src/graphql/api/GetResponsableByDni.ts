import ENV from '@enviroment'

async function useGetResponsableByDni (dni: string) {
  try {
    const results = await fetch(ENV.URL + '/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        query: `query GetResponsableSolicitud($dni: String!) {
            getResponsableSolicitud(dni: $dni) {
              DNI
              ESTADO
              APENOMB
              ID
            }
          }`,
        variables: {
          dni: dni
        }
      })
    })
    //return data?.data.getPersonaNatural
    const data = await results.json()
    return data
  } catch (e) {
    return { error: 'ERROR' }
  }
}

export { useGetResponsableByDni }
