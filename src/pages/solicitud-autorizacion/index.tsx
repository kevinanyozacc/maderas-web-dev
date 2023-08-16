import Breadcrumb from '@components/shared/Breadcrumb'
import SideMultistep, { Step } from '@components/shared/SideMultistep'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
    IconCultivo,
    IconDatosGenerales
  } from '@icons'

import useToast from '@hooks/useToast'
import { withUrqlClient } from 'next-urql'
import client from '@graphql/client'
import { useRegistroSolicitud as store } from '@modules/solicitud-autorizacion/solicitar-tramite/store/useRegistroAutorizacion'
import { ErrorMessages } from '@validation/messages'
import DatosGeneralesForm from '@modules/solicitud-autorizacion/solicitar-tramite/components/DatosGenerales/DatosGeneralesForm'
import InformacionPlantaForm from '@modules/solicitud-autorizacion/solicitar-tramite/components/InformacionPlanta/InformacionPlantaForm'
import useRegistroSolicitudMutation from '@hooks/useRegistroSolicitudAutorizacion'

  export interface SideMultistepComponentProps {
    stepper: number
    isLast: boolean
    isLoading: boolean
    next: () => void
    back: () => void
    submit: () => void
    isOpen?: boolean
    onClose?: () => void
    idToUpdate?: string
    isUpdate?: boolean
  }
const RegistroResponsablepage = () => {
  const toast = useToast()
  const router = useRouter()
  const [stepper, setStepper] = useState(0)
  const { isLoading, createRegistroSolicitudAutorizacion } = useRegistroSolicitudMutation()
  const maxStep = 2
  const props: SideMultistepComponentProps = {
    stepper,
    isLoading,
    isLast: stepper === maxStep,
    next: () => {
      setStepper((prev) => {
        if (prev === maxStep) return maxStep
        return prev + 1
      })
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    back: () => {
      setStepper((prev) => {
        if (prev === 0) return 0
        return prev - 1
      })
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    submit: async () => {
        const values = store.getState().state
       try {
        const res = await createRegistroSolicitudAutorizacion(values)
        toast({
          type: 'success',
          title: 'Exitoso !!',
          desc: 'Hemos creado su solicitud de Autorizacion con exito.'
        })
        store.getState().clearStore()
        router.push({
          pathname: '/solicitud-autorizacion/resumen-tramite',
          query: { registroId: res }
        })
      } catch (error) {
        toast({
          type: 'error',
          title: ErrorMessages.unknown,
          desc: ErrorMessages.unknownDesc
        })
      }
    }
  }
    const steps: Step[] = [
        {
          icon: IconDatosGenerales,
          label: 'Datos Generales',
           component: <DatosGeneralesForm {...props} />
        },
        {
          icon: IconCultivo,
          label: 'Informacion de la Planta',
           component: <InformacionPlantaForm {...props} />
        }
      ]

    return (
        <>
          <section className="container pt-4 pb-28">
            <Breadcrumb
              className="mb-4"
              links={[
                { id: 'inicio', label: 'Inicio', href: '/' },
                {
                  id: 'registro',
                  label: 'Solicitud Autorización',
                  href: '/'
                },
                { id: 'generar-solicitud', label: 'Registro solicitud' }
              ]}
            />
             <SideMultistep
              steps={steps}
              stepper={stepper}
              // title="RESPONSABLE TÉCNICO"
            />
        </section>
        </>
      )
}

export default withUrqlClient(client)(RegistroResponsablepage)
