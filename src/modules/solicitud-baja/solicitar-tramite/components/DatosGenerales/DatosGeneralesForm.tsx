

import Input from '@components/shared/Input'
import InputCleave from '@components/shared/InputCleave'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'
import useForm from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import useDocumentUnique from '@hooks/useIsDocumentUnique'
import useToast from '@hooks/useToast'
import { textResponsable } from '@modules/registro-productor/utils/textContent'
import { useRegistroResponsable } from '@modules/Registro-responsable/solicitar-tramite/store/useRegistroResponsable'
import datosGeneralesValid from '@modules/Registro-responsable/validation/datosGeneralesValid'
import { SideMultistepComponentProps as props} from '@pages/solicitud-autorizacion'
import React, { useState } from 'react'



const DatosGeneralesForm = ({next}:props ) => {

  const [currentRadioValue, setCurrentRadioValue] = useState<string>('')

     const toast = useToast()
     const store = useRegistroResponsable()
      const { values, ...form } = useForm({
         validate: (values) => datosGeneralesValid(values, currentRadioValue),
        initialValues: store.state.datosGenerales
      })

       const ubigeo = useGetUbigeo({
         codDepa: 'values.DEPARTAMENTO',
         codProv: 'values.PROVINCIA'
       })

      const handleSubmit = () => {
        // const response = datos.data?.isDocumentoUnique
        // if (response) {
          // store.loadDatosGenerales(values)
          // console.log(values);
          
          //submitprueba()
          next()
        // } else {
        //   toast({
        //     title: 'Ya existe un Resonsable con este numero de documento',
        //     type: 'error'
        //   })
        // }
      } 

  return (
    <form className="flex flex-col gap-6"
    onSubmit={form.onSubmit(handleSubmit)}
    >
    <div className="border-b dark:border-b-slate-700">
      
            <p className="font-medium text-slate-400">
              {textResponsable.titleForm}
            </p>
          </div>
       
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="Código NIMF-15"
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
         <Input
              label="Razon social"
              type="razon"
              // {...form.inputProps('RAZON_SOCIAL')}
              // value={values.RAZON_SOCIAL!}
              // pattern={patterns.onlyLetters}
              // onChange={(e) =>
              //   e.target.validity.valid &&
              //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
              // }
              // error={"Igrese Razon Social"}
            />
            <Input
              label="Dirección"
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
          // value={values.DEPARTAMENTO}
          // error={form.errors.DEPARTAMENTO}
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
          // value={values.PROVINCIA}
          // error={form.errors.PROVINCIA}
          onChange={({ value }) => {
            form.setFields({ PROVINCIA: value, DISTRITO: '' })
          }}
          options={ubigeo.provincias}
          dataExtractor={{ label: 'NOMB_PROV_TPR', value: 'CODI_PROV_TPR' }}
        />
        <SelectWithFilter
          withFilter
          label="Distrito"
          // value={values.DISTRITO}
          options={ubigeo.distritos}
          // error={form.errors.DISTRITO}
          // onChange={({ value }) => form.setField('DISTRITO', value)}
          dataExtractor={{ label: 'NOMB_DIST_TDI', value: 'CODI_DIST_TDI' }}
        />
      </div>
      <p className="font-medium text-slate-400">
              {'Solcitud de Baja de autorización'}
            </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          type="email"
          label="Solicitud"
          // {...form.inputProps('CORREO')}
        />
           <InputCleave
              label="Fecha fin operación (DD-MM-AAAA)"
              // {...form.inputProps('FECHA_INICIO')}
            />
      </div>
      <p className="font-medium text-slate-400">
              {'Solcitud de Baja de Responsable Técnico'}
            </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          type="email"
          label="Solicitud"
          // {...form.inputProps('CORREO')}
        />
           <InputCleave
              label="Fecha fin operación RT(DD-MM-AAAA)"
              // {...form.inputProps('FECHA_INICIO')}
            />
      </div>


      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="DNI"
              // value={values.DNI!}
              // {...form.inputProps('DNI')}
              // pattern={patterns.onlyLetters}
              // onChange={(e) =>
              //   e.target.validity.valid &&
              //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
              // }
              // error={"Igrese DNI"}
            />
            <Input
              label="Nombre y Apellido"
              // value={values.REPRESENTANTE_LEGAL!}
              // {...form.inputProps('REPRESENTANTE_LEGAL')}
              // pattern={patterns.onlyLetters}
              // onChange={(e) =>
              //   e.target.validity.valid &&
              //   form.setField('APELLIDOS_SOLICITANTE', e.target.value)
              // }
              // error={"Igrese Representante"}
            />
          </div>
          <p className="font-medium text-slate-400">
              {'Solcitud de nuevo Responsable Técnico'}
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="DNI"
              // value={values.DNI!}
              // {...form.inputProps('DNI')}
              // pattern={patterns.onlyLetters}
              // onChange={(e) =>
              //   e.target.validity.valid &&
              //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
              // }
              // error={"Igrese DNI"}
            />
            <Input
              label="Nombre y Apellido"
              // value={values.REPRESENTANTE_LEGAL!}
              // {...form.inputProps('REPRESENTANTE_LEGAL')}
              // pattern={patterns.onlyLetters}
              // onChange={(e) =>
              //   e.target.validity.valid &&
              //   form.setField('APELLIDOS_SOLICITANTE', e.target.value)
              // }
              // error={"Igrese Representante"}
            />
            <a
             className="self-end btn btn-outline-primary"
            >
              Estado
            </a>

          </div>

      <button type="submit" className="self-end btn btn-solid-primary">
        Guardar 
      </button>
      
    </form>
  )
}

export default DatosGeneralesForm
