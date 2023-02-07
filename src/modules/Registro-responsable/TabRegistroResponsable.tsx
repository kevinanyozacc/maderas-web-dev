import Link from 'next/link'
import useToggle from '@hooks/useToggle'

import { IconChevronRight } from '@icons'
//import { TipoSolicitudExpedientes } from '@generated/graphql'
//import EstadoTramiteModal from '@components/shared/EstadoTramite/EstadoTramiteModal'
//import ActualizarTramiteModal from '@components/shared/ActualizarTramite'


import React from 'react'

const TabRegistroResponsable = () => {
  return (
    <div className="max-w-lg mt-10">
    <h1 className="mb-2 capitalize title-5 lg:title-7 dark:text-white">
      Registro de Responsable Tecnico
    </h1>
    <h2 className="mb-10 paragraph-1 dark:text-white">
      La inscripción del Registro de Productores de semillas es de carácter obligatorio
      para las personas naturales o jurídicas dedicadas a la producción de semillas.
    </h2>

    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/registro-responsable">
          <a className="btn btn-solid-primary">
            Solicitar Trámite ab
            <IconChevronRight />
          </a>
        </Link>
        <button
          type='button'
        
          className="btn btn-solid-secondary"
        >
          Actualizar Trámite
          <IconChevronRight />
        </button>
        <button
          type='button'
       
          className="btn btn-outline-primary"
        >
          Estado de Trámite
          <IconChevronRight />
        </button>
      </div>
    </div>

    </div>

  )
}

export default TabRegistroResponsable
