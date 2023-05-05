import Input from '@components/shared/Input'
import useForm from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import React, { useState } from 'react'
import { SideMultistepComponentProps as props } from '@pages/registro-responsable'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'
import Spinner from '@components/shared/Spinner'
import RadioButton from '@components/shared/RadioButon'
import Tooltip from '@components/shared/ToolTip'
import { IconCheck, IconCloudArrowUp } from '@icons'
import useToggle from '@hooks/useToggle'
import { classNames } from '@utils/classNames'
import useArchivosMutation from '@hooks/useArchivosMutation'
import { textInformacionPlanta } from '@modules/solicitud-autorizacion/utils/textContent'
import { useRegistroSolicitud } from '../../store/useRegistroResponsable'
import InformacionSolicitudValid from '@modules/solicitud-autorizacion/validation/InformacionResponsableValid'

const InformacionPlantaForm = ({ back, submit, isLoading, isUpdate }:props) => {
    const [isSubmited, setIsSubmited] = useState(false)
   // const toast = useToast()
    const toggleCreateFile = useToggle()
    const [setIsLoadingFiles] = useState(false)

    const store = useRegistroSolicitud()
    const { values, isChanged, setIsChanged, ...form } = useForm({
       validate: (values) => InformacionSolicitudValid(values),
      initialValues: store.state.informacionSolicitud
    })

    const ubigeo = useGetUbigeo({
        codDepa: values.DEPARTAMENTO,
        codProv: values.PROVINCIA
      })

    const handleSubmit2 = () => {
        store.loadInformacionSolicitud(values)
        // store.addConocimiento
        setIsSubmited(true)
        submit()
    }

    const { createArchivo } = useArchivosMutation()

    const handleUpload = async (files: File[]): Promise<boolean> => {
    // setIsLoadingFiles(true)
      const fileList = []

      for (const file of files) {
        fileList.push({
          DATAOBJECT: file,
          DESCRIPCION: 'File'
        })
      }

      const res = await createArchivo({
        REGISTRO: 'Especializacion',
        DESCRIPCION_REGISTRO: 'Especializacion Info',
        ArchivosFisicos: fileList
      })

      if (res.data?.data?.NUME_REGI_ARC) {
        // form.setField('', res.data.data.NUME_REGI_ARC)
      }

      // setIsLoadingFiles(false)
      toggleCreateFile.onClose()
      return res.ok
    }

    return (
    <form className="flex flex-col gap-6" onSubmit={form.onSubmit(handleSubmit2)}
        >
        <div className="border-b dark:border-b-slate-700">
            <p className="font-medium text-slate-400">
              {textInformacionPlanta.titleForm}
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
              {'Licencia Municipal de funcionamiento'}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Tooltip label={textInformacionPlanta.add}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={toggleCreateFile.onOpen}
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
              <a
             className="self-end btn btn-outline-primary"
            >
              Ver modelo
            </a>
            </div>

            <p className="font-medium text-slate-400">
              {'Memoria Discriptiva'}
            </p>
        <div className="">
              <Tooltip label={textInformacionPlanta.add}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={toggleCreateFile.onOpen}
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
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
                  label="Numero de sensores de cámara"
                  // value={values.DNI!}
                  {...form.inputProps('DNI')}
                  // pattern={patterns.onlyLetters}
                  // onChange={(e) =>
                  //   e.target.validity.valid &&
                  //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
                  // }
                  error={form.errors.DNI}
                />

              <Tooltip label={textInformacionPlanta.add}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={toggleCreateFile.onOpen}
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

        </div>

        <p className="font-medium text-slate-400">
              {'Comprobante de Pago por derecho de tramite'}
            </p>
        <div className="">
              <Tooltip label={textInformacionPlanta.add}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={toggleCreateFile.onOpen}
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
            </div>

            <p className="font-medium text-slate-400">
              {'Plano de distribucion'}
            </p>
        <div className="">
              <Tooltip label={textInformacionPlanta.add}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={toggleCreateFile.onOpen}
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
            </div>

            <p className="font-medium text-slate-400">
              {'Si la autorizacion es para planta de fabricación de embalajes de madera con tratamiento térmico, adjuntar la autorización de importación'}
            </p>
        <div className="">
              <Tooltip label={textInformacionPlanta.add}>
                <button
                  type="button"
                  className="btn btn-outline-primary transition ease-out duration-300"
                  onClick={toggleCreateFile.onOpen}
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
            </div>

            <p className="font-medium text-slate-400">
              {'Responsable Técnico'}
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
              <a
             className="self-end btn btn-outline-primary"
            >
              BUSCAR
            </a>

            </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

         <Input
              label="APELLIDOS Y NOMBRES"
              type="text"
              {...form.inputProps('APENOMB')}
              // value={values.RAZON_SOCIAL!}
              // pattern={patterns.onlyLetters}
              // onChange={(e) =>
              //   e.target.validity.valid &&
              //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
              // }
              error={form.errors.APENOMB}
            />
            <a
             className="self-end btn btn-outline-primary"
            >
              Estado
            </a>
        </div>

      {/* <ConocimientoForm /> */}
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

    </form>
  )
}

export default InformacionPlantaForm
