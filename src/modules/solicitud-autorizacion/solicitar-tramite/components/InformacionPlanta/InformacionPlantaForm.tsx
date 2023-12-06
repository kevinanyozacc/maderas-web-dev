import React, { useState } from 'react'
import useForm from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import useArchivosMutation from '@hooks/useArchivosMutation'
import useToggle from '@hooks/useToggle'
import UploadFiles from '@components/shared/UploadFiles'
import Input from '@components/shared/Input'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'
import Spinner from '@components/shared/Spinner'
import RadioButton from '@components/shared/RadioButon'
import Tooltip from '@components/shared/ToolTip'
import { SideMultistepComponentProps as props } from '@pages/solicitud-autorizacion'
import { IconCheck, IconCloudArrowUp } from '@icons'
import { classNames } from '@utils/classNames'
import InformacionSolicitudValid from '@modules/solicitud-autorizacion/validation/InformacionResponsableValid'
import { textInformacionPlanta, textSolAutoriza } from '@modules/solicitud-autorizacion/utils/textContent'
import { useRegistroSolicitud } from '../../store/useRegistroAutorizacion'
import { isEmpty } from '@utils/isEmpty'
import useToast from '@hooks/useToast'
import SensoresForm from '../Sensores/SensoresForm'
import { useGetResponsableByDni } from '@graphql/api/GetResponsableByDni'

const InformacionPlantaForm = ({ back, submit, isLoading, isUpdate }: props) => {
  const [isSubmited, setIsSubmited] = useState(false)

  // const toast = useToast()
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)
  const toggleCreateFile = useToggle()
  const toggleCreateFile2 = useToggle()
  const toggleCreateFile3 = useToggle()
  const toggleCreateFile4 = useToggle()
  const toggleCreateFile5 = useToggle()
  const toggleCreateFile6 = useToggle()

  const [nameInput, setNameInput] = useState(0)

  // const toggleCreate = useToggle()
  // const [setIsLoadingFiles] = useState(false)

  const toast = useToast()

  const store = useRegistroSolicitud()
  const { values, isChanged, setIsChanged, ...form } = useForm({
    validate: (values) => InformacionSolicitudValid(values),
    initialValues: store.state.informacionSolicitud
  })

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO,
    codProv: values.PROVINCIA
  })

  const [first, setfirst] = useState('')
  const [colorstyle, setColorstyle] = useState('')

  function colorDoc (est: string): string {
    if (est === '1') return 'text-blue-600 bg-blue-200'
    if (est === '2') return 'text-green-600 bg-green-200'
    if (est === '3') return 'text-orange-500 bg-orange-200'
    if (est === '4') return 'text-red-600 bg-red-200'

    return est
  }

  function estadoDoc (est: string): string {
    if (est === '1') return 'EN TRAMITE'
    if (est === '2') return 'AUTORIZADO'
    if (est === '3') return 'DENEGADO'
    if (est === '4') return 'OBSERVADO'
    return est
  }

  const handleResponsableByDni = async () => {
    const { data } = await useGetResponsableByDni(values.DNI)
    if (data.getResponsableSolicitud) {
      form.setFields({
        APENOMB: data?.getResponsableSolicitud.APENOMB,
        RESPONSABLE_ID: data.getResponsableSolicitud.ID
      })

      setfirst(estadoDoc(data?.getResponsableSolicitud.ESTADO))
      setColorstyle(colorDoc(data?.getResponsableSolicitud.ESTADO))
      toast({ title: 'Se encontro DNI ingresado', type: 'success' })
    } else {
      form.setFields({
        APENOMB: ''
      })
      setfirst('')
      setColorstyle('')
      toast({ title: 'El DNI ingresado no se encuentra en los datos de Responsables Técnicos', type: 'warning' })
    }
  }

  const handleSubmit2 = () => {
    if (isEmpty(values.NUME_REGI_FUNCIONAMIENTO)) {
      return toast({ title: '03. Subir Licencia Municipal', type: 'warning' })
    }
    if (isEmpty(values.NUME_REGI_MEMORIA)) {
      return toast({ title: '04. Subir Memoria Discriptiva', type: 'warning' })
    }
    if (isEmpty(values.NUME_REGI_TRAMITE)) {
      return toast({ title: '07. Subir Comprobante de Pago por derecho de tramite', type: 'warning' })
    }
    if (isEmpty(values.NUME_REGI_PLANO)) {
      return toast({ title: '08. Subir Plano de distribucion', type: 'warning' })
    }
    if (values.TIPOAUTORIZACION === 'PF') {
      if (isEmpty(values.NUME_REGI_TERMICO)) {
        return toast({ title: '09. Adjuntar documento que acredite la importación ', type: 'warning' })
      }
    }
    if (first !== 'AUTORIZADO') {
      return toast({ title: 'Estimado usuario, el responsable técnico no se encuentra autorizado para realizar el registro de la solicitud', type: 'warning' })
    }

    store.loadInformacionSolicitud(values)
    console.log(store)
    setIsSubmited(true)
    submit()
  }

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
    console.log(fileList)

    const res = await createArchivo({
      REGISTRO: 'Especializacion',
      DESCRIPCION_REGISTRO: 'Especializacion Info',
      ArchivosFisicos: fileList
    })

    if (res.data?.data?.NUME_REGI_ARC) {
      if (nameInput === 1) form.setField('NUME_REGI_FUNCIONAMIENTO', res.data.data.NUME_REGI_ARC)
      if (nameInput === 2) form.setField('NUME_REGI_MEMORIA', res.data.data.NUME_REGI_ARC)
      if (nameInput === 3) form.setField('NUME_REGI_SENSOR', res.data.data.NUME_REGI_ARC)
      if (nameInput === 4) form.setField('NUME_REGI_TRAMITE', res.data.data.NUME_REGI_ARC)
      if (nameInput === 5) form.setField('NUME_REGI_PLANO', res.data.data.NUME_REGI_ARC)
      if (nameInput === 6) form.setField('NUME_REGI_TERMICO', res.data.data.NUME_REGI_ARC)
    }

    setIsLoadingFiles(false)
    toggleCreateFile.onClose()
    toggleCreateFile2.onClose()
    toggleCreateFile3.onClose()
    toggleCreateFile4.onClose()
    toggleCreateFile5.onClose()
    toggleCreateFile6.onClose()
    return res.ok
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={form.onSubmit(handleSubmit2)}
    >
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          01. {textInformacionPlanta.titleForm}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <RadioButton
          value={values.TIPOAUTORIZACION}
          className="flex flex-col gap-3"
          onChange={(value) => {
            form.setField('TIPOAUTORIZACION', value)
            !isChanged && setIsChanged(true)
          }}
          options={[
            { label: 'Autorización de funcionamiento para cámara de tratamiento térmico para embalajes de madera', value: 'CT' },
            { label: 'Autorización de funcionamiento para planta de fabricación de embalajes con tratamiento térmico', value: 'PF' }
          ]}
        />

      </div>
      <p className="font-medium text-slate-400">
        02. Dirección de la Planta de Embalaje de madera
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
        <Input
          label="DOMICILIO"
          // value={values.DOMICILIO!}
          {...form.inputProps('DOMICILIO')}
          // pattern={patterns.onlyLetters}
          // onChange={(e) =>
          //   e.target.validity.valid &&
          //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
          // }
          error={form.errors.DOMICILIO}
        />

      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <SelectWithFilter
          withFilter
          label="Departamento"
          value={values.DEPARTAMENTO}
          error={form.errors.DEPARTAMENTO}
          onChange={({ value }) => {
            form.setFields({
              DEPARTAMENTO: value,
              PROVINCIA: '',
              DISTRITO: ''
            })
          }}
          options={ubigeo.departamentos}
          dataExtractor={{ label: 'NOMB_DPTO_DPT', value: 'CODI_DEPA_DPT' }}
        />
        <SelectWithFilter
          withFilter
          label="Provincia"
          value={values.PROVINCIA}
          error={form.errors.PROVINCIA}
          onChange={({ value }) => {
            form.setFields({ PROVINCIA: value, DISTRITO: '' })
          }}
          options={ubigeo.provincias}
          dataExtractor={{ label: 'NOMB_PROV_TPR', value: 'CODI_PROV_TPR' }}
        />
        <SelectWithFilter
          withFilter
          label="Distrito"
          value={values.DISTRITO}
          options={ubigeo.distritos}
          error={form.errors.DISTRITO}
          onChange={({ value }) => form.setField('DISTRITO', value)}
          dataExtractor={{ label: 'NOMB_DIST_TDI', value: 'CODI_DIST_TDI' }}
        />
      </div>
      <p className="font-medium text-slate-400">
        03. {'Licencia Municipal de funcionamiento'}
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Tooltip label={textSolAutoriza.addLicencia}>
          <button
            type="button"
            className="btn btn-outline-primary transition ease-out duration-300"
            onClick={() => {
              toggleCreateFile.onOpen()
              setNameInput(1)
            }}

          >
            Subir Archivos
            <span
              className={classNames([
                'text-2xl',
                values.NUME_REGI_FUNCIONAMIENTO && 'text-green-500'
              ])}
            >
              {values.NUME_REGI_FUNCIONAMIENTO ? (
                <IconCheck />
              ) : (
                <IconCloudArrowUp />
              )}
            </span>
          </button>
        </Tooltip>
        {values.NUME_REGI_FUNCIONAMIENTO ? (
          <div className="text-center">
            {textSolAutoriza.addedFiles}
          </div>
        ) : (
          <div className="text-center">
            {textSolAutoriza.messageAdd}
          </div>
        )}

        {toggleCreateFile.isOpen &&
          (isUpdate ? (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile.isOpen}
              onClose={toggleCreateFile.onClose}
              title={textSolAutoriza.update}
              NUME_REGI_ARC={values.NUME_REGI_FUNCIONAMIENTO}
            />
          ) : (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile.isOpen}
              onClose={toggleCreateFile.onClose}
              title={'Licencia Municipal'}
              onUpload={handleUpload}
              NUME_REGI_ARC={values.NUME_REGI_FUNCIONAMIENTO}
            />
          ))}

      </div>

      <p className="font-medium text-slate-400">
        04. {'Memoria Discriptiva'}
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Tooltip label={textSolAutoriza.addMemoria} position='left'>
          <button
            type="button"
            className="btn btn-outline-primary transition ease-out duration-300"
            onClick={() => {
              toggleCreateFile2.onOpen()
              setNameInput(2)
            }}
          >
            Subir Archivos
            <span
              className={classNames([
                'text-2xl',
                values.NUME_REGI_MEMORIA && 'text-green-500'
              ])}
            >
              {values.NUME_REGI_MEMORIA ? (
                <IconCheck />
              ) : (
                <IconCloudArrowUp />
              )}
            </span>
          </button>
        </Tooltip>
        <a
          className="self-end btn btn-outline-primary"
        >
          Ver modelo
        </a>
        {values.NUME_REGI_MEMORIA ? (
          <div className="text-center">
            {textSolAutoriza.addedFiles}
          </div>
        ) : (
          <div className="text-center">
            {textSolAutoriza.messageAdd}
          </div>
        )}

        {toggleCreateFile2.isOpen &&
          (isUpdate ? (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile2.isOpen}
              onClose={toggleCreateFile2.onClose}
              title={textSolAutoriza.update}
              NUME_REGI_ARC={values.NUME_REGI_MEMORIA}
            />
          ) : (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile2.isOpen}
              onClose={toggleCreateFile2.onClose}
              title={'Memoria Descriptiva'}
              onUpload={handleUpload}
              NUME_REGI_ARC={values.NUME_REGI_MEMORIA}
            />
          ))}
      </div>
      {values.TIPOAUTORIZACION === 'CT' ? (
        <div className="">
          <p className="font-medium text-slate-400">
            05. {'Número de cámaras de tratamiento'}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="Ingresar el numero de camaras"
              {...form.inputProps('SENSORES')}
              error={form.errors.SENSORES}
            />
          </div>
          <br />
          <p className="font-medium text-slate-400">
            06. {'Caracteristicas de los Sensores'}
          </p>

          <SensoresForm />
        </div>
      ) : (
        <div className="text-center">

        </div>
      )}
      {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Numero de sensores por cámara"
          {...form.inputProps('SENSORES')}
          error={form.errors.SENSORES}
        />

        <Tooltip label={textSolAutoriza.addSensor}>
          <button
            type="button"
            className="btn btn-outline-primary transition ease-out duration-300"
            onClick={() => {
              toggleCreateFile3.onOpen();
              setNameInput(3)
            }}
          >
            Subir Archivos
            <span
              className={classNames([
                'text-2xl',
                values.NUME_REGI_SENSOR && 'text-green-500'
              ])}
            >
              {values.NUME_REGI_SENSOR ? (
                <IconCheck />
              ) : (
                <IconCloudArrowUp />
              )}
            </span>
          </button>
        </Tooltip>
        {toggleCreateFile3.isOpen &&
          (isUpdate ? (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile3.isOpen}
              onClose={toggleCreateFile3.onClose}
              title={textSolAutoriza.update}
              NUME_REGI_ARC={values.NUME_REGI_SENSOR}
            />
          ) : (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile3.isOpen}
              onClose={toggleCreateFile3.onClose}
              title={'Certificado de Calibracion'}
              onUpload={handleUpload}
              NUME_REGI_ARC={values.NUME_REGI_SENSOR}
            />
          ))}
      </div> */}

      <p className="font-medium text-slate-400">
        07. {'Comprobante de Pago por derecho de tramite'}
      </p>
      <div className="">
        <Tooltip label={textSolAutoriza.addPago}>
          <button
            type="button"
            className="btn btn-outline-primary transition ease-out duration-300"
            onClick={() => {
              toggleCreateFile4.onOpen()
              setNameInput(4)
            }}
          >
            Subir Archivos
            <span
              className={classNames([
                'text-2xl',
                values.NUME_REGI_TRAMITE && 'text-green-500'
              ])}
            >
              {values.NUME_REGI_TRAMITE ? (
                <IconCheck />
              ) : (
                <IconCloudArrowUp />
              )}
            </span>
          </button>
        </Tooltip>
        {toggleCreateFile4.isOpen &&
          (isUpdate ? (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile4.isOpen}
              onClose={toggleCreateFile4.onClose}
              title={textSolAutoriza.update}
              NUME_REGI_ARC={values.NUME_REGI_TRAMITE}
            />
          ) : (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile4.isOpen}
              onClose={toggleCreateFile4.onClose}
              title={'Comprobante de Pago'}
              onUpload={handleUpload}
              NUME_REGI_ARC={values.NUME_REGI_TRAMITE}
            />
          ))}
      </div>

      <p className="font-medium text-slate-400">
        08. {'Plano de distribucion'}
      </p>
      <div className="">
        <Tooltip label={textSolAutoriza.addPlano}>
          <button
            type="button"
            className="btn btn-outline-primary transition ease-out duration-300"
            onClick={() => {
              toggleCreateFile5.onOpen()
              setNameInput(5)
            }}
          >
            Subir Archivos
            <span
              className={classNames([
                'text-2xl',
                values.NUME_REGI_PLANO && 'text-green-500'
              ])}
            >
              {values.NUME_REGI_PLANO ? (
                <IconCheck />
              ) : (
                <IconCloudArrowUp />
              )}
            </span>
          </button>
        </Tooltip>

        {toggleCreateFile5.isOpen &&
          (isUpdate ? (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile5.isOpen}
              onClose={toggleCreateFile5.onClose}
              title={textSolAutoriza.update}
              NUME_REGI_ARC={values.NUME_REGI_PLANO}
            />
          ) : (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile5.isOpen}
              onClose={toggleCreateFile5.onClose}
              title={'Plano de Distribución'}
              onUpload={handleUpload}
              NUME_REGI_ARC={values.NUME_REGI_PLANO}
            />
          ))}
      </div>

      {values.TIPOAUTORIZACION === 'PF' ? (
        <div className="">

          <p className="font-medium text-slate-400">
            09.  {'Adjuntar documento que acredite la importación'}
          </p>
          <div className="mt-3">
            <Tooltip label={textSolAutoriza.addSolicitudImport}>
              <button
                type="button"
                className="btn btn-outline-primary transition ease-out duration-300"
                onClick={() => {
                  toggleCreateFile6.onOpen()
                  setNameInput(6)
                }}
              >
                Subir Archivos
                <span
                  className={classNames([
                    'text-2xl',
                    values.NUME_REGI_TERMICO && 'text-green-500'
                  ])}
                >
                  {values.NUME_REGI_TERMICO ? (
                    <IconCheck />
                  ) : (
                    <IconCloudArrowUp />
                  )}
                </span>
              </button>
            </Tooltip>
            {toggleCreateFile6.isOpen &&
              (isUpdate ? (
                <UploadFiles
                  isLoading={isLoadingFiles}
                  isOpen={toggleCreateFile6.isOpen}
                  onClose={toggleCreateFile6.onClose}
                  title={textSolAutoriza.update}
                  NUME_REGI_ARC={values.NUME_REGI_TERMICO}
                />
              ) : (
                <UploadFiles
                  isLoading={isLoadingFiles}
                  isOpen={toggleCreateFile6.isOpen}
                  onClose={toggleCreateFile6.onClose}
                  title={'Autorizacion de importación'}
                  onUpload={handleUpload}
                  NUME_REGI_ARC={values.NUME_REGI_TERMICO}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center">

        </div>
      )}

      <p className="font-medium text-slate-400">
        10. {'Responsable Técnico'}
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">

        <Input
          label="DNI"
          // value={values.DNI!}
          {...form.inputProps('DNI')}
          // pattern={patterns.onlyLetters}
          // onChange={(e) =>
          //   e.target.validity.valid &&
          //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
          // }
          error={form.errors.DNI}
        />
        <button className="self-end btn btn-solid-primary"
          onClick={handleResponsableByDni}
          type='button'>
          Buscar
        </button>

      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

        <Input
          label="NOMBRES"
          type="text"
          readOnly
          {...form.inputProps('APENOMB')}
          error={form.errors.APENOMB}
        />
        <div
          className={classNames([
            colorstyle,
            ' text-center font-semibold py-1 px-4 rounded-full whitespace-nowrap'
          ])}
        >
          <div className='mt-3'>{first}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            store.loadInformacionSolicitud(values)
            back()
          }}
          className="self-end btn btn-outline-primary"
        >
          Regresar
        </button>

        <button
          disabled={isLoading || isSubmited}
          type="submit" className="self-end btn btn-solid-primary"
        >
          Guardar
          {isLoading && <Spinner />}
        </button>
      </div>

    </form>
  )
}

export default InformacionPlantaForm
