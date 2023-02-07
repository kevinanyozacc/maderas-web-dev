import { IconCheck } from '../../../icons'
import { classNames } from '../../../utils/classNames'

interface IProps {
  label: string
  value?: boolean
  className?: string
  onClick?: () => void
}

const CheckBox = ({ className, label, value, onClick }: IProps) => {
  return (
    <div
      onClick={onClick}
      className={classNames([className, 'w-max max-w-[90vw] select-none'])}
    >
      <div className="flex items-center gap-4">
        <div
          className={classNames([
            'grid w-5 h-5 rounded place-items-center border transition-colors',
            value
              ? 'bg-primary-500 border-transparent text-white'
              : 'bg-transparent border-slate-500 text-transparent'
          ])}
        >
          <IconCheck className="w-3 h-3" />
        </div>

        <p className="text-slate-500 select-none whitespace-normal">{label}</p>
      </div>
    </div>
  )
}

export default CheckBox
