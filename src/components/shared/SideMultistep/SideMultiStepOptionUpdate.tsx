import { Fragment, ReactElement, SVGProps } from 'react'
import { classNames } from '../../../utils/classNames'

interface Props {
  isActive?: boolean
  isMobile?: boolean
  isComplete?: boolean
  desc?: string
  label: string
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement
  colorObs?: string
  onClick?: () => void
}

const SideMultistepOptionUpdate = ({
  desc,
  label,
  isActive,
  isMobile,
  isComplete,
  icon: Icon,
  colorObs,
  onClick
}: Props) => {
  const getBGColor = () => {
    if (isActive) return 'bg-primary-500'
    if (isComplete) return 'bg-green-500'
    if (colorObs === 'OBSERVADO') return 'bg-red-500'
    return 'bg-slate-300 dark:bg-slate-500'
  }

  return (
    <Fragment>
      <div
        className="flex gap-x-6 md:gap-0 md:grid md:grid-cols-[minmax(0,_1fr)_100px] max-w-[300px] md:cursor-pointer"
        onClick={onClick}
      >
        <div
          className={classNames([
            'flex items-center justify-end',
            isMobile ? 'order-2' : ''
          ])}
        >
          <div className={classNames(['w-full', isMobile ? 'text-left' : 'text-right'])}>
            <p
              className={classNames([
                'font-bold transition-colors',
                isActive || isComplete ? 'dark:text-white' : 'text-slate-400'
              ])}
            >
              {label}
            </p>
            {!!desc && (
              <p className="dark:text-slate-500 text-slate-400">{desc}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className={classNames([
              getBGColor(),
              'w-[50px] h-[50px] rounded-full grid place-content-center text-white transition-colors'
            ])}
          >
            <Icon
              className={classNames([
                'icon-6',
                isActive || isComplete || colorObs
                  ? 'dark:text-white'
                  : 'text-slate-500 dark:text-slate-300'
              ])}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SideMultistepOptionUpdate
