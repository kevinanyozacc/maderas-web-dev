import { ReactElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactElement | ReactElement[] | null
}

const Portal = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(children, document.getElementById('portal')!)
    : null
}

export default Portal
