import ENV from '@enviroment'

async function useGetSolicitudTramiteByNimf (codigonimf: string) {
  try {
    const results = await fetch(ENV.URL + '/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        query: `query GetTramiteSolcitudByCodigoNimf($codigonimf: String!) {
          getTramiteSolcitudByCodigoNimf(codigonimf: $codigonimf) {
            INSPECCION {
              ID
              FECHA_REGISTRO
              NUME_REGI_ACTA
              NUME_REGI_TRATAMIENTO
              ESTADO_CERTIFICADO
              OBSERVACION
              SOLICITUD_ID
              NUMERO_EMPRESA
              NUMERO_TRATAMIENTO
              CODIGO_NIMF
            }
            SOLICITUD {
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
              ROLPREASIGNADO
              SEDE_OPERADOR
              NOMBRE_DEPARTAMENTO
              NOMBRE_PROVINCIA
              NOMBRE_DISTRITO
            }
            INFSOLICITUD {
              ID
              DNI
              APENOMB
              DOMICILIO
              DISTRITO
              DEPARTAMENTO
              PROVINCIA
              TIPOAUTORIZACION
              NUME_REGI_FUNCIONAMIENTO
              NUME_REGI_MEMORIA
              SENSORES
              NUME_REGI_SENSOR
              NUME_REGI_TRAMITE
              NUME_REGI_PLANO
              NUME_REGI_TERMICO
              FECHA_REGISTRO
              SOLICITUD_ID
              CAMARAS
              RESPONSABLE_ID
              NOMBRE_DEPARTAMENTO
              NOMBRE_PROVINCIA
              NOMBRE_DISTRITO
            }
            SENSORES {
              ID
              NUMERO
              DESCRIPCION
              SOLICITUD_ID
              NUME_REGI_SENSOR
              NOMBRE_DEPARTAMENTO
              NOMBRE_PROVINCIA
              NOMBRE_DISTRITO
            }
            TRATAMIENTO {
              ID
              SECCION
              IC_HORA
              IC_TEMP
              IT_HORA
              IT_TEMP
              FT_HORA
              FT_TEMP
              INSPECCION_ID
            }
            REPORTE {
              ID
              FECHA_REGISTRO
              CODIGO_NIMF
              ID_SOLICITUD
              EXPEDIENTE
              ESTADO
              OBSERVACION
              TIPO_REPORTE
            }
          }
        }`,
        variables: {
          codigonimf
        }
      })
    })
    const data = await results.json()
    return data
  } catch (e) {
    return { error: 'ERROR' }
  }
}

export { useGetSolicitudTramiteByNimf }
