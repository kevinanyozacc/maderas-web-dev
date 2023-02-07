import { useState } from 'react'
import TextArea from '@components/shared/TextArea'

import useForm from '@hooks/useForm'
import useToggle from '@hooks/useToggle'
import { IconCheck, IconClose, IconCloudArrowUp, IconPlus } from '@icons'
import { SideMultistepComponentProps as Props } from '@pages/cultivares-comerciales'
import { useCultivaresComerciales } from '../../store/useCultivaresComerciales'
import { informacionEnsayosValid } from '../../../validation/informacionEnsayosValid'

import RangosAdaptTable from './RangosAdaptTable'
import RangosAdaptModal from './RangosAdaptModal'
import LocalidadEnsayoModal from './LocalidadEnsayoModal'
import LocalidadEnsayoTable from './LocalidadEnsayoTable'
import UploadFilesModal from '@components/shared/UploadFiles'
import Tooltip from '@components/shared/ToolTip'
import { classNames } from '@utils/classNames'
import useArchivosMutation from '@hooks/useArchivosMutation'
import useToast from '@hooks/useToast'

const InfoEnsayosForm = ({ back, next }: Props) => {
  const store = useCultivaresComerciales()
  const toast = useToast()
  const [idInfEns, setIdInfEns] = useState('')
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)
  const [pivotValueAnGeo, setPivotValueAnGeo] = useState('')
  const [pivotValueFinUso, setPivotValueFinUso] = useState('')

  const {
    isOpen: isOpenRangosAdapt,
    onClose: onCloseRangosAdapt,
    onOpen: onOpenRangosAdapt
  } = useToggle()

  const {
    isOpen: isOpenLocalidad,
    onClose: onCloseLocalidad,
    onOpen: onOpenLocalidad
  } = useToggle()

  const {
    isOpen: isOpenUpdateLocalidad,
    onClose: onCloseUpdateLocalidad,
    onOpen: onOpenUpdateLocalidad
  } = useToggle()

  const {
    isOpen: isOpenFiles,
    onClose: onCloseFiles,
    onOpen: onOpenFiles
  } = useToggle()

  const { values, ...form } = useForm({
    initialValues: store.state.infoEnsayos,
    validate: informacionEnsayosValid
  })

  const { createArchivo } = useArchivosMutation()

  const handleUpload = async (files: File[]): Promise<boolean> => {
    setIsLoadingFiles(true)
    const fileList = []

    for (const file of files) {
      fileList.push({
        DATAOBJECT: file,
        DESCRIPCION: 'File'
      })
    }

    const res = await createArchivo({
      REGISTRO: 'Info Ensayos',
      DESCRIPCION_REGISTRO: 'Info Ensayos',
      ArchivosFisicos: fileList
    })

    if (res.data?.data?.NUME_REGI_ARC) {
      form.setField('NUME_REGI_ARC', res.data.data.NUME_REGI_ARC)
    }

    setIsLoadingFiles(false)
    onCloseFiles()
    return res.ok
  }

  const handleSubmit = () => {
    if (store.state.localidadEnsayos.length === 0) {
      toast({
        type: 'warning',
        title: 'Agregar Localidades donde se realizaron los ensayos'
      })
      return
    }
    if (store.state.desarrolloCultivar.length === 0) {
      toast({
        type: 'warning',
        title: 'Agregar ámbito Geográfico de Desarrollo del Cultivar'
      })
      return
    }
    if (store.state.rangosAdaptacion.length === 0) {
      toast({ type: 'warning', title: 'Agregar rangos de adaptación' })
      return
    }
    if (store.state.finalidadUso.length === 0) {
      toast({ type: 'warning', title: 'Agregar finalidad de uso' })
      return
    }
    if (values.NUME_REGI_ARC) {
      store.loadInfoEnsayos(values)
      next()
    } else {
      toast({ type: 'warning', title: 'Adjuntar Informe Técnico' })
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          Localidades donde se realizaron los ensayos
        </p>
      </div>

      <div className="">
        <button
          className="btn btn-ghost-primary w-full md:w-max"
          type="button"
          onClick={onOpenLocalidad}
        >
          Agregar
          <IconPlus />
        </button>

        {isOpenLocalidad && (
          <LocalidadEnsayoModal
            onSubmit={store.addLocalidadEnsayos}
            onClose={onCloseLocalidad}
            isOpen={isOpenLocalidad}
          />
        )}

        {isOpenUpdateLocalidad && !!idInfEns && (
          <LocalidadEnsayoModal
            isOpen={isOpenUpdateLocalidad}
            onClose={() => {
              setIdInfEns('')
              onCloseUpdateLocalidad()
            }}
            onSubmit={store.updateLocalidadEnsayos}
            idToUpdate={idInfEns}
            isUpdate
          />
        )}

        <div className="mb-4">
          <LocalidadEnsayoTable
            data={store.state.localidadEnsayos}
            onAdd={onOpenLocalidad}
            onDelete={store.deleteLocalidadEnsayos}
            onUpdate={(id) => {
              setIdInfEns(id)
              id && onOpenUpdateLocalidad()
            }}
          />
        </div>
      </div>

      {/* ================================================ */}

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          Ámbito Geográfico de Desarrollo del Cultivar
        </p>
      </div>

      <div className="w-full flex gap-2 flex-wrap border-2 p-3 rounded-md dark:border-slate-700">
        {store.state.desarrolloCultivar.map((item, index) => (
          <div
            key={index}
            className="border-2 flex rounded-md items-center pl-4 justify-between dark:border-slate-700 dark:text-white"
          >
            {item}
            <button
              className="btn btn-icon btn-ghost-primary hover:bg-transparent"
              onClick={() => store.deleteDesarrolloCultivar(item)}
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
                  !!e.target.value.length &&
                  !store.state.desarrolloCultivar.find(
                    (i) => i === e.target.value
                  )
                ) {
                  store.addDesarrolloCultivar(e.target.value)
                  e.target.value = ''
                }
              }
            }}
            onBlur={(e) => {
              if (
                !!e.target.value.length &&
                !store.state.desarrolloCultivar.find(
                  (i) => i === e.target.value
                )
              ) {
                store.addDesarrolloCultivar(e.target.value)
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
                !store.state.desarrolloCultivar.find((i) => i === pivotValueAnGeo)
              ) {
                store.addDesarrolloCultivar(pivotValueAnGeo)
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
          data={store.state.rangosAdaptacion}
          onAdd={onOpenRangosAdapt}
          onDelete={store.deleteRangosAdaptacion}
        />

        {isOpenRangosAdapt && (
          <RangosAdaptModal
            isOpen={isOpenRangosAdapt}
            onClose={onCloseRangosAdapt}
            onSubmit={store.addRangosAdaptacion}
          />
        )}
      </div>

      {/* ================================================ */}

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Finalidad de Uso</p>
      </div>

      <div>
        <div className="w-full flex gap-2 flex-wrap border-2 p-3 rounded-md dark:border-slate-700">
          {store.state.finalidadUso.map((item, index) => (
            <div
              key={index}
              className="border-2 flex rounded-md items-center pl-4 justify-between dark:border-slate-700 dark:text-white"
            >
              {item}
              <button
                className="btn btn-icon btn-ghost-primary hover:bg-transparent"
                onClick={() => store.deleteFinalidadUso(item)}
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
                    !store.state.finalidadUso.find((i) => i === e.target.value)
                  ) {
                    store.addFinalidadUso(e.target.value)
                    e.target.value = ''
                  }
                }
              }}
              onBlur={(e) => {
                if (
                  !!e.target.value.length &&
                  !store.state.finalidadUso.find((i) => i === e.target.value)
                ) {
                  store.addFinalidadUso(e.target.value)
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
                  !store.state.finalidadUso.find((i) => i === pivotValueFinUso)
                ) {
                  store.addFinalidadUso(pivotValueFinUso)
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
      </div>

      {/* ================================================ */}

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Ensayos de Identificación</p>
      </div>

      <TextArea
        label="Instalación"
        value={values.INSTALACION}
        onChange={(e) => form.setField('INSTALACION', e.target.value)}
        error={form.errors.INSTALACION}
      />

      <TextArea
        label="N° Campañas y N° Ensayos"
        value={values.CAMPANAS_ENSAYOS}
        onChange={(e) => form.setField('CAMPANAS_ENSAYOS', e.target.value)}
        error={form.errors.CAMPANAS_ENSAYOS}
      />

      <TextArea
        label="Caracteres que difieren al cultivar a prueba"
        value={values.CARACTERES_PRUEBA}
        onChange={(e) => form.setField('CARACTERES_PRUEBA', e.target.value)}
        error={form.errors.CARACTERES_PRUEBA}
      />

      <TextArea
        label="Plantas fuera de tipo"
        value={values.PLANTAS_TIPO}
        onChange={(e) => form.setField('PLANTAS_TIPO', e.target.value)}
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
        onChange={(e) => form.setField('PRIMERA_CAMPANA', e.target.value)}
        error={form.errors.PRIMERA_CAMPANA}
      />

      <TextArea
        label="Resultados de la segunda campaña agrícola"
        value={values.SEGUNDA_CAMPANA}
        onChange={(e) => form.setField('SEGUNDA_CAMPANA', e.target.value)}
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
        onChange={(e) =>
          form.setField('COMPORTAMIENTO_BIOTICO', e.target.value)
        }
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
        onChange={(e) =>
          form.setField('COMPORTAMIENTO_ABIOTICO', e.target.value)
        }
        error={form.errors.COMPORTAMIENTO_ABIOTICO}
      />

      <div className="flex flex-col md:flex-row items-center gap-3 text-slate-500 dark:text-white">
        <div className="">
          <Tooltip label="Adjuntar Informe Técnico">
            <button
              type="button"
              className="btn btn-outline-primary transition ease-out duration-300"
              onClick={onOpenFiles}
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
            Los archivos se agregaron correctamente
          </div>
        ) : (
          <div className="text-center">Adjuntar Informe Técnico</div>
        )}
        {isOpenFiles && (
          <UploadFilesModal
            isLoading={isLoadingFiles}
            isOpen={isOpenFiles}
            onClose={onCloseFiles}
            title="Adjuntar Informe Técnico"
            onUpload={handleUpload}
            NUME_REGI_ARC={values.NUME_REGI_ARC!}
          />
        )}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <button
          type="button"
          onClick={() => {
            store.loadInfoEnsayos(values)
            back()
          }}
          className="self-end btn btn-outline-primary"
        >
          Regresar
        </button>
        <button className="self-end btn btn-solid-primary">Siguiente</button>
      </div>
    </form>
  )
}

export default InfoEnsayosForm
