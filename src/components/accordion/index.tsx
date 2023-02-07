import { ReactNode } from 'react'
import { IconChevronDown } from '../../icons'
import { classNames } from '../../utils/classNames'

interface IProps {
  title: string
  watch: boolean
  className?: string
  children: ReactNode
  handleWatch: () => void
}

const Accordion = ({
  title,
  watch,
  children,
  className,
  handleWatch
}: IProps) => {
  return (
    <div className="w-full">
      <div
        className={classNames([
          className,
          'flex items-center w-full p-2 bg-gray-400 bg-opacity-20 rounded-md cursor-pointer text-black font-semibold'
        ])}
      >
        <p className="flex justify-center w-full ml-5 text-lg font-semibold text-primary-700 dark:text-gray-200">
          {title}
        </p>

        <div className="self-end">
          <button
            onClick={handleWatch}
            className="w-full p-2 cursor-pointer btn-icon btn-solid-primary"
          >
            <IconChevronDown
              className={classNames([
                'transition-transform',
                watch ? 'rotate-180' : 'rotate-0'
              ])}
            />
          </button>
        </div>
      </div>
      <div
        className={classNames([
          watch ? 'max-h-max' : 'max-h-0',
          'overflow-hidden mt-1 rounded-b shadow'
        ])}
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion
