import { useState } from 'react'
import Breadcrumb from '@components/shared/Breadcrumb'
import SideMultistep, { Step } from '@components/shared/SideMultistep'
import { useCultivaresComerciales as store } from '@modules/cultivares-comerciales/solicitar-tramite/store/useCultivaresComerciales'

import { withUrqlClient } from 'next-urql'

import client from '@graphql/client'

import { IconCultivar, IconDatosGenerales, IconInfoEnsayos } from '@icons'

import {
  DatosGeneralesForm,
  DatosCultivarForm,
  InfoEnsayosForm,
  MantenimientoSemillaForm
} from '@modules/cultivares-comerciales/solicitar-tramite/components'

import useToast from '@hooks/useToast'
import { useRouter } from 'next/router'
import useCreateCultivarComercial from '@hooks/useCreateCultivarComercial'

export interface SideMultistepComponentProps {
  stepper: number
  isLast: boolean
  next: () => void
  back: () => void
  submit: () => void
  isLoading: boolean
}

const Index = () => {
  const router = useRouter()
  const toast = useToast()
  const [stepper, setStepper] = useState(0)

  const { createRegistroProductor, isLoading } = useCreateCultivarComercial()

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
      const values = store.getState().state

      const res = await createRegistroProductor(values)
      toast({
        type: 'success',
        title: 'Exitoso !!',
        desc: 'Solicitud de Tramite exitoso'
      })
      store.getState().clearStore()
      router.push({
        pathname: '/cultivares-comerciales/resumen-tramite',
        query: { registroId: res }
      })
    }
  }

  const steps: Step[] = [
    {
      icon: IconDatosGenerales,
      label: 'Datos Generales',
      component: <DatosGeneralesForm {...props} />
    },
    {
      icon: IconCultivar,
      label: 'Datos del Cultivar',
      component: <DatosCultivarForm {...props} />
    },
    {
      icon: IconInfoEnsayos,
      label: 'Información de Ensayos',
      component: <InfoEnsayosForm {...props} />
    },
    {
      icon: IconDatosGenerales,
      label: 'Mantenimiento de Semilla genetica',
      component: <MantenimientoSemillaForm {...props} />
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
              id: 'declaracion',
              label: 'Registro de Cultivares Comerciales de Semillas',
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

/* eslint-disable */
export default withUrqlClient(client)(Index)
