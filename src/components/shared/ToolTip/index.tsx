import { ReactElement } from 'react'
import styles from './Tooltip.module.css'

interface Props {
  label: string
  children: ReactElement
  position?: 'right' | 'center' | 'left'
}

const Tooltip = ({ label, children, position }: Props) => {
  return (
    <div className='relative text-sm'>
      <div
        className={`${styles['tool-tip']} ${styles[position === 'right' ? 'arrowright' : '']}`}
        data-tooltip={label}
      >
        { children }
      </div>
    </div>
  )
}

export default Tooltip
