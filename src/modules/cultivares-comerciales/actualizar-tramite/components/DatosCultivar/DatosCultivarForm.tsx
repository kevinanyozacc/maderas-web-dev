import moment from 'moment'
import { useEffect, useState } from 'react'

import ButtonsForm from '@components/shared/ButtonsForm'
import Input from '@components/shared/Input'
import InputCleave from '@components/shared/InputCleave'
import Select from '@components/shared/Select'
import TextArea from '@components/shared/TextArea'
import WarningAlert from '@components/shared/WarningAlert'
import RadioButton from '@components/shared/RadioButon'
import ButtonUploadFiles from '@components/shared/ButtonsForm/ButtonUploadFiles'

import {
  CultivarComercialUpdateInput,
  Estados,
  TipoNativo,
  useGetAllEspeciesQuery
} from '@generated/graphql'

import useForm from '@hooks/useForm'
import useUpdateCultivarComercial from '@hooks/useUpdateCultivarComercial'
import { cultivarOptions } from '@modules/cultivares-comerciales/utils/textContent'
import { SideMultistepComponentProps as Props } from '@pages/cultivares-comerciales/actualizar-tramite'
import { classNames } from '@utils/classNames'
import { ErrorMessages } from '@validation/messages'

import { datosCultivarValid } from '../../../validation/datosCultivarValid'
import useToast from '@hooks/useToast'
import { DatosCultivar } from '@modules/cultivares-comerciales/solicitar-tramite/interfaces/cultivaresComerciales'
import SelectEspecie from '@components/shared/Select/SelectEspecie'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'

type cultivarComercialInput = CultivarComercialUpdateInput & DatosCultivar

const initialValues: cultivarComercialInput = {
  CULTIVAR_COMERCIAL_ID: 0,
  NOMBRE_CULTIVAR: '',
  NOMBRE_OBTENTOR: '',
  FECHA_INTERNAMIENTO: '',
  PAIS: '',
  GENEOLOGIA: '',
  TIPO_CULTIVAR: '',
  ESPECIE_ID: 0,
  TIPO_NATIVO: TipoNativo.CultivarNativo,
  FINALIDAD_USO: '',
  NOMBRE_CO_OBTENTOR: '',
  NUME_REGI_ARC_DRCO: '',
  NUME_REGI_ARC_DVC: '',
  NUME_REGI_ARC_RIV: '',
  RANGO_ADAPTACION: '',
  nameEspecie: '',
  rangoAdapMax: '',
  rangoAdapMin: ''
}

const DatosCultivarForm = ({ back, next, registroId }: Props) => {
  const [selectValue, setSelectValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')

  const toast = useToast()

  const { values, isChanged, setIsChanged, ...form } = useForm({
    initialValues,
    validate: datosCultivarValid
  })

  const { datos, updateCultivarCom, datosObs } =
    useUpdateCultivarComercial(registroId)

  const [data] = useGetAllEspeciesQuery({
    variables: {
      page: 1,
      pageSize: 5,
      estado: Estados.Activo,
      denominacion: Estados.Activo
    }
  })

  const especies = data.data?.getAllEspecies?.data || []

  useEffect(() => {
    if (datos.data?.getTramiteByRegistroId?.CULTIVAR_COMERCIAL) {
      const {
        __typename,
        FECHA_REGISTRO,
        EXPEDIENTE_ID,
        TIPO_NATIVO,
        RANGO_ADAPTACION,
        NOMBRE_CO_OBTENTOR,
        FECHA_INTERNAMIENTO,
        ESPECIE,
        ESPECIE_ID,
        ...rest
      } = datos.data?.getTramiteByRegistroId?.CULTIVAR_COMERCIAL

      form.setFields({
        ...rest,
        ESPECIE_ID: ESPECIE_ID!,
        TIPO_NATIVO: TIPO_NATIVO!,
        FECHA_INTERNAMIENTO: FECHA_INTERNAMIENTO
          ? moment(FECHA_INTERNAMIENTO).format('DD-MM-YYYY')
          : '',
        nameEspecie: ESPECIE?.NOMBRE_CIENTIFICO,
        rangoAdapMin: RANGO_ADAPTACION?.split('@')[0],
        rangoAdapMax: RANGO_ADAPTACION?.split('@')[1],
        NOMBRE_CO_OBTENTOR: NOMBRE_CO_OBTENTOR || ''
      })

      const hasOptionCultivar = cultivarOptions.find(
        (i) => i.value === rest.TIPO_CULTIVAR
      )
      if (!hasOptionCultivar) {
        form.setField('TIPO_CULTIVAR', 'OTRO')
        setSelectValue('OTRO')
        setInputValue(rest.TIPO_CULTIVAR)
      }
    }
  }, [datos.fetching])

  const handleSubmit = async () => {
    const fechaInter = `${values.FECHA_INTERNAMIENTO.slice(
      3,
      5
    )} ${values.FECHA_INTERNAMIENTO.slice(
      0,
      2
    )}, ${values.FECHA_INTERNAMIENTO.slice(-4)}`

    if (
      `${fechaInter}` === 'Invalid Date' &&
      values.PAIS.trim().toLowerCase() !== 'peru'
    ) {
      form.setErrors({ FECHA_INTERNAMIENTO: 'Ingresa una fecha valida' })
      return
    }

    if (selectValue === 'OTRO' && !inputValue) {
      setInputError(ErrorMessages.empty)
      return
    }

    if (!values.TIPO_NATIVO) {
      toast({
        desc: 'Debe seleccionar tipo nativo o no nativo',
        title: 'Faltan datos',
        type: 'warning'
      })
      return
    }

    if (!values.NUME_REGI_ARC_RIV && values.PAIS !== 'Peru') {
      toast({
        desc: 'Debe Adjuntar Reporte de Inspección y Verificación (RIV)',
        title: 'Adjuntar documentos',
        type: 'warning'
      })

      return
    }

    if (!values.NUME_REGI_ARC_DVC) {
      toast({
        desc: 'Debe adjuntar documento con la descripción varietal del cultivar',
        title: 'Adjuntar documentos',
        type: 'warning'
      })
      return
    }

    if (
      !values.NUME_REGI_ARC_DRCO &&
      !!values.NOMBRE_CO_OBTENTOR?.trim().length
    ) {
      toast({
        desc: 'Debe adjuntar documento relacionado al Co-Obtentor',
        title: 'Adjuntar documentos',
        type: 'warning'
      })
      return
    }

    const { nameEspecie, rangoAdapMax, rangoAdapMin, ...rest } = values

    if (selectValue === 'OTRO') {
      await updateCultivarCom({
        ...rest,
        FECHA_INTERNAMIENTO: values.FECHA_INTERNAMIENTO ? fechaInter : null,
        TIPO_CULTIVAR: inputValue,
        CULTIVAR_COMERCIAL_ID:
          datos.data?.getTramiteByRegistroId?.CULTIVAR_COMERCIAL
            ?.CULTIVAR_COMERCIAL_ID || 0,
        RANGO_ADAPTACION: `${rangoAdapMin}@${rangoAdapMax}`
      })
      setIsChanged(false)
      return
    }

    await updateCultivarCom({
      ...rest,
      FECHA_INTERNAMIENTO: values.FECHA_INTERNAMIENTO ? fechaInter : null,
      CULTIVAR_COMERCIAL_ID:
        datos.data?.getTramiteByRegistroId?.CULTIVAR_COMERCIAL
          ?.CULTIVAR_COMERCIAL_ID || 0,
      RANGO_ADAPTACION: `${rangoAdapMin}@${rangoAdapMax}`
    })
    setIsChanged(false)
  }

  const handleDisable = () => {
    if (isChanged) return false
    return true
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      {!!datosObs.data?.getObservacionesByExpediente.OBS_CULT_COMERCIAL && (
        <WarningAlert
          message={
            datosObs.data?.getObservacionesByExpediente.OBS_CULT_COMERCIAL
          }
        />
      )}
      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Datos del Cultivar</p>
      </div>

      <SelectEspecie
        value={values.nameEspecie || ''}
        error={form.errors.ESPECIE_ID}
        onChange={({ nameEspecie, especieId }) => {
          form.setFields({
            ESPECIE_ID: especieId,
            nameEspecie
          })
          !isChanged && setIsChanged(true)
        }}
        options={especies}
        isUpdate
        dataExtractor={{
          label: 'NOMBRE_CIENTIFICO',
          value: 'ESPECIE_ID',
          reglamentario: 'REGLAMENTARIO'
        }}
        queryOptions={{
          denominacion: Estados.Activo,
          estado: Estados.Activo
        }}
        dataUpdate={{
          especieId:
            datos.data?.getTramiteByRegistroId?.CULTIVAR_COMERCIAL
              ?.ESPECIE_ID || values.ESPECIE_ID,
          nameEspecie:
            datos.data?.getTramiteByRegistroId?.CULTIVAR_COMERCIAL?.ESPECIE
              ?.NOMBRE_CIENTIFICO || values.nameEspecie!,
          reglamentario: Estados.Activo
        }}
      />

      <Input
        label="Denominación del Cultivar"
        {...form.inputProps('NOMBRE_CULTIVAR')}
      />

      <div
        className={`grid grid-cols-1 gap-6 ${
          values.PAIS !== 'Peru' ? ' lg:grid-cols-2' : ''
        }`}
      >
        <SelectWithFilter
          label="País de Origen"
          options={[]}
          withFilter
          dataExtractor={{ label: 'name', value: 'name' }}
          value={values.PAIS}
          onChange={({ label }) => {
            form.setField('PAIS', label)
            if (label === 'Peru') form.setField('FECHA_INTERNAMIENTO', '')
            !isChanged && setIsChanged(true)
          }}
          error={form.errors.PAIS}
        />

        {values.PAIS !== 'Peru' ? (
          <InputCleave
            type="date"
            label="Fecha de Internamiento"
            {...form.inputProps('FECHA_INTERNAMIENTO')}
          />
        ) : null}
      </div>

      {/* ========================================== */}
      {/* Reporte de Inspección y Verificación (RIV) */}
      {/* ========================================== */}

      {values.PAIS !== 'Peru' ? (
        <ButtonUploadFiles
          DESC_ARC={{
            REGISTRO: 'Reporte de Inspección y Verificación (RIV)',
            DESCRIPCION_REGISTRO: 'Reporte de Inspección y Verificación (RIV)'
          }}
          NUME_REGI_ARC={values.NUME_REGI_ARC_RIV || ''}
          onUpload={(res) => {
            form.setField('NUME_REGI_ARC_RIV', res)
            !isChanged && setIsChanged(true)
          }}
          text="Adjuntar Reporte de Inspección y Verificación (RIV) u otro documento
        que haga sus veces"
          toolTip="Adjuntar Reporte de Inspección y Verificación (RIV) u otro documento que haga sus veces"
          title="Adjuntar Reporte de Inspección y Verificación"
        />
      ) : null}

      <div
        className={classNames([
          'grid grid-cols-1 gap-6',
          selectValue === 'OTRO' ? 'md:grid-cols-2' : ''
        ])}
      >
        <Select
          label="Tipo de Cultivar"
          value={values.TIPO_CULTIVAR}
          error={form.errors.TIPO_CULTIVAR}
          onChange={({ value }) => {
            value === 'OTRO' ? setSelectValue(value) : setSelectValue('')
            form.setField('TIPO_CULTIVAR', value)
            !isChanged && setIsChanged(true)
          }}
          options={cultivarOptions}
        />
        {selectValue === 'OTRO' && (
          <Input
            value={inputValue}
            label="Especificar"
            onChange={(e) => {
              setInputValue(e.target.value)
              !isChanged && setIsChanged(true)
              e.target.value && setInputError('')
            }}
            error={inputError}
          />
        )}
      </div>

      <RadioButton
        value={values.TIPO_NATIVO}
        onChange={(value) => {
          form.setField('TIPO_NATIVO', value)
          !isChanged && setIsChanged(true)
        }}
        className="flex flex-col gap-3"
        options={[
          { label: 'Cultivar Nativo', value: TipoNativo.CultivarNativo },
          { label: 'Cultivar No Nativo', value: TipoNativo.CultivarNoNativo }
        ]}
      />

      <TextArea
        label="Genealogía"
        value={values.GENEOLOGIA}
        onChange={(e) => {
          form.setField('GENEOLOGIA', e.target.value)
          !isChanged && setIsChanged(true)
        }}
        error={form.errors.GENEOLOGIA}
      />

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Descripción Varietal</p>
      </div>

      {/* ================================= */}
      {/* descripción varietal del cultivar */}
      {/* ================================= */}

      <ButtonUploadFiles
        toolTip="Adjuntar documento con la descripción varietal del cultivar. En el caso de híbridos también
          deberá adjuntar la descripción varietal de las líneas parentales"
        text="Adjuntar documento con la descripción varietal del cultivar. En el
          caso de híbridos también deberá adjuntar la descripción varietal de
          las líneas parentales"
        title="Documento con la descripción varietal del cultivar"
        onUpload={(res) => {
          form.setField('NUME_REGI_ARC_DVC', res)
          !isChanged && setIsChanged(true)
        }}
        DESC_ARC={{
          REGISTRO: 'Descripción varietal del cultivar ',
          DESCRIPCION_REGISTRO: 'Descripción varietal del cultivar'
        }}
        NUME_REGI_ARC={values.NUME_REGI_ARC_DVC || ''}
      />

      <Input label="Finalidad de uso" {...form.inputProps('FINALIDAD_USO')} />

      <div>
        <div className="font-medium text-slate-400">
          <span className="">Rango de adaptación</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Mínimo"
            value={values.rangoAdapMin}
            maxLength={10}
            pattern="^[0-9,+.]+([,][0-9])?$"
            onChange={(e) => {
              e.target.validity.valid &&
                form.setField('rangoAdapMin', e.target.value)
            }}
            error={form.errors.rangoAdapMin}
          />
          <Input
            label="Máximo"
            value={values.rangoAdapMax}
            maxLength={10}
            pattern="^[0-9,+.]+([,][0-9])?$"
            onChange={(e) => {
              e.target.validity.valid &&
                form.setField('rangoAdapMax', e.target.value)
            }}
            error={form.errors.rangoAdapMax}
          />
        </div>
      </div>

      <div className="border-b dark:border-b-slate-700">
        <p className="font-medium text-slate-400">Obtentor</p>
      </div>

      <Input
        label="Nombre de Obtentor"
        {...form.inputProps('NOMBRE_OBTENTOR')}
      />

      <Input
        label="Nombre de Co-Obtentor"
        {...form.inputProps('NOMBRE_CO_OBTENTOR')}
      />

      {/* ==================================== */}
      {/* documento relacionado al Co-Obtentor */}
      {/* ==================================== */}

      <ButtonUploadFiles
        toolTip="Adjuntar documento relacionado al Co-Obtentor"
        text={`Adjuntar documento relacionado al Co-Obtentor ${
          !values.NOMBRE_CO_OBTENTOR ? '(opcional)' : ''
        }`}
        title="Documento relacionado al Co-Obtentor"
        DESC_ARC={{
          REGISTRO: 'Documento relacionado al Co-Obtentor',
          DESCRIPCION_REGISTRO: 'Documento relacionado al Co-Obtentor'
        }}
        NUME_REGI_ARC={values.NUME_REGI_ARC_DRCO || ''}
        onUpload={(res) => {
          form.setField('NUME_REGI_ARC_DRCO', res)
          !isChanged && setIsChanged(true)
        }}
      />

      <ButtonsForm back={back} next={next} handleDisable={handleDisable()} />
    </form>
  )
}

export default DatosCultivarForm
