import React, { ButtonHTMLAttributes, useContext } from 'react'

import { TabContext } from '.'
import { classNames } from '@utils/classNames'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  tabIndex?: number
  onClose?: () => void
}

const TabButton = ({
  children,
  tabIndex,
  onClick,
  onClose,
  ...props
}: Props) => {
  const { activeTab, setTabActive } = useContext(TabContext)

  const isActive = tabIndex === activeTab

  return (
    <>
      {/* DESKTOP */}
      <button
        {...props}
        className={classNames([
          isActive
            ? 'text-primary-600 dark:text-primary-300 font-semibold bg-primary-600 bg-opacity-5 border-b-primary-600 dark:border-b-primary-300'
            : 'font-light dark:text-white',
          'border-b-2 cursor-pointer w-[260px] p-3 place-items-center transition duration-300 ease-out hidden lg:grid'
        ])}
        onClick={(e) => {
          onClick?.(e)
          setTabActive(tabIndex ?? 0)
        }}
      >
        {children}
      </button>

      {/* MOBILE */}
      <button
        className={classNames([
          'w-full text-left border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-primary-50 overflow-hidden lg:hidden',
          isActive
            ? 'bg-primary-50 dark:bg-slate-700'
            : 'bg-white dark:bg-slate-900'
        ])}
        onClick={(e) => {
          onClick?.(e)
          onClose?.()
          setTabActive(tabIndex ?? 0)
        }}
      >
        <div
          className={classNames([
            'relative flex items-center w-full p-2 pl-2 border-l-4 border-transparent hover:border-primary-500',
            isActive ? 'border-primary-500' : ''
          ])}
        >
          <div className="flex items-center w-full">
            <div
              className={classNames([
                'mx-2 -mt-1 dark:text-white',
                isActive ? 'font-semibold' : ''
              ])}
            >
              {children}
              {/* <div className="w-full -mt-1 text-xs font-normal text-gray-500 normal-case truncate dark:text-slate-400">
                Lorem ipsum dolor sit amet. elit.
              </div> */}
            </div>
          </div>
        </div>
      </button>
    </>
  )
}

export default TabButton
