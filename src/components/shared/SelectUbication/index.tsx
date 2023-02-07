import useGetUbigeo from '@hooks/useGetUbigeo'
import Select from '../Select'
interface Props {
  departamentoValue: string
  provinciaValue: string
  distritoValue: string
  departamentoError: string
  provinciaError: string
  distritoError: string
}
const SelectUbication = ({
  departamentoValue,
  distritoValue,
  provinciaValue,
  departamentoError,
  distritoError,
  provinciaError
}: Props) => {
  const ubigeo = useGetUbigeo({
    codDepa: departamentoValue,
    codProv: provinciaValue
  })

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Select
        withFilter
        label="Departamento"
        value={departamentoValue}
        error={departamentoError}
        onChange={({ value }) => {
          // form.setFields({
          //   DEPARTAMENTO: value,
          //   PROVINCIA: '',
          //   DISTRITO: ''
          // })
        }}
        options={ubigeo.departamentos}
        dataExtractor={{ label: 'NOMB_DPTO_DPT', value: 'CODI_DEPA_DPT' }}
      />
      <Select
        withFilter
        label="Provincia"
        value={provinciaValue}
        error={provinciaError}
        onChange={({ value }) => {
          // form.setFields({ PROVINCIA: value, DISTRITO: '' })
        }}
        options={ubigeo.provincias}
        dataExtractor={{ label: 'NOMB_PROV_TPR', value: 'CODI_PROV_TPR' }}
      />
      <Select
        withFilter
        label="Distrito"
        value={distritoValue}
        options={ubigeo.distritos}
        error={distritoError}
        // onChange={({ value }) => form.setField('DISTRITO', value)}
        dataExtractor={{ label: 'NOMB_DIST_TDI', value: 'CODI_DIST_TDI' }}
      />
    </div>
  )
}

export default SelectUbication
