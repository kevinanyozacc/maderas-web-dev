import Modal from '../Modal'
import ModalHeader from '../ModalHeader'

interface IProps {
  onDelete: () => void
  onClose: () => void
  isOpen: boolean
  title?: string
  message?: string
}

const DeleteAlert = ({
  onDelete,
  onClose,
  isOpen,
  title = 'Eliminar elemento',
  message = '¿Estas seguro que deseas eliminar este elemento?'
}: IProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} hasOverlay >
      <div className="z-[200] w-full h-full md:h-max max-w-[550px] md:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <div className="p-5 md:px-10 md:py-7">
          <ModalHeader
            title={title}
            closeBtn={onClose}
          />

          <div className='text-center md:text-left my-6 text-slate-600 dark:text-white'>
            {message}
          </div>

          <div className="w-full flex justify-between">
            <button
              type='button'
              onClick={onClose}
              className='btn btn-outline-primary'
              >
              Cancelar
            </button>
            <button
              type='button'
              onClick={onDelete}
              className='btn bg-red-500 text-white hover:bg-red-600'
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteAlert
