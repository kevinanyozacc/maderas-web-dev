import {
  Estados,
  useGetAllEspeciesQuery,
  useGetCultivarByEspecieQuery
} from '@generated/graphql'

interface Props {
  values?: number
  pageEsp?: number
  pageEspSize?: number
}

const useGetEspecieCultivar = ({
  values,
  pageEsp = 1,
  pageEspSize = 4
}: Props) => {
  const [especieData] = useGetAllEspeciesQuery({
    variables: {
      page: pageEsp,
      pageSize: pageEspSize,
      estado: Estados.Activo
    }
  })

  const [cultivarData] = useGetCultivarByEspecieQuery({
    variables: { codEspecie: +values!, estado: Estados.Activo },
    pause: !values
  })

  const especies = especieData.data?.getAllEspecies?.data ?? []
  const cultivares = cultivarData.data?.getCultivarByEspecie ?? []
  const totalItems = especieData.data?.getAllEspecies?.totalItems

  return { especies, cultivares, totalItems }
}

export default useGetEspecieCultivar
