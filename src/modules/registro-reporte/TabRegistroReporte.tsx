import Link from 'next/link'
import useToggle from '@hooks/useToggle'

import { IconChevronRight } from '@icons'
import { TipoSolicitudExpedientes } from '@generated/graphql'
//import { TipoSolicitudExpedientes } from '@generated/graphql'
//import ActualizarTramiteModal from '@components/shared/ActualizarTramite'

import React from 'react'
import EstadoTramiteModal from '@components/shared/EstadoTramiteReporte/EstadoTramiteModal'
// import EstadoTramiteModal from '@components/shared/EstadoTramitePlanta/EstadoTramiteModal'

const TabRegistroReporte = () => {

    const estadoTramiteModal = useToggle()


    return (
        <div className="max-w-lg mt-10">
            <h1 className="mb-2 capitalize title-5 lg:title-7 dark:text-white">
            Formato de registro de reporte de tratamiento de embalajes de madera
            </h1>
            <h2 className="mb-10  dark:text-white">
                Para este formato sólo el RESPONSABLE TÉCNICO está autorizado para ingresar a la plataforma el cual debe estar registrado y autorizado por la SCV y podrá acceder a la plataforma para el registrar los reportes de tratamiento y/o armado de embalajes de madera que realizar la planta de tratamiento.
                El responsable técnico deberá indicar primeramente el código de la planta de tratamiento de embalajes de madera donde es responsable técnico, esto en el caso de que el profesional tenga a su cargo más de una planta de tratamiento. Solo se visualizará las plantas que estén con fecha de autorización vigentes; a continuación, aparecerá el nombre de la planta, dirección de ubicación de la planta.

            </h2>

            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    <Link href="/LoginPage">
                        <a className="btn btn-solid-primary">
                            Registrar solicitud
                            <IconChevronRight />
                        </a>
                    </Link>
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

export default TabRegistroReporte
