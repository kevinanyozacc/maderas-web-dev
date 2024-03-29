import Link from 'next/link'
import useToggle from '@hooks/useToggle'

import { IconChevronRight } from '@icons'
import { TipoSolicitudExpedientes } from '@generated/graphql'
// import { TipoSolicitudExpedientes } from '@generated/graphql'
// import ActualizarTramiteModal from '@components/shared/ActualizarTramite'

import React from 'react'
import EstadoTramiteModal from '@components/shared/EstadoTramiteBaja/EstadoTramiteModal'
// import EstadoTramiteModal from '@components/shared/EstadoTramitePlanta/EstadoTramiteModal'

const TabSolicitudBaja = () => {
  const estadoTramiteModal = useToggle()

  return (
    <div className="max-w-lg mt-10">
    <h1 className="mb-2 capitalize title-5 lg:title-7 dark:text-white">
    Solicitud de baja de autorización o cambio de Responsable Técnico
    </h1>
    <h2 className="mb-10 paragraph-1 dark:text-white">
    Si el usuario considera dar de baja su “Autorización de funcionamiento para cámara de tratamiento térmico para embalajes de madera” o
     “Autorización de funcionamiento para planta de fabricación de embalajes de madera con tratamiento térmico”,
     deberá enviar su solicitud mediante la plataforma. Asimismo, si la empresa realizará el cambio de responsable técnico lo podrá hacer por esta misma plataforma.
    </h2>

    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/solicitud-baja">
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
          tipoTramite={TipoSolicitudExpedientes.RegistroCultivarComercial}
          {...estadoTramiteModal}
        />
      )}
      </div>
    </div>

    </div>

  )
}

export default TabSolicitudBaja
