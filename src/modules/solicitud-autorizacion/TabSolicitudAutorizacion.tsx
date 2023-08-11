import React from 'react'
import Link from 'next/link'
import useToggle from '@hooks/useToggle'

import { IconChevronRight } from '@icons'
import EstadoTramiteModal from '@components/shared/EstadoTramiteSolAutorizacion/EstadoTramiteModal'
// import { TipoSolicitudExpedientes } from '@generated/graphql'
// import ActualizarTramiteModal from '@components/shared/ActualizarTramite'

// import EstadoTramiteModal from '@components/shared/EstadoTramitePlanta/EstadoTramiteModal'

const TabSolicitudAutorizacion = () => {
  const estadoTramiteModal = useToggle()

  return (
    <div className="max-w-lg mt-10">
    <h1 className="mb-2 capitalize title-5 lg:title-7 dark:text-white">
      Formato de registro de solicitud para autorización
    </h1>
    <h2 className="mb-10 paragraph-1 dark:text-white">
      Para iniciar el proceso de autorización de Cámara de Tratamiento para Embalajes de Madera
      y/o Planta de Fabricación de Embalajes de Madera con Tratamiento el representante legal
       de las empresas deberá registrar la solicitud en el sistema de Senasa.
    </h2>

    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/solicitud-autorizacion">
          <a className="btn btn-solid-primary">
            Registrar solicitud
            <IconChevronRight />
          </a>
        </Link>
        {/* <button
          type='button'

          className="btn btn-solid-secondary"
        >
          Actualizar
          <IconChevronRight />
        </button> */}
         <button
            type='button'
            onClick={estadoTramiteModal.onOpen}
            className="btn btn-outline-primary"
          >
            Estado de Tramite
            <IconChevronRight />
          </button>

          {estadoTramiteModal.isOpen && (
        <EstadoTramiteModal
          //tipoTramite={TipoSolicitudExpedientes.RegistroCultivarComercial}
          {...estadoTramiteModal}
        />
      )}
      </div>
    </div>

    </div>

  )
}

export default TabSolicitudAutorizacion
