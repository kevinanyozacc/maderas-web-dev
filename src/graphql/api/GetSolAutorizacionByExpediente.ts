import ENV from '@enviroment'

async function useGetSolAutorizacionByExp (expediente: string) {
  try {
    const results = await fetch(ENV.URL + '/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        query: `query GetSolicitudByExp($expediente: String!) {
          getSolicitudByExp(expediente: $expediente) {
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

export { useGetSolAutorizacionByExp }
