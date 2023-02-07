import { useState } from 'react'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'

import client from '@graphql/client'
import Breadcrumb from '@components/shared/Breadcrumb'
import SideMultistep, { Step } from '@components/shared/SideMultistep'

import { useDeclaracionSemilla as store } from '@modules/declaracion-semilla/solicitar-tramite/store/useDeclaracionSemilla'

import { IconCultivo, IconDatosGenerales, IconSucursal } from '@icons'

import {
  DatosGeneralesForm,
  InformacionCultivoForm,
  EstablecimientoSucursalesForm
} from '../../modules/declaracion-semilla/solicitar-tramite/components'

import useToast from '@hooks/useToast'
import useCreateDeclaracionSemillaMut from '@hooks/useCreateDeclaracionSemillaMut'
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
  const router = useRouter()
  const toast = useToast()
  const [stepper, setStepper] = useState(0)
  const { isLoading, createDeclaracionSemilla } =
    useCreateDeclaracionSemillaMut()

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
      try {
        const res = await createDeclaracionSemilla(values)
        toast({
          type: 'success',
          title: 'Exitoso !!',
          desc: 'Declaracion de semillas con exito.'
        })
        store.getState().clearStore()
        router.push({
          pathname: '/declaracion-semilla/resumen-tramite',
          query: { registroId: res }
        })
      } catch (e) {
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
      label: 'Información de Cultivo',
      component: <InformacionCultivoForm {...props} />
    },
    {
      icon: IconSucursal,
      label: 'Establecimiento Y Sucursales',
      component: <EstablecimientoSucursalesForm {...props} />
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
              label: 'Declaración de Comerciante de Semillas',
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

export default withUrqlClient(client)(Index)
