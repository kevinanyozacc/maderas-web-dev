import { ReactElement, useEffect } from 'react'
import { useTheme } from '../../../store/useTheme'

import Portal from '../Portal'
import Overlay from '../Overlay'
import Transition from '../Transition'

interface Props {
  isOpen?: boolean
  changeOverflow?: boolean
  hasOverlay?: boolean
  onClose?: () => void
  children?: ReactElement | ReactElement[]
}

const Modal = ({ isOpen, children, hasOverlay, onClose }: Props) => {
  const { theme } = useTheme()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'unset'
    }

    return () => {
      document.body.style.overflowY = 'unset'
    }
  }, [isOpen])

  return (
    <Portal>
      <Transition
        show={isOpen}
        appear={true}
        leaveEnd="opacity-0"
        enterEnd="opacity-100"
        enterStart="opacity-0"
        leaveStart="opacity-100"
        leave="transition ease-in-out duration-300"
        enter="transition ease-in-out duration-700"
      >
        <div className={theme}>
          <div className="fixed inset-0 top-[76px] grid w-full place-items-center overflow-y-auto">
            {hasOverlay && <Overlay show={isOpen} onClick={onClose} />}
            {children}
          </div>
        </div>
      </Transition>
    </Portal>
  )
}
export default Modal
