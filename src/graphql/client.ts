// import type { SSRExchange } from 'next-urql'
import { dedupExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'
import ENV from '@enviroment'
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch'
const URL = `${ENV.URL}/graphql`

const client = (ssrExchange: any) => ({
  url: URL,
  // url: 'http://localhost:3004/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        TramiteSucursal: () => null,
        TramiteAlmacen: () => null,
        MantSemilla: () => null,
        LocalidadEnsayo: () => null,
        InformacionEnsayo: () => null,
        CultivarComercial: () => null,
        TramiteAnalisisCalidad: () => null,
        Laboratorio: () => null,
        ArchivoResponse: () => null,
        ArchivoFisico: () => null,
        Sucursal: () => null,
        Observacion: () => null,
        ESpeciePaginatedResponse: () => null,
        Tramite: () => null,
        Profesional: () => null,
        Experiencia: () => null,
        TierraCultivo: () => null,
        Acondicionamiento: () => null,
        Especializacion: () => null,
        InformacionCultivo: () => null,
        Solicitante: () => null,
        Distrito: () => null,
        Especies: () => null,
        Provincia: () => null,
        Cultivares: () => null,
        Departamento: () => null,
        FindPaginatedResponse: () => null,
        CultivaresPaginatedResponse: () => null,
        TramiteSolicitante: () => null,
        TramiteInfoCultivo: () => null,
        TramiteTierraCultivo: () => null,
        TramiteProfesional: () => null,
        TramiteExperiencia: () => null,
        Responsable: () => null,
        SolicitudAutorizacion: () => null
      }
    }),
    ssrExchange,
    multipartFetchExchange
  ]
})

export default client
