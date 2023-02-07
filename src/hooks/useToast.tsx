import { IconCheck, IconClose } from '@icons'
import { classNames } from '@utils/classNames'
import { toast as toastify } from 'react-toastify'

type Type = 'success' | 'info' | 'warning' | 'error'

interface Props {
  type?: Type
  desc?: string
  title?: string
  onClose?: () => void
}

const Toast = ({ type = 'success', title = 'Account created.', desc, onClose }: Props) => {
  const types: Record<Type, string> = {
    info: 'bg-blue-600',
    error: 'bg-red-600',
    success: 'bg-green-600',
    warning: 'bg-orange-600'
  }

  return (
    <div
      className={classNames([
        'relative text-white font-sans grid grid-cols-[20px_minmax(0,_1fr)] py-3 pl-3 pr-6 items-center w-[300px]',
        types[type ?? 'success']
      ])}
    >
      {type === 'success'
        ? <IconCheck className="icon-4"/>
        : (
          <svg viewBox="0 0 24 24" className="icon-4">
            <path
              fill="currentColor"
              d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0Zm.25 5a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5Zm2.25 13.5h-4a1 1 0 0 1 0-2h.75a.25.25 0 0 0 .25-.25v-4.5a.25.25 0 0 0-.25-.25h-.75a1 1 0 0 1 0-2h1a2 2 0 0 1 2 2v4.75a.25.25 0 0 0 .25.25h.75a1 1 0 1 1 0 2Z"
            />
          </svg>
          )
        }
      <p className="ml-2 font-bold">{title}</p>
      {desc && <p className="col-start-2">{desc}</p>}

      <button
        type="button"
        onClick={onClose}
        className="btn-icon border-transparent hover:bg-white hover:bg-opacity-10 absolute top-0 right-0"
      >
        <IconClose />
      </button>
    </div>
  )
}

const useToast = () => {
  const toast = (props: Props = {}) => {
    toastify(({ closeToast }) => <Toast {...props} onClose={closeToast} />, {
      hideProgressBar: true,
      className: '-right-[20px] top-[10px] sm:right-[0] sm:top-0'
    })
  }

  return toast
}

export default useToast
