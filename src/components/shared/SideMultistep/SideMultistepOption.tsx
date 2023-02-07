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
}

const SideMultistepOption = ({
  desc,
  label,
  isActive,
  isMobile,
  isComplete,
  icon: Icon,
  colorObs
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
        className={classNames([
          'flex items-center justify-center',
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
    </Fragment>
  )
}

export default SideMultistepOption
