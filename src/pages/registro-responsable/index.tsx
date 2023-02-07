import Breadcrumb from '@components/shared/Breadcrumb'
import SideMultistep, { Step } from '@components/shared/SideMultistep'
import React, { useState } from 'react'
import {
    // IconTierras,
    IconCultivo,
    // IconProfesional,
    IconDatosGenerales,
    IconAnalisisCalidad
    // IconAcondicionamiento
  } from '@icons'

import { DatosGeneralesForm, InformacionResponsableForm } from '@modules/Registro-responsable/solicitar-tramite/components/'

// import useToast from '@hooks/useToast'
import useRegistroResponsableMutation from '@hooks/useRegistroResponsableMutation'
import { withUrqlClient } from 'next-urql'
import client from '@graphql/client'

  export interface SideMultistepComponentProps {
    stepper: number
    isLast: boolean
    isLoading: boolean
    next: () => void
    back: () => void
    submit: () => void
  }
const RegistroResponsablepage = () => {
  // const toast = useToast()
  // const router = useRouter()
  const [stepper, setStepper] = useState(0)
  const { isLoading } = useRegistroResponsableMutation()
  const maxStep = 3
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
          label: 'Informacion del Responsable Técnico',
           component: <InformacionResponsableForm {...props} />
        },
        {
          icon: IconAnalisisCalidad,
          label: 'Estado de Solicitud',
          component: <DatosGeneralesForm {...props} />
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
                  label: 'Registro de Responsable Técnico',
                  href: '/'
                },
                { id: 'generar-solicitud', label: 'Generar Solicitud' }
              ]}
            />
             <SideMultistep
              steps={steps}
              stepper={stepper}
              title="Generar solicitud"
            />
        </section>
        </>
      )
}

export default withUrqlClient(client)(RegistroResponsablepage)
