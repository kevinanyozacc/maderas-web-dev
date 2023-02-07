import {
  useGetAllDepartamentosQuery,
  useGetDistritosQuery,
  useGetProvinciasQuery
} from '../generated/graphql'

interface Props {
  codDepa: string
  codProv: string
}

const useGetUbigeo = ({ codDepa, codProv }: Props) => {
  const [dataDepa] = useGetAllDepartamentosQuery()
  const [dataProv] = useGetProvinciasQuery({ variables: { codDepa }, pause: !codDepa })
  const [dataDist] = useGetDistritosQuery({ variables: { codDepa, codProv }, pause: !codDepa && !codProv })

  const departamentos = dataDepa.data?.getAllDepartamentos ?? []
  const provincias = dataProv.data?.getProvincias ?? []
  const distritos = dataDist.data?.getDistritos ?? []

  return {
    departamentos,
    provincias,
    distritos
  }
}

export default useGetUbigeo
