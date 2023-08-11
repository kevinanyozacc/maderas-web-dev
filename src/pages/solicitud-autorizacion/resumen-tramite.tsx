import Breadcrumb from '@components/shared/Breadcrumb'
import ShowTextInfo from '@components/shared/ShowTextInfo'
import ShowInfoCard from '@components/shared/ShowTextInfo/ShowInfoCard'
import SendToEmailModal from '@components/shared/SendToEmailModal'
import useToggle from '@hooks/useToggle'
import { TipoSolicitudExpedientes } from '@generated/graphql'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getTramiteByRegistroId } from '../../api'
import { withUrqlClient } from 'next-urql'
import client from '@graphql/client'
import { useRouter } from 'next/router'

type Data = { data: Awaited<ReturnType<typeof getTramiteByRegistroId>> }

export const getServerSideProps: GetServerSideProps<Data> = async (ctx) => {
  if (!ctx?.query?.registroId) {
    // console.log(ctx);
    return { props: { data: null } }
  } else {
    console.log('no trae nada')
  }
  return { props: { data: null } }
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ResumenTramite = (props: Props) => {
  const router = useRouter()
  const { isOpen, onClose } = useToggle()
  const expedienteId = router.query.registroId

  return (
    <section className="container pt-4 pb-28">
      <Breadcrumb
        className="mb-4"
        links={[
          { id: 'inicio', label: 'Inicio', href: '/' },
          {
            id: 'registro',
            label: 'Registro de Solicitud de Autorización',
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
          Resumen de Regitro de Solicitud de Autorización.
        </h1>
      </div>

      <div>
        <div>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between my-4">
            <h2 className="font-bold transition-colors dark:text-white py-3 text-2xl text-center md:text-start">
              Información del Solicitud
            </h2>
          </div>
          <ShowInfoCard title="Expediente">
            <div className="text-sm p-4 flex flex-col gap-3 md:text-lg">
              <ShowTextInfo
                title="Numero de Expediente"
                text={`${expedienteId}`}
              />
            </div>
          </ShowInfoCard>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center gap-6">
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
