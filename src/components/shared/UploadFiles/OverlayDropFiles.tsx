import { IconCloudArrowUp } from '@icons'

const OverlayDropFiles = ({ isDragging }: { isDragging?: boolean }) => {
  return (
    <div
      className={`w-full h-full absolute bg-white block
      dark:bg-black z-[130] inset-0 transition-all
      rounded-lg overflow-hidden
      ${isDragging ? 'opacity-100 cursor-grab' : 'opacity-0'}`
    }
      // transition="opacity 250ms ease-out"
    >
      <div className='flex justify-center items-center flex-col h-full'>
        <span className='text-sm text-blue-500 w-20 h-20'>
          <IconCloudArrowUp />
        </span>
        <p className='text-gray-600 dark:text-gray-400 font-semibold'>
          Deja caer tus archivos aqui
        </p>
      </div>
    </div>
  )
}

export default OverlayDropFiles
