import Input from '@components/shared/Input'
import useForm from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import InformacionResponsableValid from '@modules/Registro-responsable/validation/InformacionResponsableValid'
import { useRegistroResponsable } from '../../store/useRegistroResponsable'
import React, { useState } from 'react'
import { textInfResponsable } from '@modules/registro-productor/utils/textContent'
import { SideMultistepComponentProps as props } from '@pages/registro-responsable'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'
import InputCleave from '@components/shared/InputCleave'
import UploadFiles from '@components/shared/UploadFiles'
import Spinner from '@components/shared/Spinner'
import RadioButton from '@components/shared/RadioButon'
import Tooltip from '@components/shared/ToolTip'
import { IconCheck, IconCloudArrowUp } from '@icons'
import useToggle from '@hooks/useToggle'
import { classNames } from '@utils/classNames'
import useArchivosMutation from '@hooks/useArchivosMutation'
import ConocimientoForm from '../Experiencia/ConocimientoForm'
import { useGetDatosReniec } from '@graphql/api/GetDatosReniec'
import useToast from '@hooks/useToast'

const InformacionResponsableForm = ({ back, submit, isLoading, isUpdate }: props) => {
  const [isSubmited, setIsSubmited] = useState(false)
   const toast = useToast()
  const toggleCreateFile = useToggle()
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)

  const store = useRegistroResponsable()
  const { values, isChanged, setIsChanged, ...form } = useForm({
    validate: (values) => InformacionResponsableValid(values),
    initialValues: store.state.informacionResponsable
  })

  const ubigeo = useGetUbigeo({
    codDepa: values.DEPARTAMENTO,
    codProv: values.PROVINCIA
  })

  const handleSubmit2 = () => {
    store.loadInformacionResponsable(values)
    // store.addConocimiento
    console.log('informacion del responsable')
    console.log(values)
    setIsSubmited(true)
    submit()
  }

  const handleDNI = async () => {
    const res = await useGetDatosReniec(values.DNI)
    if (res) {
      form.setFields({
        APENOMB: res?.nombreRazonSocial
      })
      toast({ title: 'Se encontro DNI ingresado', type: 'success' })
    } else {
      toast({ title: 'No se encontro DNI ingresado', type: 'warning' })
    }
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

    const res = await createArchivo({
      REGISTRO: 'Especializacion',
      DESCRIPCION_REGISTRO: 'Especializacion Info',
      ArchivosFisicos: fileList
    })

    if (res.data?.data?.NUME_REGI_ARC) {
      form.setField('CURRICULUM', res.data.data.NUME_REGI_ARC)
    }

    setIsLoadingFiles(false)
    toggleCreateFile.onClose()
    return res.ok
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={form.onSubmit(handleSubmit2)}
    >
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">
          {textInfResponsable.titleForm}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
          onClick={handleDNI}>
          Search
        </button>

      </div>

      <div>
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
          // error={form.errors.APENOMB}
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
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Título de Profesional</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <RadioButton
          value={values.TITULOPROFESIONAL}
          className="flex flex-col gap-3"
          onChange={(value) => {
            form.setField('TITULOPROFESIONAL', value)
            !isChanged && setIsChanged(true)
          }}
          options={[
            { label: 'Ingeniero Agronomo', value: 'AGRONOMO' },
            { label: 'Ingeniero AgroIndustrial', value: 'AGROINDUSTRIAL' },
            { label: 'Ingeniero Forestal', value: 'FORESTAL' },
            { label: 'Biólogo', value: 'BIOLOGO' }
          ]}
        />
        <Input
          label="COLEGIATURA"
          //   type=""
          {...form.inputProps('COLEGIATURA')}
          // value={values.RAZON_SOCIAL!}
          // pattern={patterns.onlyLetters}
          // onChange={(e) =>
          //   e.target.validity.valid &&
          //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
          // }
          error={form.errors.COLEGIATURA}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
        <div className="">
          <Tooltip label={textInfResponsable.add}>
            <button
              type="button"
              className="btn btn-outline-primary transition ease-out duration-300"
              onClick={toggleCreateFile.onOpen}
            >
              Subir Archivos
              <span
                className={classNames([
                  'text-2xl',
                  values.CURRICULUM && 'text-green-500'
                ])}
              >
                {values.CURRICULUM ? (
                  <IconCheck />
                ) : (
                  <IconCloudArrowUp />
                )}
              </span>
            </button>
          </Tooltip>
        </div>
        {values.CURRICULUM ? (
          <div className="text-center">
            {textInfResponsable.addedFiles}
          </div>
        ) : (
          <div className="text-center">
            {textInfResponsable.messageAdd}
          </div>
        )}

        {toggleCreateFile.isOpen &&
          (isUpdate ? (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile.isOpen}
              onClose={toggleCreateFile.onClose}
              title={textInfResponsable.update}
              NUME_REGI_ARC={values.CURRICULUM}
            />
          ) : (
            <UploadFiles
              isLoading={isLoadingFiles}
              isOpen={toggleCreateFile.isOpen}
              onClose={toggleCreateFile.onClose}
              title={textInfResponsable.add}
              onUpload={handleUpload}
              NUME_REGI_ARC={values.CURRICULUM}
            />
          ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          type="email"
          label="Correo Electrónico"
          {...form.inputProps('CORREO')}
        />
        <InputCleave
          type="phone"
          label="Numero Telefónico"
          {...form.inputProps('TELEFONO')}
        />
      </div>

      <ConocimientoForm />
      <button
        type="button"
        onClick={() => {
          store.loadInformacionResponsable(values)
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

export default InformacionResponsableForm
