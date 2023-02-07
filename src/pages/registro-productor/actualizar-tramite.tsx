import { useState } from 'react'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import Error from 'next/error'

import client from '@graphql/client'
import Breadcrumb from '@components/shared/Breadcrumb'
import SideMultistepUpdate, {
  Step
} from '@components/shared/SideMultistep/SideMultiStepUpdate'

import {
  DatosGeneralesForm,
  InformacionCultivoForm,
  ProfesionalResponsableForm,
  TierraCultivoForm,
  AcondicionamientoForm,
  AnalisisCalidadForm
} from '@modules/registro-productor/actualizar-tramite/components/index'

import {
  IconDatosGenerales,
  IconCheck,
  IconWarning,
  IconExclamation
} from '@icons'

import useUpdateRegistroProductor from '@hooks/useUpdateRegistroProductor'
import Loading from '@components/shared/Loading'
import { EstadosObservacion } from '@generated/graphql'
import { ErrorMessages } from '@validation/messages'

export interface SideMultistepComponentProps {
  stepper: number
  isLast: boolean
  next: () => void
  back: () => void
  registroId: any
}

const ActualizarTramite = () => {
  const { registroId } = useRouter().query
  const [stepper, setStepper] = useState(0)
  const { datos, dataTramiteEstObs } = useUpdateRegistroProductor(+registroId!)

  const estado = dataTramiteEstObs.data?.getObservacionesByExpediente
  const maxStep = 5

  const props: SideMultistepComponentProps = {
    stepper,
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
      label: 'Informacion de cultivo',
      estObs: estado?.ESTADO_INFO_CULTIVO,
      component: <InformacionCultivoForm {...props} />
    },
    {
      icon: infoIcon(estado?.ESTADO_PROFESIONAL),
      label: 'Profesional Responsable',
      estObs: estado?.ESTADO_PROFESIONAL,
      component: <ProfesionalResponsableForm {...props} />
    },
    {
      icon: infoIcon(estado?.ESTADO_TIERRAS),
      label: 'Tierras de Cultivo',
      estObs: estado?.ESTADO_TIERRAS,
      component: <TierraCultivoForm {...props} />
    },
    {
      icon: infoIcon(estado?.ESTADO_ACONDICIONAMIENTO),
      label: 'Acondicionamiento de semillas',
      estObs: estado?.ESTADO_ACONDICIONAMIENTO,
      component: <AcondicionamientoForm {...props} />
    },
    {
      icon: infoIcon(estado?.ESTADO_ANALISIS),
      label: 'Analisis de Calidad',
      estObs: estado?.ESTADO_ANALISIS,
      component: <AnalisisCalidadForm {...props} />
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
            label: 'Registro de Productor de Semillas',
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
