import { TipoNativo } from '@generated/graphql'
import { CultivaresComercialesState } from '@modules/cultivares-comerciales/solicitar-tramite/interfaces/cultivaresComerciales'

export const cultivaresComerciales: CultivaresComercialesState = {
  datosGenerales: {
    TIPO_DOCUMENTO: 'RUC',
    NUMERO_DOCUMENTO: '',
    RAZON_SOCIAL: '',
    PARTIDA_REGISTRAL: '',
    NOMBRES_SOLICITANTE: '',
    APELLIDOS_SOLICITANTE: '',
    EMAIL_SOLICITANTE: '',
    TELEFONO_SOLICITANTE: '',
    DEPARTAMENTO: '',
    PROVINCIA: '',
    DISTRITO: '',
    DOMICILIO_LEGAL: '',
    NOMBRE_REPRESENTANTE: '',
    APELLIDO_REPRESENTANTE: '',
    EMAIL_REPRESENTANTE: '',
    DNI_REPRESENTANTE: ''
  },
  datosCultivar: {
    NOMBRE_CULTIVAR: '',
    PAIS: '',
    FECHA_INTERNAMIENTO: '',
    TIPO_CULTIVAR: '',
    GENEOLOGIA: '',
    NOMBRE_OBTENTOR: '',
    TIPO_NATIVO: TipoNativo.CultivarNativo,
    FINALIDAD_USO: '',
    NOMBRE_CO_OBTENTOR: '',
    NUME_REGI_ARC_DRCO: '',
    NUME_REGI_ARC_DVC: '',
    NUME_REGI_ARC_RIV: '',
    rangoAdapMax: '',
    rangoAdapMin: '',
    ESPECIE_ID: 0
  },
  infoEnsayos: {
    AMBITO_GEOGRAFICO: '',
    RANGO_ADAPTACION: '',
    FINALIDAD_USO: '',
    INSTALACION: '',
    CAMPANAS_ENSAYOS: '',
    CARACTERES_PRUEBA: '',
    PLANTAS_TIPO: '',
    PRIMERA_CAMPANA: '',
    SEGUNDA_CAMPANA: '',
    COMPORTAMIENTO_BIOTICO: '',
    COMPORTAMIENTO_ABIOTICO: '',
    NUME_REGI_ARC: ''
  },
  localidadEnsayos: [],
  desarrolloCultivar: [],
  rangosAdaptacion: [],
  finalidadUso: [],
  mantenimientoSemilla: {
    RAZON_SOCIAL: '',
    AREA_RESPONSABLE: ''
  }
}
