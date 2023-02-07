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
  DatosCultivarForm,
  InfoEnsayosForm,
  MantenimientoSemillaForm
} from '@modules/cultivares-comerciales/actualizar-tramite/components'

import {
  IconCheck,
  IconDatosGenerales,
  IconExclamation,
  IconWarning
} from '@icons'

import useUpdateCultivarComercial from '@hooks/useUpdateCultivarComercial'
import Loading from '@components/shared/Loading'
import Error from 'next/error'
import { ErrorMessages } from '@validation/messages'

export interface SideMultistepComponentProps {
  stepper: number
  isLast: boolean
  // isLoading: boolean
  next: () => void
  back: () => void
  registroId: number
}

const ActualizarTramiteCultCom = () => {
  const { registroId } = useRouter().query
  const [stepper, setStepper] = useState(0)
  const { datos, datosObs } = useUpdateCultivarComercial(+registroId!)

  const estado = datosObs.data?.getObservacionesByExpediente

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
    registroId: +registroId!
  }

  const infoIcon = (value?: string) => {
    if (value === 'VALIDADO') return IconCheck
    if (value === 'OBSERVADO') return IconWarning
    if (value === 'PENDIENTE') return IconExclamation
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
      icon: infoIcon(estado?.ESTADO_CULT_COMERCIAL),
      label: 'Datos de Cultivar',
      estObs: estado?.ESTADO_CULT_COMERCIAL,
      component: <DatosCultivarForm {...props} />
    },
    {
      icon: infoIcon(estado?.ESTADO_INFO_ENSAYO),
      label: 'Informacion de Ensayos',
      estObs: estado?.ESTADO_INFO_ENSAYO,
      component: <InfoEnsayosForm {...props} />
    },
    {
      icon: infoIcon(estado?.ESTADO_MANT_SEMILLA),
      label: 'Mantenimiento de Semilla Genetica',
      estObs: estado?.ESTADO_MANT_SEMILLA,
      component: <MantenimientoSemillaForm {...props} />
    }
  ]

  if (datos.fetching) return <Loading />

  if (
    datos.fetching === false &&
    (datos.data === undefined || datos.data.getTramiteByRegistroId === null)
  ) {
    return <Error statusCode={404} title={ErrorMessages.notFoundPage} />
  }

  return (
    <main className="container pt-4 pb-28">
      <Breadcrumb
        className="mb-4"
        links={[
          { id: 'inicio', label: 'Inicio', href: '/' },
          {
            id: 'registro',
            label: 'Registro de Cultivares Comerciales de Semillas',
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
/* eslint-disable */
export default withUrqlClient(client)(ActualizarTramiteCultCom)
