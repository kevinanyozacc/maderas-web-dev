import Input from '@components/shared/Input'
import useForm from '@hooks/useForm'
import useGetUbigeo from '@hooks/useGetUbigeo'
import useToast from '@hooks/useToast'
import InformacionResponsableValid from '@modules/Registro-responsable/validation/InformacionResponsableValid'
import { useRegistroResponsable } from '../../store/useRegistroResponsable'
import React, { useState } from 'react'
import { textResponsable } from '@modules/registro-productor/utils/textContent'
import { SideMultistepComponentProps as props} from '@pages/registro-responsable'
import SelectWithFilter from '@components/shared/Select/SelectWithFilter'
import InputCleave from '@components/shared/InputCleave'
import Spinner from '@components/shared/Spinner'

const InformacionResponsableForm = ({back,submit,isLoading}:props) => {

    const [isSubmited, setIsSubmited] = useState(false)
    const toast = useToast()

    const store = useRegistroResponsable()
    const { values, ...form } = useForm({
       validate: (values) => InformacionResponsableValid(values),
      initialValues: store.state.informacionResponsable
    })

    const ubigeo = useGetUbigeo({
        codDepa: values.DEPARTAMENTO,
        codProv: values.PROVINCIA
      })

    const handleSubmit = () => {
        
        console.log('ingreso');
        
        store.loadInformacionResponsable(values)
        console.log(values);
        
        // setIsSubmited(true)
        // submit()
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
              label="DNI o CARNET"
              // value={values.DNI!}
              {...form.inputProps('DNI')}
              // pattern={patterns.onlyLetters}
              // onChange={(e) =>
              //   e.target.validity.valid &&
              //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
              // }
              error={form.errors.DNI}
            />
         <Input
              label="APELLIDOS Y NOMBRES"
              type="apenomb"
              {...form.inputProps('APENOMB')}
              // value={values.RAZON_SOCIAL!}
              // pattern={patterns.onlyLetters}
              // onChange={(e) =>
              //   e.target.validity.valid &&
              //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
              // }
              error={form.errors.APENOMB}
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
              label="TITULO PROFESIONAL"
              // value={values.DNI!}
              {...form.inputProps('TITULOPROFESIONAL')}
              // pattern={patterns.onlyLetters}
              // onChange={(e) =>
              //   e.target.validity.valid &&
              //   form.setField('NOMBRES_SOLICITANTE', e.target.value)
              // }
              error={form.errors.TITULOPROFESIONAL}
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
      <button
          type="button"
          onClick={back}
          className="self-end btn btn-outline-primary"
        >
          Regresar
        </button>

      <button type="submit" className="self-end btn btn-solid-primary"
      >
        Guardar
      </button>
      
    </form>
  )
}

export default InformacionResponsableForm