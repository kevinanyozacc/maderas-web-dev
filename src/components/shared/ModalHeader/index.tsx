import { IconClose } from '@icons'

interface Props {
  title?: string
  closeBtn?: () => void
}

const ModalHeader = ({ title, closeBtn }: Props) => {
  return (
    <div className="flex flex-col md:flex-row-reverse md:justify-between md:items-center">
      <button
        type='button'
        onClick={closeBtn}
        aria-label="Cerrar modal"
        className="btn-icon btn-ghost-primary text-2xl self-end md:self-start"
      >
        <IconClose />
      </button>

      <h2 className="text-center md:text-left title-8 text-slate-500 dark:text-white">
        {title}
      </h2>
    </div>
  )
}

export default ModalHeader
