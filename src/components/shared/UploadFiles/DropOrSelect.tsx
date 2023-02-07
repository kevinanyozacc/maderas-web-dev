interface Props {
  inputId: string
}

const DropOrSelect = ({ inputId }: Props) => {
  return (
    <div
      className='flex items-center justify-center w-full h-full border-dashed border-2 border-gray-300 z-[110] min-h-[300px] rounded-lg'
    >
      <p className='text-lg md:text-[24px] text-center dark:text-white'>
        Arrastra tus archivos o{' '}
        <label
          className='text-blue-600 underline hover:cursor-pointer'
          htmlFor={`input-file-${inputId}`}
        >
          selecciona tus archivos
        </label>
      </p>
    </div>
  )
}

export default DropOrSelect
