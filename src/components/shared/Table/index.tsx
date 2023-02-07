import { classNames } from '@utils/classNames'
import { ReactElement } from 'react'
import styles from './table.module.css'

interface Props {
  className?: string
  children: ReactElement | ReactElement[]
}

const Table = ({ children, className }: Props) => {
  return (
    <div className={classNames([styles.tableContainer, className])}>
      <table>{children}</table>
    </div>
  )
}

export default Table
