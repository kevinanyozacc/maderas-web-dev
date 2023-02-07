import { QueryIsDocumentoUniqueArgs, useIsDocumentoUniqueQuery } from '@generated/graphql'

const useDocumentUnique = ({
  nroDocumento,
  tipoDocumento,
  tipoSolicitud
}: QueryIsDocumentoUniqueArgs) => {
  const [datos] = useIsDocumentoUniqueQuery({
    variables: {
      nroDocumento,
      tipoDocumento,
      tipoSolicitud
    },
    pause: !((tipoDocumento === 'RUC' && nroDocumento.length === 11) ||
      (tipoDocumento === 'CE' && nroDocumento.length === 9) ||
      (tipoDocumento === 'DNI' && nroDocumento.length === 8))
  })
  return { datos }
}

export default useDocumentUnique
