import { useState } from 'react'
import useDownloadFiles from '@hooks/useDownloadFiles'
import Spinner from '../Spinner'

interface IProps {
  url: string
}

const DownloadButton = ({ url }: IProps) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <button
      type='button'
      className='btn btn-solid-primary'
      onClick={async () => {
        try {
          setIsLoading(true)
          await useDownloadFiles({ url })
          setIsLoading(false)
        } catch (e) {
          console.log(e)
        }
      }}
      disabled={isLoading}
    >
      Descargar PDF {isLoading && <Spinner />}
    </button>
  )
}

export default DownloadButton
