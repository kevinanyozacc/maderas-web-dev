import { useState } from 'react'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import client from '@graphql/client'

import Breadcrumb from '@components/shared/Breadcrumb'
import SideMultistep, { Step } from '@components/shared/SideMultistep'

import {
  IconTierras,
  IconCultivo,
  IconProfesional,
  IconDatosGenerales,
  IconAnalisisCalidad,
  IconAcondicionamiento
} from '@icons'

import {
  DatosGeneralesForm,
  InformacionCultivoForm,
  ProfesionalResponsableForm,
  AcondicionamientoForm,
  AnalisisCalidadForm,
  TierraCultivoForm
} from '@modules/registro-productor/solicitar-tramite/components'

import useToast from '@hooks/useToast'
import useRegistroProductorMutation from '@hooks/useRegistroResponsableMutation'

import useRegistroResponsableMutation from '@hooks/useRegistroResponsableMutation'

// import { useRegistroProductor as store } from '@modules/registro-productor/solicitar-tramite/store/useRegistroProductor'
import { ErrorMessages } from '@validation/messages'

export interface SideMultistepComponentProps {
  stepper: number
  isLast: boolean
  isLoading: boolean
  next: () => void
  back: () => void
  submit: () => void
}

const Index = () => {
  const toast = useToast()
  const router = useRouter()
  const [stepper, setStepper] = useState(0)

  const { isLoading } = useRegistroResponsableMutation()

  const maxStep = 5

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
      // const values = store.getState().state
      try {
        // // const res = await createRegistroProductor(values)
        // // toast({
        // //   type: 'success',
        // //   title: 'Exitoso !!',
        // //   desc: 'Hemos creado su solicitud de registro de productor con éxito.'
        // // })
        // // store.getState().clearStore()
        // // router.push({
        // //   pathname: '/registro-productor/resumen-tramite',
        // //   query: { registroId: res }
        // // })
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
      label: 'Informacion de Cultivo',
      component: <InformacionCultivoForm {...props} />
    },
    {
      icon: IconProfesional,
      label: 'Profesional Responsable',
      component: <ProfesionalResponsableForm {...props} />
    }
    ,
    {
      icon: IconTierras,
      label: 'Tierras de Cultivo',
      component: <TierraCultivoForm {...props} />
    },
    {
      icon: IconAcondicionamiento,
      label: 'Acondicionamiento de Semillas',
      component: <AcondicionamientoForm {...props} />
    },
    {
      icon: IconAnalisisCalidad,
      label: 'Analisis de Calidad',
      component: <AnalisisCalidadForm {...props} />
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
          //desc='hola chavo'
        />
      </section>
    </>
  )
}

export default withUrqlClient(client)(Index)
