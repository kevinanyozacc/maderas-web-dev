import { SVGProps } from 'react'
import { classNames } from '../../../utils/classNames'

interface Props extends SVGProps<SVGSVGElement> {
  percentage?: number
}

const CircleProgressBar = ({ className, percentage, ...props }: Props) => {
  const formatPercentage =
    typeof percentage === 'number' ? Math.min(Math.max(0, percentage), 100) : 0
  const strokeDashoffset = (formatPercentage * 360) / 100 - 20

  return (
    <>
      <svg
        {...props}
        className={classNames([
          'circle-progress circle-progress-primary',
          className
        ])}
      >
        <circle cx="57" cy="57" r="52" />
        <circle
          r="52"
          cx="57"
          cy="57"
          strokeDasharray={360}
          strokeDashoffset={360 - strokeDashoffset}
        />
      </svg>
    </>
  )
}

export default CircleProgressBar
