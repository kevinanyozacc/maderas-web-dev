import { useEffect, useState } from 'react'

import Input from '@components/shared/Input'
import Select from '@components/shared/Select'
import TextArea from '@components/shared/TextArea'
import InputCleave from '@components/shared/InputCleave'

import useForm from '@hooks/useForm'
import { SideMultistepComponentProps as Props } from '@pages/cultivares-comerciales'
import { useCultivaresComerciales } from '../../store/useCultivaresComerciales'
import { datosCultivarValid } from '../../../validation/datosCultivarValid'
import { classNames } from '@utils/classNames'
import { cultivarOptions } from '@modules/cultivares-comerciales/utils/textContent'
import { ErrorMessages } from '@validation/messages'

import { Estados, TipoNativo, useGetAllEspeciesQuery } from '@generated/graphql'

import RadioButton from '@components/shared/RadioButon'
import useToast from '@hooks/useToast'
import ButtonUploadFiles from '@components/shared/ButtonsForm/ButtonUploadFiles'
import SelectEspecie from '@components/shared/Select/SelectEspecie'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'

import countries from '@utils/countries.json'

const DatosCultivarForm = ({ back, next }: Props) => {
  const store = useCultivaresComerciales()

  const [selectValue, setSelectValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')

  const toast = useToast()

  const { values, ...form } = useForm({
    initialValues: store.state.datosCultivar,
    validate: datosCultivarValid
  })

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
    const exist = cultivarOptions.find((i) => i.value === values.TIPO_CULTIVAR)
    if (!values.TIPO_CULTIVAR) return
    if (!exist) {
      form.setField('TIPO_CULTIVAR', 'OTRO')
      setSelectValue('OTRO')
      setInputValue(values.TIPO_CULTIVAR)
    }
  }, [])

  const handleSubmit = () => {
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
      values.NOMBRE_CO_OBTENTOR?.trim().length !== 0
    ) {
      toast({
        desc: 'Debe adjuntar documento relacionado al Co-Obtentor',
        title: 'Adjuntar documentos',
        type: 'warning'
      })
      return
    }

    if (selectValue === 'OTRO') {
      store.loadDatosCultivar({
        ...values,
        TIPO_CULTIVAR: inputValue
      })
      next()
      return
    }

    store.loadDatosCultivar({ ...values })
    next()
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.onSubmit(handleSubmit)}
    >
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
        }}
        options={especies}
        isUpdate
        dataExtractor={{
          label: 'NOMBRE_CIENTIFICO',
          value: 'ESPECIE_ID',
          reglamentario: 'REGLAMENTARIO'
        }}
        dataUpdate={{
          especieId: values.ESPECIE_ID,
          nameEspecie: values.nameEspecie || '',
          reglamentario: Estados.Activo
        }}
        queryOptions={{
          denominacion: Estados.Activo,
          estado: Estados.Activo
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
          options={countries}
          withFilter
          dataExtractor={{ label: 'name', value: 'name' }}
          value={values.PAIS}
          onChange={({ label }) => {
            form.setField('PAIS', label)
            if (label === 'Peru') form.setField('FECHA_INTERNAMIENTO', '')
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
          }}
          options={cultivarOptions}
        />
        {selectValue === 'OTRO' && (
          <Input
            value={inputValue}
            label="Especificar"
            onChange={(e) => {
              setInputValue(e.target.value)
              e.target.value && setInputError('')
            }}
            error={inputError}
          />
        )}
      </div>

      <RadioButton
        value={values.TIPO_NATIVO}
        onChange={(value) => form.setField('TIPO_NATIVO', value)}
        className="flex flex-col gap-3"
        options={[
          { label: 'Cultivar Nativo', value: TipoNativo.CultivarNativo },
          { label: 'Cultivar No Nativo', value: TipoNativo.CultivarNoNativo }
        ]}
      />

      <TextArea
        label="Genealogía"
        value={values.GENEOLOGIA}
        onChange={(e) => form.setField('GENEOLOGIA', e.target.value)}
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
        onUpload={(res) => form.setField('NUME_REGI_ARC_DVC', res)}
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
        onUpload={(res) => form.setField('NUME_REGI_ARC_DRCO', res)}
      />

      <div className="flex items-center justify-between mt-auto">
        <button
          type="button"
          onClick={() => {
            console.log(values)
            if (selectValue === 'OTRO') {
              store.loadDatosCultivar({
                ...values,
                TIPO_CULTIVAR: inputValue
              })
              back()
              return
            }
            store.loadDatosCultivar({ ...values })
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

export default DatosCultivarForm
