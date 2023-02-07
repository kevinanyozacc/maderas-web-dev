import React from 'react'

import { IconMoon, IconSun } from '../../../icons'
import { useTheme } from '../../../store/useTheme'
import { classNames } from '../../../utils/classNames'

interface Props {
  className?: string
}

const ToggleTheme = ({ className }: Props) => {
  const { toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={classNames(['btn-icon btn-ghost-primary', className])}
    >
      <IconSun className="hidden dark:block" />
      <IconMoon className="block dark:hidden" />
    </button>
  )
}

export default ToggleTheme
