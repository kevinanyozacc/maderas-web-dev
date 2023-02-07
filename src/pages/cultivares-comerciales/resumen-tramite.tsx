import { useEffect, useState } from 'react'
import { withUrqlClient } from 'next-urql'
import { nanoid } from 'nanoid'
import moment from 'moment'

import client from '@graphql/client'
import enviroment from '@enviroment'

import Breadcrumb from '@components/shared/Breadcrumb'
import SendToEmailModal from '@components/shared/SendToEmailModal'
import ShowTextInfo from '@components/shared/ShowTextInfo'
import ShowInfoCard from '@components/shared/ShowTextInfo/ShowInfoCard'
import Table from '@components/shared/Table'
import DownloadButton from '@components/shared/DownloadButton'

import useToggle from '@hooks/useToggle'
import { RangosAdaptacionInput } from '@modules/cultivares-comerciales/solicitar-tramite/interfaces/cultivaresComerciales'
import { cultivarOptions } from '@modules/cultivares-comerciales/utils/textContent'
import { checkJuridico } from '@utils/checkJuridico'
import { getTramiteCultiComercByRegId } from 'src/api'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { TipoNativo, TipoSolicitudExpedientes } from '@generated/graphql'

type Data = {
  data: Awaited<ReturnType<typeof getTramiteCultiComercByRegId>>
}

export const getServerSideProps: GetServerSideProps<Data> = async (ctx) => {
  if (!ctx?.query?.registroId) return { props: { data: null } }
  const data = await getTramiteCultiComercByRegId({
    expedienteId: parseInt(ctx.query.registroId as string)
  })

  if (!data) return { props: { data: null }, notFound: true }

  return { props: { data } }
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ResumenTramite = (props: Props) => {
  const { isOpen, onOpen, onClose } = useToggle()
  const [rangosAdap, setRangosAdap] = useState<Array<RangosAdaptacionInput>>([])

  const allData = props.data
  const localidades = allData?.LOCALIDAD_ENSAYO || []

  useEffect(() => {
    if (allData?.INFORMACION_ENSAYO?.RANGO_ADAPTACION) {
      const rangosAdap = JSON.parse(
        allData?.INFORMACION_ENSAYO?.RANGO_ADAPTACION
      )
      setRangosAdap(rangosAdap)
    }
  }, [])

  const tipoCultivarText = (value: string): string => {
    const cultivar = cultivarOptions.find((i) => i.value === value)
    if (cultivar) return cultivar.label
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
            label: 'Cultivares Comerciales de Semillas',
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
          Resumen de Tramite
        </h1>
      </div>

      <div>
        <div>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between my-4">
            <h2 className="font-bold transition-colors dark:text-white py-3 text-2xl text-center md:text-start">
              Información de Cultivares Comerciales de Semillas
            </h2>
            <DownloadButton
              url={`${enviroment.URL}/api/v1/download/cultivar-comercial/resume?expedienteId=${allData?.EXPEDIENTE_ID}`}
            />
          </div>

          <ShowInfoCard title="Expediente">
            <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
              <ShowTextInfo
                title="Numero de Expediente"
                text={`${allData?.NUMERO_EXPEDIENTE}`}
              />
            </div>
          </ShowInfoCard>

          {/* DATOS GENERALES */}
          <ShowInfoCard title="Datos Generales">
            <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
              <ShowTextInfo
                title="Tipo de Documento"
                text={allData?.SOLICITANTE?.TIPO_DOCUMENTO}
              />
              <ShowTextInfo
                title="Numero de Documento"
                text={allData?.SOLICITANTE?.NUMERO_DOCUMENTO}
              />
              {!checkJuridico(allData?.SOLICITANTE?.NUMERO_DOCUMENTO!) ? (
                <>
                  <ShowTextInfo
                    title="Nombres del Solicitante"
                    text={allData?.SOLICITANTE?.NOMBRES_SOLICITANTE}
                  />
                  <ShowTextInfo
                    title="Apellidos del Solicitante"
                    text={allData?.SOLICITANTE?.APELLIDOS_SOLICITANTE}
                  />
                </>
              ) : (
                <>
                  {allData?.SOLICITANTE?.NUMERO_DOCUMENTO.slice(0, 2) ===
                    '20' && (
                    <ShowTextInfo
                      title="Razon Social"
                      text={allData?.SOLICITANTE?.RAZON_SOCIAL}
                    />
                  )}
                  {allData?.SOLICITANTE?.NUMERO_DOCUMENTO.slice(0, 2) ===
                    '20' && (
                    <ShowTextInfo
                      title="Numero De partida Registral"
                      text={allData?.SOLICITANTE?.PARTIDA_REGISTRAL}
                    />
                  )}
                </>
              )}

              <ShowTextInfo
                title="Email"
                text={allData?.SOLICITANTE?.EMAIL_SOLICITANTE}
              />
              <ShowTextInfo
                title="Teléfono"
                text={allData?.SOLICITANTE?.TELEFONO_SOLICITANTE}
              />
              <ShowTextInfo
                title="Departamento"
                text={allData?.SOLICITANTE?.NOMBRE_DEPARTAMENTO}
              />
              <ShowTextInfo
                title="Provincia"
                text={allData?.SOLICITANTE?.NOMBRE_PROVINCIA}
              />
              <ShowTextInfo
                title="Distrito"
                text={allData?.SOLICITANTE?.NOMBRE_DISTRITO}
              />
              <ShowTextInfo
                title="Dirección Legal"
                text={allData?.SOLICITANTE?.DOMICILIO_LEGAL}
              />

              {allData?.SOLICITANTE?.NOMBRE_REPRESENTANTE && (
                <>
                  <div className="border-b dark:border-b-slate-700">
                    <p className="font-medium text-slate-400">
                      Datos Representante Legal
                    </p>
                  </div>

                  <ShowTextInfo
                    title="Nombres del Representante"
                    text={allData?.SOLICITANTE?.NOMBRE_REPRESENTANTE}
                  />
                  <ShowTextInfo
                    title="Apellidos Del Representante"
                    text={allData?.SOLICITANTE?.APELLIDO_REPRESENTANTE}
                  />
                  <ShowTextInfo
                    title="Email Del Representante"
                    text={allData?.SOLICITANTE?.EMAIL_REPRESENTANTE}
                  />
                  <ShowTextInfo
                    title="DNI Del Representante"
                    text={allData?.SOLICITANTE?.DNI_REPRESENTANTE}
                  />
                </>
              )}
            </div>
          </ShowInfoCard>

          {/* DATOS DEL CULTIVAR */}
          <ShowInfoCard title="Datos del Cultivar">
            <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
              <ShowTextInfo
                title="Nombre Científico"
                text={allData?.CULTIVAR_COMERCIAL?.ESPECIE?.NOMBRE_CIENTIFICO}
              />
              <ShowTextInfo
                title="Denominación del cultivar"
                text={allData?.CULTIVAR_COMERCIAL?.NOMBRE_CULTIVAR}
              />
              <ShowTextInfo
                title="País de Origen"
                text={allData?.CULTIVAR_COMERCIAL?.PAIS}
              />
              <ShowTextInfo
                title="Fecha de Internamiento"
                text={
                  allData?.CULTIVAR_COMERCIAL?.FECHA_INTERNAMIENTO
                    ? moment(
                        allData?.CULTIVAR_COMERCIAL?.FECHA_INTERNAMIENTO
                      ).format('DD-MM-YYYY')
                    : ''
                }
              />
              <ShowTextInfo
                title="Tipo de Cultivar"
                text={tipoCultivarText(
                  allData?.CULTIVAR_COMERCIAL?.TIPO_CULTIVAR!
                )}
              />
              <div className="dark:text-white">
                {allData?.CULTIVAR_COMERCIAL?.TIPO_NATIVO ===
                TipoNativo.CultivarNativo
                  ? 'TIPO NATIVO'
                  : 'TIPO NO NATIVO'}
              </div>
              <ShowTextInfo
                title="Genealogía"
                text={allData?.CULTIVAR_COMERCIAL?.GENEOLOGIA}
              />

              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">
                  Descripción Varietal
                </p>
              </div>

              <ShowTextInfo
                title="Finalidad de uso"
                text={allData?.CULTIVAR_COMERCIAL?.FINALIDAD_USO}
              />
              <div className="">
                <p className="font-medium text-slate-400 border-b dark:border-b-slate-700 inline-block">
                  Rango de adaptación
                </p>
              </div>
              <div className="pl-5">
                <ShowTextInfo
                  title="Mínimo"
                  text={
                    allData?.CULTIVAR_COMERCIAL?.RANGO_ADAPTACION?.split('@')[0]
                  }
                />
                <ShowTextInfo
                  title="Máximo"
                  text={
                    allData?.CULTIVAR_COMERCIAL?.RANGO_ADAPTACION?.split('@')[1]
                  }
                />
              </div>

              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">Obtentor</p>
              </div>

              <ShowTextInfo
                title="Nombre de Obtentor"
                text={allData?.CULTIVAR_COMERCIAL?.NOMBRE_OBTENTOR}
              />

              <ShowTextInfo
                title="Nombre de Nombre de Co-Obtentor"
                text={allData?.CULTIVAR_COMERCIAL?.NOMBRE_CO_OBTENTOR}
              />
            </div>
          </ShowInfoCard>

          <ShowInfoCard title="Información de ensayos">
            <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">
                  Localidades donde se realizaron los ensayos
                </p>
              </div>
              {localidades.length !== 0 && (
                <Table>
                  <thead>
                    <tr className="dark:border-b-slate-700">
                      <th className="text-center">Anexo/Sector</th>
                      <th className="text-center">Altitud</th>
                      <th className="text-center">Fecha de Inicio</th>
                      <th className="text-center">Fecha Fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localidades &&
                      localidades.map((item) => (
                        <tr
                          key={item.LOCALIDAD_ENSAYO_ID}
                          className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700"
                        >
                          <td className="text-center min-w-[130px]">
                            {item.SECTOR}
                          </td>
                          <td className="text-center min-w-[130px]">
                            {item.ALTITUD}
                          </td>
                          <td className="text-center min-w-[130px]">
                            {moment.utc(item.FECHA_INICIO).format('DD-MM-YYYY')}
                          </td>
                          <td className="text-center min-w-[130px]">
                            {moment.utc(item.FECHA_FIN).format('DD-MM-YYYY')}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}

              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">
                  Ámbito Geográfico de Desarrollo del Cultivar
                </p>
              </div>
              <div className="pl-4 dark:text-white">
                {allData?.INFORMACION_ENSAYO?.AMBITO_GEOGRAFICO.replace(
                  /,/g,
                  ', '
                ).trim()}
              </div>
              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">
                  Rangos de Adaptación (Altitud)
                </p>
              </div>
              <div className="max-w-[500px]">
                <Table>
                  <thead>
                    <tr className="dark:border-b-slate-700">
                      <th className="text-center">MÍNIMO</th>
                      <th className="text-center">MÁXIMO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rangosAdap &&
                      rangosAdap.map((item) => (
                        <tr
                          key={nanoid()}
                          className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700"
                        >
                          <td className="text-center min-w-[130px]">
                            {item.MIN}
                          </td>
                          <td className="text-center min-w-[130px]">
                            {item.MAX}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>

              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">Finalidad de Uso</p>
              </div>
              <div className="pl-4 dark:text-white">
                {allData?.INFORMACION_ENSAYO?.FINALIDAD_USO.replace(
                  /,/g,
                  ', '
                ).trim()}
              </div>
              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">
                  Ensayos de Identificación
                </p>
              </div>
              <ShowTextInfo
                isTextArea
                title="Instalación"
                text={allData?.INFORMACION_ENSAYO?.INSTALACION}
              />
              <ShowTextInfo
                isTextArea
                title="N° de Campañas y N° de Ensayos"
                text={allData?.INFORMACION_ENSAYO?.CAMPANAS_ENSAYOS}
              />
              <ShowTextInfo
                isTextArea
                title="Caracteres que difieren al cultivar a prueba"
                text={allData?.INFORMACION_ENSAYO?.CARACTERES_PRUEBA}
              />
              <ShowTextInfo
                isTextArea
                title="Plantas Fuera de Tipo"
                text={allData?.INFORMACION_ENSAYO?.PLANTAS_TIPO}
              />

              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">
                  Ensayos de Adaptación y Eficiencia
                </p>
              </div>
              <ShowTextInfo
                isTextArea
                title="Resultados de la Primera Campaña Agrícola"
                text={allData?.INFORMACION_ENSAYO?.PRIMERA_CAMPANA}
              />
              <ShowTextInfo
                isTextArea
                title="Resultados de la Segunda Campaña Agrícola"
                text={allData?.INFORMACION_ENSAYO?.SEGUNDA_CAMPANA}
              />

              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">
                  Comportamiento Frente a Factores Bióticos
                </p>
              </div>
              <ShowTextInfo
                isTextArea
                title="Comportamiento Frente a Factores Bióticos"
                text={allData?.INFORMACION_ENSAYO?.COMPORTAMIENTO_BIOTICO}
              />

              <div className="border-b dark:border-b-slate-700">
                <p className="font-medium text-slate-400">
                  Comportamiento Frente a Factores Abióticos
                </p>
              </div>
              <ShowTextInfo
                isTextArea
                title="Comportamiento Frente a Factores Abióticos"
                text={allData?.INFORMACION_ENSAYO?.COMPORTAMIENTO_ABIOTICO}
              />
            </div>
          </ShowInfoCard>

          <ShowInfoCard title="Mantenimiento de Semilla Genética">
            <div className="text-sm p-4 flex flex-col gap-4 md:text-lg">
              <ShowTextInfo
                title="Nombre o Razón Social del Solicitante"
                text={allData?.MANTENIMIENTO_SEMILLA?.RAZON_SOCIAL}
              />
              <ShowTextInfo
                title="Area Responsable"
                text={allData?.MANTENIMIENTO_SEMILLA?.AREA_RESPONSABLE}
              />
            </div>
          </ShowInfoCard>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center gap-6">
        <DownloadButton
          url={`${enviroment.URL}/api/v1/download/cultivar-comercial/resume?expedienteId=${allData?.EXPEDIENTE_ID}`}
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
          tipoTramite={TipoSolicitudExpedientes.RegistroCultivarComercial}
          expedienteId={props.data?.EXPEDIENTE_ID || 0}
        />
      )}
    </section>
  )
}

export default withUrqlClient(client)(ResumenTramite)
