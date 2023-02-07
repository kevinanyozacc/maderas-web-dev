import { Dispatch, ReactElement, RefObject, SetStateAction, useEffect, useRef } from 'react'

function useOutsideClick (ref: RefObject<any>, setIsOpen: Dispatch<SetStateAction<boolean>>, onAction?: () => void) {
  useEffect(() => {
    function handleClickOutside (event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
        onAction?.()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

function OutsideContainer ({ children, setIsOpen, onAction }: {children: ReactElement, setIsOpen: Dispatch<SetStateAction<boolean>>, onAction?: () => void }) {
  const wrapperRef = useRef(null)
  useOutsideClick(wrapperRef, setIsOpen, onAction)
  return <div ref={wrapperRef}>{children}</div>
}

export default OutsideContainer
