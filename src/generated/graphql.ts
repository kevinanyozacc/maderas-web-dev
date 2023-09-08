import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Upload: any;
};

export type Acondicionamiento = {
  __typename?: 'Acondicionamiento';
  ACONDICIONAMIENTO_ID: Scalars['Int'];
  ALMACENAMIENTO: Scalars['String'];
  ALMACENAMIENTO_ARC?: Maybe<Scalars['String']>;
  CLASIFICACION: Scalars['String'];
  CLASIFICACION_ARC?: Maybe<Scalars['String']>;
  ENVASADO: Scalars['String'];
  ENVASADO_ARC?: Maybe<Scalars['String']>;
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO?: Maybe<Scalars['Date']>;
  LIMPIEZA: Scalars['String'];
  LIMPIEZA_ARC?: Maybe<Scalars['String']>;
  OPERACIONES_ESPECIALES: Scalars['String'];
  OPERACIONES_ESPECIALES_ARC?: Maybe<Scalars['String']>;
  RECEPCION: Scalars['String'];
  RECEPCION_ARC?: Maybe<Scalars['String']>;
  TRATAMIENTO: Scalars['String'];
  TRATAMIENTO_ARC?: Maybe<Scalars['String']>;
};

export type AcondicionamientoInput = {
  ACONDICIONAMIENTO_ID?: InputMaybe<Scalars['Int']>;
  ALMACENAMIENTO: Scalars['String'];
  ALMACENAMIENTO_ARC?: InputMaybe<Scalars['String']>;
  CLASIFICACION: Scalars['String'];
  CLASIFICACION_ARC?: InputMaybe<Scalars['String']>;
  ENVASADO: Scalars['String'];
  ENVASADO_ARC?: InputMaybe<Scalars['String']>;
  EXPEDIENTE_ID?: InputMaybe<Scalars['Int']>;
  LIMPIEZA: Scalars['String'];
  LIMPIEZA_ARC?: InputMaybe<Scalars['String']>;
  OPERACIONES_ESPECIALES: Scalars['String'];
  OPERACIONES_ESPECIALES_ARC?: InputMaybe<Scalars['String']>;
  RECEPCION: Scalars['String'];
  RECEPCION_ARC?: InputMaybe<Scalars['String']>;
  TRATAMIENTO: Scalars['String'];
  TRATAMIENTO_ARC?: InputMaybe<Scalars['String']>;
};

export type AcondicionamientoResponse = {
  __typename?: 'AcondicionamientoResponse';
  data?: Maybe<Acondicionamiento>;
  errors?: Maybe<Array<FieldError>>;
};

export type Almacen = {
  __typename?: 'Almacen';
  ALMACEN_ID: Scalars['Int'];
  DEPARTAMENTO_ID: Scalars['String'];
  DIRECCION: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO: Scalars['Date'];
  NUME_REGI_ARC?: Maybe<Scalars['String']>;
  PROVINCIA_ID: Scalars['String'];
};

export type AlmacenCreateInput = {
  DEPARTAMENTO_ID: Scalars['String'];
  DIRECCION: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  NUME_REGI_ARC: Scalars['String'];
  PROVINCIA_ID: Scalars['String'];
};

export type AlmacenCreateResponse = {
  __typename?: 'AlmacenCreateResponse';
  data?: Maybe<Array<Almacen>>;
  errors?: Maybe<Array<FieldError>>;
};

export type AlmacenUpdateInput = {
  ALMACEN_ID: Scalars['Int'];
  DEPARTAMENTO_ID: Scalars['String'];
  DIRECCION: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  NUME_REGI_ARC: Scalars['String'];
  PROVINCIA_ID: Scalars['String'];
};

export type AlmacenUpdateResponse = {
  __typename?: 'AlmacenUpdateResponse';
  data?: Maybe<Almacen>;
  errors?: Maybe<Array<FieldError>>;
};

export type AnalisisCalidad = {
  __typename?: 'AnalisisCalidad';
  ANALISIS_ID: Scalars['Int'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO: Scalars['Date'];
  LABORATORIO_ID?: Maybe<Scalars['Int']>;
  SEMILLA_ASEXUAL: Estados;
  SEMILLA_SEXUAL: Estados;
};

export type AnalisisCalidadCreateinput = {
  EXPEDIENTE_ID: Scalars['Int'];
  LABORATORIO_ID?: InputMaybe<Scalars['Int']>;
  SEMILLA_ASEXUAL: Estados;
  SEMILLA_SEXUAL: Estados;
};

export type AnalisisCalidadResponse = {
  __typename?: 'AnalisisCalidadResponse';
  data?: Maybe<AnalisisCalidad>;
  errors?: Maybe<Array<FieldError>>;
};

export type AnalisisCalidadUpdateinput = {
  ANALISIS_ID: Scalars['Int'];
  LABORATORIO_ID?: InputMaybe<Scalars['Float']>;
  SEMILLA_ASEXUAL: Estados;
  SEMILLA_SEXUAL: Estados;
};

export type ArchivoFisico = {
  __typename?: 'ArchivoFisico';
  DESCRIPCION: Scalars['String'];
  FECH_CARG_ARC: Scalars['Date'];
  FILEEXTENSION: Scalars['String'];
  FILENAME: Scalars['String'];
  FLAG_IMAGEN: Scalars['String'];
  FLAG_RESTRINGIDO: Scalars['String'];
  FUENTE: Scalars['String'];
  NOMBRE_OBJETO: Scalars['String'];
  NUME_REGI_ARC: Scalars['String'];
  SECU_REGI_ARC: Scalars['Int'];
};

export type ArchivoResponse = {
  __typename?: 'ArchivoResponse';
  APLICACION: Scalars['String'];
  ArchivosFisicos: Array<ArchivoFisico>;
  DESCRIPCION_REGISTRO?: Maybe<Scalars['String']>;
  FECH_REGI_ARC: Scalars['Date'];
  MODULO?: Maybe<Scalars['String']>;
  NUME_REGI_ARC: Scalars['String'];
  REGISTRO?: Maybe<Scalars['String']>;
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  data?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<FieldError>>;
};

export type Conocimiento = {
  __typename?: 'Conocimiento';
  FECHA_INICIO: Scalars['Date'];
  FECHA_TERMINO: Scalars['Date'];
  HORAS: Scalars['String'];
  ID: Scalars['Int'];
  LUGAR: Scalars['String'];
  NOMBRE: Scalars['String'];
  NUME_REGI_ARC?: Maybe<Scalars['String']>;
  RESPONSABLE_ID: Scalars['Int'];
};

export type ConocimientoInput = {
  FECHA_INICIO: Scalars['DateTime'];
  FECHA_TERMINO: Scalars['DateTime'];
  HORAS: Scalars['String'];
  ID?: InputMaybe<Scalars['Int']>;
  LUGAR: Scalars['String'];
  NOMBRE: Scalars['String'];
  NUME_REGI_ARC: Scalars['String'];
  RESPONSABLE_ID?: InputMaybe<Scalars['Int']>;
};

export type ConocimientoResponseCreate = {
  __typename?: 'ConocimientoResponseCreate';
  conocimiento?: Maybe<Array<Conocimiento>>;
  errors?: Maybe<Array<FieldError>>;
};

export type ConocimientoResponseUpdate = {
  __typename?: 'ConocimientoResponseUpdate';
  conocimiento?: Maybe<Conocimiento>;
  errors?: Maybe<Array<FieldError>>;
};

export type CreateArchivoFisicoInput = {
  DATAOBJECT: Scalars['Upload'];
  DESCRIPCION: Scalars['String'];
  NUME_REGI_ARC: Scalars['String'];
};

export type CreateArchivoFisicoResponse = {
  __typename?: 'CreateArchivoFisicoResponse';
  data?: Maybe<ArchivoFisico>;
  errors?: Maybe<Array<FieldError>>;
};

export type CreateArchivoInput = {
  ArchivosFisicos: Array<CreateMultipleArchivoFisicoInput>;
  DESCRIPCION_REGISTRO: Scalars['String'];
  REGISTRO: Scalars['String'];
};

export type CreateArchivoResponse = {
  __typename?: 'CreateArchivoResponse';
  data?: Maybe<ArchivoResponse>;
  errors?: Maybe<Array<FieldError>>;
};

export type CreateMultipleArchivoFisicoInput = {
  DATAOBJECT: Scalars['Upload'];
  DESCRIPCION: Scalars['String'];
};

export type CultivarComercial = {
  __typename?: 'CultivarComercial';
  CULTIVAR_COMERCIAL_ID: Scalars['Int'];
  ESPECIE?: Maybe<Especies>;
  ESPECIE_ID?: Maybe<Scalars['Int']>;
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_INTERNAMIENTO?: Maybe<Scalars['DateTime']>;
  FECHA_REGISTRO: Scalars['Date'];
  FINALIDAD_USO?: Maybe<Scalars['String']>;
  GENEOLOGIA: Scalars['String'];
  NOMBRE_CO_OBTENTOR?: Maybe<Scalars['String']>;
  NOMBRE_CULTIVAR: Scalars['String'];
  NOMBRE_OBTENTOR: Scalars['String'];
  NUME_REGI_ARC_DRCO?: Maybe<Scalars['String']>;
  NUME_REGI_ARC_DVC?: Maybe<Scalars['String']>;
  NUME_REGI_ARC_RIV?: Maybe<Scalars['String']>;
  PAIS: Scalars['String'];
  RANGO_ADAPTACION?: Maybe<Scalars['String']>;
  TIPO_CULTIVAR: Scalars['String'];
  TIPO_NATIVO?: Maybe<TipoNativo>;
};

export type CultivarComercialCreateInput = {
  ESPECIE_ID: Scalars['Int'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_INTERNAMIENTO?: InputMaybe<Scalars['DateTime']>;
  FINALIDAD_USO?: InputMaybe<Scalars['String']>;
  GENEOLOGIA: Scalars['String'];
  NOMBRE_CO_OBTENTOR?: InputMaybe<Scalars['String']>;
  NOMBRE_CULTIVAR: Scalars['String'];
  NOMBRE_OBTENTOR: Scalars['String'];
  NUME_REGI_ARC_DRCO?: InputMaybe<Scalars['String']>;
  NUME_REGI_ARC_DVC?: InputMaybe<Scalars['String']>;
  NUME_REGI_ARC_RIV?: InputMaybe<Scalars['String']>;
  PAIS: Scalars['String'];
  RANGO_ADAPTACION?: InputMaybe<Scalars['String']>;
  TIPO_CULTIVAR: Scalars['String'];
  TIPO_NATIVO: TipoNativo;
};

export type CultivarComercialResponse = {
  __typename?: 'CultivarComercialResponse';
  data?: Maybe<CultivarComercial>;
  errors?: Maybe<Array<FieldError>>;
};

export type CultivarComercialUpdateInput = {
  CULTIVAR_COMERCIAL_ID: Scalars['Int'];
  ESPECIE_ID: Scalars['Int'];
  FECHA_INTERNAMIENTO?: InputMaybe<Scalars['DateTime']>;
  FINALIDAD_USO?: InputMaybe<Scalars['String']>;
  GENEOLOGIA: Scalars['String'];
  NOMBRE_CO_OBTENTOR?: InputMaybe<Scalars['String']>;
  NOMBRE_CULTIVAR: Scalars['String'];
  NOMBRE_OBTENTOR: Scalars['String'];
  NUME_REGI_ARC_DRCO?: InputMaybe<Scalars['String']>;
  NUME_REGI_ARC_DVC?: InputMaybe<Scalars['String']>;
  NUME_REGI_ARC_RIV?: InputMaybe<Scalars['String']>;
  PAIS: Scalars['String'];
  RANGO_ADAPTACION?: InputMaybe<Scalars['String']>;
  TIPO_CULTIVAR: Scalars['String'];
  TIPO_NATIVO: TipoNativo;
};

export type CultivarInput = {
  CULTIVO_ID?: InputMaybe<Scalars['Int']>;
  ESPECIE_ID?: InputMaybe<Scalars['Int']>;
  ESTADO: Estados;
  FECHA_REGISTRO?: InputMaybe<Scalars['DateTime']>;
  NOMBRE_CULTIVAR: Scalars['String'];
};

export type CultivarResponse = {
  __typename?: 'CultivarResponse';
  data?: Maybe<Cultivares>;
  errors?: Maybe<Array<FieldError>>;
};

export type CultivarResponseUpdate = {
  __typename?: 'CultivarResponseUpdate';
  data: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type CultivarUpdateEstadoInput = {
  CULTIVO_ID: Scalars['Int'];
  ESTADO: Estados;
};

export type Cultivares = {
  __typename?: 'Cultivares';
  CULTIVO_ID: Scalars['Int'];
  ESPECIE?: Maybe<Especies>;
  ESPECIE_ID: Scalars['Int'];
  ESTADO: Estados;
  FECHA_REGISTRO: Scalars['Date'];
  NOMBRE_CULTIVAR: Scalars['String'];
};

export type CultivaresPaginatedResponse = {
  __typename?: 'CultivaresPaginatedResponse';
  data: Array<Cultivares>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalItems: Scalars['Int'];
};

export type DatosReniec = {
  __typename?: 'DatosReniec';
  apellidoMaterno: Scalars['String'];
  apellidoPaterno: Scalars['String'];
  direccion: Scalars['String'];
  documentoNumero: Scalars['String'];
  nombreRazonSocial: Scalars['String'];
  nombres: Scalars['String'];
};

export type Departamento = {
  __typename?: 'Departamento';
  CODI_DEPA_DPT: Scalars['String'];
  NOMB_DPTO_DPT: Scalars['String'];
};

export type Distrito = {
  __typename?: 'Distrito';
  CODI_DEPA_DPT: Scalars['String'];
  CODI_DIST_TDI: Scalars['String'];
  CODI_PROV_TPR: Scalars['String'];
  NOMB_DIST_TDI: Scalars['String'];
};

export type ESpeciePaginatedResponse = {
  __typename?: 'ESpeciePaginatedResponse';
  data: Array<Especies>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalItems: Scalars['Int'];
};

export type Especializacion = {
  __typename?: 'Especializacion';
  ESPECIALIZACION_RELACIONADA_ID: Scalars['Int'];
  FECHA_INICIO: Scalars['Date'];
  FECHA_TERMINO: Scalars['Date'];
  HORAS?: Maybe<Scalars['String']>;
  LUGAR: Scalars['String'];
  NOMBRE: Scalars['String'];
  NUME_REGI_ARC?: Maybe<Scalars['String']>;
  PROFESIONAL_RESPONSABLE_ID: Scalars['Int'];
  TIPO_ESPECIALIDAD: Scalars['String'];
};

export type EspecializacionInput = {
  ESPECIALIZACION_RELACIONADA_ID?: InputMaybe<Scalars['Int']>;
  FECHA_INICIO: Scalars['DateTime'];
  FECHA_TERMINO: Scalars['DateTime'];
  HORAS?: InputMaybe<Scalars['String']>;
  LUGAR: Scalars['String'];
  NOMBRE: Scalars['String'];
  NUME_REGI_ARC: Scalars['String'];
  PROFESIONAL_RESPONSABLE_ID?: InputMaybe<Scalars['Int']>;
  /** Aceptara los valores CURSO, GRADO y ESPECIALIDAD */
  TIPO_ESPECIALIDAD: Scalars['String'];
};

export type EspecializacionResponseCreate = {
  __typename?: 'EspecializacionResponseCreate';
  errors?: Maybe<Array<FieldError>>;
  especializacion?: Maybe<Array<Especializacion>>;
};

export type EspecializacionResponseUpdate = {
  __typename?: 'EspecializacionResponseUpdate';
  errors?: Maybe<Array<FieldError>>;
  especializacion?: Maybe<Especializacion>;
};

export type Especies = {
  __typename?: 'Especies';
  DENOMINACION: Estados;
  ESPECIE_ID: Scalars['Int'];
  ESTADO: Estados;
  FECHA_REGISTRO: Scalars['Date'];
  NOMBRE_CIENTIFICO: Scalars['String'];
  NOMBRE_ESPECIE_COMUN: Scalars['String'];
  REGLAMENTARIO: Estados;
};

export type EspeciesInput = {
  DENOMINACION: Estados;
  ESPECIE_ID?: InputMaybe<Scalars['Int']>;
  ESTADO: Estados;
  FECHA_REGISTRO?: InputMaybe<Scalars['Date']>;
  NOMBRE_CIENTIFICO: Scalars['String'];
  NOMBRE_ESPECIE_COMUN: Scalars['String'];
  REGLAMENTARIO: Estados;
};

export type EspeciesResponse = {
  __typename?: 'EspeciesResponse';
  data?: Maybe<Especies>;
  errors?: Maybe<Array<FieldError>>;
};

export type EspeciesResponseUpdate = {
  __typename?: 'EspeciesResponseUpdate';
  data: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type EspeciesUpdateDenominacionInput = {
  DENOMINACION: Estados;
  ESPECIE_ID: Scalars['Int'];
};

export type EspeciesUpdateEstadoInput = {
  ESPECIE_ID: Scalars['Int'];
  ESTADO: Estados;
};

export type EspeciesUpdateReglaInput = {
  ESPECIE_ID: Scalars['Int'];
  REGLAMENTARIO: Estados;
};

/** Los estados disponibles. */
export enum Estados {
  Activo = 'ACTIVO',
  Inactivo = 'INACTIVO'
}

/** Los estados disponibles para los expedientes. */
export enum EstadosExpedientes {
  Abandono = 'ABANDONO',
  Actualizado = 'ACTUALIZADO',
  Anulado = 'ANULADO',
  Cancelado = 'CANCELADO',
  CierreEspecialista = 'CIERRE_ESPECIALISTA',
  CierreJefearea = 'CIERRE_JEFEAREA',
  Desistimiento = 'DESISTIMIENTO',
  Notificado = 'NOTIFICADO',
  ObservadoEspecialista = 'OBSERVADO_ESPECIALISTA',
  ObservadoJefearea = 'OBSERVADO_JEFEAREA',
  PasoEspecialista = 'PASO_ESPECIALISTA',
  PasoJefearea = 'PASO_JEFEAREA',
  Proceso = 'PROCESO'
}

/** Los estados disponibles para las observaciones. */
export enum EstadosObservacion {
  Observado = 'OBSERVADO',
  Pendiente = 'PENDIENTE',
  Validado = 'VALIDADO'
}

/** Los estados disponibles para los usuarios. */
export enum EstadosUsuario {
  Activo = 'ACTIVO',
  Eliminado = 'ELIMINADO',
  Inactivo = 'INACTIVO'
}

export type ExpedienteCreateInput = {
  DEPARMENTO_ID: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  PROVINCIA_ID: Scalars['String'];
  TIPO_SOLICITUD: TipoSolicitudExpedientes;
};

export type ExpedienteIdResponse = {
  __typename?: 'ExpedienteIdResponse';
  errors?: Maybe<Array<FieldError>>;
  expedienteId?: Maybe<Scalars['Int']>;
};

export type ExpedienteInput = {
  ESTADO?: InputMaybe<Scalars['String']>;
  EXPEDIENTE_ID?: InputMaybe<Scalars['Float']>;
  FECHA_REGISTRO?: InputMaybe<Scalars['String']>;
  NUMERO_EXPEDIENTE?: InputMaybe<Scalars['String']>;
  TIPO_SOLICITUD: TipoSolicitudExpedientes;
};

export type ExpedientePaginatedResponse = {
  __typename?: 'ExpedientePaginatedResponse';
  data: Array<ExpedienteResponse>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalItems: Scalars['Int'];
};

export type ExpedienteResponse = {
  __typename?: 'ExpedienteResponse';
  ESTADO: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Float'];
  FECHA_REGISTRO: Scalars['Date'];
  NUMERO_EXPEDIENTE?: Maybe<Scalars['String']>;
  SEDE?: Maybe<Sede>;
  SEDE_ID: Scalars['Int'];
  SOLICITANTE?: Maybe<Solicitante>;
  TIPO_SOLICITUD: TipoSolicitudExpedientes;
};

export type Experiencia = {
  __typename?: 'Experiencia';
  ACTIVIDAD_DESARROLLADA: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  EXPERIENCIA_RELACIONADA_ID: Scalars['Int'];
  FECHA_INICIO: Scalars['Date'];
  FECHA_TERMINO: Scalars['Date'];
  NUME_REGI_ARC?: Maybe<Scalars['String']>;
  PROFESIONAL_RESPONSABLE_ID: Scalars['Int'];
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL: Scalars['String'];
};

export type ExperienciaInput = {
  ACTIVIDAD_DESARROLLADA: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  EXPERIENCIA_RELACIONADA_ID?: InputMaybe<Scalars['Int']>;
  FECHA_INICIO: Scalars['DateTime'];
  FECHA_TERMINO: Scalars['DateTime'];
  NUME_REGI_ARC: Scalars['String'];
  PROFESIONAL_RESPONSABLE_ID?: InputMaybe<Scalars['Int']>;
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL: Scalars['String'];
};

export type ExperienciaResponseCreate = {
  __typename?: 'ExperienciaResponseCreate';
  errors?: Maybe<Array<FieldError>>;
  experiencias?: Maybe<Array<Experiencia>>;
};

export type ExperienciaResponseUpdate = {
  __typename?: 'ExperienciaResponseUpdate';
  errors?: Maybe<Array<FieldError>>;
  experiencias?: Maybe<Experiencia>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type InfoCultivoResponseCreate = {
  __typename?: 'InfoCultivoResponseCreate';
  data?: Maybe<Array<InformacionCultivo>>;
  errors?: Maybe<Array<FieldError>>;
};

export type InfoCultivoResponseUpdate = {
  __typename?: 'InfoCultivoResponseUpdate';
  data?: Maybe<InformacionCultivo>;
  errors?: Maybe<Array<FieldError>>;
};

export type InformacionCultivo = {
  __typename?: 'InformacionCultivo';
  CULTIVO_ID?: Maybe<Scalars['Int']>;
  CULTIVO_REGLAMENTARIO?: Maybe<Scalars['String']>;
  ESPECIE_ID: Scalars['Int'];
  EXPEDIENTE_ID: Scalars['Int'];
  INFORMACION_CULTIVO_ID: Scalars['Int'];
};

export type InformacionCultivoInput = {
  CULTIVO_ID?: InputMaybe<Scalars['Int']>;
  CULTIVO_REGLAMENTARIO?: InputMaybe<Scalars['String']>;
  ESPECIE_ID: Scalars['Int'];
  EXPEDIENTE_ID?: InputMaybe<Scalars['Int']>;
  INFORMACION_CULTIVO_ID?: InputMaybe<Scalars['Int']>;
};

export type InformacionEnsayo = {
  __typename?: 'InformacionEnsayo';
  AMBITO_GEOGRAFICO: Scalars['String'];
  CAMPANAS_ENSAYOS: Scalars['String'];
  CARACTERES_PRUEBA: Scalars['String'];
  COMPORTAMIENTO_ABIOTICO: Scalars['String'];
  COMPORTAMIENTO_BIOTICO: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO: Scalars['Date'];
  FINALIDAD_USO: Scalars['String'];
  INFORMACION_ENSAYO_ID: Scalars['Int'];
  INSTALACION: Scalars['String'];
  NUME_REGI_ARC?: Maybe<Scalars['String']>;
  PLANTAS_TIPO: Scalars['String'];
  PRIMERA_CAMPANA: Scalars['String'];
  RANGO_ADAPTACION: Scalars['String'];
  SEGUNDA_CAMPANA: Scalars['String'];
};

export type InformacionEnsayoCreateInput = {
  AMBITO_GEOGRAFICO: Scalars['String'];
  CAMPANAS_ENSAYOS: Scalars['String'];
  CARACTERES_PRUEBA: Scalars['String'];
  COMPORTAMIENTO_ABIOTICO: Scalars['String'];
  COMPORTAMIENTO_BIOTICO: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FINALIDAD_USO: Scalars['String'];
  INSTALACION: Scalars['String'];
  NUME_REGI_ARC?: InputMaybe<Scalars['String']>;
  PLANTAS_TIPO: Scalars['String'];
  PRIMERA_CAMPANA: Scalars['String'];
  RANGO_ADAPTACION: Scalars['String'];
  SEGUNDA_CAMPANA: Scalars['String'];
};

export type InformacionEnsayoResponse = {
  __typename?: 'InformacionEnsayoResponse';
  data?: Maybe<InformacionEnsayo>;
  errors?: Maybe<Array<FieldError>>;
};

export type InformacionEnsayoUpdateInput = {
  AMBITO_GEOGRAFICO: Scalars['String'];
  CAMPANAS_ENSAYOS: Scalars['String'];
  CARACTERES_PRUEBA: Scalars['String'];
  COMPORTAMIENTO_ABIOTICO: Scalars['String'];
  COMPORTAMIENTO_BIOTICO: Scalars['String'];
  FINALIDAD_USO: Scalars['String'];
  INFORMACION_ENSAYO_ID: Scalars['Int'];
  INSTALACION: Scalars['String'];
  NUME_REGI_ARC?: InputMaybe<Scalars['String']>;
  PLANTAS_TIPO: Scalars['String'];
  PRIMERA_CAMPANA: Scalars['String'];
  RANGO_ADAPTACION: Scalars['String'];
  SEGUNDA_CAMPANA: Scalars['String'];
};

export type InformacionResponsable = {
  __typename?: 'InformacionResponsable';
  APELLIDOS?: Maybe<Scalars['String']>;
  APENOMB: Scalars['String'];
  COLEGIATURA: Scalars['String'];
  CORREO: Scalars['String'];
  CURRICULUM: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  FECHA_REGISTRO?: Maybe<Scalars['Date']>;
  ID: Scalars['Int'];
  NOMBRES: Scalars['String'];
  PROVINCIA: Scalars['String'];
  RESPONSABLE_ID?: Maybe<Scalars['Int']>;
  TELEFONO: Scalars['String'];
  TITULOPROFESIONAL: Scalars['String'];
};

export type InformacionResponsableInput = {
  APELLIDOS?: InputMaybe<Scalars['String']>;
  APENOMB: Scalars['String'];
  COLEGIATURA: Scalars['String'];
  CORREO: Scalars['String'];
  CURRICULUM: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  ID?: InputMaybe<Scalars['Int']>;
  NOMBRES: Scalars['String'];
  PROVINCIA: Scalars['String'];
  RESPONSABLE_ID?: InputMaybe<Scalars['Int']>;
  TELEFONO: Scalars['String'];
  TITULOPROFESIONAL: Scalars['String'];
};

export type InformacionResponsableResponse = {
  __typename?: 'InformacionResponsableResponse';
  errors?: Maybe<Array<FieldError>>;
  informacion?: Maybe<InformacionResponsable>;
};

export type InformacionSolicitud = {
  __typename?: 'InformacionSolicitud';
  APENOMB: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  FECHA_REGISTRO?: Maybe<Scalars['Date']>;
  ID: Scalars['Int'];
  NUME_REGI_FUNCIONAMIENTO?: Maybe<Scalars['String']>;
  NUME_REGI_MEMORIA?: Maybe<Scalars['String']>;
  NUME_REGI_PLANO?: Maybe<Scalars['String']>;
  NUME_REGI_SENSOR?: Maybe<Scalars['String']>;
  NUME_REGI_TERMICO?: Maybe<Scalars['String']>;
  NUME_REGI_TRAMITE?: Maybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  SENSORES?: Maybe<Scalars['String']>;
  SOLICITUD_ID?: Maybe<Scalars['Int']>;
  TIPOAUTORIZACION: Scalars['String'];
};

export type InformacionSolicitudInput = {
  APENOMB: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  ID?: InputMaybe<Scalars['Int']>;
  NUME_REGI_FUNCIONAMIENTO: Scalars['String'];
  NUME_REGI_MEMORIA: Scalars['String'];
  NUME_REGI_PLANO: Scalars['String'];
  NUME_REGI_SENSOR: Scalars['String'];
  NUME_REGI_TERMICO: Scalars['String'];
  NUME_REGI_TRAMITE: Scalars['String'];
  PROVINCIA: Scalars['String'];
  SENSORES: Scalars['String'];
  SOLICITUD_ID?: InputMaybe<Scalars['Int']>;
  TIPOAUTORIZACION: Scalars['String'];
};

export type InformacionSolicitudResponse = {
  __typename?: 'InformacionSolicitudResponse';
  errors?: Maybe<Array<FieldError>>;
  informacion?: Maybe<InformacionSolicitud>;
};

export type Laboratorio = {
  __typename?: 'Laboratorio';
  ANALISIS: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  ESPECIES: Scalars['String'];
  FECHA_REGISTRO: Scalars['Date'];
  LABORATORIO_ID: Scalars['Int'];
  NUMERO_RESOLUCION: Scalars['String'];
  REPRESENTANTE_LEGAL: Scalars['String'];
  RESPONSABLE_TECNICO: Scalars['String'];
  SOLICITANTE: Scalars['String'];
  TELEFONO: Scalars['String'];
};

export type LocalidadEnsayo = {
  __typename?: 'LocalidadEnsayo';
  ALTITUD: Scalars['String'];
  DEPARTAMENTO_ID: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_FIN: Scalars['Date'];
  FECHA_INICIO: Scalars['Date'];
  FECHA_REGISTRO: Scalars['Date'];
  LOCALIDAD_ENSAYO_ID: Scalars['Int'];
  PROVINCIA_ID: Scalars['String'];
  SECTOR: Scalars['String'];
};

export type LocalidadEnsayoCreateInput = {
  ALTITUD: Scalars['String'];
  DEPARTAMENTO_ID: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_FIN: Scalars['Date'];
  FECHA_INICIO: Scalars['Date'];
  PROVINCIA_ID: Scalars['String'];
  SECTOR: Scalars['String'];
};

export type LocalidadEnsayoCreateResponse = {
  __typename?: 'LocalidadEnsayoCreateResponse';
  data?: Maybe<Array<LocalidadEnsayo>>;
  errors?: Maybe<Array<FieldError>>;
};

export type LocalidadEnsayoUpdateInput = {
  ALTITUD: Scalars['String'];
  DEPARTAMENTO_ID: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  FECHA_FIN: Scalars['Date'];
  FECHA_INICIO: Scalars['Date'];
  LOCALIDAD_ENSAYO_ID: Scalars['Int'];
  PROVINCIA_ID: Scalars['String'];
  SECTOR: Scalars['String'];
};

export type LocalidadEnsayoUpdateResponse = {
  __typename?: 'LocalidadEnsayoUpdateResponse';
  data?: Maybe<LocalidadEnsayo>;
  errors?: Maybe<Array<FieldError>>;
};

export type LoginData = {
  __typename?: 'LoginData';
  ROLES: Array<RolesUsuarios>;
  SEDE_ID?: Maybe<Scalars['Int']>;
  USERNAME: Scalars['String'];
  USER_ID?: Maybe<Scalars['Int']>;
  token: Scalars['String'];
};

export type LoginInput = {
  PASSWORD: Scalars['String'];
  USERNAME: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  data?: Maybe<LoginData>;
  errors?: Maybe<Array<FieldError>>;
};

export type MantResponse = {
  __typename?: 'MantResponse';
  data?: Maybe<MantSemilla>;
  errors?: Maybe<Array<FieldError>>;
};

export type MantSemilla = {
  __typename?: 'MantSemilla';
  AREA_RESPONSABLE: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO: Scalars['Date'];
  MANTENIMIENTO_SEMILLA_ID: Scalars['Int'];
  RAZON_SOCIAL: Scalars['String'];
};

export type MantSemillaCreateInput = {
  AREA_RESPONSABLE: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  RAZON_SOCIAL: Scalars['String'];
};

export type MantSemillaUpdateInput = {
  AREA_RESPONSABLE: Scalars['String'];
  MANTENIMIENTO_SEMILLA_ID: Scalars['Int'];
  RAZON_SOCIAL: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignExpediente: Scalars['Boolean'];
  assingJefeArea: Scalars['Boolean'];
  changePassword: ChangePasswordResponse;
  createAcondicionamiento: AcondicionamientoResponse;
  createAlmacen: AlmacenCreateResponse;
  createAnalisisCalidad: AnalisisCalidadResponse;
  createArchivo: CreateArchivoResponse;
  createArchivoFisico: CreateArchivoFisicoResponse;
  createConocimiento?: Maybe<ConocimientoResponseCreate>;
  createCultivar: CultivarResponse;
  createCultivarComercial: CultivarComercialResponse;
  createEspecializaciones?: Maybe<EspecializacionResponseCreate>;
  createEspecie: EspeciesResponse;
  createExpediente?: Maybe<ExpedienteIdResponse>;
  createExperiencias?: Maybe<ExperienciaResponseCreate>;
  createInfoCultivo?: Maybe<InfoCultivoResponseCreate>;
  createInfoEnsayo: InformacionEnsayoResponse;
  createInformacionResponsable: InformacionResponsableResponse;
  createInformacionSolicitud: InformacionSolicitudResponse;
  createLocalidadEnsayo: LocalidadEnsayoCreateResponse;
  createMantenimientoSemilla: MantResponse;
  createProfesional: ProfesionalResponse;
  createResponsable: ResponsableResponse;
  createSolicitante: SolicitanteResponse;
  createSolicitudAutorizacion: SolicitudAutorizacionResponse;
  createSucursal: SucursalCreateResponse;
  createTierraCultivos: TierraCultivoResponseCreate;
  createUsuario: UsuarioResponse;
  deleteAlmacen: Scalars['Boolean'];
  deleteArchivoFisico: Scalars['Boolean'];
  deleteConocimiento: Scalars['Boolean'];
  deleteEspecializacion: Scalars['Boolean'];
  deleteExperiencia: Scalars['Boolean'];
  deleteInfoCultivo: Scalars['Boolean'];
  deleteInformacionResponsable: Scalars['Boolean'];
  deleteProfesional: Scalars['Boolean'];
  deleteResponsable: Scalars['Boolean'];
  deleteSolicitante: Scalars['Boolean'];
  deleteSucursal: Scalars['Boolean'];
  deleteTierraCultivo: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: LoginResponse;
  refreshToken: LoginResponse;
  sendExpedienteToJefeArea: Scalars['Boolean'];
  sendNotiMailToJefeArea: Scalars['Boolean'];
  sendResumenToEmail: Scalars['Boolean'];
  sendStatusToUser: SendStatusUserResponse;
  updateAcondicionamiento: AcondicionamientoResponse;
  updateAlmacen: AlmacenUpdateResponse;
  updateAnalisisCalidad: AnalisisCalidadResponse;
  updateConocimiento: ConocimientoResponseUpdate;
  updateCultivar: CultivarResponse;
  updateCultivarComercial: CultivarComercialResponse;
  updateCultivarEstado: CultivarResponseUpdate;
  updateDenominacionEspecie: EspeciesResponseUpdate;
  updateEspecializacion: EspecializacionResponseUpdate;
  updateEspecie: EspeciesResponse;
  updateEspecieEstado: EspeciesResponseUpdate;
  updateEspecieRegla: EspeciesResponseUpdate;
  updateEstadoExpediente: Scalars['Boolean'];
  updateEstadoUsuario: Scalars['Boolean'];
  updateExpediente: ExpedienteIdResponse;
  updateExperiencia: ExperienciaResponseUpdate;
  updateInfoCultivo: InfoCultivoResponseUpdate;
  updateInfoEnsayo: InformacionEnsayoResponse;
  updateInformacionResponsable: InformacionResponsableResponse;
  updateInformacionSolicitud: InformacionSolicitudResponse;
  updateLocalidadEnsayo: LocalidadEnsayoUpdateResponse;
  updateMantenimientoSemilla: MantResponse;
  updateObservacion: Scalars['Boolean'];
  updateProfesional: ProfesionalResponse;
  updateResponsable: ResponsableResponse;
  updateResponsableRol: Scalars['Boolean'];
  updateSolicitante: SolicitanteResponse;
  updateSolicitanteRol: Scalars['Boolean'];
  updateSolicitudAutorizacion: SolicitudAutorizacionResponse;
  updateSucursal: SucursalUpdateResponse;
  updateTierraCultivo: TierraCultivoResponseUpdate;
  updateUsuario: UsuarioResponse;
};


export type MutationAssignExpedienteArgs = {
  especialistaId: Scalars['Int'];
  expedienteId: Scalars['Int'];
};


export type MutationAssingJefeAreaArgs = {
  input: SedeUpdateInput;
};


export type MutationChangePasswordArgs = {
  NEW_PASSWORD: Scalars['String'];
  OLD_PASSWORD: Scalars['String'];
  USER_ID: Scalars['Int'];
};


export type MutationCreateAcondicionamientoArgs = {
  input: AcondicionamientoInput;
};


export type MutationCreateAlmacenArgs = {
  input: Array<AlmacenCreateInput>;
};


export type MutationCreateAnalisisCalidadArgs = {
  input: AnalisisCalidadCreateinput;
};


export type MutationCreateArchivoArgs = {
  input: CreateArchivoInput;
};


export type MutationCreateArchivoFisicoArgs = {
  input: CreateArchivoFisicoInput;
};


export type MutationCreateConocimientoArgs = {
  input: Array<ConocimientoInput>;
};


export type MutationCreateCultivarArgs = {
  input: CultivarInput;
};


export type MutationCreateCultivarComercialArgs = {
  input: CultivarComercialCreateInput;
};


export type MutationCreateEspecializacionesArgs = {
  input: Array<EspecializacionInput>;
};


export type MutationCreateEspecieArgs = {
  input: EspeciesInput;
};


export type MutationCreateExpedienteArgs = {
  input: ExpedienteCreateInput;
};


export type MutationCreateExperienciasArgs = {
  input: Array<ExperienciaInput>;
};


export type MutationCreateInfoCultivoArgs = {
  input: Array<InformacionCultivoInput>;
};


export type MutationCreateInfoEnsayoArgs = {
  input: InformacionEnsayoCreateInput;
};


export type MutationCreateInformacionResponsableArgs = {
  input: InformacionResponsableInput;
};


export type MutationCreateInformacionSolicitudArgs = {
  input: InformacionSolicitudInput;
};


export type MutationCreateLocalidadEnsayoArgs = {
  input: Array<LocalidadEnsayoCreateInput>;
};


export type MutationCreateMantenimientoSemillaArgs = {
  input: MantSemillaCreateInput;
};


export type MutationCreateProfesionalArgs = {
  input: ProfesionalInput;
};


export type MutationCreateResponsableArgs = {
  input: ResponsableInput;
};


export type MutationCreateSolicitanteArgs = {
  input: SolicitanteInput;
};


export type MutationCreateSolicitudAutorizacionArgs = {
  input: SolicitudAutorizacionInput;
};


export type MutationCreateSucursalArgs = {
  input: Array<SucursalCreateInput>;
};


export type MutationCreateTierraCultivosArgs = {
  input: Array<TierraCultivoInput>;
};


export type MutationCreateUsuarioArgs = {
  input: UsuarioCreateInput;
};


export type MutationDeleteAlmacenArgs = {
  almacenId: Scalars['Int'];
};


export type MutationDeleteArchivoFisicoArgs = {
  numeRegiArc: Scalars['String'];
  secuRegiArc: Scalars['Float'];
};


export type MutationDeleteConocimientoArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteEspecializacionArgs = {
  especializacionId: Scalars['Float'];
};


export type MutationDeleteExperienciaArgs = {
  experienciaId: Scalars['Float'];
};


export type MutationDeleteInfoCultivoArgs = {
  infoCultivoId: Scalars['Int'];
};


export type MutationDeleteInformacionResponsableArgs = {
  Id: Scalars['Int'];
};


export type MutationDeleteProfesionalArgs = {
  profesionalId: Scalars['Int'];
};


export type MutationDeleteResponsableArgs = {
  Id: Scalars['Int'];
};


export type MutationDeleteSolicitanteArgs = {
  solicitanteId: Scalars['Int'];
};


export type MutationDeleteSucursalArgs = {
  sucursalId: Scalars['Int'];
};


export type MutationDeleteTierraCultivoArgs = {
  tierraCultivoId: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  CORREO: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSendExpedienteToJefeAreaArgs = {
  expedienteId: Scalars['Int'];
};


export type MutationSendNotiMailToJefeAreaArgs = {
  expedienteId: Scalars['Int'];
};


export type MutationSendResumenToEmailArgs = {
  email: Scalars['String'];
  expedienteId: Scalars['Int'];
  tipoTramite: TipoSolicitudExpedientes;
};


export type MutationSendStatusToUserArgs = {
  expedienteId: Scalars['Int'];
};


export type MutationUpdateAcondicionamientoArgs = {
  input: AcondicionamientoInput;
};


export type MutationUpdateAlmacenArgs = {
  input: AlmacenUpdateInput;
};


export type MutationUpdateAnalisisCalidadArgs = {
  input: AnalisisCalidadUpdateinput;
};


export type MutationUpdateConocimientoArgs = {
  input: ConocimientoInput;
};


export type MutationUpdateCultivarArgs = {
  input: CultivarInput;
};


export type MutationUpdateCultivarComercialArgs = {
  input: CultivarComercialUpdateInput;
};


export type MutationUpdateCultivarEstadoArgs = {
  input: CultivarUpdateEstadoInput;
};


export type MutationUpdateDenominacionEspecieArgs = {
  input: EspeciesUpdateDenominacionInput;
};


export type MutationUpdateEspecializacionArgs = {
  input: EspecializacionInput;
};


export type MutationUpdateEspecieArgs = {
  input: EspeciesInput;
};


export type MutationUpdateEspecieEstadoArgs = {
  input: EspeciesUpdateEstadoInput;
};


export type MutationUpdateEspecieReglaArgs = {
  input: EspeciesUpdateReglaInput;
};


export type MutationUpdateEstadoExpedienteArgs = {
  estado: EstadosExpedientes;
  expedienteId: Scalars['Int'];
};


export type MutationUpdateEstadoUsuarioArgs = {
  ESTADO: EstadosUsuario;
  USER_ID: Scalars['Int'];
};


export type MutationUpdateExpedienteArgs = {
  input: ExpedienteInput;
};


export type MutationUpdateExperienciaArgs = {
  input: ExperienciaInput;
};


export type MutationUpdateInfoCultivoArgs = {
  input: InformacionCultivoInput;
};


export type MutationUpdateInfoEnsayoArgs = {
  input: InformacionEnsayoUpdateInput;
};


export type MutationUpdateInformacionResponsableArgs = {
  input: InformacionResponsableInput;
};


export type MutationUpdateInformacionSolicitudArgs = {
  input: InformacionSolicitudInput;
};


export type MutationUpdateLocalidadEnsayoArgs = {
  input: LocalidadEnsayoUpdateInput;
};


export type MutationUpdateMantenimientoSemillaArgs = {
  input: MantSemillaUpdateInput;
};


export type MutationUpdateObservacionArgs = {
  input: ObservacionUpdateInput;
};


export type MutationUpdateProfesionalArgs = {
  input: ProfesionalInput;
};


export type MutationUpdateResponsableArgs = {
  input: ResponsableInput;
};


export type MutationUpdateResponsableRolArgs = {
  ESTADO: Scalars['String'];
  ID: Scalars['Float'];
  OBSERVACION: Scalars['String'];
  ROLEASIGNADO: Scalars['String'];
};


export type MutationUpdateSolicitanteArgs = {
  input: SolicitanteInput;
};


export type MutationUpdateSolicitanteRolArgs = {
  ESTADO: Scalars['String'];
  ID: Scalars['Float'];
  OBSERVACION: Scalars['String'];
  ROLEASIGNADO: Scalars['String'];
  ROLPREASIGNADO: Scalars['String'];
};


export type MutationUpdateSolicitudAutorizacionArgs = {
  input: SolicitudAutorizacionInput;
};


export type MutationUpdateSucursalArgs = {
  input: SucursalUpdateInput;
};


export type MutationUpdateTierraCultivoArgs = {
  input: TierraCultivoInput;
};


export type MutationUpdateUsuarioArgs = {
  input: UsuarioUpdateInput;
};

export type Observacion = {
  __typename?: 'Observacion';
  ESTADO_ACONDICIONAMIENTO: EstadosObservacion;
  ESTADO_ANALISIS: EstadosObservacion;
  ESTADO_CULT_COMERCIAL: EstadosObservacion;
  ESTADO_DATOS_GENERALES: EstadosObservacion;
  ESTADO_INFO_CULTIVO: EstadosObservacion;
  ESTADO_INFO_ENSAYO: EstadosObservacion;
  ESTADO_MANT_SEMILLA: EstadosObservacion;
  ESTADO_PROFESIONAL: EstadosObservacion;
  ESTADO_SUCURSALES: EstadosObservacion;
  ESTADO_TIERRAS: EstadosObservacion;
  EXPEDIENTE_ID: Scalars['Int'];
  OBSERVACION_ID: Scalars['Float'];
  OBS_ACONDICIONAMIENTO?: Maybe<Scalars['String']>;
  OBS_ANALISIS?: Maybe<Scalars['String']>;
  OBS_CULT_COMERCIAL?: Maybe<Scalars['String']>;
  OBS_DATOS_GENERALES?: Maybe<Scalars['String']>;
  OBS_INFO_CULTIVO?: Maybe<Scalars['String']>;
  OBS_INFO_ENSAYO?: Maybe<Scalars['String']>;
  OBS_MANT_SEMILLA?: Maybe<Scalars['String']>;
  OBS_PROFESIONAL?: Maybe<Scalars['String']>;
  OBS_SUCURSALES?: Maybe<Scalars['String']>;
  OBS_TIERRAS?: Maybe<Scalars['String']>;
};

export type ObservacionUpdateInput = {
  estado: EstadosObservacion;
  expedienteId: Scalars['Int'];
  observacion?: InputMaybe<Scalars['String']>;
  paso: PasosObservacion;
};

/** Los pasos disponibles para las observaciones. */
export enum PasosObservacion {
  Acondicionamiento = 'ACONDICIONAMIENTO',
  Analisis = 'ANALISIS',
  CultivarComercial = 'CULTIVAR_COMERCIAL',
  DatosGenerales = 'DATOS_GENERALES',
  InformacionEnsayo = 'INFORMACION_ENSAYO',
  InfoCultivo = 'INFO_CULTIVO',
  MantenimientoSemilla = 'MANTENIMIENTO_SEMILLA',
  Profesional = 'PROFESIONAL',
  Sucursales = 'SUCURSALES',
  Tierras = 'TIERRAS'
}

export type Persona = {
  __typename?: 'Persona';
  APELLIDOS?: Maybe<Scalars['String']>;
  CORREO: Scalars['String'];
  FECHA_REGISTRO: Scalars['Date'];
  NOMBRES?: Maybe<Scalars['String']>;
  NUMERO_DOCUMENTO?: Maybe<Scalars['String']>;
  PERSONA_ID: Scalars['Int'];
  TELEFONO?: Maybe<Scalars['String']>;
  TIPO_DOCUMENTO?: Maybe<Scalars['String']>;
};

export type PersonaJuridica = {
  __typename?: 'PersonaJuridica';
  direccion: Scalars['String'];
  documentoNumero: Scalars['String'];
  documentoTipo: Scalars['String'];
  nombreRazonSocial: Scalars['String'];
  personaTipo: Scalars['String'];
};

export type Profesional = {
  __typename?: 'Profesional';
  APELLIDOS: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DOMICILIO_LEGAL: Scalars['String'];
  EMAIL: Scalars['String'];
  ESPECIFICAR_PROFESION: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  NOMBRES: Scalars['String'];
  NUMERO_CIP?: Maybe<Scalars['String']>;
  NUMERO_DOCUMENTO: Scalars['String'];
  PROFESIONAL_RESPONSABLE_ID: Scalars['Int'];
  PROVINCIA: Scalars['String'];
  TELEFONO: Scalars['String'];
  TIPO_DOCUMENTO: Scalars['String'];
  TIPO_PROFESIONAL: Scalars['String'];
};

export type ProfesionalInput = {
  APELLIDOS: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DOMICILIO_LEGAL: Scalars['String'];
  EMAIL: Scalars['String'];
  ESPECIFICAR_PROFESION?: InputMaybe<Scalars['String']>;
  EXPEDIENTE_ID: Scalars['Int'];
  NOMBRES: Scalars['String'];
  NUMERO_CIP?: InputMaybe<Scalars['String']>;
  NUMERO_DOCUMENTO: Scalars['String'];
  PROFESIONAL_RESPONSABLE_ID?: InputMaybe<Scalars['Float']>;
  PROVINCIA: Scalars['String'];
  TELEFONO: Scalars['String'];
  TIPO_DOCUMENTO: Scalars['String'];
  TIPO_PROFESIONAL: Scalars['String'];
};

export type ProfesionalResponse = {
  __typename?: 'ProfesionalResponse';
  errors?: Maybe<Array<FieldError>>;
  profesional?: Maybe<Profesional>;
};

export type Provincia = {
  __typename?: 'Provincia';
  CODI_DEPA_DPT: Scalars['String'];
  CODI_PROV_TPR: Scalars['String'];
  NOMB_PROV_TPR: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAcondicionamientoByExpediente?: Maybe<Acondicionamiento>;
  getAcondicionamientoById?: Maybe<Acondicionamiento>;
  getAllConocimiento: Array<Conocimiento>;
  getAllCultivares: CultivaresPaginatedResponse;
  getAllDepartamentos: Array<Departamento>;
  getAllEspecializaciones: Array<Especializacion>;
  getAllEspecies?: Maybe<ESpeciePaginatedResponse>;
  getAllExpedientes: ExpedientePaginatedResponse;
  getAllExperiencias: Array<Experiencia>;
  getAllInformacionResponsables: Array<InformacionResponsable>;
  getAllLaboratorios: Array<Laboratorio>;
  getAllProfesionales: Array<Profesional>;
  getAllResponsables: Array<Responsable>;
  getAllSedes: Array<Sede>;
  getAllSolicitantes: Array<Solicitante>;
  getAllTierraCultivo: TierraCultivo;
  getAllUsuarios: UsuarioPaginatedResponse;
  getArchivosByNumeRegiArc?: Maybe<ArchivoResponse>;
  getConocimientoById?: Maybe<Conocimiento>;
  getConocimientoByResponsable: Array<Conocimiento>;
  getCultivarByEspecie?: Maybe<Array<Cultivares>>;
  getCultivaresByName?: Maybe<Array<Cultivares>>;
  getDatosJuridica?: Maybe<PersonaJuridica>;
  getDistritos: Array<Distrito>;
  getEspecializacionById?: Maybe<Especializacion>;
  getEspecializacionByProfesional: Array<Especializacion>;
  getEspeciesByName?: Maybe<Array<Especies>>;
  getExpedienteByBPM?: Maybe<ExpedienteResponse>;
  getExpedienteById?: Maybe<ExpedienteResponse>;
  getExpedientesByEspecialista: Array<ExpedienteResponse>;
  getExperienciasById?: Maybe<Experiencia>;
  getExperienciasByProfesional: Array<Experiencia>;
  getInfoCulivoById?: Maybe<Array<InformacionCultivo>>;
  getInfoCultivoByExpediente?: Maybe<Array<InformacionCultivo>>;
  getInformacionResponsableById?: Maybe<InformacionResponsable>;
  getObservacionesByExpediente: Observacion;
  getPersonaNatural?: Maybe<DatosReniec>;
  getProfesionalById?: Maybe<Profesional>;
  getProvincias: Array<Provincia>;
  getResponsableByExp?: Maybe<Responsable>;
  getResponsableById?: Maybe<Responsable>;
  getResponsableByRole: Array<Responsable>;
  getSedes: Array<Sede>;
  getSolicitanteById?: Maybe<Solicitante>;
  getSolicitudByExp?: Maybe<SolicitudAutorizacion>;
  getSolicitudByRole: Array<SolicitudAutorizacion>;
  getTierraCultivoById?: Maybe<TierraCultivo>;
  getTramiteByRegistroId?: Maybe<Tramite>;
  getTramiteResponsableByRegistroId?: Maybe<TramiteResp>;
  getTramiteSolcitudByRegistroId?: Maybe<TramiteSolicitudObject>;
  getUsuarioById?: Maybe<Usuario>;
  isDocumentoUnique: Scalars['Boolean'];
  isValidUser: Scalars['Boolean'];
};


export type QueryGetAcondicionamientoByExpedienteArgs = {
  expedienteId: Scalars['Int'];
};


export type QueryGetAcondicionamientoByIdArgs = {
  acondicionamientoId: Scalars['Int'];
};


export type QueryGetAllCultivaresArgs = {
  estado?: InputMaybe<Estados>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};


export type QueryGetAllEspeciesArgs = {
  denominacion?: InputMaybe<Estados>;
  estado?: InputMaybe<Estados>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};


export type QueryGetAllExpedientesArgs = {
  estado?: InputMaybe<EstadosExpedientes>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  sede?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllUsuariosArgs = {
  estado?: InputMaybe<EstadosUsuario>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  rol?: InputMaybe<RolesUsuarios>;
  sede?: InputMaybe<Scalars['Int']>;
};


export type QueryGetArchivosByNumeRegiArcArgs = {
  numeRegiArc: Scalars['String'];
};


export type QueryGetConocimientoByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetConocimientoByResponsableArgs = {
  profesionalId: Scalars['Float'];
};


export type QueryGetCultivarByEspecieArgs = {
  especieId: Scalars['Int'];
  estado?: InputMaybe<Estados>;
};


export type QueryGetCultivaresByNameArgs = {
  query: Scalars['String'];
};


export type QueryGetDatosJuridicaArgs = {
  ruc: Scalars['String'];
};


export type QueryGetDistritosArgs = {
  codDepa: Scalars['String'];
  codProv: Scalars['String'];
};


export type QueryGetEspecializacionByIdArgs = {
  especializacionId: Scalars['Float'];
};


export type QueryGetEspecializacionByProfesionalArgs = {
  profesionalId: Scalars['Float'];
};


export type QueryGetEspeciesByNameArgs = {
  denominacion?: InputMaybe<Estados>;
  estado?: InputMaybe<Estados>;
  query: Scalars['String'];
};


export type QueryGetExpedienteByBpmArgs = {
  nroDocumento: Scalars['String'];
  nroExpediente: Scalars['String'];
  tipoDocumento: Scalars['String'];
};


export type QueryGetExpedienteByIdArgs = {
  expedienteId: Scalars['String'];
  nroDocumento: Scalars['String'];
  tipoDocumento: Scalars['String'];
};


export type QueryGetExpedientesByEspecialistaArgs = {
  especialistaId: Scalars['Int'];
};


export type QueryGetExperienciasByIdArgs = {
  experienciaId: Scalars['Float'];
};


export type QueryGetExperienciasByProfesionalArgs = {
  profesionalId: Scalars['Float'];
};


export type QueryGetInfoCulivoByIdArgs = {
  infoCultivoId: Scalars['Int'];
};


export type QueryGetInfoCultivoByExpedienteArgs = {
  expedienteId: Scalars['Int'];
};


export type QueryGetInformacionResponsableByIdArgs = {
  ID: Scalars['Int'];
};


export type QueryGetObservacionesByExpedienteArgs = {
  expedienteId: Scalars['Int'];
};


export type QueryGetPersonaNaturalArgs = {
  dni: Scalars['String'];
};


export type QueryGetProfesionalByIdArgs = {
  profesionaId: Scalars['Int'];
};


export type QueryGetProvinciasArgs = {
  codDepa: Scalars['String'];
};


export type QueryGetResponsableByExpArgs = {
  expediente: Scalars['String'];
};


export type QueryGetResponsableByIdArgs = {
  ID: Scalars['Int'];
};


export type QueryGetResponsableByRoleArgs = {
  ROLASIGNADO: Scalars['String'];
};


export type QueryGetSolicitanteByIdArgs = {
  solicitanteId: Scalars['Int'];
};


export type QueryGetSolicitudByExpArgs = {
  expediente: Scalars['String'];
};


export type QueryGetSolicitudByRoleArgs = {
  ROLASIGNADO: Scalars['String'];
};


export type QueryGetTierraCultivoByIdArgs = {
  tierraCultivoId: Scalars['Int'];
};


export type QueryGetTramiteByRegistroIdArgs = {
  expedienteId: Scalars['Int'];
};


export type QueryGetTramiteResponsableByRegistroIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetTramiteSolcitudByRegistroIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetUsuarioByIdArgs = {
  userId: Scalars['Int'];
};


export type QueryIsDocumentoUniqueArgs = {
  nroDocumento: Scalars['String'];
  tipoDocumento: Scalars['String'];
  tipoSolicitud: TipoSolicitudExpedientes;
};


export type QueryIsValidUserArgs = {
  username: Scalars['String'];
};

export type Responsable = {
  __typename?: 'Responsable';
  CORREO: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  ESTADO?: Maybe<Scalars['String']>;
  EXPEDIENTE: Scalars['String'];
  FECHA_REGISTRO?: Maybe<Scalars['Date']>;
  FECHA_REVISION?: Maybe<Scalars['Date']>;
  ID: Scalars['Int'];
  OBSERVACION?: Maybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL: Scalars['String'];
  REPRESENTANTE_LEGAL: Scalars['String'];
  ROLASIGNADO?: Maybe<Scalars['String']>;
  RUC: Scalars['String'];
  SEDE_OPERADOR: Scalars['String'];
  TELEFONO: Scalars['String'];
};

export type ResponsableInput = {
  CORREO: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  ESTADO?: InputMaybe<Scalars['String']>;
  EXPEDIENTE?: InputMaybe<Scalars['String']>;
  ID?: InputMaybe<Scalars['Int']>;
  OBSERVACION?: InputMaybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL: Scalars['String'];
  REPRESENTANTE_LEGAL: Scalars['String'];
  ROLASIGNADO?: InputMaybe<Scalars['String']>;
  RUC: Scalars['String'];
  SEDE_OPERADOR: Scalars['String'];
  TELEFONO: Scalars['String'];
};

export type ResponsableResponse = {
  __typename?: 'ResponsableResponse';
  errors?: Maybe<Array<FieldError>>;
  informacion?: Maybe<Responsable>;
};

/** Los roles disponibles. */
export enum RolesUsuarios {
  Admin = 'ADMIN',
  Analista = 'ANALISTA',
  Director = 'DIRECTOR',
  Directorejecutivo = 'DIRECTOREJECUTIVO',
  Especialista = 'ESPECIALISTA',
  Jasv = 'JASV',
  JefeArea = 'JEFE_AREA',
  User = 'USER'
}

export type Sede = {
  __typename?: 'Sede';
  DEPARTAMENTO_ID: Scalars['String'];
  DIRECCION: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  FECHA_REGISTRO: Scalars['Date'];
  JEFE_AREA_ID?: Maybe<Scalars['Int']>;
  NOMBRE_SEDE: Scalars['String'];
  NOMENCLATURA: Scalars['String'];
  PERSONA?: Maybe<Persona>;
  PROVINCIA_ID: Scalars['String'];
  SEDE_ID: Scalars['Int'];
};

export type SedeUpdateInput = {
  JEFE_AREA_ID?: InputMaybe<Scalars['Int']>;
  SEDE_ID: Scalars['Int'];
};

export type SendStatusUserResponse = {
  __typename?: 'SendStatusUserResponse';
  data?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<FieldError>>;
};

export type Solicitante = {
  __typename?: 'Solicitante';
  APELLIDOS_SOLICITANTE?: Maybe<Scalars['String']>;
  APELLIDO_REPRESENTANTE?: Maybe<Scalars['String']>;
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI_REPRESENTANTE?: Maybe<Scalars['String']>;
  DOMICILIO_LEGAL: Scalars['String'];
  EMAIL_REPRESENTANTE?: Maybe<Scalars['String']>;
  EMAIL_SOLICITANTE: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO: Scalars['Date'];
  NOMBRES_SOLICITANTE?: Maybe<Scalars['String']>;
  NOMBRE_REPRESENTANTE?: Maybe<Scalars['String']>;
  NUMERO_DOCUMENTO: Scalars['String'];
  PARTIDA_REGISTRAL?: Maybe<Scalars['String']>;
  PERSONA_EXTERNA_ID: Scalars['String'];
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL?: Maybe<Scalars['String']>;
  SOLICITANTE_ID: Scalars['Int'];
  TELEFONO_SOLICITANTE: Scalars['String'];
  TIPO_DOCUMENTO: Scalars['String'];
};

export type SolicitanteInput = {
  APELLIDOS_SOLICITANTE?: InputMaybe<Scalars['String']>;
  APELLIDO_REPRESENTANTE?: InputMaybe<Scalars['String']>;
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI_REPRESENTANTE?: InputMaybe<Scalars['String']>;
  DOMICILIO_LEGAL: Scalars['String'];
  EMAIL_REPRESENTANTE?: InputMaybe<Scalars['String']>;
  EMAIL_SOLICITANTE: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  NOMBRES_SOLICITANTE?: InputMaybe<Scalars['String']>;
  NOMBRE_REPRESENTANTE?: InputMaybe<Scalars['String']>;
  NUMERO_DOCUMENTO: Scalars['String'];
  PARTIDA_REGISTRAL?: InputMaybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL?: InputMaybe<Scalars['String']>;
  SOLICITANTE_ID?: InputMaybe<Scalars['Int']>;
  TELEFONO_SOLICITANTE: Scalars['String'];
  TIPO_DOCUMENTO: Scalars['String'];
};

export type SolicitanteResponse = {
  __typename?: 'SolicitanteResponse';
  errors?: Maybe<Array<FieldError>>;
  informacion?: Maybe<Solicitante>;
};

export type SolicitudAutorizacion = {
  __typename?: 'SolicitudAutorizacion';
  CORREO: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  ESTADO?: Maybe<Scalars['String']>;
  EXPEDIENTE: Scalars['String'];
  FECHA_REGISTRO?: Maybe<Scalars['Date']>;
  FECHA_REVISION?: Maybe<Scalars['Date']>;
  ID: Scalars['Int'];
  OBSERVACION?: Maybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL: Scalars['String'];
  REPRESENTANTE_LEGAL: Scalars['String'];
  ROLASIGNADO?: Maybe<Scalars['String']>;
  ROLPREASIGNADO?: Maybe<Scalars['String']>;
  RUC: Scalars['String'];
  TELEFONO: Scalars['String'];
};

export type SolicitudAutorizacionInput = {
  CORREO: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  ESTADO?: InputMaybe<Scalars['String']>;
  EXPEDIENTE?: InputMaybe<Scalars['String']>;
  ID?: InputMaybe<Scalars['Int']>;
  OBSERVACION?: InputMaybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL: Scalars['String'];
  REPRESENTANTE_LEGAL: Scalars['String'];
  ROLASIGNADO?: InputMaybe<Scalars['String']>;
  ROLPREASIGNADO?: InputMaybe<Scalars['String']>;
  RUC: Scalars['String'];
  TELEFONO: Scalars['String'];
};

export type SolicitudAutorizacionResponse = {
  __typename?: 'SolicitudAutorizacionResponse';
  errors?: Maybe<Array<FieldError>>;
  informacion?: Maybe<SolicitudAutorizacion>;
};

export type Sucursal = {
  __typename?: 'Sucursal';
  DEPARTAMENTO_ID: Scalars['String'];
  DIRECCION_SUCURSAL: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO: Scalars['Date'];
  NOMBRE_SUCURSAL: Scalars['String'];
  PROVINCIA_ID: Scalars['String'];
  SUCURSAL_ID: Scalars['Int'];
};

export type SucursalCreateInput = {
  DEPARTAMENTO_ID: Scalars['String'];
  DIRECCION_SUCURSAL: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  NOMBRE_SUCURSAL: Scalars['String'];
  PROVINCIA_ID: Scalars['String'];
};

export type SucursalCreateResponse = {
  __typename?: 'SucursalCreateResponse';
  data?: Maybe<Array<Sucursal>>;
  errors?: Maybe<Array<FieldError>>;
};

export type SucursalUpdateInput = {
  DEPARTAMENTO_ID: Scalars['String'];
  DIRECCION_SUCURSAL: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  NOMBRE_SUCURSAL: Scalars['String'];
  PROVINCIA_ID: Scalars['String'];
  SUCURSAL_ID: Scalars['Int'];
};

export type SucursalUpdateResponse = {
  __typename?: 'SucursalUpdateResponse';
  data?: Maybe<Sucursal>;
  errors?: Maybe<Array<FieldError>>;
};

export type TierraCultivo = {
  __typename?: 'TierraCultivo';
  AREA: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO?: Maybe<Scalars['Date']>;
  NOMBRE_PREDIO: Scalars['String'];
  NUME_REGI_ARC?: Maybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  TIERRA_CULTIVO_ID: Scalars['Int'];
  TIPO_TENENCIA: Scalars['String'];
};

export type TierraCultivoInput = {
  AREA: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  EXPEDIENTE_ID?: InputMaybe<Scalars['Int']>;
  NOMBRE_PREDIO: Scalars['String'];
  NUME_REGI_ARC?: InputMaybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  TIERRA_CULTIVO_ID?: InputMaybe<Scalars['Int']>;
  TIPO_TENENCIA: Scalars['String'];
};

export type TierraCultivoResponseCreate = {
  __typename?: 'TierraCultivoResponseCreate';
  errors?: Maybe<Array<FieldError>>;
  tierras?: Maybe<Array<TierraCultivo>>;
};

export type TierraCultivoResponseUpdate = {
  __typename?: 'TierraCultivoResponseUpdate';
  errors?: Maybe<Array<FieldError>>;
  tierras?: Maybe<TierraCultivo>;
};

/** Tipo cultivar nativo */
export enum TipoNativo {
  CultivarNativo = 'CULTIVAR_NATIVO',
  CultivarNoNativo = 'CULTIVAR_NO_NATIVO'
}

/** Los tipos de solicitudes disponibles para los expedientes. */
export enum TipoSolicitudExpedientes {
  DeclaracionSemilla = 'DECLARACION_SEMILLA',
  RegistroCultivarComercial = 'REGISTRO_CULTIVAR_COMERCIAL',
  RegistroProductor = 'REGISTRO_PRODUCTOR'
}

export type Tramite = {
  __typename?: 'Tramite';
  ACONDICIONAMIENTO?: Maybe<Acondicionamiento>;
  ALMACENES?: Maybe<Array<TramiteAlmacen>>;
  ANALISIS_CALIDAD?: Maybe<TramiteAnalisisCalidad>;
  CULTIVAR_COMERCIAL?: Maybe<CultivarComercial>;
  ESPECIALIDAD?: Maybe<Array<Especializacion>>;
  ESTADO: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Float'];
  EXPERIENCIA?: Maybe<Array<TramiteExperiencia>>;
  FECHA_REGISTRO: Scalars['Date'];
  INFORMACION_ENSAYO?: Maybe<InformacionEnsayo>;
  INFO_CULTIVO?: Maybe<Array<TramiteInfoCultivo>>;
  LOCALIDAD_ENSAYO?: Maybe<Array<LocalidadEnsayo>>;
  MANTENIMIENTO_SEMILLA?: Maybe<MantSemilla>;
  NUMERO_EXPEDIENTE?: Maybe<Scalars['String']>;
  PROFESIONAL?: Maybe<TramiteProfesional>;
  SEDE_ID: Scalars['Int'];
  SOLICITANTE?: Maybe<TramiteSolicitante>;
  SUCURSALES?: Maybe<Array<TramiteSucursal>>;
  TIERRAS_CULTIVOS?: Maybe<Array<TramiteTierraCultivo>>;
  TIPO_SOLICITUD: TipoSolicitudExpedientes;
};

export type TramiteAlmacen = {
  __typename?: 'TramiteAlmacen';
  ALMACEN_ID: Scalars['Int'];
  DEPARTAMENTO_ID: Scalars['String'];
  DIRECCION: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO: Scalars['Date'];
  NOMBRE_DEPARTAMENTO?: Maybe<Scalars['String']>;
  NOMBRE_DISTRITO?: Maybe<Scalars['String']>;
  NOMBRE_PROVINCIA?: Maybe<Scalars['String']>;
  NUME_REGI_ARC?: Maybe<Scalars['String']>;
  PROVINCIA_ID: Scalars['String'];
};

export type TramiteAnalisisCalidad = {
  __typename?: 'TramiteAnalisisCalidad';
  ANALISIS_ID: Scalars['Int'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO: Scalars['Date'];
  LABORATORIO_ID?: Maybe<Scalars['Int']>;
  NOMBRE_LABORATORIO?: Maybe<Scalars['String']>;
  SEMILLA_ASEXUAL: Estados;
  SEMILLA_SEXUAL: Estados;
};

export type TramiteConocimiento = {
  __typename?: 'TramiteConocimiento';
  FECHA_INICIO: Scalars['Date'];
  FECHA_TERMINO: Scalars['Date'];
  HORAS: Scalars['String'];
  ID: Scalars['Int'];
  LUGAR: Scalars['String'];
  NOMBRE: Scalars['String'];
  NOMBRE_DEPARTAMENTO?: Maybe<Scalars['String']>;
  NOMBRE_DISTRITO?: Maybe<Scalars['String']>;
  NOMBRE_PROVINCIA?: Maybe<Scalars['String']>;
  NUME_REGI_ARC?: Maybe<Scalars['String']>;
  RESPONSABLE_ID: Scalars['Int'];
};

export type TramiteExperiencia = {
  __typename?: 'TramiteExperiencia';
  ACTIVIDAD_DESARROLLADA: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  EXPERIENCIA_RELACIONADA_ID: Scalars['Int'];
  FECHA_INICIO: Scalars['Date'];
  FECHA_TERMINO: Scalars['Date'];
  NOMBRE_DEPARTAMENTO?: Maybe<Scalars['String']>;
  NOMBRE_DISTRITO?: Maybe<Scalars['String']>;
  NOMBRE_PROVINCIA?: Maybe<Scalars['String']>;
  NUME_REGI_ARC?: Maybe<Scalars['String']>;
  PROFESIONAL_RESPONSABLE_ID: Scalars['Int'];
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL: Scalars['String'];
};

export type TramiteInfoCultivo = {
  __typename?: 'TramiteInfoCultivo';
  CULTIVO_ID?: Maybe<Scalars['Int']>;
  CULTIVO_REGLAMENTARIO?: Maybe<Scalars['String']>;
  ESPECIE_ID: Scalars['Int'];
  EXPEDIENTE_ID: Scalars['Int'];
  INFORMACION_CULTIVO_ID: Scalars['Int'];
  NOMBRE_CULTIVO?: Maybe<Scalars['String']>;
  NOMBRE_ESPECIE?: Maybe<Scalars['String']>;
};

export type TramiteProfesional = {
  __typename?: 'TramiteProfesional';
  APELLIDOS: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DOMICILIO_LEGAL: Scalars['String'];
  EMAIL: Scalars['String'];
  ESPECIFICAR_PROFESION: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  NOMBRES: Scalars['String'];
  NOMBRE_DEPARTAMENTO?: Maybe<Scalars['String']>;
  NOMBRE_DISTRITO?: Maybe<Scalars['String']>;
  NOMBRE_PROVINCIA?: Maybe<Scalars['String']>;
  NUMERO_CIP?: Maybe<Scalars['String']>;
  NUMERO_DOCUMENTO: Scalars['String'];
  PROFESIONAL_RESPONSABLE_ID: Scalars['Int'];
  PROVINCIA: Scalars['String'];
  TELEFONO: Scalars['String'];
  TIPO_DOCUMENTO: Scalars['String'];
  TIPO_PROFESIONAL: Scalars['String'];
};

export type TramiteResonsable = {
  __typename?: 'TramiteResonsable';
  CORREO: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  ESTADO?: Maybe<Scalars['String']>;
  EXPEDIENTE: Scalars['String'];
  FECHA_REGISTRO?: Maybe<Scalars['Date']>;
  FECHA_REVISION?: Maybe<Scalars['Date']>;
  ID: Scalars['Int'];
  NOMBRE_DEPARTAMENTO?: Maybe<Scalars['String']>;
  NOMBRE_DISTRITO?: Maybe<Scalars['String']>;
  NOMBRE_PROVINCIA?: Maybe<Scalars['String']>;
  OBSERVACION?: Maybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL: Scalars['String'];
  REPRESENTANTE_LEGAL: Scalars['String'];
  ROLASIGNADO?: Maybe<Scalars['String']>;
  RUC: Scalars['String'];
  SEDE_OPERADOR: Scalars['String'];
  TELEFONO: Scalars['String'];
};

export type TramiteResp = {
  __typename?: 'TramiteResp';
  CONOCIMIENTO?: Maybe<Array<TramiteConocimiento>>;
  INFRESPONSABLE?: Maybe<TramiteinfResponsable>;
  RESPONSABLE?: Maybe<TramiteResonsable>;
};

export type TramiteSolicitante = {
  __typename?: 'TramiteSolicitante';
  APELLIDOS_SOLICITANTE?: Maybe<Scalars['String']>;
  APELLIDO_REPRESENTANTE?: Maybe<Scalars['String']>;
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI_REPRESENTANTE?: Maybe<Scalars['String']>;
  DOMICILIO_LEGAL: Scalars['String'];
  EMAIL_REPRESENTANTE?: Maybe<Scalars['String']>;
  EMAIL_SOLICITANTE: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO: Scalars['Date'];
  NOMBRES_SOLICITANTE?: Maybe<Scalars['String']>;
  NOMBRE_DEPARTAMENTO?: Maybe<Scalars['String']>;
  NOMBRE_DISTRITO?: Maybe<Scalars['String']>;
  NOMBRE_PROVINCIA?: Maybe<Scalars['String']>;
  NOMBRE_REPRESENTANTE?: Maybe<Scalars['String']>;
  NUMERO_DOCUMENTO: Scalars['String'];
  PARTIDA_REGISTRAL?: Maybe<Scalars['String']>;
  PERSONA_EXTERNA_ID: Scalars['String'];
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL?: Maybe<Scalars['String']>;
  SOLICITANTE_ID: Scalars['Int'];
  TELEFONO_SOLICITANTE: Scalars['String'];
  TIPO_DOCUMENTO: Scalars['String'];
};

export type TramiteSolicitud = {
  __typename?: 'TramiteSolicitud';
  CORREO: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  ESTADO?: Maybe<Scalars['String']>;
  EXPEDIENTE: Scalars['String'];
  FECHA_REGISTRO?: Maybe<Scalars['Date']>;
  FECHA_REVISION?: Maybe<Scalars['Date']>;
  ID: Scalars['Int'];
  NOMBRE_DEPARTAMENTO?: Maybe<Scalars['String']>;
  NOMBRE_DISTRITO?: Maybe<Scalars['String']>;
  NOMBRE_PROVINCIA?: Maybe<Scalars['String']>;
  OBSERVACION?: Maybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  RAZON_SOCIAL: Scalars['String'];
  REPRESENTANTE_LEGAL: Scalars['String'];
  ROLASIGNADO?: Maybe<Scalars['String']>;
  ROLPREASIGNADO?: Maybe<Scalars['String']>;
  RUC: Scalars['String'];
  TELEFONO: Scalars['String'];
};

export type TramiteSolicitudObject = {
  __typename?: 'TramiteSolicitudObject';
  INFSOLICITUD?: Maybe<TramiteinfSolicitud>;
  SOLICITUD?: Maybe<TramiteSolicitud>;
};

export type TramiteSucursal = {
  __typename?: 'TramiteSucursal';
  DEPARTAMENTO_ID: Scalars['String'];
  DIRECCION_SUCURSAL: Scalars['String'];
  DISTRITO_ID: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO: Scalars['Date'];
  NOMBRE_DEPARTAMENTO?: Maybe<Scalars['String']>;
  NOMBRE_DISTRITO?: Maybe<Scalars['String']>;
  NOMBRE_PROVINCIA?: Maybe<Scalars['String']>;
  NOMBRE_SUCURSAL: Scalars['String'];
  PROVINCIA_ID: Scalars['String'];
  SUCURSAL_ID: Scalars['Int'];
};

export type TramiteTierraCultivo = {
  __typename?: 'TramiteTierraCultivo';
  AREA: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  EXPEDIENTE_ID: Scalars['Int'];
  FECHA_REGISTRO?: Maybe<Scalars['Date']>;
  NOMBRE_DEPARTAMENTO?: Maybe<Scalars['String']>;
  NOMBRE_DISTRITO?: Maybe<Scalars['String']>;
  NOMBRE_PREDIO: Scalars['String'];
  NOMBRE_PROVINCIA?: Maybe<Scalars['String']>;
  NUME_REGI_ARC?: Maybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  TIERRA_CULTIVO_ID: Scalars['Int'];
  TIPO_TENENCIA: Scalars['String'];
};

export type TramiteinfResponsable = {
  __typename?: 'TramiteinfResponsable';
  APELLIDOS?: Maybe<Scalars['String']>;
  APENOMB: Scalars['String'];
  COLEGIATURA: Scalars['String'];
  CORREO: Scalars['String'];
  CURRICULUM: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  FECHA_REGISTRO?: Maybe<Scalars['Date']>;
  ID: Scalars['Int'];
  NOMBRES: Scalars['String'];
  NOMBRE_DEPARTAMENTO?: Maybe<Scalars['String']>;
  NOMBRE_DISTRITO?: Maybe<Scalars['String']>;
  NOMBRE_PROVINCIA?: Maybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  RESPONSABLE_ID?: Maybe<Scalars['Int']>;
  TELEFONO: Scalars['String'];
  TITULOPROFESIONAL: Scalars['String'];
};

export type TramiteinfSolicitud = {
  __typename?: 'TramiteinfSolicitud';
  APENOMB: Scalars['String'];
  DEPARTAMENTO: Scalars['String'];
  DISTRITO: Scalars['String'];
  DNI: Scalars['String'];
  DOMICILIO: Scalars['String'];
  FECHA_REGISTRO?: Maybe<Scalars['Date']>;
  ID: Scalars['Int'];
  NOMBRE_DEPARTAMENTO?: Maybe<Scalars['String']>;
  NOMBRE_DISTRITO?: Maybe<Scalars['String']>;
  NOMBRE_PROVINCIA?: Maybe<Scalars['String']>;
  NUME_REGI_FUNCIONAMIENTO?: Maybe<Scalars['String']>;
  NUME_REGI_MEMORIA?: Maybe<Scalars['String']>;
  NUME_REGI_PLANO?: Maybe<Scalars['String']>;
  NUME_REGI_SENSOR?: Maybe<Scalars['String']>;
  NUME_REGI_TERMICO?: Maybe<Scalars['String']>;
  NUME_REGI_TRAMITE?: Maybe<Scalars['String']>;
  PROVINCIA: Scalars['String'];
  SENSORES?: Maybe<Scalars['String']>;
  SOLICITUD_ID?: Maybe<Scalars['Int']>;
  TIPOAUTORIZACION: Scalars['String'];
};

export type Usuario = {
  __typename?: 'Usuario';
  ESTADO: EstadosUsuario;
  FECHA_REGISTRO: Scalars['Date'];
  PERSONA?: Maybe<Persona>;
  ROL: RolesUsuarios;
  SEDE?: Maybe<Sede>;
  USERNAME: Scalars['String'];
  USER_ID: Scalars['Int'];
};

export type UsuarioCreateInput = {
  APELLIDOS: Scalars['String'];
  CORREO: Scalars['String'];
  NOMBRES: Scalars['String'];
  NUMERO_DOCUMENTO: Scalars['String'];
  ROL: RolesUsuarios;
  SEDE_ID?: InputMaybe<Scalars['Int']>;
  TELEFONO: Scalars['String'];
  TIPO_DOCUMENTO: Scalars['String'];
  USERNAME: Scalars['String'];
};

export type UsuarioPaginatedResponse = {
  __typename?: 'UsuarioPaginatedResponse';
  data: Array<Usuario>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalItems: Scalars['Int'];
};

export type UsuarioResponse = {
  __typename?: 'UsuarioResponse';
  data?: Maybe<Usuario>;
  errors?: Maybe<Array<FieldError>>;
};

export type UsuarioUpdateInput = {
  APELLIDOS: Scalars['String'];
  CORREO: Scalars['String'];
  ESTADO?: InputMaybe<EstadosUsuario>;
  NOMBRES: Scalars['String'];
  NUMERO_DOCUMENTO: Scalars['String'];
  ROL?: InputMaybe<RolesUsuarios>;
  SEDE_ID: Scalars['Int'];
  TELEFONO: Scalars['String'];
  TIPO_DOCUMENTO: Scalars['String'];
  USER_ID: Scalars['Float'];
};


export const CreateAcondicionamientoDocument = gql`
    mutation createAcondicionamiento($input: AcondicionamientoInput!) {
  createAcondicionamiento(input: $input) {
    data {
      ACONDICIONAMIENTO_ID
      RECEPCION
      OPERACIONES_ESPECIALES
      LIMPIEZA
      CLASIFICACION
      TRATAMIENTO
      ENVASADO
      ALMACENAMIENTO
      EXPEDIENTE_ID
      RECEPCION_ARC
      OPERACIONES_ESPECIALES_ARC
      LIMPIEZA_ARC
      CLASIFICACION_ARC
      TRATAMIENTO_ARC
      ENVASADO_ARC
      ALMACENAMIENTO_ARC
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateAcondicionamientoMutation() {
  return Urql.useMutation<CreateAcondicionamientoMutation, CreateAcondicionamientoMutationVariables>(CreateAcondicionamientoDocument);
};
export const UpdateAcondicionamientoDocument = gql`
    mutation updateAcondicionamiento($input: AcondicionamientoInput!) {
  updateAcondicionamiento(input: $input) {
    data {
      ACONDICIONAMIENTO_ID
      RECEPCION
      OPERACIONES_ESPECIALES
      LIMPIEZA
      CLASIFICACION
      TRATAMIENTO
      ENVASADO
      ALMACENAMIENTO
      EXPEDIENTE_ID
      RECEPCION_ARC
      OPERACIONES_ESPECIALES_ARC
      LIMPIEZA_ARC
      CLASIFICACION_ARC
      TRATAMIENTO_ARC
      ENVASADO_ARC
      ALMACENAMIENTO_ARC
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateAcondicionamientoMutation() {
  return Urql.useMutation<UpdateAcondicionamientoMutation, UpdateAcondicionamientoMutationVariables>(UpdateAcondicionamientoDocument);
};
export const CreateAlmacenDocument = gql`
    mutation createAlmacen($input: [AlmacenCreateInput!]!) {
  createAlmacen(input: $input) {
    data {
      ALMACEN_ID
      DIRECCION
      DEPARTAMENTO_ID
      PROVINCIA_ID
      DISTRITO_ID
      NUME_REGI_ARC
      EXPEDIENTE_ID
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateAlmacenMutation() {
  return Urql.useMutation<CreateAlmacenMutation, CreateAlmacenMutationVariables>(CreateAlmacenDocument);
};
export const DeleteAlmacenDocument = gql`
    mutation deleteAlmacen($almacenId: Int!) {
  deleteAlmacen(almacenId: $almacenId)
}
    `;

export function useDeleteAlmacenMutation() {
  return Urql.useMutation<DeleteAlmacenMutation, DeleteAlmacenMutationVariables>(DeleteAlmacenDocument);
};
export const UpdateAlmacenDocument = gql`
    mutation updateAlmacen($input: AlmacenUpdateInput!) {
  updateAlmacen(input: $input) {
    data {
      ALMACEN_ID
      DIRECCION
      DEPARTAMENTO_ID
      PROVINCIA_ID
      DISTRITO_ID
      NUME_REGI_ARC
      EXPEDIENTE_ID
      EXPEDIENTE_ID
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateAlmacenMutation() {
  return Urql.useMutation<UpdateAlmacenMutation, UpdateAlmacenMutationVariables>(UpdateAlmacenDocument);
};
export const CreateAnalisisCalidadDocument = gql`
    mutation createAnalisisCalidad($input: AnalisisCalidadCreateinput!) {
  createAnalisisCalidad(input: $input) {
    data {
      ANALISIS_ID
      SEMILLA_SEXUAL
      SEMILLA_ASEXUAL
      LABORATORIO_ID
      EXPEDIENTE_ID
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateAnalisisCalidadMutation() {
  return Urql.useMutation<CreateAnalisisCalidadMutation, CreateAnalisisCalidadMutationVariables>(CreateAnalisisCalidadDocument);
};
export const UpdateAnalisisCalidadDocument = gql`
    mutation updateAnalisisCalidad($input: AnalisisCalidadUpdateinput!) {
  updateAnalisisCalidad(input: $input) {
    data {
      ANALISIS_ID
      SEMILLA_SEXUAL
      SEMILLA_ASEXUAL
      LABORATORIO_ID
      EXPEDIENTE_ID
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateAnalisisCalidadMutation() {
  return Urql.useMutation<UpdateAnalisisCalidadMutation, UpdateAnalisisCalidadMutationVariables>(UpdateAnalisisCalidadDocument);
};
export const CreateArchivoDocument = gql`
    mutation createArchivo($input: CreateArchivoInput!) {
  createArchivo(input: $input) {
    data {
      NUME_REGI_ARC
      APLICACION
      MODULO
      REGISTRO
      DESCRIPCION_REGISTRO
      FECH_REGI_ARC
      ArchivosFisicos {
        NUME_REGI_ARC
        SECU_REGI_ARC
        FECH_CARG_ARC
        FLAG_IMAGEN
        FILENAME
        FILEEXTENSION
        NOMBRE_OBJETO
        DESCRIPCION
        FUENTE
        FLAG_RESTRINGIDO
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateArchivoMutation() {
  return Urql.useMutation<CreateArchivoMutation, CreateArchivoMutationVariables>(CreateArchivoDocument);
};
export const CreateArchivoFisicoDocument = gql`
    mutation createArchivoFisico($input: CreateArchivoFisicoInput!) {
  createArchivoFisico(input: $input) {
    data {
      NUME_REGI_ARC
      SECU_REGI_ARC
      FECH_CARG_ARC
      FLAG_IMAGEN
      FILENAME
      FILEEXTENSION
      NOMBRE_OBJETO
      DESCRIPCION
      FUENTE
      FLAG_RESTRINGIDO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateArchivoFisicoMutation() {
  return Urql.useMutation<CreateArchivoFisicoMutation, CreateArchivoFisicoMutationVariables>(CreateArchivoFisicoDocument);
};
export const DeleteArchivoFisicoDocument = gql`
    mutation deleteArchivoFisico($secuRegiArc: Float!, $numeRegiArc: String!) {
  deleteArchivoFisico(secuRegiArc: $secuRegiArc, numeRegiArc: $numeRegiArc)
}
    `;

export function useDeleteArchivoFisicoMutation() {
  return Urql.useMutation<DeleteArchivoFisicoMutation, DeleteArchivoFisicoMutationVariables>(DeleteArchivoFisicoDocument);
};
export const CreateConocimientoDocument = gql`
    mutation CreateConocimiento($input: [ConocimientoInput!]!) {
  createConocimiento(input: $input) {
    conocimiento {
      ID
      NOMBRE
      FECHA_INICIO
      FECHA_TERMINO
      HORAS
      LUGAR
      NUME_REGI_ARC
      RESPONSABLE_ID
    }
  }
}
    `;

export function useCreateConocimientoMutation() {
  return Urql.useMutation<CreateConocimientoMutation, CreateConocimientoMutationVariables>(CreateConocimientoDocument);
};
export const DeleteConocimientoDocument = gql`
    mutation DeleteConocimiento($deleteConocimientoId: Float!) {
  deleteConocimiento(id: $deleteConocimientoId)
}
    `;

export function useDeleteConocimientoMutation() {
  return Urql.useMutation<DeleteConocimientoMutation, DeleteConocimientoMutationVariables>(DeleteConocimientoDocument);
};
export const UpdateConocimientoDocument = gql`
    mutation UpdateConocimiento($input: ConocimientoInput!) {
  updateConocimiento(input: $input) {
    conocimiento {
      ID
      NOMBRE
      FECHA_INICIO
      FECHA_TERMINO
      HORAS
      LUGAR
      NUME_REGI_ARC
      RESPONSABLE_ID
    }
  }
}
    `;

export function useUpdateConocimientoMutation() {
  return Urql.useMutation<UpdateConocimientoMutation, UpdateConocimientoMutationVariables>(UpdateConocimientoDocument);
};
export const CreateCultivarComercialDocument = gql`
    mutation createCultivarComercial($input: CultivarComercialCreateInput!) {
  createCultivarComercial(input: $input) {
    data {
      CULTIVAR_COMERCIAL_ID
      NOMBRE_CULTIVAR
      PAIS
      FECHA_INTERNAMIENTO
      TIPO_CULTIVAR
      GENEOLOGIA
      NOMBRE_OBTENTOR
      EXPEDIENTE_ID
      FECHA_REGISTRO
      TIPO_NATIVO
      NOMBRE_CO_OBTENTOR
      FINALIDAD_USO
      RANGO_ADAPTACION
      NUME_REGI_ARC_DVC
      NUME_REGI_ARC_RIV
      NUME_REGI_ARC_DRCO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateCultivarComercialMutation() {
  return Urql.useMutation<CreateCultivarComercialMutation, CreateCultivarComercialMutationVariables>(CreateCultivarComercialDocument);
};
export const UpdateCultivarComercialDocument = gql`
    mutation updateCultivarComercial($input: CultivarComercialUpdateInput!) {
  updateCultivarComercial(input: $input) {
    data {
      CULTIVAR_COMERCIAL_ID
      NOMBRE_CULTIVAR
      PAIS
      FECHA_INTERNAMIENTO
      TIPO_CULTIVAR
      GENEOLOGIA
      NOMBRE_OBTENTOR
      EXPEDIENTE_ID
      FECHA_REGISTRO
      TIPO_NATIVO
      NOMBRE_CO_OBTENTOR
      FINALIDAD_USO
      RANGO_ADAPTACION
      NUME_REGI_ARC_DVC
      NUME_REGI_ARC_RIV
      NUME_REGI_ARC_DRCO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateCultivarComercialMutation() {
  return Urql.useMutation<UpdateCultivarComercialMutation, UpdateCultivarComercialMutationVariables>(UpdateCultivarComercialDocument);
};
export const CreateEspecializacionesDocument = gql`
    mutation CreateEspecializaciones($input: [EspecializacionInput!]!) {
  createEspecializaciones(input: $input) {
    especializacion {
      NOMBRE
      HORAS
      LUGAR
      FECHA_INICIO
      FECHA_TERMINO
      NUME_REGI_ARC
      TIPO_ESPECIALIDAD
      PROFESIONAL_RESPONSABLE_ID
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateEspecializacionesMutation() {
  return Urql.useMutation<CreateEspecializacionesMutation, CreateEspecializacionesMutationVariables>(CreateEspecializacionesDocument);
};
export const DeleteEspecializacionDocument = gql`
    mutation DeleteEspecializacion($especializacionId: Float!) {
  deleteEspecializacion(especializacionId: $especializacionId)
}
    `;

export function useDeleteEspecializacionMutation() {
  return Urql.useMutation<DeleteEspecializacionMutation, DeleteEspecializacionMutationVariables>(DeleteEspecializacionDocument);
};
export const UpdateEspecializacionDocument = gql`
    mutation updateEspecializacion($input: EspecializacionInput!) {
  updateEspecializacion(input: $input) {
    especializacion {
      ESPECIALIZACION_RELACIONADA_ID
      NOMBRE
      TIPO_ESPECIALIDAD
      FECHA_INICIO
      FECHA_TERMINO
      HORAS
      LUGAR
      NUME_REGI_ARC
      PROFESIONAL_RESPONSABLE_ID
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateEspecializacionMutation() {
  return Urql.useMutation<UpdateEspecializacionMutation, UpdateEspecializacionMutationVariables>(UpdateEspecializacionDocument);
};
export const CreateExpedienteDocument = gql`
    mutation createExpediente($input: ExpedienteCreateInput!) {
  createExpediente(input: $input) {
    expedienteId
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateExpedienteMutation() {
  return Urql.useMutation<CreateExpedienteMutation, CreateExpedienteMutationVariables>(CreateExpedienteDocument);
};
export const SendResumenToEmailDocument = gql`
    mutation SendResumenToEmail($tipoTramite: TipoSolicitudExpedientes!, $email: String!, $expedienteId: Int!) {
  sendResumenToEmail(
    tipoTramite: $tipoTramite
    email: $email
    expedienteId: $expedienteId
  )
}
    `;

export function useSendResumenToEmailMutation() {
  return Urql.useMutation<SendResumenToEmailMutation, SendResumenToEmailMutationVariables>(SendResumenToEmailDocument);
};
export const UpdateEstadoExpedienteDocument = gql`
    mutation UpdateEstadoExpediente($expedienteId: Int!, $estado: EstadosExpedientes!) {
  updateEstadoExpediente(estado: $estado, expedienteId: $expedienteId)
}
    `;

export function useUpdateEstadoExpedienteMutation() {
  return Urql.useMutation<UpdateEstadoExpedienteMutation, UpdateEstadoExpedienteMutationVariables>(UpdateEstadoExpedienteDocument);
};
export const CreateExperienciasDocument = gql`
    mutation CreateExperiencias($input: [ExperienciaInput!]!) {
  createExperiencias(input: $input) {
    experiencias {
      RAZON_SOCIAL
      ACTIVIDAD_DESARROLLADA
      FECHA_INICIO
      FECHA_TERMINO
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      NUME_REGI_ARC
      PROFESIONAL_RESPONSABLE_ID
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateExperienciasMutation() {
  return Urql.useMutation<CreateExperienciasMutation, CreateExperienciasMutationVariables>(CreateExperienciasDocument);
};
export const DeleteExperienciaDocument = gql`
    mutation DeleteExperiencia($experienciaId: Float!) {
  deleteExperiencia(experienciaId: $experienciaId)
}
    `;

export function useDeleteExperienciaMutation() {
  return Urql.useMutation<DeleteExperienciaMutation, DeleteExperienciaMutationVariables>(DeleteExperienciaDocument);
};
export const UpdateExperienciaDocument = gql`
    mutation updateExperiencia($input: ExperienciaInput!) {
  updateExperiencia(input: $input) {
    experiencias {
      EXPERIENCIA_RELACIONADA_ID
      RAZON_SOCIAL
      ACTIVIDAD_DESARROLLADA
      FECHA_INICIO
      FECHA_TERMINO
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      NUME_REGI_ARC
      PROFESIONAL_RESPONSABLE_ID
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateExperienciaMutation() {
  return Urql.useMutation<UpdateExperienciaMutation, UpdateExperienciaMutationVariables>(UpdateExperienciaDocument);
};
export const CreateInfoCultivoDocument = gql`
    mutation createInfoCultivo($input: [InformacionCultivoInput!]!) {
  createInfoCultivo(input: $input) {
    data {
      INFORMACION_CULTIVO_ID
      ESPECIE_ID
      CULTIVO_ID
      CULTIVO_REGLAMENTARIO
      EXPEDIENTE_ID
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateInfoCultivoMutation() {
  return Urql.useMutation<CreateInfoCultivoMutation, CreateInfoCultivoMutationVariables>(CreateInfoCultivoDocument);
};
export const DeleteInfoCultivoDocument = gql`
    mutation DeleteInfoCultivo($infoCultivoId: Int!) {
  deleteInfoCultivo(infoCultivoId: $infoCultivoId)
}
    `;

export function useDeleteInfoCultivoMutation() {
  return Urql.useMutation<DeleteInfoCultivoMutation, DeleteInfoCultivoMutationVariables>(DeleteInfoCultivoDocument);
};
export const UpdateInfoCultivoDocument = gql`
    mutation updateInfoCultivo($input: InformacionCultivoInput!) {
  updateInfoCultivo(input: $input) {
    data {
      INFORMACION_CULTIVO_ID
      ESPECIE_ID
      CULTIVO_ID
      CULTIVO_REGLAMENTARIO
      EXPEDIENTE_ID
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateInfoCultivoMutation() {
  return Urql.useMutation<UpdateInfoCultivoMutation, UpdateInfoCultivoMutationVariables>(UpdateInfoCultivoDocument);
};
export const CreateInfoEnsayoDocument = gql`
    mutation createInfoEnsayo($input: InformacionEnsayoCreateInput!) {
  createInfoEnsayo(input: $input) {
    data {
      INFORMACION_ENSAYO_ID
      AMBITO_GEOGRAFICO
      RANGO_ADAPTACION
      FINALIDAD_USO
      INSTALACION
      CAMPANAS_ENSAYOS
      CARACTERES_PRUEBA
      PLANTAS_TIPO
      PRIMERA_CAMPANA
      SEGUNDA_CAMPANA
      COMPORTAMIENTO_BIOTICO
      COMPORTAMIENTO_ABIOTICO
      NUME_REGI_ARC
      EXPEDIENTE_ID
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateInfoEnsayoMutation() {
  return Urql.useMutation<CreateInfoEnsayoMutation, CreateInfoEnsayoMutationVariables>(CreateInfoEnsayoDocument);
};
export const UpdateInfoEnsayoDocument = gql`
    mutation updateInfoEnsayo($input: InformacionEnsayoUpdateInput!) {
  updateInfoEnsayo(input: $input) {
    data {
      INFORMACION_ENSAYO_ID
      AMBITO_GEOGRAFICO
      RANGO_ADAPTACION
      FINALIDAD_USO
      INSTALACION
      CAMPANAS_ENSAYOS
      CARACTERES_PRUEBA
      PLANTAS_TIPO
      PRIMERA_CAMPANA
      SEGUNDA_CAMPANA
      COMPORTAMIENTO_BIOTICO
      COMPORTAMIENTO_ABIOTICO
      NUME_REGI_ARC
      EXPEDIENTE_ID
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateInfoEnsayoMutation() {
  return Urql.useMutation<UpdateInfoEnsayoMutation, UpdateInfoEnsayoMutationVariables>(UpdateInfoEnsayoDocument);
};
export const CreateInformacionSolicitudDocument = gql`
    mutation CreateInformacionSolicitud($input: InformacionSolicitudInput!) {
  createInformacionSolicitud(input: $input) {
    informacion {
      ID
      SOLICITUD_ID
      APENOMB
      DNI
    }
  }
}
    `;

export function useCreateInformacionSolicitudMutation() {
  return Urql.useMutation<CreateInformacionSolicitudMutation, CreateInformacionSolicitudMutationVariables>(CreateInformacionSolicitudDocument);
};
export const CreateInformacionResponsableDocument = gql`
    mutation CreateInformacionResponsable($input: InformacionResponsableInput!) {
  createInformacionResponsable(input: $input) {
    informacion {
      ID
      DNI
      APELLIDOS
      NOMBRES
      APENOMB
      DOMICILIO
      DEPARTAMENTO
      PROVINCIA
      DISTRITO
      TITULOPROFESIONAL
      COLEGIATURA
      CURRICULUM
      CORREO
      TELEFONO
      FECHA_REGISTRO
      RESPONSABLE_ID
    }
  }
}
    `;

export function useCreateInformacionResponsableMutation() {
  return Urql.useMutation<CreateInformacionResponsableMutation, CreateInformacionResponsableMutationVariables>(CreateInformacionResponsableDocument);
};
export const UpdateInformacionResponsableDocument = gql`
    mutation UpdateInformacionResponsable($input: InformacionResponsableInput!) {
  updateInformacionResponsable(input: $input) {
    informacion {
      ID
      DNI
      APELLIDOS
      NOMBRES
      APENOMB
      DOMICILIO
      DEPARTAMENTO
      PROVINCIA
      DISTRITO
      TITULOPROFESIONAL
      COLEGIATURA
      CURRICULUM
      CORREO
      TELEFONO
      FECHA_REGISTRO
      RESPONSABLE_ID
    }
  }
}
    `;

export function useUpdateInformacionResponsableMutation() {
  return Urql.useMutation<UpdateInformacionResponsableMutation, UpdateInformacionResponsableMutationVariables>(UpdateInformacionResponsableDocument);
};
export const CreateLocalidadEnsayoDocument = gql`
    mutation createLocalidadEnsayo($input: [LocalidadEnsayoCreateInput!]!) {
  createLocalidadEnsayo(input: $input) {
    data {
      LOCALIDAD_ENSAYO_ID
      DEPARTAMENTO_ID
      PROVINCIA_ID
      DISTRITO_ID
      SECTOR
      ALTITUD
      FECHA_INICIO
      FECHA_FIN
      EXPEDIENTE_ID
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateLocalidadEnsayoMutation() {
  return Urql.useMutation<CreateLocalidadEnsayoMutation, CreateLocalidadEnsayoMutationVariables>(CreateLocalidadEnsayoDocument);
};
export const UpdateLocalidadEnsayoDocument = gql`
    mutation updateLocalidadEnsayo($input: LocalidadEnsayoUpdateInput!) {
  updateLocalidadEnsayo(input: $input) {
    data {
      LOCALIDAD_ENSAYO_ID
      DEPARTAMENTO_ID
      PROVINCIA_ID
      DISTRITO_ID
      SECTOR
      ALTITUD
      FECHA_INICIO
      FECHA_FIN
      EXPEDIENTE_ID
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateLocalidadEnsayoMutation() {
  return Urql.useMutation<UpdateLocalidadEnsayoMutation, UpdateLocalidadEnsayoMutationVariables>(UpdateLocalidadEnsayoDocument);
};
export const CreateMantenimientoSemillaDocument = gql`
    mutation createMantenimientoSemilla($input: MantSemillaCreateInput!) {
  createMantenimientoSemilla(input: $input) {
    data {
      MANTENIMIENTO_SEMILLA_ID
      EXPEDIENTE_ID
      RAZON_SOCIAL
      AREA_RESPONSABLE
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateMantenimientoSemillaMutation() {
  return Urql.useMutation<CreateMantenimientoSemillaMutation, CreateMantenimientoSemillaMutationVariables>(CreateMantenimientoSemillaDocument);
};
export const UpdateMantenimientoSemillaDocument = gql`
    mutation updateMantenimientoSemilla($input: MantSemillaUpdateInput!) {
  updateMantenimientoSemilla(input: $input) {
    data {
      MANTENIMIENTO_SEMILLA_ID
      EXPEDIENTE_ID
      RAZON_SOCIAL
      AREA_RESPONSABLE
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateMantenimientoSemillaMutation() {
  return Urql.useMutation<UpdateMantenimientoSemillaMutation, UpdateMantenimientoSemillaMutationVariables>(UpdateMantenimientoSemillaDocument);
};
export const CreateProfesionalDocument = gql`
    mutation createProfesional($input: ProfesionalInput!) {
  createProfesional(input: $input) {
    profesional {
      PROFESIONAL_RESPONSABLE_ID
      NOMBRES
      APELLIDOS
      TIPO_DOCUMENTO
      NUMERO_DOCUMENTO
      DOMICILIO_LEGAL
      TIPO_PROFESIONAL
      ESPECIFICAR_PROFESION
      NUMERO_CIP
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      TELEFONO
      EMAIL
      EXPEDIENTE_ID
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateProfesionalMutation() {
  return Urql.useMutation<CreateProfesionalMutation, CreateProfesionalMutationVariables>(CreateProfesionalDocument);
};
export const UpdateProfesionalDocument = gql`
    mutation updateProfesional($input: ProfesionalInput!) {
  updateProfesional(input: $input) {
    profesional {
      PROFESIONAL_RESPONSABLE_ID
      NOMBRES
      APELLIDOS
      TIPO_DOCUMENTO
      NUMERO_DOCUMENTO
      DOMICILIO_LEGAL
      TIPO_PROFESIONAL
      ESPECIFICAR_PROFESION
      NUMERO_CIP
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      TELEFONO
      EMAIL
      EXPEDIENTE_ID
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateProfesionalMutation() {
  return Urql.useMutation<UpdateProfesionalMutation, UpdateProfesionalMutationVariables>(UpdateProfesionalDocument);
};
export const CreateResponsableDocument = gql`
    mutation CreateResponsable($input: ResponsableInput!) {
  createResponsable(input: $input) {
    informacion {
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
      FECHA_REGISTRO
      FECHA_REVISION
      OBSERVACION
      EXPEDIENTE
      ESTADO
    }
  }
}
    `;

export function useCreateResponsableMutation() {
  return Urql.useMutation<CreateResponsableMutation, CreateResponsableMutationVariables>(CreateResponsableDocument);
};
export const UpdateResponsableDocument = gql`
    mutation UpdateResponsable($input: ResponsableInput!) {
  updateResponsable(input: $input) {
    informacion {
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
    }
  }
}
    `;

export function useUpdateResponsableMutation() {
  return Urql.useMutation<UpdateResponsableMutation, UpdateResponsableMutationVariables>(UpdateResponsableDocument);
};
export const CreateSolicitanteDocument = gql`
    mutation createSolicitante($input: SolicitanteInput!) {
  createSolicitante(input: $input) {
    informacion {
      SOLICITANTE_ID
      RAZON_SOCIAL
      PARTIDA_REGISTRAL
      NOMBRES_SOLICITANTE
      APELLIDOS_SOLICITANTE
      TELEFONO_SOLICITANTE
      TIPO_DOCUMENTO
      NUMERO_DOCUMENTO
      DOMICILIO_LEGAL
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      EMAIL_SOLICITANTE
      NOMBRE_REPRESENTANTE
      APELLIDO_REPRESENTANTE
      EMAIL_REPRESENTANTE
      DNI_REPRESENTANTE
      EXPEDIENTE_ID
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateSolicitanteMutation() {
  return Urql.useMutation<CreateSolicitanteMutation, CreateSolicitanteMutationVariables>(CreateSolicitanteDocument);
};
export const UpdateSolicitanteDocument = gql`
    mutation updateSolicitante($input: SolicitanteInput!) {
  updateSolicitante(input: $input) {
    informacion {
      SOLICITANTE_ID
      RAZON_SOCIAL
      PARTIDA_REGISTRAL
      NOMBRES_SOLICITANTE
      APELLIDOS_SOLICITANTE
      TELEFONO_SOLICITANTE
      TIPO_DOCUMENTO
      NUMERO_DOCUMENTO
      DOMICILIO_LEGAL
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      EMAIL_SOLICITANTE
      NOMBRE_REPRESENTANTE
      APELLIDO_REPRESENTANTE
      EMAIL_REPRESENTANTE
      DNI_REPRESENTANTE
      EXPEDIENTE_ID
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateSolicitanteMutation() {
  return Urql.useMutation<UpdateSolicitanteMutation, UpdateSolicitanteMutationVariables>(UpdateSolicitanteDocument);
};
export const CreateSolicitudAutorizacionDocument = gql`
    mutation CreateSolicitudAutorizacion($input: SolicitudAutorizacionInput!) {
  createSolicitudAutorizacion(input: $input) {
    informacion {
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
  }
}
    `;

export function useCreateSolicitudAutorizacionMutation() {
  return Urql.useMutation<CreateSolicitudAutorizacionMutation, CreateSolicitudAutorizacionMutationVariables>(CreateSolicitudAutorizacionDocument);
};
export const UpdateSucursalDocument = gql`
    mutation updateSucursal($input: SucursalUpdateInput!) {
  updateSucursal(input: $input) {
    data {
      SUCURSAL_ID
      EXPEDIENTE_ID
      NOMBRE_SUCURSAL
      DIRECCION_SUCURSAL
      DEPARTAMENTO_ID
      PROVINCIA_ID
      DISTRITO_ID
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateSucursalMutation() {
  return Urql.useMutation<UpdateSucursalMutation, UpdateSucursalMutationVariables>(UpdateSucursalDocument);
};
export const CreateSucursalDocument = gql`
    mutation createSucursal($input: [SucursalCreateInput!]!) {
  createSucursal(input: $input) {
    data {
      SUCURSAL_ID
      EXPEDIENTE_ID
      NOMBRE_SUCURSAL
      DIRECCION_SUCURSAL
      DEPARTAMENTO_ID
      PROVINCIA_ID
      DISTRITO_ID
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateSucursalMutation() {
  return Urql.useMutation<CreateSucursalMutation, CreateSucursalMutationVariables>(CreateSucursalDocument);
};
export const DeleteSucursalDocument = gql`
    mutation deleteSucursal($sucursalId: Int!) {
  deleteSucursal(sucursalId: $sucursalId)
}
    `;

export function useDeleteSucursalMutation() {
  return Urql.useMutation<DeleteSucursalMutation, DeleteSucursalMutationVariables>(DeleteSucursalDocument);
};
export const CreateTierraCultivosDocument = gql`
    mutation createTierraCultivos($input: [TierraCultivoInput!]!) {
  createTierraCultivos(input: $input) {
    tierras {
      TIERRA_CULTIVO_ID
      EXPEDIENTE_ID
      NOMBRE_PREDIO
      AREA
      TIPO_TENENCIA
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      NUME_REGI_ARC
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateTierraCultivosMutation() {
  return Urql.useMutation<CreateTierraCultivosMutation, CreateTierraCultivosMutationVariables>(CreateTierraCultivosDocument);
};
export const DeleteTierraCultivoDocument = gql`
    mutation deleteTierraCultivo($tierraCultivoId: Int!) {
  deleteTierraCultivo(tierraCultivoId: $tierraCultivoId)
}
    `;

export function useDeleteTierraCultivoMutation() {
  return Urql.useMutation<DeleteTierraCultivoMutation, DeleteTierraCultivoMutationVariables>(DeleteTierraCultivoDocument);
};
export const UpdateTierraCultivoDocument = gql`
    mutation updateTierraCultivo($input: TierraCultivoInput!) {
  updateTierraCultivo(input: $input) {
    tierras {
      TIERRA_CULTIVO_ID
      EXPEDIENTE_ID
      NOMBRE_PREDIO
      AREA
      TIPO_TENENCIA
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      NUME_REGI_ARC
      FECHA_REGISTRO
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateTierraCultivoMutation() {
  return Urql.useMutation<UpdateTierraCultivoMutation, UpdateTierraCultivoMutationVariables>(UpdateTierraCultivoDocument);
};
export const GetExpedienteByIdDocument = gql`
    query getExpedienteById($tipoDocumento: String!, $nroDocumento: String!, $expedienteId: String!) {
  getExpedienteById(
    tipoDocumento: $tipoDocumento
    nroDocumento: $nroDocumento
    expedienteId: $expedienteId
  ) {
    EXPEDIENTE_ID
    NUMERO_EXPEDIENTE
    ESTADO
    TIPO_SOLICITUD
    SEDE {
      NOMBRE_SEDE
    }
  }
}
    `;

export function useGetExpedienteByIdQuery(options: Omit<Urql.UseQueryArgs<GetExpedienteByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetExpedienteByIdQuery>({ query: GetExpedienteByIdDocument, ...options });
};
export const GetArchivosByNumeRegiArcDocument = gql`
    query getArchivosByNumeRegiArc($numeRegiArc: String!) {
  getArchivosByNumeRegiArc(numeRegiArc: $numeRegiArc) {
    NUME_REGI_ARC
    APLICACION
    MODULO
    REGISTRO
    DESCRIPCION_REGISTRO
    FECH_REGI_ARC
    ArchivosFisicos {
      NUME_REGI_ARC
      SECU_REGI_ARC
      FECH_CARG_ARC
      FLAG_IMAGEN
      FILENAME
      FILEEXTENSION
      NOMBRE_OBJETO
      DESCRIPCION
      FUENTE
      FLAG_RESTRINGIDO
    }
  }
}
    `;

export function useGetArchivosByNumeRegiArcQuery(options: Omit<Urql.UseQueryArgs<GetArchivosByNumeRegiArcQueryVariables>, 'query'>) {
  return Urql.useQuery<GetArchivosByNumeRegiArcQuery>({ query: GetArchivosByNumeRegiArcDocument, ...options });
};
export const GetAllCultivaresDocument = gql`
    query GetAllCultivares($pageSize: Int!, $page: Int!) {
  getAllCultivares(pageSize: $pageSize, page: $page) {
    page
    pageSize
    totalItems
    data {
      CULTIVO_ID
      ESPECIE_ID
      NOMBRE_CULTIVAR
    }
  }
}
    `;

export function useGetAllCultivaresQuery(options: Omit<Urql.UseQueryArgs<GetAllCultivaresQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllCultivaresQuery>({ query: GetAllCultivaresDocument, ...options });
};
export const GetCultivarByEspecieDocument = gql`
    query GetCultivarByEspecie($estado: Estados, $codEspecie: Int!) {
  getCultivarByEspecie(estado: $estado, especieId: $codEspecie) {
    CULTIVO_ID
    NOMBRE_CULTIVAR
    ESPECIE_ID
  }
}
    `;

export function useGetCultivarByEspecieQuery(options: Omit<Urql.UseQueryArgs<GetCultivarByEspecieQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCultivarByEspecieQuery>({ query: GetCultivarByEspecieDocument, ...options });
};
export const GetObsCultivarComercialExpedienteDocument = gql`
    query getObsCultivarComercialExpediente($expedienteId: Int!) {
  getObservacionesByExpediente(expedienteId: $expedienteId) {
    OBSERVACION_ID
    ESTADO_DATOS_GENERALES
    ESTADO_CULT_COMERCIAL
    ESTADO_INFO_ENSAYO
    ESTADO_MANT_SEMILLA
    OBS_DATOS_GENERALES
    OBS_CULT_COMERCIAL
    OBS_INFO_ENSAYO
    OBS_MANT_SEMILLA
    EXPEDIENTE_ID
  }
}
    `;

export function useGetObsCultivarComercialExpedienteQuery(options: Omit<Urql.UseQueryArgs<GetObsCultivarComercialExpedienteQueryVariables>, 'query'>) {
  return Urql.useQuery<GetObsCultivarComercialExpedienteQuery>({ query: GetObsCultivarComercialExpedienteDocument, ...options });
};
export const GetTramiteCultiComercByRegIdDocument = gql`
    query getTramiteCultiComercByRegId($expedienteId: Int!) {
  getTramiteByRegistroId(expedienteId: $expedienteId) {
    NUMERO_EXPEDIENTE
    EXPEDIENTE_ID
    SOLICITANTE {
      SOLICITANTE_ID
      RAZON_SOCIAL
      PARTIDA_REGISTRAL
      NOMBRES_SOLICITANTE
      APELLIDOS_SOLICITANTE
      TELEFONO_SOLICITANTE
      TIPO_DOCUMENTO
      NUMERO_DOCUMENTO
      DOMICILIO_LEGAL
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      EMAIL_SOLICITANTE
      NOMBRE_REPRESENTANTE
      APELLIDO_REPRESENTANTE
      EMAIL_REPRESENTANTE
      DNI_REPRESENTANTE
      EXPEDIENTE_ID
      NOMBRE_DEPARTAMENTO
      NOMBRE_PROVINCIA
      NOMBRE_DISTRITO
    }
    CULTIVAR_COMERCIAL {
      CULTIVAR_COMERCIAL_ID
      NOMBRE_CULTIVAR
      PAIS
      FECHA_INTERNAMIENTO
      TIPO_CULTIVAR
      GENEOLOGIA
      NOMBRE_OBTENTOR
      EXPEDIENTE_ID
      FECHA_REGISTRO
      ESPECIE_ID
      TIPO_NATIVO
      NOMBRE_CO_OBTENTOR
      FINALIDAD_USO
      RANGO_ADAPTACION
      NUME_REGI_ARC_DVC
      NUME_REGI_ARC_RIV
      NUME_REGI_ARC_DRCO
      ESPECIE {
        NOMBRE_CIENTIFICO
        NOMBRE_ESPECIE_COMUN
      }
    }
    LOCALIDAD_ENSAYO {
      LOCALIDAD_ENSAYO_ID
      DEPARTAMENTO_ID
      PROVINCIA_ID
      DISTRITO_ID
      SECTOR
      ALTITUD
      FECHA_INICIO
      FECHA_FIN
      EXPEDIENTE_ID
      FECHA_REGISTRO
    }
    INFORMACION_ENSAYO {
      INFORMACION_ENSAYO_ID
      AMBITO_GEOGRAFICO
      RANGO_ADAPTACION
      FINALIDAD_USO
      INSTALACION
      CAMPANAS_ENSAYOS
      CARACTERES_PRUEBA
      PLANTAS_TIPO
      PRIMERA_CAMPANA
      SEGUNDA_CAMPANA
      COMPORTAMIENTO_BIOTICO
      COMPORTAMIENTO_ABIOTICO
      NUME_REGI_ARC
      EXPEDIENTE_ID
      FECHA_REGISTRO
    }
    MANTENIMIENTO_SEMILLA {
      MANTENIMIENTO_SEMILLA_ID
      EXPEDIENTE_ID
      RAZON_SOCIAL
      AREA_RESPONSABLE
      FECHA_REGISTRO
    }
  }
}
    `;

export function useGetTramiteCultiComercByRegIdQuery(options: Omit<Urql.UseQueryArgs<GetTramiteCultiComercByRegIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTramiteCultiComercByRegIdQuery>({ query: GetTramiteCultiComercByRegIdDocument, ...options });
};
export const GetTramiteDeclaracionSemillaByRegIdDocument = gql`
    query getTramiteDeclaracionSemillaByRegId($expedienteId: Int!) {
  getTramiteByRegistroId(expedienteId: $expedienteId) {
    NUMERO_EXPEDIENTE
    EXPEDIENTE_ID
    SOLICITANTE {
      SOLICITANTE_ID
      RAZON_SOCIAL
      PARTIDA_REGISTRAL
      NOMBRES_SOLICITANTE
      APELLIDOS_SOLICITANTE
      TELEFONO_SOLICITANTE
      TIPO_DOCUMENTO
      NUMERO_DOCUMENTO
      DOMICILIO_LEGAL
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      EMAIL_SOLICITANTE
      NOMBRE_REPRESENTANTE
      APELLIDO_REPRESENTANTE
      EMAIL_REPRESENTANTE
      DNI_REPRESENTANTE
      EXPEDIENTE_ID
      NOMBRE_DEPARTAMENTO
      NOMBRE_PROVINCIA
      NOMBRE_DISTRITO
    }
    INFO_CULTIVO {
      INFORMACION_CULTIVO_ID
      ESPECIE_ID
      CULTIVO_ID
      CULTIVO_REGLAMENTARIO
      EXPEDIENTE_ID
      NOMBRE_ESPECIE
      NOMBRE_CULTIVO
    }
    SUCURSALES {
      SUCURSAL_ID
      EXPEDIENTE_ID
      NOMBRE_SUCURSAL
      DIRECCION_SUCURSAL
      DEPARTAMENTO_ID
      PROVINCIA_ID
      DISTRITO_ID
      FECHA_REGISTRO
      NOMBRE_DEPARTAMENTO
      NOMBRE_PROVINCIA
      NOMBRE_DISTRITO
    }
    ALMACENES {
      ALMACEN_ID
      DIRECCION
      DEPARTAMENTO_ID
      PROVINCIA_ID
      DISTRITO_ID
      NUME_REGI_ARC
      EXPEDIENTE_ID
      FECHA_REGISTRO
      NOMBRE_DEPARTAMENTO
      NOMBRE_PROVINCIA
      NOMBRE_DISTRITO
    }
  }
}
    `;

export function useGetTramiteDeclaracionSemillaByRegIdQuery(options: Omit<Urql.UseQueryArgs<GetTramiteDeclaracionSemillaByRegIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTramiteDeclaracionSemillaByRegIdQuery>({ query: GetTramiteDeclaracionSemillaByRegIdDocument, ...options });
};
export const GetAllEspeciesDocument = gql`
    query GetAllEspecies($pageSize: Int!, $page: Int!, $estado: Estados, $denominacion: Estados) {
  getAllEspecies(
    pageSize: $pageSize
    page: $page
    estado: $estado
    denominacion: $denominacion
  ) {
    totalItems
    data {
      ESPECIE_ID
      NOMBRE_CIENTIFICO
      NOMBRE_ESPECIE_COMUN
      ESTADO
      REGLAMENTARIO
      FECHA_REGISTRO
      DENOMINACION
    }
  }
}
    `;

export function useGetAllEspeciesQuery(options: Omit<Urql.UseQueryArgs<GetAllEspeciesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllEspeciesQuery>({ query: GetAllEspeciesDocument, ...options });
};
export const GetEspeciesByNameDocument = gql`
    query getEspeciesByName($estado: Estados, $query: String!, $denominacion: Estados) {
  getEspeciesByName(estado: $estado, query: $query, denominacion: $denominacion) {
    ESPECIE_ID
    ESTADO
    NOMBRE_CIENTIFICO
    NOMBRE_ESPECIE_COMUN
    REGLAMENTARIO
    FECHA_REGISTRO
    DENOMINACION
  }
}
    `;

export function useGetEspeciesByNameQuery(options: Omit<Urql.UseQueryArgs<GetEspeciesByNameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEspeciesByNameQuery>({ query: GetEspeciesByNameDocument, ...options });
};
export const GetAllLaboratoriosDocument = gql`
    query getAllLaboratorios {
  getAllLaboratorios {
    LABORATORIO_ID
    NUMERO_RESOLUCION
    REPRESENTANTE_LEGAL
    SOLICITANTE
    ESPECIES
    ANALISIS
    RESPONSABLE_TECNICO
    DEPARTAMENTO
    TELEFONO
    FECHA_REGISTRO
  }
}
    `;

export function useGetAllLaboratoriosQuery(options?: Omit<Urql.UseQueryArgs<GetAllLaboratoriosQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllLaboratoriosQuery>({ query: GetAllLaboratoriosDocument, ...options });
};
export const IsDocumentoUniqueDocument = gql`
    query isDocumentoUnique($tipoDocumento: String!, $nroDocumento: String!, $tipoSolicitud: TipoSolicitudExpedientes!) {
  isDocumentoUnique(
    tipoDocumento: $tipoDocumento
    nroDocumento: $nroDocumento
    tipoSolicitud: $tipoSolicitud
  )
}
    `;

export function useIsDocumentoUniqueQuery(options: Omit<Urql.UseQueryArgs<IsDocumentoUniqueQueryVariables>, 'query'>) {
  return Urql.useQuery<IsDocumentoUniqueQuery>({ query: IsDocumentoUniqueDocument, ...options });
};
export const GetEspecializacionByIdDocument = gql`
    query getEspecializacionById($especializacionId: Float!) {
  getEspecializacionById(especializacionId: $especializacionId) {
    ESPECIALIZACION_RELACIONADA_ID
    NOMBRE
    TIPO_ESPECIALIDAD
    FECHA_INICIO
    FECHA_TERMINO
    HORAS
    LUGAR
    NUME_REGI_ARC
    PROFESIONAL_RESPONSABLE_ID
  }
}
    `;

export function useGetEspecializacionByIdQuery(options: Omit<Urql.UseQueryArgs<GetEspecializacionByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEspecializacionByIdQuery>({ query: GetEspecializacionByIdDocument, ...options });
};
export const GetExperienciasByIdDocument = gql`
    query getExperienciasById($experienciaId: Float!) {
  getExperienciasById(experienciaId: $experienciaId) {
    EXPERIENCIA_RELACIONADA_ID
    RAZON_SOCIAL
    ACTIVIDAD_DESARROLLADA
    FECHA_INICIO
    FECHA_TERMINO
    DISTRITO
    DEPARTAMENTO
    PROVINCIA
    NUME_REGI_ARC
    PROFESIONAL_RESPONSABLE_ID
  }
}
    `;

export function useGetExperienciasByIdQuery(options: Omit<Urql.UseQueryArgs<GetExperienciasByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetExperienciasByIdQuery>({ query: GetExperienciasByIdDocument, ...options });
};
export const GetInfoCultivoByExpedienteDocument = gql`
    query getInfoCultivoByExpediente($expedienteId: Int!) {
  getInfoCultivoByExpediente(expedienteId: $expedienteId) {
    INFORMACION_CULTIVO_ID
    ESPECIE_ID
    CULTIVO_ID
    CULTIVO_REGLAMENTARIO
    EXPEDIENTE_ID
  }
}
    `;

export function useGetInfoCultivoByExpedienteQuery(options: Omit<Urql.UseQueryArgs<GetInfoCultivoByExpedienteQueryVariables>, 'query'>) {
  return Urql.useQuery<GetInfoCultivoByExpedienteQuery>({ query: GetInfoCultivoByExpedienteDocument, ...options });
};
export const GetInfoCulivoByIdDocument = gql`
    query getInfoCulivoById($infoCultivoId: Int!) {
  getInfoCulivoById(infoCultivoId: $infoCultivoId) {
    INFORMACION_CULTIVO_ID
    ESPECIE_ID
    CULTIVO_ID
    CULTIVO_REGLAMENTARIO
    EXPEDIENTE_ID
  }
}
    `;

export function useGetInfoCulivoByIdQuery(options: Omit<Urql.UseQueryArgs<GetInfoCulivoByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetInfoCulivoByIdQuery>({ query: GetInfoCulivoByIdDocument, ...options });
};
export const GetObservacionesByExpedienteDocument = gql`
    query getObservacionesByExpediente($expedienteId: Int!) {
  getObservacionesByExpediente(expedienteId: $expedienteId) {
    OBSERVACION_ID
    ESTADO_DATOS_GENERALES
    ESTADO_INFO_CULTIVO
    ESTADO_PROFESIONAL
    ESTADO_TIERRAS
    ESTADO_ACONDICIONAMIENTO
    ESTADO_ANALISIS
    ESTADO_SUCURSALES
    OBS_DATOS_GENERALES
    OBS_INFO_CULTIVO
    OBS_PROFESIONAL
    OBS_TIERRAS
    OBS_ACONDICIONAMIENTO
    OBS_ANALISIS
    OBS_SUCURSALES
    EXPEDIENTE_ID
  }
}
    `;

export function useGetObservacionesByExpedienteQuery(options: Omit<Urql.UseQueryArgs<GetObservacionesByExpedienteQueryVariables>, 'query'>) {
  return Urql.useQuery<GetObservacionesByExpedienteQuery>({ query: GetObservacionesByExpedienteDocument, ...options });
};
export const GetTierraCultivoByIdDocument = gql`
    query getTierraCultivoById($tierraCultivoId: Int!) {
  getTierraCultivoById(tierraCultivoId: $tierraCultivoId) {
    TIERRA_CULTIVO_ID
    EXPEDIENTE_ID
    NOMBRE_PREDIO
    AREA
    TIPO_TENENCIA
    DISTRITO
    DEPARTAMENTO
    PROVINCIA
    NUME_REGI_ARC
    FECHA_REGISTRO
  }
}
    `;

export function useGetTierraCultivoByIdQuery(options: Omit<Urql.UseQueryArgs<GetTierraCultivoByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTierraCultivoByIdQuery>({ query: GetTierraCultivoByIdDocument, ...options });
};
export const GetTramiteByRegistroIdDocument = gql`
    query getTramiteByRegistroId($expedienteId: Int!) {
  getTramiteByRegistroId(expedienteId: $expedienteId) {
    NUMERO_EXPEDIENTE
    EXPEDIENTE_ID
    SOLICITANTE {
      SOLICITANTE_ID
      RAZON_SOCIAL
      PARTIDA_REGISTRAL
      NOMBRES_SOLICITANTE
      APELLIDOS_SOLICITANTE
      TELEFONO_SOLICITANTE
      TIPO_DOCUMENTO
      NUMERO_DOCUMENTO
      DOMICILIO_LEGAL
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      EMAIL_SOLICITANTE
      NOMBRE_REPRESENTANTE
      APELLIDO_REPRESENTANTE
      EMAIL_REPRESENTANTE
      DNI_REPRESENTANTE
      DNI_REPRESENTANTE
      EXPEDIENTE_ID
      NOMBRE_DEPARTAMENTO
      NOMBRE_PROVINCIA
      NOMBRE_DISTRITO
    }
    INFO_CULTIVO {
      INFORMACION_CULTIVO_ID
      ESPECIE_ID
      CULTIVO_ID
      CULTIVO_REGLAMENTARIO
      EXPEDIENTE_ID
      NOMBRE_ESPECIE
      NOMBRE_CULTIVO
    }
    PROFESIONAL {
      PROFESIONAL_RESPONSABLE_ID
      NOMBRES
      APELLIDOS
      TIPO_DOCUMENTO
      NUMERO_DOCUMENTO
      DOMICILIO_LEGAL
      TIPO_PROFESIONAL
      ESPECIFICAR_PROFESION
      NUMERO_CIP
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      TELEFONO
      EMAIL
      EXPEDIENTE_ID
      NOMBRE_DEPARTAMENTO
      NOMBRE_PROVINCIA
      NOMBRE_DISTRITO
    }
    EXPERIENCIA {
      EXPERIENCIA_RELACIONADA_ID
      RAZON_SOCIAL
      ACTIVIDAD_DESARROLLADA
      FECHA_INICIO
      FECHA_TERMINO
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      NUME_REGI_ARC
      PROFESIONAL_RESPONSABLE_ID
      NOMBRE_DEPARTAMENTO
      NOMBRE_PROVINCIA
      NOMBRE_DISTRITO
    }
    ESPECIALIDAD {
      ESPECIALIZACION_RELACIONADA_ID
      NOMBRE
      TIPO_ESPECIALIDAD
      FECHA_INICIO
      FECHA_TERMINO
      HORAS
      LUGAR
      NUME_REGI_ARC
      PROFESIONAL_RESPONSABLE_ID
    }
    TIERRAS_CULTIVOS {
      TIERRA_CULTIVO_ID
      EXPEDIENTE_ID
      NOMBRE_PREDIO
      AREA
      TIPO_TENENCIA
      DISTRITO
      DEPARTAMENTO
      PROVINCIA
      NUME_REGI_ARC
      FECHA_REGISTRO
      NOMBRE_DEPARTAMENTO
      NOMBRE_PROVINCIA
      NOMBRE_DISTRITO
    }
    ACONDICIONAMIENTO {
      ACONDICIONAMIENTO_ID
      RECEPCION
      OPERACIONES_ESPECIALES
      LIMPIEZA
      CLASIFICACION
      TRATAMIENTO
      ENVASADO
      ALMACENAMIENTO
      EXPEDIENTE_ID
      RECEPCION_ARC
      OPERACIONES_ESPECIALES_ARC
      LIMPIEZA_ARC
      CLASIFICACION_ARC
      TRATAMIENTO_ARC
      ENVASADO_ARC
      ALMACENAMIENTO_ARC
      FECHA_REGISTRO
    }
    ANALISIS_CALIDAD {
      ANALISIS_ID
      SEMILLA_SEXUAL
      SEMILLA_ASEXUAL
      LABORATORIO_ID
      EXPEDIENTE_ID
      FECHA_REGISTRO
      NOMBRE_LABORATORIO
    }
  }
}
    `;

export function useGetTramiteByRegistroIdQuery(options: Omit<Urql.UseQueryArgs<GetTramiteByRegistroIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTramiteByRegistroIdQuery>({ query: GetTramiteByRegistroIdDocument, ...options });
};
export const GetResponsableByIdDocument = gql`
    query GetResponsableById($id: Int!) {
  getResponsableById(ID: $id) {
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
    EXPEDIENTE
    FECHA_REGISTRO
  }
}
    `;

export function useGetResponsableByIdQuery(options: Omit<Urql.UseQueryArgs<GetResponsableByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetResponsableByIdQuery>({ query: GetResponsableByIdDocument, ...options });
};
export const GetAllDepartamentosDocument = gql`
    query GetAllDepartamentos {
  getAllDepartamentos {
    CODI_DEPA_DPT
    NOMB_DPTO_DPT
  }
}
    `;

export function useGetAllDepartamentosQuery(options?: Omit<Urql.UseQueryArgs<GetAllDepartamentosQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllDepartamentosQuery>({ query: GetAllDepartamentosDocument, ...options });
};
export const GetDistritosDocument = gql`
    query GetDistritos($codProv: String!, $codDepa: String!) {
  getDistritos(codProv: $codProv, codDepa: $codDepa) {
    CODI_DIST_TDI
    CODI_DEPA_DPT
    CODI_PROV_TPR
    NOMB_DIST_TDI
  }
}
    `;

export function useGetDistritosQuery(options: Omit<Urql.UseQueryArgs<GetDistritosQueryVariables>, 'query'>) {
  return Urql.useQuery<GetDistritosQuery>({ query: GetDistritosDocument, ...options });
};
export const GetProvinciasDocument = gql`
    query GetProvincias($codDepa: String!) {
  getProvincias(codDepa: $codDepa) {
    CODI_PROV_TPR
    CODI_DEPA_DPT
    NOMB_PROV_TPR
  }
}
    `;

export function useGetProvinciasQuery(options: Omit<Urql.UseQueryArgs<GetProvinciasQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProvinciasQuery>({ query: GetProvinciasDocument, ...options });
};
export type CreateAcondicionamientoMutationVariables = Exact<{
  input: AcondicionamientoInput;
}>;


export type CreateAcondicionamientoMutation = { __typename?: 'Mutation', createAcondicionamiento: { __typename?: 'AcondicionamientoResponse', data?: { __typename?: 'Acondicionamiento', ACONDICIONAMIENTO_ID: number, RECEPCION: string, OPERACIONES_ESPECIALES: string, LIMPIEZA: string, CLASIFICACION: string, TRATAMIENTO: string, ENVASADO: string, ALMACENAMIENTO: string, EXPEDIENTE_ID: number, RECEPCION_ARC?: string | null, OPERACIONES_ESPECIALES_ARC?: string | null, LIMPIEZA_ARC?: string | null, CLASIFICACION_ARC?: string | null, TRATAMIENTO_ARC?: string | null, ENVASADO_ARC?: string | null, ALMACENAMIENTO_ARC?: string | null, FECHA_REGISTRO?: any | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateAcondicionamientoMutationVariables = Exact<{
  input: AcondicionamientoInput;
}>;


export type UpdateAcondicionamientoMutation = { __typename?: 'Mutation', updateAcondicionamiento: { __typename?: 'AcondicionamientoResponse', data?: { __typename?: 'Acondicionamiento', ACONDICIONAMIENTO_ID: number, RECEPCION: string, OPERACIONES_ESPECIALES: string, LIMPIEZA: string, CLASIFICACION: string, TRATAMIENTO: string, ENVASADO: string, ALMACENAMIENTO: string, EXPEDIENTE_ID: number, RECEPCION_ARC?: string | null, OPERACIONES_ESPECIALES_ARC?: string | null, LIMPIEZA_ARC?: string | null, CLASIFICACION_ARC?: string | null, TRATAMIENTO_ARC?: string | null, ENVASADO_ARC?: string | null, ALMACENAMIENTO_ARC?: string | null, FECHA_REGISTRO?: any | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateAlmacenMutationVariables = Exact<{
  input: Array<AlmacenCreateInput> | AlmacenCreateInput;
}>;


export type CreateAlmacenMutation = { __typename?: 'Mutation', createAlmacen: { __typename?: 'AlmacenCreateResponse', data?: Array<{ __typename?: 'Almacen', ALMACEN_ID: number, DIRECCION: string, DEPARTAMENTO_ID: string, PROVINCIA_ID: string, DISTRITO_ID: string, NUME_REGI_ARC?: string | null, EXPEDIENTE_ID: number, FECHA_REGISTRO: any }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteAlmacenMutationVariables = Exact<{
  almacenId: Scalars['Int'];
}>;


export type DeleteAlmacenMutation = { __typename?: 'Mutation', deleteAlmacen: boolean };

export type UpdateAlmacenMutationVariables = Exact<{
  input: AlmacenUpdateInput;
}>;


export type UpdateAlmacenMutation = { __typename?: 'Mutation', updateAlmacen: { __typename?: 'AlmacenUpdateResponse', data?: { __typename?: 'Almacen', ALMACEN_ID: number, DIRECCION: string, DEPARTAMENTO_ID: string, PROVINCIA_ID: string, DISTRITO_ID: string, NUME_REGI_ARC?: string | null, EXPEDIENTE_ID: number, FECHA_REGISTRO: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateAnalisisCalidadMutationVariables = Exact<{
  input: AnalisisCalidadCreateinput;
}>;


export type CreateAnalisisCalidadMutation = { __typename?: 'Mutation', createAnalisisCalidad: { __typename?: 'AnalisisCalidadResponse', data?: { __typename?: 'AnalisisCalidad', ANALISIS_ID: number, SEMILLA_SEXUAL: Estados, SEMILLA_ASEXUAL: Estados, LABORATORIO_ID?: number | null, EXPEDIENTE_ID: number, FECHA_REGISTRO: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateAnalisisCalidadMutationVariables = Exact<{
  input: AnalisisCalidadUpdateinput;
}>;


export type UpdateAnalisisCalidadMutation = { __typename?: 'Mutation', updateAnalisisCalidad: { __typename?: 'AnalisisCalidadResponse', data?: { __typename?: 'AnalisisCalidad', ANALISIS_ID: number, SEMILLA_SEXUAL: Estados, SEMILLA_ASEXUAL: Estados, LABORATORIO_ID?: number | null, EXPEDIENTE_ID: number, FECHA_REGISTRO: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateArchivoMutationVariables = Exact<{
  input: CreateArchivoInput;
}>;


export type CreateArchivoMutation = { __typename?: 'Mutation', createArchivo: { __typename?: 'CreateArchivoResponse', data?: { __typename?: 'ArchivoResponse', NUME_REGI_ARC: string, APLICACION: string, MODULO?: string | null, REGISTRO?: string | null, DESCRIPCION_REGISTRO?: string | null, FECH_REGI_ARC: any, ArchivosFisicos: Array<{ __typename?: 'ArchivoFisico', NUME_REGI_ARC: string, SECU_REGI_ARC: number, FECH_CARG_ARC: any, FLAG_IMAGEN: string, FILENAME: string, FILEEXTENSION: string, NOMBRE_OBJETO: string, DESCRIPCION: string, FUENTE: string, FLAG_RESTRINGIDO: string }> } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateArchivoFisicoMutationVariables = Exact<{
  input: CreateArchivoFisicoInput;
}>;


export type CreateArchivoFisicoMutation = { __typename?: 'Mutation', createArchivoFisico: { __typename?: 'CreateArchivoFisicoResponse', data?: { __typename?: 'ArchivoFisico', NUME_REGI_ARC: string, SECU_REGI_ARC: number, FECH_CARG_ARC: any, FLAG_IMAGEN: string, FILENAME: string, FILEEXTENSION: string, NOMBRE_OBJETO: string, DESCRIPCION: string, FUENTE: string, FLAG_RESTRINGIDO: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteArchivoFisicoMutationVariables = Exact<{
  secuRegiArc: Scalars['Float'];
  numeRegiArc: Scalars['String'];
}>;


export type DeleteArchivoFisicoMutation = { __typename?: 'Mutation', deleteArchivoFisico: boolean };

export type CreateConocimientoMutationVariables = Exact<{
  input: Array<ConocimientoInput> | ConocimientoInput;
}>;


export type CreateConocimientoMutation = { __typename?: 'Mutation', createConocimiento?: { __typename?: 'ConocimientoResponseCreate', conocimiento?: Array<{ __typename?: 'Conocimiento', ID: number, NOMBRE: string, FECHA_INICIO: any, FECHA_TERMINO: any, HORAS: string, LUGAR: string, NUME_REGI_ARC?: string | null, RESPONSABLE_ID: number }> | null } | null };

export type DeleteConocimientoMutationVariables = Exact<{
  deleteConocimientoId: Scalars['Float'];
}>;


export type DeleteConocimientoMutation = { __typename?: 'Mutation', deleteConocimiento: boolean };

export type UpdateConocimientoMutationVariables = Exact<{
  input: ConocimientoInput;
}>;


export type UpdateConocimientoMutation = { __typename?: 'Mutation', updateConocimiento: { __typename?: 'ConocimientoResponseUpdate', conocimiento?: { __typename?: 'Conocimiento', ID: number, NOMBRE: string, FECHA_INICIO: any, FECHA_TERMINO: any, HORAS: string, LUGAR: string, NUME_REGI_ARC?: string | null, RESPONSABLE_ID: number } | null } };

export type CreateCultivarComercialMutationVariables = Exact<{
  input: CultivarComercialCreateInput;
}>;


export type CreateCultivarComercialMutation = { __typename?: 'Mutation', createCultivarComercial: { __typename?: 'CultivarComercialResponse', data?: { __typename?: 'CultivarComercial', CULTIVAR_COMERCIAL_ID: number, NOMBRE_CULTIVAR: string, PAIS: string, FECHA_INTERNAMIENTO?: any | null, TIPO_CULTIVAR: string, GENEOLOGIA: string, NOMBRE_OBTENTOR: string, EXPEDIENTE_ID: number, FECHA_REGISTRO: any, TIPO_NATIVO?: TipoNativo | null, NOMBRE_CO_OBTENTOR?: string | null, FINALIDAD_USO?: string | null, RANGO_ADAPTACION?: string | null, NUME_REGI_ARC_DVC?: string | null, NUME_REGI_ARC_RIV?: string | null, NUME_REGI_ARC_DRCO?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateCultivarComercialMutationVariables = Exact<{
  input: CultivarComercialUpdateInput;
}>;


export type UpdateCultivarComercialMutation = { __typename?: 'Mutation', updateCultivarComercial: { __typename?: 'CultivarComercialResponse', data?: { __typename?: 'CultivarComercial', CULTIVAR_COMERCIAL_ID: number, NOMBRE_CULTIVAR: string, PAIS: string, FECHA_INTERNAMIENTO?: any | null, TIPO_CULTIVAR: string, GENEOLOGIA: string, NOMBRE_OBTENTOR: string, EXPEDIENTE_ID: number, FECHA_REGISTRO: any, TIPO_NATIVO?: TipoNativo | null, NOMBRE_CO_OBTENTOR?: string | null, FINALIDAD_USO?: string | null, RANGO_ADAPTACION?: string | null, NUME_REGI_ARC_DVC?: string | null, NUME_REGI_ARC_RIV?: string | null, NUME_REGI_ARC_DRCO?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateEspecializacionesMutationVariables = Exact<{
  input: Array<EspecializacionInput> | EspecializacionInput;
}>;


export type CreateEspecializacionesMutation = { __typename?: 'Mutation', createEspecializaciones?: { __typename?: 'EspecializacionResponseCreate', especializacion?: Array<{ __typename?: 'Especializacion', NOMBRE: string, HORAS?: string | null, LUGAR: string, FECHA_INICIO: any, FECHA_TERMINO: any, NUME_REGI_ARC?: string | null, TIPO_ESPECIALIDAD: string, PROFESIONAL_RESPONSABLE_ID: number }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type DeleteEspecializacionMutationVariables = Exact<{
  especializacionId: Scalars['Float'];
}>;


export type DeleteEspecializacionMutation = { __typename?: 'Mutation', deleteEspecializacion: boolean };

export type UpdateEspecializacionMutationVariables = Exact<{
  input: EspecializacionInput;
}>;


export type UpdateEspecializacionMutation = { __typename?: 'Mutation', updateEspecializacion: { __typename?: 'EspecializacionResponseUpdate', especializacion?: { __typename?: 'Especializacion', ESPECIALIZACION_RELACIONADA_ID: number, NOMBRE: string, TIPO_ESPECIALIDAD: string, FECHA_INICIO: any, FECHA_TERMINO: any, HORAS?: string | null, LUGAR: string, NUME_REGI_ARC?: string | null, PROFESIONAL_RESPONSABLE_ID: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateExpedienteMutationVariables = Exact<{
  input: ExpedienteCreateInput;
}>;


export type CreateExpedienteMutation = { __typename?: 'Mutation', createExpediente?: { __typename?: 'ExpedienteIdResponse', expedienteId?: number | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type SendResumenToEmailMutationVariables = Exact<{
  tipoTramite: TipoSolicitudExpedientes;
  email: Scalars['String'];
  expedienteId: Scalars['Int'];
}>;


export type SendResumenToEmailMutation = { __typename?: 'Mutation', sendResumenToEmail: boolean };

export type UpdateEstadoExpedienteMutationVariables = Exact<{
  expedienteId: Scalars['Int'];
  estado: EstadosExpedientes;
}>;


export type UpdateEstadoExpedienteMutation = { __typename?: 'Mutation', updateEstadoExpediente: boolean };

export type CreateExperienciasMutationVariables = Exact<{
  input: Array<ExperienciaInput> | ExperienciaInput;
}>;


export type CreateExperienciasMutation = { __typename?: 'Mutation', createExperiencias?: { __typename?: 'ExperienciaResponseCreate', experiencias?: Array<{ __typename?: 'Experiencia', RAZON_SOCIAL: string, ACTIVIDAD_DESARROLLADA: string, FECHA_INICIO: any, FECHA_TERMINO: any, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, NUME_REGI_ARC?: string | null, PROFESIONAL_RESPONSABLE_ID: number }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type DeleteExperienciaMutationVariables = Exact<{
  experienciaId: Scalars['Float'];
}>;


export type DeleteExperienciaMutation = { __typename?: 'Mutation', deleteExperiencia: boolean };

export type UpdateExperienciaMutationVariables = Exact<{
  input: ExperienciaInput;
}>;


export type UpdateExperienciaMutation = { __typename?: 'Mutation', updateExperiencia: { __typename?: 'ExperienciaResponseUpdate', experiencias?: { __typename?: 'Experiencia', EXPERIENCIA_RELACIONADA_ID: number, RAZON_SOCIAL: string, ACTIVIDAD_DESARROLLADA: string, FECHA_INICIO: any, FECHA_TERMINO: any, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, NUME_REGI_ARC?: string | null, PROFESIONAL_RESPONSABLE_ID: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateInfoCultivoMutationVariables = Exact<{
  input: Array<InformacionCultivoInput> | InformacionCultivoInput;
}>;


export type CreateInfoCultivoMutation = { __typename?: 'Mutation', createInfoCultivo?: { __typename?: 'InfoCultivoResponseCreate', data?: Array<{ __typename?: 'InformacionCultivo', INFORMACION_CULTIVO_ID: number, ESPECIE_ID: number, CULTIVO_ID?: number | null, CULTIVO_REGLAMENTARIO?: string | null, EXPEDIENTE_ID: number }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type DeleteInfoCultivoMutationVariables = Exact<{
  infoCultivoId: Scalars['Int'];
}>;


export type DeleteInfoCultivoMutation = { __typename?: 'Mutation', deleteInfoCultivo: boolean };

export type UpdateInfoCultivoMutationVariables = Exact<{
  input: InformacionCultivoInput;
}>;


export type UpdateInfoCultivoMutation = { __typename?: 'Mutation', updateInfoCultivo: { __typename?: 'InfoCultivoResponseUpdate', data?: { __typename?: 'InformacionCultivo', INFORMACION_CULTIVO_ID: number, ESPECIE_ID: number, CULTIVO_ID?: number | null, CULTIVO_REGLAMENTARIO?: string | null, EXPEDIENTE_ID: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateInfoEnsayoMutationVariables = Exact<{
  input: InformacionEnsayoCreateInput;
}>;


export type CreateInfoEnsayoMutation = { __typename?: 'Mutation', createInfoEnsayo: { __typename?: 'InformacionEnsayoResponse', data?: { __typename?: 'InformacionEnsayo', INFORMACION_ENSAYO_ID: number, AMBITO_GEOGRAFICO: string, RANGO_ADAPTACION: string, FINALIDAD_USO: string, INSTALACION: string, CAMPANAS_ENSAYOS: string, CARACTERES_PRUEBA: string, PLANTAS_TIPO: string, PRIMERA_CAMPANA: string, SEGUNDA_CAMPANA: string, COMPORTAMIENTO_BIOTICO: string, COMPORTAMIENTO_ABIOTICO: string, NUME_REGI_ARC?: string | null, EXPEDIENTE_ID: number, FECHA_REGISTRO: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateInfoEnsayoMutationVariables = Exact<{
  input: InformacionEnsayoUpdateInput;
}>;


export type UpdateInfoEnsayoMutation = { __typename?: 'Mutation', updateInfoEnsayo: { __typename?: 'InformacionEnsayoResponse', data?: { __typename?: 'InformacionEnsayo', INFORMACION_ENSAYO_ID: number, AMBITO_GEOGRAFICO: string, RANGO_ADAPTACION: string, FINALIDAD_USO: string, INSTALACION: string, CAMPANAS_ENSAYOS: string, CARACTERES_PRUEBA: string, PLANTAS_TIPO: string, PRIMERA_CAMPANA: string, SEGUNDA_CAMPANA: string, COMPORTAMIENTO_BIOTICO: string, COMPORTAMIENTO_ABIOTICO: string, NUME_REGI_ARC?: string | null, EXPEDIENTE_ID: number, FECHA_REGISTRO: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateInformacionSolicitudMutationVariables = Exact<{
  input: InformacionSolicitudInput;
}>;


export type CreateInformacionSolicitudMutation = { __typename?: 'Mutation', createInformacionSolicitud: { __typename?: 'InformacionSolicitudResponse', informacion?: { __typename?: 'InformacionSolicitud', ID: number, SOLICITUD_ID?: number | null, APENOMB: string, DNI: string } | null } };

export type CreateInformacionResponsableMutationVariables = Exact<{
  input: InformacionResponsableInput;
}>;


export type CreateInformacionResponsableMutation = { __typename?: 'Mutation', createInformacionResponsable: { __typename?: 'InformacionResponsableResponse', informacion?: { __typename?: 'InformacionResponsable', ID: number, DNI: string, APELLIDOS?: string | null, NOMBRES: string, APENOMB: string, DOMICILIO: string, DEPARTAMENTO: string, PROVINCIA: string, DISTRITO: string, TITULOPROFESIONAL: string, COLEGIATURA: string, CURRICULUM: string, CORREO: string, TELEFONO: string, FECHA_REGISTRO?: any | null, RESPONSABLE_ID?: number | null } | null } };

export type UpdateInformacionResponsableMutationVariables = Exact<{
  input: InformacionResponsableInput;
}>;


export type UpdateInformacionResponsableMutation = { __typename?: 'Mutation', updateInformacionResponsable: { __typename?: 'InformacionResponsableResponse', informacion?: { __typename?: 'InformacionResponsable', ID: number, DNI: string, APELLIDOS?: string | null, NOMBRES: string, APENOMB: string, DOMICILIO: string, DEPARTAMENTO: string, PROVINCIA: string, DISTRITO: string, TITULOPROFESIONAL: string, COLEGIATURA: string, CURRICULUM: string, CORREO: string, TELEFONO: string, FECHA_REGISTRO?: any | null, RESPONSABLE_ID?: number | null } | null } };

export type CreateLocalidadEnsayoMutationVariables = Exact<{
  input: Array<LocalidadEnsayoCreateInput> | LocalidadEnsayoCreateInput;
}>;


export type CreateLocalidadEnsayoMutation = { __typename?: 'Mutation', createLocalidadEnsayo: { __typename?: 'LocalidadEnsayoCreateResponse', data?: Array<{ __typename?: 'LocalidadEnsayo', LOCALIDAD_ENSAYO_ID: number, DEPARTAMENTO_ID: string, PROVINCIA_ID: string, DISTRITO_ID: string, SECTOR: string, ALTITUD: string, FECHA_INICIO: any, FECHA_FIN: any, EXPEDIENTE_ID: number, FECHA_REGISTRO: any }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateLocalidadEnsayoMutationVariables = Exact<{
  input: LocalidadEnsayoUpdateInput;
}>;


export type UpdateLocalidadEnsayoMutation = { __typename?: 'Mutation', updateLocalidadEnsayo: { __typename?: 'LocalidadEnsayoUpdateResponse', data?: { __typename?: 'LocalidadEnsayo', LOCALIDAD_ENSAYO_ID: number, DEPARTAMENTO_ID: string, PROVINCIA_ID: string, DISTRITO_ID: string, SECTOR: string, ALTITUD: string, FECHA_INICIO: any, FECHA_FIN: any, EXPEDIENTE_ID: number, FECHA_REGISTRO: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateMantenimientoSemillaMutationVariables = Exact<{
  input: MantSemillaCreateInput;
}>;


export type CreateMantenimientoSemillaMutation = { __typename?: 'Mutation', createMantenimientoSemilla: { __typename?: 'MantResponse', data?: { __typename?: 'MantSemilla', MANTENIMIENTO_SEMILLA_ID: number, EXPEDIENTE_ID: number, RAZON_SOCIAL: string, AREA_RESPONSABLE: string, FECHA_REGISTRO: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateMantenimientoSemillaMutationVariables = Exact<{
  input: MantSemillaUpdateInput;
}>;


export type UpdateMantenimientoSemillaMutation = { __typename?: 'Mutation', updateMantenimientoSemilla: { __typename?: 'MantResponse', data?: { __typename?: 'MantSemilla', MANTENIMIENTO_SEMILLA_ID: number, EXPEDIENTE_ID: number, RAZON_SOCIAL: string, AREA_RESPONSABLE: string, FECHA_REGISTRO: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateProfesionalMutationVariables = Exact<{
  input: ProfesionalInput;
}>;


export type CreateProfesionalMutation = { __typename?: 'Mutation', createProfesional: { __typename?: 'ProfesionalResponse', profesional?: { __typename?: 'Profesional', PROFESIONAL_RESPONSABLE_ID: number, NOMBRES: string, APELLIDOS: string, TIPO_DOCUMENTO: string, NUMERO_DOCUMENTO: string, DOMICILIO_LEGAL: string, TIPO_PROFESIONAL: string, ESPECIFICAR_PROFESION: string, NUMERO_CIP?: string | null, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, TELEFONO: string, EMAIL: string, EXPEDIENTE_ID: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateProfesionalMutationVariables = Exact<{
  input: ProfesionalInput;
}>;


export type UpdateProfesionalMutation = { __typename?: 'Mutation', updateProfesional: { __typename?: 'ProfesionalResponse', profesional?: { __typename?: 'Profesional', PROFESIONAL_RESPONSABLE_ID: number, NOMBRES: string, APELLIDOS: string, TIPO_DOCUMENTO: string, NUMERO_DOCUMENTO: string, DOMICILIO_LEGAL: string, TIPO_PROFESIONAL: string, ESPECIFICAR_PROFESION: string, NUMERO_CIP?: string | null, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, TELEFONO: string, EMAIL: string, EXPEDIENTE_ID: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateResponsableMutationVariables = Exact<{
  input: ResponsableInput;
}>;


export type CreateResponsableMutation = { __typename?: 'Mutation', createResponsable: { __typename?: 'ResponsableResponse', informacion?: { __typename?: 'Responsable', ID: number, RUC: string, DNI: string, REPRESENTANTE_LEGAL: string, RAZON_SOCIAL: string, DOMICILIO: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, CORREO: string, TELEFONO: string, FECHA_REGISTRO?: any | null, FECHA_REVISION?: any | null, OBSERVACION?: string | null, EXPEDIENTE: string, ESTADO?: string | null } | null } };

export type UpdateResponsableMutationVariables = Exact<{
  input: ResponsableInput;
}>;


export type UpdateResponsableMutation = { __typename?: 'Mutation', updateResponsable: { __typename?: 'ResponsableResponse', informacion?: { __typename?: 'Responsable', ID: number, RUC: string, DNI: string, REPRESENTANTE_LEGAL: string, RAZON_SOCIAL: string, DOMICILIO: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, CORREO: string, TELEFONO: string } | null } };

export type CreateSolicitanteMutationVariables = Exact<{
  input: SolicitanteInput;
}>;


export type CreateSolicitanteMutation = { __typename?: 'Mutation', createSolicitante: { __typename?: 'SolicitanteResponse', informacion?: { __typename?: 'Solicitante', SOLICITANTE_ID: number, RAZON_SOCIAL?: string | null, PARTIDA_REGISTRAL?: string | null, NOMBRES_SOLICITANTE?: string | null, APELLIDOS_SOLICITANTE?: string | null, TELEFONO_SOLICITANTE: string, TIPO_DOCUMENTO: string, NUMERO_DOCUMENTO: string, DOMICILIO_LEGAL: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, EMAIL_SOLICITANTE: string, NOMBRE_REPRESENTANTE?: string | null, APELLIDO_REPRESENTANTE?: string | null, EMAIL_REPRESENTANTE?: string | null, DNI_REPRESENTANTE?: string | null, EXPEDIENTE_ID: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateSolicitanteMutationVariables = Exact<{
  input: SolicitanteInput;
}>;


export type UpdateSolicitanteMutation = { __typename?: 'Mutation', updateSolicitante: { __typename?: 'SolicitanteResponse', informacion?: { __typename?: 'Solicitante', SOLICITANTE_ID: number, RAZON_SOCIAL?: string | null, PARTIDA_REGISTRAL?: string | null, NOMBRES_SOLICITANTE?: string | null, APELLIDOS_SOLICITANTE?: string | null, TELEFONO_SOLICITANTE: string, TIPO_DOCUMENTO: string, NUMERO_DOCUMENTO: string, DOMICILIO_LEGAL: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, EMAIL_SOLICITANTE: string, NOMBRE_REPRESENTANTE?: string | null, APELLIDO_REPRESENTANTE?: string | null, EMAIL_REPRESENTANTE?: string | null, DNI_REPRESENTANTE?: string | null, EXPEDIENTE_ID: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateSolicitudAutorizacionMutationVariables = Exact<{
  input: SolicitudAutorizacionInput;
}>;


export type CreateSolicitudAutorizacionMutation = { __typename?: 'Mutation', createSolicitudAutorizacion: { __typename?: 'SolicitudAutorizacionResponse', informacion?: { __typename?: 'SolicitudAutorizacion', ID: number, RUC: string, DNI: string, REPRESENTANTE_LEGAL: string, RAZON_SOCIAL: string, DOMICILIO: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, CORREO: string, TELEFONO: string, ESTADO?: string | null, EXPEDIENTE: string, OBSERVACION?: string | null, FECHA_REVISION?: any | null, FECHA_REGISTRO?: any | null, ROLASIGNADO?: string | null } | null } };

export type UpdateSucursalMutationVariables = Exact<{
  input: SucursalUpdateInput;
}>;


export type UpdateSucursalMutation = { __typename?: 'Mutation', updateSucursal: { __typename?: 'SucursalUpdateResponse', data?: { __typename?: 'Sucursal', SUCURSAL_ID: number, EXPEDIENTE_ID: number, NOMBRE_SUCURSAL: string, DIRECCION_SUCURSAL: string, DEPARTAMENTO_ID: string, PROVINCIA_ID: string, DISTRITO_ID: string, FECHA_REGISTRO: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateSucursalMutationVariables = Exact<{
  input: Array<SucursalCreateInput> | SucursalCreateInput;
}>;


export type CreateSucursalMutation = { __typename?: 'Mutation', createSucursal: { __typename?: 'SucursalCreateResponse', data?: Array<{ __typename?: 'Sucursal', SUCURSAL_ID: number, EXPEDIENTE_ID: number, NOMBRE_SUCURSAL: string, DIRECCION_SUCURSAL: string, DEPARTAMENTO_ID: string, PROVINCIA_ID: string, DISTRITO_ID: string, FECHA_REGISTRO: any }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteSucursalMutationVariables = Exact<{
  sucursalId: Scalars['Int'];
}>;


export type DeleteSucursalMutation = { __typename?: 'Mutation', deleteSucursal: boolean };

export type CreateTierraCultivosMutationVariables = Exact<{
  input: Array<TierraCultivoInput> | TierraCultivoInput;
}>;


export type CreateTierraCultivosMutation = { __typename?: 'Mutation', createTierraCultivos: { __typename?: 'TierraCultivoResponseCreate', tierras?: Array<{ __typename?: 'TierraCultivo', TIERRA_CULTIVO_ID: number, EXPEDIENTE_ID: number, NOMBRE_PREDIO: string, AREA: string, TIPO_TENENCIA: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, NUME_REGI_ARC?: string | null, FECHA_REGISTRO?: any | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteTierraCultivoMutationVariables = Exact<{
  tierraCultivoId: Scalars['Int'];
}>;


export type DeleteTierraCultivoMutation = { __typename?: 'Mutation', deleteTierraCultivo: boolean };

export type UpdateTierraCultivoMutationVariables = Exact<{
  input: TierraCultivoInput;
}>;


export type UpdateTierraCultivoMutation = { __typename?: 'Mutation', updateTierraCultivo: { __typename?: 'TierraCultivoResponseUpdate', tierras?: { __typename?: 'TierraCultivo', TIERRA_CULTIVO_ID: number, EXPEDIENTE_ID: number, NOMBRE_PREDIO: string, AREA: string, TIPO_TENENCIA: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, NUME_REGI_ARC?: string | null, FECHA_REGISTRO?: any | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetExpedienteByIdQueryVariables = Exact<{
  tipoDocumento: Scalars['String'];
  nroDocumento: Scalars['String'];
  expedienteId: Scalars['String'];
}>;


export type GetExpedienteByIdQuery = { __typename?: 'Query', getExpedienteById?: { __typename?: 'ExpedienteResponse', EXPEDIENTE_ID: number, NUMERO_EXPEDIENTE?: string | null, ESTADO: string, TIPO_SOLICITUD: TipoSolicitudExpedientes, SEDE?: { __typename?: 'Sede', NOMBRE_SEDE: string } | null } | null };

export type GetArchivosByNumeRegiArcQueryVariables = Exact<{
  numeRegiArc: Scalars['String'];
}>;


export type GetArchivosByNumeRegiArcQuery = { __typename?: 'Query', getArchivosByNumeRegiArc?: { __typename?: 'ArchivoResponse', NUME_REGI_ARC: string, APLICACION: string, MODULO?: string | null, REGISTRO?: string | null, DESCRIPCION_REGISTRO?: string | null, FECH_REGI_ARC: any, ArchivosFisicos: Array<{ __typename?: 'ArchivoFisico', NUME_REGI_ARC: string, SECU_REGI_ARC: number, FECH_CARG_ARC: any, FLAG_IMAGEN: string, FILENAME: string, FILEEXTENSION: string, NOMBRE_OBJETO: string, DESCRIPCION: string, FUENTE: string, FLAG_RESTRINGIDO: string }> } | null };

export type GetAllCultivaresQueryVariables = Exact<{
  pageSize: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type GetAllCultivaresQuery = { __typename?: 'Query', getAllCultivares: { __typename?: 'CultivaresPaginatedResponse', page: number, pageSize: number, totalItems: number, data: Array<{ __typename?: 'Cultivares', CULTIVO_ID: number, ESPECIE_ID: number, NOMBRE_CULTIVAR: string }> } };

export type GetCultivarByEspecieQueryVariables = Exact<{
  estado?: InputMaybe<Estados>;
  codEspecie: Scalars['Int'];
}>;


export type GetCultivarByEspecieQuery = { __typename?: 'Query', getCultivarByEspecie?: Array<{ __typename?: 'Cultivares', CULTIVO_ID: number, NOMBRE_CULTIVAR: string, ESPECIE_ID: number }> | null };

export type GetObsCultivarComercialExpedienteQueryVariables = Exact<{
  expedienteId: Scalars['Int'];
}>;


export type GetObsCultivarComercialExpedienteQuery = { __typename?: 'Query', getObservacionesByExpediente: { __typename?: 'Observacion', OBSERVACION_ID: number, ESTADO_DATOS_GENERALES: EstadosObservacion, ESTADO_CULT_COMERCIAL: EstadosObservacion, ESTADO_INFO_ENSAYO: EstadosObservacion, ESTADO_MANT_SEMILLA: EstadosObservacion, OBS_DATOS_GENERALES?: string | null, OBS_CULT_COMERCIAL?: string | null, OBS_INFO_ENSAYO?: string | null, OBS_MANT_SEMILLA?: string | null, EXPEDIENTE_ID: number } };

export type GetTramiteCultiComercByRegIdQueryVariables = Exact<{
  expedienteId: Scalars['Int'];
}>;


export type GetTramiteCultiComercByRegIdQuery = { __typename?: 'Query', getTramiteByRegistroId?: { __typename?: 'Tramite', NUMERO_EXPEDIENTE?: string | null, EXPEDIENTE_ID: number, SOLICITANTE?: { __typename?: 'TramiteSolicitante', SOLICITANTE_ID: number, RAZON_SOCIAL?: string | null, PARTIDA_REGISTRAL?: string | null, NOMBRES_SOLICITANTE?: string | null, APELLIDOS_SOLICITANTE?: string | null, TELEFONO_SOLICITANTE: string, TIPO_DOCUMENTO: string, NUMERO_DOCUMENTO: string, DOMICILIO_LEGAL: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, EMAIL_SOLICITANTE: string, NOMBRE_REPRESENTANTE?: string | null, APELLIDO_REPRESENTANTE?: string | null, EMAIL_REPRESENTANTE?: string | null, DNI_REPRESENTANTE?: string | null, EXPEDIENTE_ID: number, NOMBRE_DEPARTAMENTO?: string | null, NOMBRE_PROVINCIA?: string | null, NOMBRE_DISTRITO?: string | null } | null, CULTIVAR_COMERCIAL?: { __typename?: 'CultivarComercial', CULTIVAR_COMERCIAL_ID: number, NOMBRE_CULTIVAR: string, PAIS: string, FECHA_INTERNAMIENTO?: any | null, TIPO_CULTIVAR: string, GENEOLOGIA: string, NOMBRE_OBTENTOR: string, EXPEDIENTE_ID: number, FECHA_REGISTRO: any, ESPECIE_ID?: number | null, TIPO_NATIVO?: TipoNativo | null, NOMBRE_CO_OBTENTOR?: string | null, FINALIDAD_USO?: string | null, RANGO_ADAPTACION?: string | null, NUME_REGI_ARC_DVC?: string | null, NUME_REGI_ARC_RIV?: string | null, NUME_REGI_ARC_DRCO?: string | null, ESPECIE?: { __typename?: 'Especies', NOMBRE_CIENTIFICO: string, NOMBRE_ESPECIE_COMUN: string } | null } | null, LOCALIDAD_ENSAYO?: Array<{ __typename?: 'LocalidadEnsayo', LOCALIDAD_ENSAYO_ID: number, DEPARTAMENTO_ID: string, PROVINCIA_ID: string, DISTRITO_ID: string, SECTOR: string, ALTITUD: string, FECHA_INICIO: any, FECHA_FIN: any, EXPEDIENTE_ID: number, FECHA_REGISTRO: any }> | null, INFORMACION_ENSAYO?: { __typename?: 'InformacionEnsayo', INFORMACION_ENSAYO_ID: number, AMBITO_GEOGRAFICO: string, RANGO_ADAPTACION: string, FINALIDAD_USO: string, INSTALACION: string, CAMPANAS_ENSAYOS: string, CARACTERES_PRUEBA: string, PLANTAS_TIPO: string, PRIMERA_CAMPANA: string, SEGUNDA_CAMPANA: string, COMPORTAMIENTO_BIOTICO: string, COMPORTAMIENTO_ABIOTICO: string, NUME_REGI_ARC?: string | null, EXPEDIENTE_ID: number, FECHA_REGISTRO: any } | null, MANTENIMIENTO_SEMILLA?: { __typename?: 'MantSemilla', MANTENIMIENTO_SEMILLA_ID: number, EXPEDIENTE_ID: number, RAZON_SOCIAL: string, AREA_RESPONSABLE: string, FECHA_REGISTRO: any } | null } | null };

export type GetTramiteDeclaracionSemillaByRegIdQueryVariables = Exact<{
  expedienteId: Scalars['Int'];
}>;


export type GetTramiteDeclaracionSemillaByRegIdQuery = { __typename?: 'Query', getTramiteByRegistroId?: { __typename?: 'Tramite', NUMERO_EXPEDIENTE?: string | null, EXPEDIENTE_ID: number, SOLICITANTE?: { __typename?: 'TramiteSolicitante', SOLICITANTE_ID: number, RAZON_SOCIAL?: string | null, PARTIDA_REGISTRAL?: string | null, NOMBRES_SOLICITANTE?: string | null, APELLIDOS_SOLICITANTE?: string | null, TELEFONO_SOLICITANTE: string, TIPO_DOCUMENTO: string, NUMERO_DOCUMENTO: string, DOMICILIO_LEGAL: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, EMAIL_SOLICITANTE: string, NOMBRE_REPRESENTANTE?: string | null, APELLIDO_REPRESENTANTE?: string | null, EMAIL_REPRESENTANTE?: string | null, DNI_REPRESENTANTE?: string | null, EXPEDIENTE_ID: number, NOMBRE_DEPARTAMENTO?: string | null, NOMBRE_PROVINCIA?: string | null, NOMBRE_DISTRITO?: string | null } | null, INFO_CULTIVO?: Array<{ __typename?: 'TramiteInfoCultivo', INFORMACION_CULTIVO_ID: number, ESPECIE_ID: number, CULTIVO_ID?: number | null, CULTIVO_REGLAMENTARIO?: string | null, EXPEDIENTE_ID: number, NOMBRE_ESPECIE?: string | null, NOMBRE_CULTIVO?: string | null }> | null, SUCURSALES?: Array<{ __typename?: 'TramiteSucursal', SUCURSAL_ID: number, EXPEDIENTE_ID: number, NOMBRE_SUCURSAL: string, DIRECCION_SUCURSAL: string, DEPARTAMENTO_ID: string, PROVINCIA_ID: string, DISTRITO_ID: string, FECHA_REGISTRO: any, NOMBRE_DEPARTAMENTO?: string | null, NOMBRE_PROVINCIA?: string | null, NOMBRE_DISTRITO?: string | null }> | null, ALMACENES?: Array<{ __typename?: 'TramiteAlmacen', ALMACEN_ID: number, DIRECCION: string, DEPARTAMENTO_ID: string, PROVINCIA_ID: string, DISTRITO_ID: string, NUME_REGI_ARC?: string | null, EXPEDIENTE_ID: number, FECHA_REGISTRO: any, NOMBRE_DEPARTAMENTO?: string | null, NOMBRE_PROVINCIA?: string | null, NOMBRE_DISTRITO?: string | null }> | null } | null };

export type GetAllEspeciesQueryVariables = Exact<{
  pageSize: Scalars['Int'];
  page: Scalars['Int'];
  estado?: InputMaybe<Estados>;
  denominacion?: InputMaybe<Estados>;
}>;


export type GetAllEspeciesQuery = { __typename?: 'Query', getAllEspecies?: { __typename?: 'ESpeciePaginatedResponse', totalItems: number, data: Array<{ __typename?: 'Especies', ESPECIE_ID: number, NOMBRE_CIENTIFICO: string, NOMBRE_ESPECIE_COMUN: string, ESTADO: Estados, REGLAMENTARIO: Estados, FECHA_REGISTRO: any, DENOMINACION: Estados }> } | null };

export type GetEspeciesByNameQueryVariables = Exact<{
  estado?: InputMaybe<Estados>;
  query: Scalars['String'];
  denominacion?: InputMaybe<Estados>;
}>;


export type GetEspeciesByNameQuery = { __typename?: 'Query', getEspeciesByName?: Array<{ __typename?: 'Especies', ESPECIE_ID: number, ESTADO: Estados, NOMBRE_CIENTIFICO: string, NOMBRE_ESPECIE_COMUN: string, REGLAMENTARIO: Estados, FECHA_REGISTRO: any, DENOMINACION: Estados }> | null };

export type GetAllLaboratoriosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLaboratoriosQuery = { __typename?: 'Query', getAllLaboratorios: Array<{ __typename?: 'Laboratorio', LABORATORIO_ID: number, NUMERO_RESOLUCION: string, REPRESENTANTE_LEGAL: string, SOLICITANTE: string, ESPECIES: string, ANALISIS: string, RESPONSABLE_TECNICO: string, DEPARTAMENTO: string, TELEFONO: string, FECHA_REGISTRO: any }> };

export type IsDocumentoUniqueQueryVariables = Exact<{
  tipoDocumento: Scalars['String'];
  nroDocumento: Scalars['String'];
  tipoSolicitud: TipoSolicitudExpedientes;
}>;


export type IsDocumentoUniqueQuery = { __typename?: 'Query', isDocumentoUnique: boolean };

export type GetEspecializacionByIdQueryVariables = Exact<{
  especializacionId: Scalars['Float'];
}>;


export type GetEspecializacionByIdQuery = { __typename?: 'Query', getEspecializacionById?: { __typename?: 'Especializacion', ESPECIALIZACION_RELACIONADA_ID: number, NOMBRE: string, TIPO_ESPECIALIDAD: string, FECHA_INICIO: any, FECHA_TERMINO: any, HORAS?: string | null, LUGAR: string, NUME_REGI_ARC?: string | null, PROFESIONAL_RESPONSABLE_ID: number } | null };

export type GetExperienciasByIdQueryVariables = Exact<{
  experienciaId: Scalars['Float'];
}>;


export type GetExperienciasByIdQuery = { __typename?: 'Query', getExperienciasById?: { __typename?: 'Experiencia', EXPERIENCIA_RELACIONADA_ID: number, RAZON_SOCIAL: string, ACTIVIDAD_DESARROLLADA: string, FECHA_INICIO: any, FECHA_TERMINO: any, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, NUME_REGI_ARC?: string | null, PROFESIONAL_RESPONSABLE_ID: number } | null };

export type GetInfoCultivoByExpedienteQueryVariables = Exact<{
  expedienteId: Scalars['Int'];
}>;


export type GetInfoCultivoByExpedienteQuery = { __typename?: 'Query', getInfoCultivoByExpediente?: Array<{ __typename?: 'InformacionCultivo', INFORMACION_CULTIVO_ID: number, ESPECIE_ID: number, CULTIVO_ID?: number | null, CULTIVO_REGLAMENTARIO?: string | null, EXPEDIENTE_ID: number }> | null };

export type GetInfoCulivoByIdQueryVariables = Exact<{
  infoCultivoId: Scalars['Int'];
}>;


export type GetInfoCulivoByIdQuery = { __typename?: 'Query', getInfoCulivoById?: Array<{ __typename?: 'InformacionCultivo', INFORMACION_CULTIVO_ID: number, ESPECIE_ID: number, CULTIVO_ID?: number | null, CULTIVO_REGLAMENTARIO?: string | null, EXPEDIENTE_ID: number }> | null };

export type GetObservacionesByExpedienteQueryVariables = Exact<{
  expedienteId: Scalars['Int'];
}>;


export type GetObservacionesByExpedienteQuery = { __typename?: 'Query', getObservacionesByExpediente: { __typename?: 'Observacion', OBSERVACION_ID: number, ESTADO_DATOS_GENERALES: EstadosObservacion, ESTADO_INFO_CULTIVO: EstadosObservacion, ESTADO_PROFESIONAL: EstadosObservacion, ESTADO_TIERRAS: EstadosObservacion, ESTADO_ACONDICIONAMIENTO: EstadosObservacion, ESTADO_ANALISIS: EstadosObservacion, ESTADO_SUCURSALES: EstadosObservacion, OBS_DATOS_GENERALES?: string | null, OBS_INFO_CULTIVO?: string | null, OBS_PROFESIONAL?: string | null, OBS_TIERRAS?: string | null, OBS_ACONDICIONAMIENTO?: string | null, OBS_ANALISIS?: string | null, OBS_SUCURSALES?: string | null, EXPEDIENTE_ID: number } };

export type GetTierraCultivoByIdQueryVariables = Exact<{
  tierraCultivoId: Scalars['Int'];
}>;


export type GetTierraCultivoByIdQuery = { __typename?: 'Query', getTierraCultivoById?: { __typename?: 'TierraCultivo', TIERRA_CULTIVO_ID: number, EXPEDIENTE_ID: number, NOMBRE_PREDIO: string, AREA: string, TIPO_TENENCIA: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, NUME_REGI_ARC?: string | null, FECHA_REGISTRO?: any | null } | null };

export type GetTramiteByRegistroIdQueryVariables = Exact<{
  expedienteId: Scalars['Int'];
}>;


export type GetTramiteByRegistroIdQuery = { __typename?: 'Query', getTramiteByRegistroId?: { __typename?: 'Tramite', NUMERO_EXPEDIENTE?: string | null, EXPEDIENTE_ID: number, SOLICITANTE?: { __typename?: 'TramiteSolicitante', SOLICITANTE_ID: number, RAZON_SOCIAL?: string | null, PARTIDA_REGISTRAL?: string | null, NOMBRES_SOLICITANTE?: string | null, APELLIDOS_SOLICITANTE?: string | null, TELEFONO_SOLICITANTE: string, TIPO_DOCUMENTO: string, NUMERO_DOCUMENTO: string, DOMICILIO_LEGAL: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, EMAIL_SOLICITANTE: string, NOMBRE_REPRESENTANTE?: string | null, APELLIDO_REPRESENTANTE?: string | null, EMAIL_REPRESENTANTE?: string | null, DNI_REPRESENTANTE?: string | null, EXPEDIENTE_ID: number, NOMBRE_DEPARTAMENTO?: string | null, NOMBRE_PROVINCIA?: string | null, NOMBRE_DISTRITO?: string | null } | null, INFO_CULTIVO?: Array<{ __typename?: 'TramiteInfoCultivo', INFORMACION_CULTIVO_ID: number, ESPECIE_ID: number, CULTIVO_ID?: number | null, CULTIVO_REGLAMENTARIO?: string | null, EXPEDIENTE_ID: number, NOMBRE_ESPECIE?: string | null, NOMBRE_CULTIVO?: string | null }> | null, PROFESIONAL?: { __typename?: 'TramiteProfesional', PROFESIONAL_RESPONSABLE_ID: number, NOMBRES: string, APELLIDOS: string, TIPO_DOCUMENTO: string, NUMERO_DOCUMENTO: string, DOMICILIO_LEGAL: string, TIPO_PROFESIONAL: string, ESPECIFICAR_PROFESION: string, NUMERO_CIP?: string | null, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, TELEFONO: string, EMAIL: string, EXPEDIENTE_ID: number, NOMBRE_DEPARTAMENTO?: string | null, NOMBRE_PROVINCIA?: string | null, NOMBRE_DISTRITO?: string | null } | null, EXPERIENCIA?: Array<{ __typename?: 'TramiteExperiencia', EXPERIENCIA_RELACIONADA_ID: number, RAZON_SOCIAL: string, ACTIVIDAD_DESARROLLADA: string, FECHA_INICIO: any, FECHA_TERMINO: any, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, NUME_REGI_ARC?: string | null, PROFESIONAL_RESPONSABLE_ID: number, NOMBRE_DEPARTAMENTO?: string | null, NOMBRE_PROVINCIA?: string | null, NOMBRE_DISTRITO?: string | null }> | null, ESPECIALIDAD?: Array<{ __typename?: 'Especializacion', ESPECIALIZACION_RELACIONADA_ID: number, NOMBRE: string, TIPO_ESPECIALIDAD: string, FECHA_INICIO: any, FECHA_TERMINO: any, HORAS?: string | null, LUGAR: string, NUME_REGI_ARC?: string | null, PROFESIONAL_RESPONSABLE_ID: number }> | null, TIERRAS_CULTIVOS?: Array<{ __typename?: 'TramiteTierraCultivo', TIERRA_CULTIVO_ID: number, EXPEDIENTE_ID: number, NOMBRE_PREDIO: string, AREA: string, TIPO_TENENCIA: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, NUME_REGI_ARC?: string | null, FECHA_REGISTRO?: any | null, NOMBRE_DEPARTAMENTO?: string | null, NOMBRE_PROVINCIA?: string | null, NOMBRE_DISTRITO?: string | null }> | null, ACONDICIONAMIENTO?: { __typename?: 'Acondicionamiento', ACONDICIONAMIENTO_ID: number, RECEPCION: string, OPERACIONES_ESPECIALES: string, LIMPIEZA: string, CLASIFICACION: string, TRATAMIENTO: string, ENVASADO: string, ALMACENAMIENTO: string, EXPEDIENTE_ID: number, RECEPCION_ARC?: string | null, OPERACIONES_ESPECIALES_ARC?: string | null, LIMPIEZA_ARC?: string | null, CLASIFICACION_ARC?: string | null, TRATAMIENTO_ARC?: string | null, ENVASADO_ARC?: string | null, ALMACENAMIENTO_ARC?: string | null, FECHA_REGISTRO?: any | null } | null, ANALISIS_CALIDAD?: { __typename?: 'TramiteAnalisisCalidad', ANALISIS_ID: number, SEMILLA_SEXUAL: Estados, SEMILLA_ASEXUAL: Estados, LABORATORIO_ID?: number | null, EXPEDIENTE_ID: number, FECHA_REGISTRO: any, NOMBRE_LABORATORIO?: string | null } | null } | null };

export type GetResponsableByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetResponsableByIdQuery = { __typename?: 'Query', getResponsableById?: { __typename?: 'Responsable', ID: number, RUC: string, DNI: string, REPRESENTANTE_LEGAL: string, RAZON_SOCIAL: string, DOMICILIO: string, DISTRITO: string, DEPARTAMENTO: string, PROVINCIA: string, CORREO: string, TELEFONO: string, EXPEDIENTE: string, FECHA_REGISTRO?: any | null } | null };

export type GetAllDepartamentosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDepartamentosQuery = { __typename?: 'Query', getAllDepartamentos: Array<{ __typename?: 'Departamento', CODI_DEPA_DPT: string, NOMB_DPTO_DPT: string }> };

export type GetDistritosQueryVariables = Exact<{
  codProv: Scalars['String'];
  codDepa: Scalars['String'];
}>;


export type GetDistritosQuery = { __typename?: 'Query', getDistritos: Array<{ __typename?: 'Distrito', CODI_DIST_TDI: string, CODI_DEPA_DPT: string, CODI_PROV_TPR: string, NOMB_DIST_TDI: string }> };

export type GetProvinciasQueryVariables = Exact<{
  codDepa: Scalars['String'];
}>;


export type GetProvinciasQuery = { __typename?: 'Query', getProvincias: Array<{ __typename?: 'Provincia', CODI_PROV_TPR: string, CODI_DEPA_DPT: string, NOMB_PROV_TPR: string }> };
