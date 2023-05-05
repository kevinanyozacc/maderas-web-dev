import ENV from '@enviroment'

async function useGetDatosReniec (dni: string) {
  try {
    const results = await fetch(ENV.URL + '/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        query: `query GetPersonaNatural($dni: String!) {
          getPersonaNatural(dni: $dni) {
            nombreRazonSocial
          }
        }`,
        variables: {
          dni: dni
        }
      })
    })
    const data = await results.json()
    return data?.data.getPersonaNatural // ?.data.GetPersonaNatural
  } catch (e) {
    return { error: 'ERROR' }
  }
}

export { useGetDatosReniec }
