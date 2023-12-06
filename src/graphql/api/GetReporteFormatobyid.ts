import ENV from '@enviroment'

async function useGetReporteFormatoById (idreporte: number) {
    try {
        const results = await fetch(ENV.URL + '/graphql', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                query: `query GetReporteFormatoById($idreporte: Float!) {
            getReporteFormatoById(idreporte: $idreporte) {
              ID
              FECHA_TRATAMIENTO
              LOTE
              ESPECIE_MADERA_TRATADA
              PROCEDENCIA
              CANTIDAD_TRATADA
              NUME_REGI_ARC
              TIPO_EMBALAJE
              TOTAL_UNID_FAB
              NUMERO_GUIA
              EXPORTADOR
              USO
              ID_REPORTE
            }
          }
        `,
                variables: {
                    idreporte
                }
            })
        })
        const data = await results.json()
        return data
    } catch (e) {
        return { error: 'ERROR' }
    }
}

export { useGetReporteFormatoById }
