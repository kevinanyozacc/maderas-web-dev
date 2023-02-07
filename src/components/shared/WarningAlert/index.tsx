import { IconWarning } from '@icons'

interface Props {
  message: string
}

const WarningAlert = ({ message }: Props) => {
  const formatValue = (value: string): string[] => {
    const lineas = value.split(/\r\n|\n/)
    return lineas
  }

  return (
    <div className='w-full text-white rounded-xl bg-orange-400 p-4 flex flex-col md:flex-row gap-4 items-center justify-center'>
      <div className='text-sm block w-8 md:self-start'>
        <IconWarning />
      </div>
      <div className='w-full'>
        <span className='font-semibold underline'>Observacion:</span>
        <br />
        {formatValue(message).map((item, index) => (
          <li key={`${index}`}>{item}</li>
        ))}
      </div>
    </div>
  )
}

export default WarningAlert
