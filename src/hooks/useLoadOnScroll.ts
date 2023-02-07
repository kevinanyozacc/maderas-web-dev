import { Dispatch, SetStateAction, useEffect } from 'react'

interface IProps {
  page: number
  totalPages: number
  refList: any
  pageSize?: number
  setData: Dispatch<SetStateAction<any[]>>
  setPage: Dispatch<SetStateAction<number>>
}

export function useLoadOnScroll ({
  page,
  totalPages,
  refList,
  pageSize,
  setPage,
  setData
}: IProps) {
  useEffect(() => {
    let lastItem: any

    console.log(refList)

    const observador = new IntersectionObserver((entradas, observer) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          setPage(prev => prev + 1)
        }
      })
    }, {
      rootMargin: '0px 0px 50px 0px',
      threshold: 1.0
    })

    if (page < totalPages) {
      if (lastItem) {
        observador.unobserve(lastItem)
      }

      lastItem = refList[refList.length - 1]
      console.log('🚀 ~ file: useLoadOnScroll.ts ~ line 42 ~ useEffect ~ lastItem', lastItem)
      if (lastItem) {
        observador.observe(lastItem)
      }
    }

    // const loadData = async () => {
    //   try {
    //     const res = await fetch(`${enviroment.URL}/graphql`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         query: `query GetAllEspecies($pageSize: Int!, $page: Int!, $estado: Estados) {
    //           getAllEspecies(pageSize: $pageSize, page: $page, estado: $estado) {
    //             data {
    //               ESPECIE_ID
    //               NOMBRE_CIENTIFICO
    //               NOMBRE_ESPECIE_COMUN
    //               ESTADO
    //               REGLAMENTARIO
    //               FECHA_REGISTRO
    //             }
    //           }
    //         }
    //         `,
    //         variables: {
    //           pageSize,
    //           page,
    //           estado: Estados.Activo
    //         }
    //       })
    //     })

    //     const datos = await res.json()

    //     setData(prev => prev.concat(datos?.data?.data?.getAllEspecies?.data))
    //     console.log('🚀 ~ file: useLoadOnScroll.ts ~ line 61 ~ loadData ~ datos?.data?.data?.getAllEspecies?.data', datos?.data?.data?.getAllEspecies?.data)

    //     if (page < totalPages) {
    //       if (lastItem) {
    //         observador.unobserve(lastItem)
    //       }

    //       lastItem = refList[refList.length - 1]
    //       observador.observe(lastItem)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // loadData()
  }, [])
}
