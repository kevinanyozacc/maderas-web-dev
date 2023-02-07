import Link from 'next/link'
import useToggle from '@hooks/useToggle'

import { IconChevronRight } from '@icons'
import EstadoTramiteModal from '@components/shared/EstadoTramite/EstadoTramiteModal'
import { TipoSolicitudExpedientes } from '@generated/graphql'
import ActualizarTramiteModal from '@components/shared/ActualizarTramite'

const TabCultivaresComerciales = () => {
  const actualizarModal = useToggle()
  const estadoTramiteModal = useToggle()

  return (
    <div className="max-w-lg mt-10">
      <h1 className="mb-2 capitalize title-5 lg:title-7 dark:text-white">
        Registro de Cultivares Comerciales de Semillas
      </h1>
      <h2 className="mb-10 paragraph-1 dark:text-white text-justify">
        El Registro de Cultivares Comerciales es único a nivel nacional, conducido por la
        Autoridad en Semillas. La inscripción en el Registro de Cultivares es obligatoria para la
        producción y el comercio de semillas de los cultivares de las especies o grupo de especies
        que cuenten con Reglamento Específico.
      </h2>

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/cultivares-comerciales">
            <a className="btn btn-solid-primary">
              Solicitar Tramite
              <IconChevronRight />
            </a>
          </Link>
          <button
            onClick={actualizarModal.onOpen}
            className="btn btn-solid-secondary"
            type='button'
          >
            Actualizar Tramite
            <IconChevronRight />
          </button>
          <button
            type='button'
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
          tipoTramite={TipoSolicitudExpedientes.RegistroCultivarComercial}
          {...actualizarModal}
        />
      )}
      {estadoTramiteModal.isOpen && (
        <EstadoTramiteModal
          tipoTramite={TipoSolicitudExpedientes.RegistroCultivarComercial}
          {...estadoTramiteModal}
        />
      )}
    </div>
  )
}

export default TabCultivaresComerciales
