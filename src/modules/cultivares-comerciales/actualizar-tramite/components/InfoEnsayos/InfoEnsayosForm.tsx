import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

import TextArea from '@components/shared/TextArea'
import ButtonsForm from '@components/shared/ButtonsForm'
import Tooltip from '@components/shared/ToolTip'
import UploadFilesModal from '@components/shared/UploadFiles'

import useForm from '@hooks/useForm'
import useToggle from '@hooks/useToggle'
import useUpdateCultivarComercial from '@hooks/useUpdateCultivarComercial'
import useToast from '@hooks/useToast'

import { IconCheck, IconClose, IconCloudArrowUp, IconPlus } from '@icons'
import { SideMultistepComponentProps as Props } from '@pages/cultivares-comerciales/actualizar-tramite'
import { informacionEnsayosValid } from '../../../validation/informacionEnsayosValid'

import RangosAdaptTable from './RangosAdaptTable'
import RangosAdaptModal from './RangosAdaptModal'
import LocalidadEnsayoTable from './LocalidadEnsayoTable'
import LocalidadEnsayoModal from './LocalidadEnsayoModal'

import {
  InformacionEnsayoUpdateInput,
  LocalidadEnsayoCreateInput,
  LocalidadEnsayoUpdateInput
} from '@generated/graphql'

import { RangosAdaptacionInput } from '@modules/cultivares-comerciales/solicitar-tramite/interfaces/cultivaresComerciales'
import { classNames } from '@utils/classNames'
import WarningAlert from '@components/shared/WarningAlert'

const initialValues: InformacionEnsayoUpdateInput = {
  AMBITO_GEOGRAFICO: '',
  RANGO_ADAPTACION: '',
  FINALIDAD_USO: '',
  INSTALACION: '',
  CAMPANAS_ENSAYOS: '',
  CARACTERES_PRUEBA: '',
  PLANTAS_TIPO: '',
  PRIMERA_CAMPANA: '',
  SEGUNDA_CAMPANA: '',
  COMPORTAMIENTO_BIOTICO: '',
  COMPORTAMIENTO_ABIOTICO: '',
  NUME_REGI_ARC: '',
  INFORMACION_ENSAYO_ID: 0
}

const InfoEnsayosForm = ({ back, next, registroId }: Props) => {
  const toast = useToast()
  const filesToggle = useToggle()

  const [idInfoEns, setIdInfoEns] = useState<number>()

  const [ambitoGeo, setAmbitoGeo] = useState<Array<string>>([])
  const [finalidad, setFinalidad] = useState<Array<string>>([])
  const [rangosAdap, setRangosAdap] = useState<Array<RangosAdaptacionInput>>([])
  const [pivotValueAnGeo, setPivotValueAnGeo] = useState('')
  const [pivotValueFinUso, setPivotValueFinUso] = useState('')

  const {
    datos,
    updateInfoEnsayos,
    createLocalidadEnsayo,
    updateLocalidadEnsayo,
    datosObs
  } = useUpdateCultivarComercial(registroId)

  const {
    isOpen: isOpenRangosAdapt,
    onClose: onCloseRangosAdapt,
    onOpen: onOpenRangosAdapt
  } = useToggle()

  const {
    isOpen: isOpenUpdateInfEns,
    onClose: onCloseUpdateInfEns,
    onOpen: onOpenUpdateInfEns
  } = useToggle()

  const {
    isOpen: isOpenLocalidad,
    onClose: onCloseLocalidad,
    onOpen: onOpenLocalidad
  } = useToggle()

  const { values, isChanged, setIsChanged, ...form } = useForm({
    initialValues,
    validate: informacionEnsayosValid
  })

  useEffect(() => {
    if (datos.data?.getTramiteByRegistroId?.INFORMACION_ENSAYO) {
      const { __typename, FECHA_REGISTRO, EXPEDIENTE_ID, ...rest } =
        datos.data.getTramiteByRegistroId.INFORMACION_ENSAYO

      form.setFields(rest)
      setAmbitoGeo(rest.AMBITO_GEOGRAFICO.split(','))
      setFinalidad(rest.FINALIDAD_USO.split(','))
      const rangos: any[] = JSON.parse(rest.RANGO_ADAPTACION).map((i: any) => ({
        ...i,
        id: nanoid()
      }))
      if (Array.isArray(rangos)) setRangosAdap([...rangos])
    }
  }, [datos.fetching === false])

  const handleDisable = () => {
    if (isChanged) return false
    return true
  }

  const handleSubmit = () => {
    if (ambitoGeo.length === 0) {
      toast({
        type: 'warning',
        title: 'Agregar ámbito Geográfico de Desarrollo del Cultivar'
      })
      return
    }

    if (rangosAdap.length === 0) {
      toast({ type: 'warning', title: 'Agregar rangos de adaptación' })
      return
    }

    if (finalidad.length === 0) {
      toast({ type: 'warning', title: 'Agregar finalidad de uso' })
      return
    }
    const { AMBITO_GEOGRAFICO, FINALIDAD_USO, RANGO_ADAPTACION, ...rest } =
      values

    updateInfoEnsayos({
      ...rest,
      AMBITO_GEOGRAFICO: ambitoGeo.toString(),
      FINALIDAD_USO: finalidad.toString(),
      RANGO_ADAPTACION: JSON.stringify(
        rangosAdap.map(({ id, ...data }) => ({ ...data }))
      )
    })

    setIsChanged(false)
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      {!!datosObs.data?.getObservacionesByExpediente.OBS_INFO_ENSAYO && (
        <WarningAlert
          message={datosObs.data?.getObservacionesByExpediente.OBS_INFO_ENSAYO}
        />
      )}
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          Localidades donde se realizaron los ensayos
        </p>
      </div>

      <div className="mb-4">
        <button
          className="btn btn-ghost-primary w-full md:w-max"
          type="button"
          onClick={onOpenLocalidad}
        >
          Agregar
          <IconPlus />
        </button>

        <LocalidadEnsayoTable
          data={datos.data?.getTramiteByRegistroId?.LOCALIDAD_ENSAYO || []}
          onAdd={onOpenLocalidad}
          onDelete={() => {}}
          onUpdate={(id) => {
            setIdInfoEns(id)
            id && onOpenUpdateInfEns()
          }}
        />

        {isOpenLocalidad && (
          <LocalidadEnsayoModal
            isOpen={isOpenLocalidad}
            onClose={onCloseLocalidad}
            onSubmit={async (values) => {
              await createLocalidadEnsayo(values as LocalidadEnsayoCreateInput)
            }}
          />
        )}

        {isOpenUpdateInfEns && !!idInfoEns && (
          <LocalidadEnsayoModal
            isUpdate
            idToUpdate={idInfoEns}
            onSubmit={async (values) => {
              await updateLocalidadEnsayo(values as LocalidadEnsayoUpdateInput)
            }}
            isOpen={isOpenUpdateInfEns}
            onClose={() => {
              setIdInfoEns(undefined)
              onCloseUpdateInfEns()
            }}
            data={datos.data?.getTramiteByRegistroId?.LOCALIDAD_ENSAYO || []}
          />
        )}
      </div>

      {/* ================================================ */}

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          Ámbito Geográfico de Desarrollo del Cultivar
        </p>
      </div>

      <div className="w-full flex gap-2 flex-wrap border-2 p-3 rounded-md dark:border-slate-700">
        {ambitoGeo.map((item, index) => (
          <div
            key={index}
            className="border-2 flex rounded-md items-center pl-4 justify-between dark:border-slate-700 dark:text-white"
          >
            {item}
            <button
              className="btn btn-icon btn-ghost-primary hover:bg-transparent"
              onClick={() => {
                setAmbitoGeo((prev) => [...prev.filter((i) => item !== i)])
                !isChanged && setIsChanged(true)
              }}
              type="button"
            >
              <IconClose />
            </button>
          </div>
        ))}
        <div className="text-slate-800 dark:text-white w-full max-w-[250px] relative">
          <input
            className="outline-none rounded w-full h-full py-2 px-3 border-2 focus:border-primary-500 transition-colors peer bg-transparent"
            onKeyDown={(e: any) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault()
                if (
                  e.target.value.length > 0 &&
                  !ambitoGeo.find((i) => i === e.target.value)
                ) {
                  !isChanged && setIsChanged(true)
                  setAmbitoGeo([...ambitoGeo, e.target.value])
                  e.target.value = ''
                }
              }
            }}
            onBlur={(e) => {
              if (
                !!e.target.value.length &&
                !ambitoGeo.find((i) => i === e.target.value)
              ) {
                !isChanged && setIsChanged(true)
                setAmbitoGeo([...ambitoGeo, e.target.value])
                e.target.value = ''
              }
            }}
            onChange={(e) => {
              setPivotValueAnGeo(e.target.value)
            }}
            placeholder="Agregar"
          />
          <span
            className="absolute right-1 block p-2 hover:bg-slate-500 hover:text-white
              transition-colors top-[3px] select-none rounded cursor-pointer"
            onClick={() => {
              if (
                !!pivotValueAnGeo.length &&
                !ambitoGeo.find((i) => i === pivotValueAnGeo)
              ) {
                !isChanged && setIsChanged(true)
                setAmbitoGeo([...ambitoGeo, pivotValueAnGeo])
                setPivotValueAnGeo('')
              }
            }}
          >
            <Tooltip label="Agregar">
              <div className="w-4 h-4">
                <IconPlus />
              </div>
            </Tooltip>
          </span>
        </div>
      </div>

      {/* ================================================ */}
      {/* ==============RANGOS DE ADAPTACION============== */}
      {/* ================================================ */}

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          Rangos de Adaptación (Altitud)
        </p>
      </div>
      <div className="mb-4">
        <button
          className="btn btn-ghost-primary w-full md:w-max"
          type="button"
          onClick={onOpenRangosAdapt}
        >
          Agregar
          <IconPlus />
        </button>

        <RangosAdaptTable
          data={rangosAdap!}
          onAdd={onOpenRangosAdapt}
          onDelete={(id) => {
            setRangosAdap((prev) => prev.filter((i) => i.id !== id))
            !isChanged && setIsChanged(true)
          }}
        />

        {isOpenRangosAdapt && (
          <RangosAdaptModal
            isOpen={isOpenRangosAdapt}
            onClose={onCloseRangosAdapt}
            setRangosAdap={setRangosAdap}
          />
        )}
      </div>

      {/* ================================================ */}

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Finalidad de Uso</p>
      </div>

      <div className="w-full flex gap-2 flex-wrap border-2 p-3 rounded-md dark:border-slate-700">
        {finalidad.map((item, index) => (
          <div
            key={index}
            className="border-2 flex rounded-md items-center pl-4 justify-between dark:border-slate-700 dark:text-white"
          >
            {item}
            <button
              className="btn btn-icon btn-ghost-primary hover:bg-transparent"
              onClick={() => {
                setFinalidad((prev) => [...prev.filter((i) => item !== i)])
                !isChanged && setIsChanged(true)
              }}
              type="button"
            >
              <IconClose />
            </button>
          </div>
        ))}
        <div className="text-slate-800 dark:text-white w-full max-w-[250px] relative">
          <input
            className="outline-none rounded w-full h-full py-2 px-3 border-2 focus:border-primary-500 transition-colors peer bg-transparent"
            onKeyDown={(e: any) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault()
                if (
                  e.target.value.length > 0 &&
                  !finalidad.find((i) => i === e.target.value)
                ) {
                  !isChanged && setIsChanged(true)
                  setFinalidad([...finalidad, e.target.value])
                  e.target.value = ''
                }
              }
            }}
            onBlur={(e) => {
              if (
                !!e.target.value.length &&
                !finalidad.find((i) => i === e.target.value)
              ) {
                !isChanged && setIsChanged(true)
                setFinalidad([...finalidad, e.target.value])
                e.target.value = ''
              }
            }}
            onChange={(e) => {
              setPivotValueFinUso(e.target.value)
            }}
            placeholder="Agregar"
          />
          <span
            className="absolute right-1 block p-2 hover:bg-slate-500 hover:text-white
                transition-colors top-[3px] select-none rounded cursor-pointer"
            onClick={() => {
              if (
                !!pivotValueFinUso.length &&
                !finalidad.find((i) => i === pivotValueFinUso)
              ) {
                !isChanged && setIsChanged(true)
                setFinalidad([...finalidad, pivotValueFinUso])
                setPivotValueFinUso('')
              }
            }}
          >
            <Tooltip label="Agregar">
              <div className="w-4 h-4">
                <IconPlus />
              </div>
            </Tooltip>
          </span>
        </div>
      </div>

      {/* ================================================ */}

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Ensayos de Identificación</p>
      </div>

      <TextArea
        label="Instalación"
        value={values.INSTALACION}
        onChange={(e) => {
          form.setField('INSTALACION', e.target.value)
          !isChanged && setIsChanged(true)
        }}
        error={form.errors.INSTALACION}
      />

      <TextArea
        label="N° Campañas y N° Ensayos"
        value={values.CAMPANAS_ENSAYOS}
        onChange={(e) => {
          form.setField('CAMPANAS_ENSAYOS', e.target.value)
          !isChanged && setIsChanged(true)
        }}
        error={form.errors.CAMPANAS_ENSAYOS}
      />

      <TextArea
        label="Caracteres que difieren al cultivar a prueba"
        value={values.CARACTERES_PRUEBA}
        onChange={(e) => {
          form.setField('CARACTERES_PRUEBA', e.target.value)
          !isChanged && setIsChanged(true)
        }}
        error={form.errors.CARACTERES_PRUEBA}
      />

      <TextArea
        label="Plantas fuera de tipo"
        value={values.PLANTAS_TIPO}
        onChange={(e) => {
          form.setField('PLANTAS_TIPO', e.target.value)
          !isChanged && setIsChanged(true)
        }}
        error={form.errors.PLANTAS_TIPO}
      />

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          Ensayos de Adaptación y Eficiencia
        </p>
      </div>

      <TextArea
        label="Resultados de la primera campaña agrícola"
        value={values.PRIMERA_CAMPANA}
        onChange={(e) => {
          form.setField('PRIMERA_CAMPANA', e.target.value)
          !isChanged && setIsChanged(true)
        }}
        error={form.errors.PRIMERA_CAMPANA}
      />

      <TextArea
        label="Resultados de la segunda campaña agrícola"
        value={values.SEGUNDA_CAMPANA}
        onChange={(e) => {
          form.setField('SEGUNDA_CAMPANA', e.target.value)
          !isChanged && setIsChanged(true)
        }}
        error={form.errors.SEGUNDA_CAMPANA}
      />

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          Comportamiento Frente a Factores Bióticos
        </p>
      </div>

      <TextArea
        label="Comportamiento Frente a Factores Bióticos"
        value={values.COMPORTAMIENTO_BIOTICO}
        onChange={(e) => {
          form.setField('COMPORTAMIENTO_BIOTICO', e.target.value)
          !isChanged && setIsChanged(true)
        }}
        error={form.errors.COMPORTAMIENTO_BIOTICO}
      />

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          Comportamiento Frente a Factores Abióticos
        </p>
      </div>

      <TextArea
        label="Comportamiento Frente a Factores Abióticos"
        value={values.COMPORTAMIENTO_ABIOTICO}
        onChange={(e) => {
          form.setField('COMPORTAMIENTO_ABIOTICO', e.target.value)
          !isChanged && setIsChanged(true)
        }}
        error={form.errors.COMPORTAMIENTO_ABIOTICO}
      />

      <div className="flex flex-col md:flex-row items-center gap-3 text-slate-500 dark:text-white">
        <div className="">
          <Tooltip label={'Adjuntar Informe Técnico'}>
            <button
              type="button"
              className="btn btn-outline-primary transition ease-out duration-300"
              onClick={filesToggle.onOpen}
            >
              Subir Archivos
              <span
                className={classNames([
                  'text-2xl',
                  values.NUME_REGI_ARC! && 'text-green-500'
                ])}
              >
                {values.NUME_REGI_ARC ? <IconCheck /> : <IconCloudArrowUp />}
              </span>
            </button>
          </Tooltip>
        </div>
        {values.NUME_REGI_ARC ? (
          <div className="text-center">
            {'Los archivos se agregaron correctamente'}
          </div>
        ) : (
          <div className="text-center">{'Adjuntar informe técnico'}</div>
        )}
        {filesToggle.isOpen && (
          <UploadFilesModal
            isOpen={filesToggle.isOpen}
            onClose={filesToggle.onClose}
            title={'Adjuntar informe técnico'}
            NUME_REGI_ARC={values.NUME_REGI_ARC!}
          />
        )}
      </div>

      <ButtonsForm back={back} next={next} handleDisable={handleDisable()} />
    </form>
  )
}

export default InfoEnsayosForm
