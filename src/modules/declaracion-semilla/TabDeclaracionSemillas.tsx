import Link from 'next/link'
import { IconChevronRight } from '@icons'
import useToggle from '@hooks/useToggle'

import EstadoTramiteModal from '@components/shared/EstadoTramite/EstadoTramiteModal'
import { TipoSolicitudExpedientes } from '@generated/graphql'
import ActualizarTramiteModal from '@components/shared/ActualizarTramite'

const TabDeclaracionSemillas = () => {
  const actualizarModal = useToggle()
  const estadoTramiteModal = useToggle()

  return (
    <div className="max-w-lg mt-10">
      <h1 className="mb-2 capitalize title-5 lg:title-7 dark:text-white">
        Declaración de Comerciante de Semillas
      </h1>
      <h2 className="mb-10 paragraph-1 dark:text-white">
        La declaración de comerciante de semillas es obligatorio para toda
        aquella persona natural o jurídica que comercialice semillas.
      </h2>

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/declaracion-semilla">
            <a className="btn btn-solid-primary">
              Generar Solicitud
              <IconChevronRight />
            </a>
          </Link>
          <button
            type="button"
            onClick={actualizarModal.onOpen}
            className="btn btn-solid-secondary"
          >
            Actualizar Tramite
            <IconChevronRight />
          </button>
          <button
            type="button"
            onClick={estadoTramiteModal.onOpen}
            className="btn btn-outline-primary"
          >
            Estado de Tramite
            <IconChevronRight />
          </button>
        </div>
      </div>

      {actualizarModal.isOpen && (
        <ActualizarTramiteModal
          tipoTramite={TipoSolicitudExpedientes.DeclaracionSemilla}
          {...actualizarModal}
        />
      )}

      {estadoTramiteModal.isOpen && (
        <EstadoTramiteModal
          tipoTramite={TipoSolicitudExpedientes.DeclaracionSemilla}
          {...estadoTramiteModal}
        />
      )}
    </div>
  )
}

export default TabDeclaracionSemillas
