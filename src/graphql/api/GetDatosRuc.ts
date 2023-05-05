import ENV from '@enviroment'

async function useGetDatosRuc (ruc: string) {
  try {
    const results = await fetch(ENV.URL + '/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        query: `query GetDatosJuridica($ruc: String!) {
          getDatosJuridica(ruc: $ruc) {
            nombreRazonSocial
          }
        }`,
        variables: {
          ruc: ruc
        }
      })
    })
    const data = await results.json()
    return data?.data.getDatosJuridica
  } catch (e) {
    return { error: 'ERROR' }
  }
}

export { useGetDatosRuc }
