import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import Breadcrumb from '@components/shared/Breadcrumb'
import SideMultistep, { Step } from '@components/shared/SideMultistep'
import client from '@graphql/client'
import { useRegistroReporte as store } from '@modules/registro-reporte/solicitar-tramite/store/useRegistroReporte'
import DatosGeneralesForm from '@modules/registro-reporte/solicitar-tramite/components/DatosGenerales/DatosGeneralesForm'
import useRegistroFormatoMutation from '@hooks/useRegistroFormato'
import useToast from '@hooks/useToast'
import { ErrorMessages } from '@validation/messages'
import { IconDatosGenerales } from '@icons'

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
const RegistroReportepage = () => {
  const toast = useToast()
  const router = useRouter()
  const [stepper, setStepper] = useState(0)
  const { isLoading, createRegistroReporte } = useRegistroFormatoMutation()
  const maxStep = 1
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
        const res = await createRegistroReporte(values)
        toast({
          type: 'success',
          title: 'Exitoso !!',
          desc: 'Hemos creado su solicitud de registro de reporte de tratamiento con éxito.'
        })
        store.getState().clearStore()
        router.push({
          pathname: '/registro-responsable/resumen-tramite',
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
                  label: 'Registro Formato',
                  href: '/'
                },
                { id: 'generar-solicitud', label: 'Tratamiento' }
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

export default withUrqlClient(client)(RegistroReportepage)
