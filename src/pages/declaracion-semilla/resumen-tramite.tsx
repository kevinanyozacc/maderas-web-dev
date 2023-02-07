import { nanoid } from 'nanoid'
import { withUrqlClient } from 'next-urql'

import client from '@graphql/client'
import enviroment from '@enviroment'

import ShowTextInfo from '@components/shared/ShowTextInfo'
import Breadcrumb from '@components/shared/Breadcrumb'
import ShowInfoCard from '@components/shared/ShowTextInfo/ShowInfoCard'
import Table from '@components/shared/Table'
import SendToEmailModal from '@components/shared/SendToEmailModal'
import useToggle from '@hooks/useToggle'
import DownloadButton from '@components/shared/DownloadButton'
import { checkJuridico } from '@utils/checkJuridico'
import { getTramiteDeclaracionSemillaByRegId } from 'src/api'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { TipoSolicitudExpedientes } from '@generated/graphql'

type Data = {
  data: Awaited<ReturnType<typeof getTramiteDeclaracionSemillaByRegId>>
}

export const getServerSideProps: GetServerSideProps<Data> = async (ctx) => {
  if (!ctx?.query?.registroId) return { props: { data: null } }
  const data = await getTramiteDeclaracionSemillaByRegId({
    expedienteId: parseInt(ctx.query.registroId as string)
  })

  if (!data) return { props: { data: null }, notFound: true }

  return { props: { data } }
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ResumenTramite = (props: Props) => {
  const { isOpen, onOpen, onClose } = useToggle()

  const dataTramite = props.data
  const allInfoCult = dataTramite?.INFO_CULTIVO || []

  return (
    <section className="container pt-4 pb-28">
      <Breadcrumb
        className="mb-4"
        links={[
          { id: 'inicio', label: 'Inicio', href: '/' },
          {
            id: 'registro',
            label: 'Declaración de comerciantes de semillas',
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
        <h1 className="title-5 dark:text-white text-center md:text-start">
          Resumen de Tramite
        </h1>
      </div>

      <div>
        <div>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between my-4">
            <h2 className="font-bold transition-colors dark:text-white py-3 text-2xl text-center md:text-start">
              Información de la declaración de semilla
            </h2>
            <DownloadButton
              url={`${enviroment.URL}/api/v1/download/declaracion-semillas/resume?expedienteId=${dataTramite?.EXPEDIENTE_ID}`}
            />
          </div>
          <ShowInfoCard title="Expediente">
            <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
              <ShowTextInfo
                title="Numero De Expediente"
                text={`${dataTramite?.NUMERO_EXPEDIENTE}`}
              />
            </div>
          </ShowInfoCard>

          <ShowInfoCard title="Datos Generales">
            <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
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
                  {dataTramite?.SOLICITANTE?.NUMERO_DOCUMENTO.slice(0, 2) ===
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
                </>
              )}
            </div>
          </ShowInfoCard>

          {/* INFORMACION DE CULTIVO */}
          <ShowInfoCard title="Informacion de Cultivos">
            <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
              <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
                {allInfoCult?.length !== 0 ? (
                  <Table>
                    <thead>
                      <tr className="dark:border-b-slate-700">
                        <th>Especie</th>
                        <th className="text-center">Cultivar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allInfoCult?.map((item) => (
                        <tr
                          key={nanoid()}
                          className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700"
                        >
                          <td className="w-60">{item.NOMBRE_ESPECIE}</td>
                          <td className="text-center">
                            {item.NOMBRE_CULTIVO || item.CULTIVO_REGLAMENTARIO}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div className="w-full grid place-items-center">
                    <p className="text-slate-500 text-center">
                      No hay elementos
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ShowInfoCard>

          {/* ESTABLECIMIENTOS Y SUCURSALES */}
          <ShowInfoCard title="Establecimiento y sucursales">
            <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">Sucursales</p>
              </div>
              <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
                {dataTramite?.SUCURSALES?.length !== 0 ? (
                  <Table>
                    <thead>
                      <tr className="dark:border-b-slate-700">
                        <th>Nombre Comercial</th>
                        <th className="text-center">
                          Ubicación del Establecimiento
                        </th>
                        <th className="text-center">Departamento</th>
                        <th className="text-center">Provincia</th>
                        <th className="text-center">Distrito</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTramite?.SUCURSALES?.map((item) => (
                        <tr
                          key={nanoid()}
                          className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700"
                        >
                          <td>{item.NOMBRE_SUCURSAL}</td>
                          <td className="text-center">
                            {item.DIRECCION_SUCURSAL}
                          </td>
                          <td className="text-center">
                            {item.NOMBRE_DEPARTAMENTO}
                          </td>
                          <td className="text-center">
                            {item.NOMBRE_PROVINCIA}
                          </td>
                          <td className="text-center">
                            {item.NOMBRE_DISTRITO}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div className="w-full grid place-items-center">
                    <p className="text-slate-500 text-center">
                      No hay elementos
                    </p>
                  </div>
                )}
              </div>
              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">Almacenes</p>
              </div>
              <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
                {dataTramite?.ALMACENES?.length !== 0 ? (
                  <Table>
                    <thead>
                      <tr className="dark:border-b-slate-700">
                        <th>Ubicación de Almacén de semilla</th>
                        <th className="text-center">Departamento</th>
                        <th className="text-center">Provincia</th>
                        <th className="text-center">Distrito</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTramite?.ALMACENES?.map((item) => (
                        <tr
                          key={nanoid()}
                          className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700"
                        >
                          <td>{item.DIRECCION}</td>
                          <td className="text-center">
                            {item.NOMBRE_DEPARTAMENTO}
                          </td>
                          <td className="text-center">
                            {item.NOMBRE_PROVINCIA}
                          </td>
                          <td className="text-center">
                            {item.NOMBRE_DISTRITO}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div className="w-full grid place-items-center">
                    <p className="text-slate-500 text-center">
                      No hay elementos
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ShowInfoCard>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center gap-6">
        <DownloadButton
          url={`${enviroment.URL}/api/v1/download/declaracion-semillas/resume?expedienteId=${dataTramite?.EXPEDIENTE_ID}`}
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
          tipoTramite={TipoSolicitudExpedientes.DeclaracionSemilla}
          expedienteId={props.data?.EXPEDIENTE_ID || 0}
        />
      )}
    </section>
  )
}

export default withUrqlClient(client)(ResumenTramite)
