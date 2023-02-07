import { nanoid } from 'nanoid'
import moment from 'moment'

import Breadcrumb from '@components/shared/Breadcrumb'
import ShowTextInfo from '@components/shared/ShowTextInfo'
import ShowInfoCard from '@components/shared/ShowTextInfo/ShowInfoCard'
import Table from '@components/shared/Table'
import SendToEmailModal from '@components/shared/SendToEmailModal'

import useToggle from '@hooks/useToggle'
import { Estados, TipoSolicitudExpedientes } from '@generated/graphql'
import enviroment from '@enviroment'
import DownloadButton from '@components/shared/DownloadButton'
import { checkJuridico } from '@utils/checkJuridico'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getTramiteByRegistroId } from '../../api'
import { withUrqlClient } from 'next-urql'
import client from '@graphql/client'

type Data = { data: Awaited<ReturnType<typeof getTramiteByRegistroId>> }

export const getServerSideProps: GetServerSideProps<Data> = async (ctx) => {
  if (!ctx?.query?.registroId) return { props: { data: null } }
  const data = await getTramiteByRegistroId({
    expedienteId: parseInt(ctx.query.registroId as string)
  })

  if (!data) return { props: { data: null }, notFound: true }

  return { props: { data } }
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ResumenTramite = (props: Props) => {
  const { isOpen, onOpen, onClose } = useToggle()

  const dataTramite = props.data

  const allInfoCult = dataTramite?.INFO_CULTIVO

  const nameValue = (value: string) => {
    if (value === 'PROPIO') return 'Propio'
    if (value === 'CESION') return 'Cesión de uso'
    if (value === 'ALQUILADO') return 'Alquilado'
    if (value === 'OTRO') return 'Otro'
    return value
  }

  return (
    <section className="container pt-4 pb-28">
      <Breadcrumb
        className="mb-4"
        links={[
          { id: 'inicio', label: 'Inicio', href: '/' },
          {
            id: 'registro',
            label: 'Registro de Productor de Semillas',
            href: '/'
          },
          {
            id: 'generar-solicitud',
            label: 'Generar Solicitud'
          },
          {
            id: 'resumen-tramite',
            label: 'Resumen de tramite'
          }
        ]}
      />
      <div className="pb-5 border-b">
        <h1 className="title-6 dark:text-white text-center md:text-start">
          Resumen de Solicitud de Registro de Productores de Semillas.
        </h1>
      </div>

      <div>
        <div>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between my-4">
            <h2 className="font-bold transition-colors dark:text-white py-3 text-2xl text-center md:text-start">
              Información del Solicitante
            </h2>
            <DownloadButton
              url={`${enviroment.URL}/api/v1/download/registro-productor/resume?expedienteId=${dataTramite?.EXPEDIENTE_ID}`}
            />
          </div>
          <ShowInfoCard title="Expediente">
            <div className="text-sm p-4 flex flex-col gap-3 md:text-lg">
              <ShowTextInfo
                title="Numero de Expediente"
                text={`${dataTramite?.NUMERO_EXPEDIENTE}`}
              />
            </div>
          </ShowInfoCard>

          {/* DATOS GENERALES */}
          <ShowInfoCard title="Datos Generales">
            <div className="text-sm p-4 flex flex-col gap-3 md:text-lg">
              <ShowTextInfo
                title="Tipo de Documento"
                text={dataTramite?.SOLICITANTE?.TIPO_DOCUMENTO}
              />
              <ShowTextInfo
                title="Numero de Documento"
                text={dataTramite?.SOLICITANTE?.NUMERO_DOCUMENTO}
              />
              {!checkJuridico(dataTramite?.SOLICITANTE?.NUMERO_DOCUMENTO!) ? (
                <>
                  <ShowTextInfo
                    title="Nombres del Solicitante"
                    text={dataTramite?.SOLICITANTE?.NOMBRES_SOLICITANTE}
                  />
                  <ShowTextInfo
                    title="Apellidos del Solicitante"
                    text={dataTramite?.SOLICITANTE?.APELLIDOS_SOLICITANTE}
                  />
                </>
              ) : (
                <>
                  {dataTramite?.SOLICITANTE?.NUMERO_DOCUMENTO.slice(0, 2) ===
                    '20' && (
                    <ShowTextInfo
                      title="Razón Social"
                      text={dataTramite?.SOLICITANTE?.RAZON_SOCIAL}
                    />
                  )}
                  {dataTramite?.SOLICITANTE?.NUMERO_DOCUMENTO!.slice(0, 2) ===
                    '20' && (
                    <ShowTextInfo
                      title="Numero De partida Registral"
                      text={dataTramite?.SOLICITANTE?.PARTIDA_REGISTRAL}
                    />
                  )}
                </>
              )}

              <ShowTextInfo
                title="Email"
                text={dataTramite?.SOLICITANTE?.EMAIL_SOLICITANTE}
              />
              <ShowTextInfo
                title="Teléfono"
                text={dataTramite?.SOLICITANTE?.TELEFONO_SOLICITANTE}
              />
              <ShowTextInfo
                title="Departamento"
                text={dataTramite?.SOLICITANTE?.NOMBRE_DEPARTAMENTO}
              />
              <ShowTextInfo
                title="Provincia"
                text={dataTramite?.SOLICITANTE?.NOMBRE_PROVINCIA}
              />
              <ShowTextInfo
                title="Distrito"
                text={dataTramite?.SOLICITANTE?.NOMBRE_DISTRITO}
              />
              <ShowTextInfo
                title="Dirección Legal"
                text={dataTramite?.SOLICITANTE?.DOMICILIO_LEGAL}
              />

              {dataTramite?.SOLICITANTE?.NOMBRE_REPRESENTANTE && (
                <>
                  <div className="border-b dark:border-b-slate-700">
                    <p className="font-medium text-slate-400">
                      Datos Representante Legal
                    </p>
                  </div>

                  <ShowTextInfo
                    title="Nombres del Representante"
                    text={dataTramite?.SOLICITANTE?.NOMBRE_REPRESENTANTE}
                  />
                  <ShowTextInfo
                    title="Apellidos Del Representante"
                    text={dataTramite?.SOLICITANTE?.APELLIDO_REPRESENTANTE}
                  />
                  <ShowTextInfo
                    title="Email Del Representante"
                    text={dataTramite?.SOLICITANTE?.EMAIL_REPRESENTANTE}
                  />
                  <ShowTextInfo
                    title="DNI Del Representante"
                    text={dataTramite?.SOLICITANTE?.DNI_REPRESENTANTE}
                  />
                  {/* <ShowTextInfo
                    title="DNI Del Representante"
                    text={dataTramite?.SOLICITANTE?.EMAIL_REPRESENTANTE}
                  /> */}
                </>
              )}
            </div>
          </ShowInfoCard>

          {/* INFORMACION DE CULTIVO */}
          <ShowInfoCard title="Información de Cultivos">
            <div className="text-sm p-4 flex flex-col gap-3 md:text-lg">
              <div className="text-sm p-4 flex flex-col gap-3 md:text-lg">
                {allInfoCult?.length !== 0 && (
                  <Table>
                    <thead>
                      <tr className="dark:border-b-slate-700">
                        <th className="text-center">Especie</th>
                        <th className="text-center">Cultivar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allInfoCult?.map((item) => (
                        <tr
                          key={item.INFORMACION_CULTIVO_ID}
                          className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700"
                        >
                          <td className="text-center">{item.NOMBRE_ESPECIE}</td>
                          <td className="text-center">
                            {item.NOMBRE_CULTIVO || item.CULTIVO_REGLAMENTARIO}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </div>
          </ShowInfoCard>

          {/* INFORMACION DE PROFESIONAL */}
          <ShowInfoCard title="Información de Profesional Responsable">
            <div className="text-sm p-4 flex flex-col gap-3 md:text-lg">
              <ShowTextInfo
                title="Tipo de Documento"
                text={dataTramite?.PROFESIONAL?.TIPO_DOCUMENTO}
              />
              <ShowTextInfo
                title="Numero de Documento"
                text={dataTramite?.PROFESIONAL?.NUMERO_DOCUMENTO}
              />
              <ShowTextInfo
                title="Nombres"
                text={dataTramite?.PROFESIONAL?.NOMBRES}
              />
              <ShowTextInfo
                title="Apellidos"
                text={dataTramite?.PROFESIONAL?.APELLIDOS}
              />
              <ShowTextInfo
                title="Email"
                text={dataTramite?.PROFESIONAL?.EMAIL}
              />
              <ShowTextInfo
                title="Teléfono"
                text={dataTramite?.PROFESIONAL?.TELEFONO}
              />

              <ShowTextInfo
                title="Tipo de Profesional"
                text={dataTramite?.PROFESIONAL?.TIPO_PROFESIONAL}
              />
              {dataTramite?.PROFESIONAL?.ESPECIFICAR_PROFESION && (
                <>
                  <ShowTextInfo
                    title="Profesión"
                    text={dataTramite?.PROFESIONAL?.ESPECIFICAR_PROFESION}
                  />
                </>
              )}
              {dataTramite?.PROFESIONAL?.NUMERO_CIP && (
                <>
                  <ShowTextInfo
                    title="Numero de CIP"
                    text={dataTramite?.PROFESIONAL?.NUMERO_CIP}
                  />
                </>
              )}

              <ShowTextInfo
                title="Departamento"
                text={dataTramite?.PROFESIONAL?.NOMBRE_DEPARTAMENTO}
              />
              <ShowTextInfo
                title="Provincia"
                text={dataTramite?.PROFESIONAL?.NOMBRE_PROVINCIA}
              />
              <ShowTextInfo
                title="Distrito"
                text={dataTramite?.PROFESIONAL?.NOMBRE_DISTRITO}
              />
              <ShowTextInfo
                title="Dirección Legal"
                text={dataTramite?.PROFESIONAL?.DOMICILIO_LEGAL}
              />

              {/* INFORMACION DE ESPECIALIZACION */}
              {dataTramite?.ESPECIALIDAD?.length !== 0 && (
                <>
                  <div className="border-b dark:border-b-slate-700">
                    <p className="font-medium text-slate-400">
                      Información de Especialización Relacionada a la Actividad
                      Semillerista
                    </p>
                  </div>
                  <Table>
                    <thead>
                      <tr className="dark:border-b-slate-700">
                        <th>Nombre</th>
                        <th className="text-center">Fecha Inicio</th>
                        <th className="text-center">Fecha Termino</th>
                        <th className="text-center">Horas</th>
                        <th className="text-center">Lugar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTramite?.ESPECIALIDAD?.map((item) => (
                        <tr
                          key={item.ESPECIALIZACION_RELACIONADA_ID}
                          className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700"
                        >
                          <td>{item.NOMBRE}</td>
                          <td className="text-center min-w-[130px]">
                            {moment(new Date(item.FECHA_INICIO)).format(
                              'DD-MM-YYYY'
                            )}
                          </td>
                          <td className="text-center min-w-[130px]">
                            {moment(new Date(item.FECHA_TERMINO)).format(
                              'DD-MM-YYYY'
                            )}
                          </td>
                          <td className="text-center">{item.HORAS}</td>
                          <td className="text-center">{item.LUGAR}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              {/* INFORMACION DE EXPERIENCIA */}
              {dataTramite?.EXPERIENCIA?.length !== 0 && (
                <div className="text-sm flex flex-col gap-4 md:text-lg">
                  <div className="border-b dark:border-b-slate-700">
                    <p className="font-medium text-slate-400">
                      Información de Experiencia relacionada a la actividad
                      semillerista
                    </p>
                  </div>
                  <Table>
                    <thead>
                      <tr className="dark:border-b-slate-700">
                        <th>Razón Social</th>
                        <th className="text-center">Actividad</th>
                        <th className="text-center min-w-[130px]">
                          Fecha Inicio
                        </th>
                        <th className="text-center min-w-[130px]">
                          Fecha Termino
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTramite?.EXPERIENCIA?.map((item) => (
                        <tr
                          key={item.EXPERIENCIA_RELACIONADA_ID}
                          className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700"
                        >
                          <td>{item.RAZON_SOCIAL}</td>
                          <td className="text-center">
                            {item.ACTIVIDAD_DESARROLLADA}
                          </td>
                          <td className="text-center min-w-[130px]">
                            {moment(item.FECHA_INICIO).format('DD-MM-YYYY')}
                          </td>
                          <td className="text-center min-w-[130px]">
                            {moment(item.FECHA_TERMINO).format('DD-MM-YYYY')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
          </ShowInfoCard>

          {/* INFORMACION DE TIERRA CULTIVO */}
          <ShowInfoCard title="Información de Tierras de Cultivo">
            <div className="text-sm p-4 flex flex-col gap-3 md:text-lg">
              {dataTramite?.TIERRAS_CULTIVOS?.length !== 0 && (
                <Table className="">
                  <thead>
                    <tr className="dark:border-b-slate-700">
                      <th>Nombre del Predio</th>
                      <th className="text-center">Area (Hectáreas)</th>
                      <th className="text-center">Tipo de Tenencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTramite?.TIERRAS_CULTIVOS?.map((item) => (
                      <tr
                        key={nanoid()}
                        className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700"
                      >
                        <td>{item.NOMBRE_PREDIO}</td>
                        <td className="text-center">{item.AREA}</td>
                        <td className="text-center">{item.TIPO_TENENCIA}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </ShowInfoCard>

          {/* INFORMACION DE ACONDICIONAMIENTO */}
          <ShowInfoCard title="Información de Acondicionamiento">
            <div className="text-sm p-4 flex flex-col gap-3 md:text-lg">
              <ShowTextInfo
                title="Recepción"
                text={nameValue(dataTramite?.ACONDICIONAMIENTO?.RECEPCION!)}
              />
              <ShowTextInfo
                title="Limpieza"
                text={nameValue(dataTramite?.ACONDICIONAMIENTO?.LIMPIEZA!)}
              />
              <ShowTextInfo
                title="Clasificación"
                text={nameValue(dataTramite?.ACONDICIONAMIENTO?.CLASIFICACION!)}
              />
              <ShowTextInfo
                title="Tratamiento"
                text={nameValue(dataTramite?.ACONDICIONAMIENTO?.TRATAMIENTO!)}
              />
              <ShowTextInfo
                title="Envasado"
                text={nameValue(dataTramite?.ACONDICIONAMIENTO?.ENVASADO!)}
              />
              <ShowTextInfo
                title="Almacenamiento"
                text={nameValue(
                  dataTramite?.ACONDICIONAMIENTO?.ALMACENAMIENTO!
                )}
              />
              <ShowTextInfo
                title="Operaciones Especiales"
                text={nameValue(
                  dataTramite?.ACONDICIONAMIENTO?.OPERACIONES_ESPECIALES!
                )}
              />
            </div>
          </ShowInfoCard>

          {/* INFORMACION DE ANALISIS CALIDAD */}
          <ShowInfoCard title="Información de Analisis Calidad">
            <div className="text-sm p-4 flex flex-col gap-3 md:text-lg">
              {dataTramite?.ANALISIS_CALIDAD?.SEMILLA_ASEXUAL ===
                Estados.Activo &&
                dataTramite.ANALISIS_CALIDAD.SEMILLA_SEXUAL ===
                  Estados.Inactivo && (
                  <div>
                    No corresponde ya que el tipo de semilla a producir es
                    asexual
                  </div>
                )}

              {dataTramite?.ANALISIS_CALIDAD?.SEMILLA_SEXUAL ===
                Estados.Activo &&
                !dataTramite?.ANALISIS_CALIDAD?.LABORATORIO_ID && (
                  <div>Laboratorio Oficial</div>
                )}

              {!!dataTramite?.ANALISIS_CALIDAD?.LABORATORIO_ID && (
                <ShowTextInfo
                  title="Laboratorio Autorizado"
                  text={dataTramite?.ANALISIS_CALIDAD?.NOMBRE_LABORATORIO}
                />
              )}
            </div>
          </ShowInfoCard>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center gap-6">
        <DownloadButton
          url={`${enviroment.URL}/api/v1/download/registro-productor/resume?expedienteId=${dataTramite?.EXPEDIENTE_ID}`}
        />
      </div>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={onOpen}
          className="text-primary-500 underline text-center"
        >
          Enviar Información al Correo Electrónico
        </button>
      </div>

      {isOpen && (
        <SendToEmailModal
          isOpen={isOpen}
          onClose={onClose}
          tipoTramite={TipoSolicitudExpedientes.RegistroProductor}
          expedienteId={props.data?.EXPEDIENTE_ID || 0}
        />
      )}
    </section>
  )
}

export default withUrqlClient(client)(ResumenTramite)
