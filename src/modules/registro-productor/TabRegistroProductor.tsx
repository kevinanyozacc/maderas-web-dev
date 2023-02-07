import Link from 'next/link'
import useToggle from '@hooks/useToggle'

import { IconChevronRight } from '@icons'
import { TipoSolicitudExpedientes } from '@generated/graphql'
import EstadoTramiteModal from '@components/shared/EstadoTramite/EstadoTramiteModal'
import ActualizarTramiteModal from '@components/shared/ActualizarTramite'

const TabRegistroProductor = () => {
  const actualizarModal = useToggle()
  const { onClose, onOpen, isOpen } = useToggle()

  return (
    <div className="max-w-lg mt-10">
      <h1 className="mb-2 capitalize title-5 lg:title-7 dark:text-white">
        Registro de productor de semillas
      </h1>
      <h2 className="mb-10 paragraph-1 dark:text-white">
        La inscripción del Registro de Productores de semillas es de carácter obligatorio
        para las personas naturales o jurídicas dedicadas a la producción de semillas.
      </h2>

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/registro-productor">
            <a className="btn btn-solid-primary">
              Solicitar Trámite
              <IconChevronRight />
            </a>
          </Link>
          <button
            type='button'
            onClick={actualizarModal.onOpen}
            className="btn btn-solid-secondary"
          >
            Actualizar Trámite
            <IconChevronRight />
          </button>
          <button
            type='button'
            onClick={onOpen}
            className="btn btn-outline-primary"
          >
            Estado de Trámite
            <IconChevronRight />
          </button>
        </div>
      </div>

      {actualizarModal.isOpen && (
        <ActualizarTramiteModal
          tipoTramite={TipoSolicitudExpedientes.RegistroProductor}
          {...actualizarModal}
        />
      )}

      {isOpen &&
        <EstadoTramiteModal
          tipoTramite={TipoSolicitudExpedientes.RegistroProductor}
          isOpen={isOpen}
          onClose={onClose}
        />
      }
    </div>
  )
}


export default TabRegistroProductor
