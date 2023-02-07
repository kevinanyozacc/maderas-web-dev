import { useState } from 'react'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import client from '@graphql/client'
import Breadcrumb from '@components/shared/Breadcrumb'
import SideMultistepUpdate, {
  Step
} from '@components/shared/SideMultistep/SideMultiStepUpdate'

import {
  DatosGeneralesForm,
  InformacionCultivoForm,
  EstablecimientoSucursalesForm
} from '@modules/declaracion-semilla/actualizar-tramite/components'

import {
  IconCheck,
  IconDatosGenerales,
  IconExclamation,
  IconWarning
} from '@icons'
import useUpdateDeclaracionSemilla from '@hooks/useUpdateDeclaracionSemilla'
import Error from 'next/error'
import { EstadosObservacion } from '@generated/graphql'
import Loading from '@components/shared/Loading'

export interface SideMultistepComponentProps {
  stepper: number
  isLast: boolean
  // isLoading: boolean
  next: () => void
  back: () => void
  registroId: any
}

const ActualizarTramite = () => {
  const { registroId } = useRouter().query
  const [stepper, setStepper] = useState(0)
  const { datos, observacion } = useUpdateDeclaracionSemilla(+registroId!)

  const estado = observacion

  const maxStep = 3

  const props: SideMultistepComponentProps = {
    stepper,
    // isLoading,
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
    registroId
  }

  const infoIcon = (value?: string) => {
    if (value === EstadosObservacion.Validado) return IconCheck
    if (value === EstadosObservacion.Observado) return IconWarning
    if (value === EstadosObservacion.Pendiente) return IconExclamation
    return IconDatosGenerales
  }

  const steps: Step[] = [
    {
      icon: infoIcon(estado?.ESTADO_DATOS_GENERALES),
      label: 'Datos Generales',
      estObs: estado?.ESTADO_DATOS_GENERALES,
      component: <DatosGeneralesForm {...props} />
    },
    {
      icon: infoIcon(estado?.ESTADO_INFO_CULTIVO),
      label: 'Informacion de Cultivos',
      estObs: estado?.ESTADO_INFO_CULTIVO,
      component: <InformacionCultivoForm {...props} />
    },
    {
      icon: infoIcon(estado?.ESTADO_SUCURSALES),
      label: 'Establecimiento y Sucursales',
      estObs: estado?.ESTADO_SUCURSALES,
      component: <EstablecimientoSucursalesForm {...props} />
    }
  ]

  if (datos.fetching) return <Loading />

  if (
    datos?.data?.getTramiteByRegistroId === null &&
    datos.fetching === false
  ) {
    return <Error statusCode={404} title={'Esta página no se pudo encontrar'} />
  }

  return (
    <main className="container pt-4 pb-28">
      <Breadcrumb
        className="mb-4"
        links={[
          { id: 'inicio', label: 'Inicio', href: '/' },
          {
            id: 'registro',
            label: 'Declaración de comerciantes de semillas',
            href: '/'
          },
          { id: 'actualizar-tramite', label: 'Actualizar Tramite' }
        ]}
      />
      <SideMultistepUpdate
        steps={steps}
        stepper={stepper}
        title="Actualizar Tramite"
        setStep={setStepper}
      />
    </main>
  )
}

export default withUrqlClient(client)(ActualizarTramite)
