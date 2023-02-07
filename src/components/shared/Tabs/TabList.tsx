import Accordion from '@components/accordion'
import React, { ReactElement, useState } from 'react'

interface Props {
  children?: ReactElement | ReactElement[]
}

const TabList = ({ children }: Props) => {
  const [watch, setWatch] = useState(false)

  const handleWatch = () => {
    setWatch((e) => !e)
  }

  const hasItems = React.Children.count(children) !== 0

  return (
    <>
      <div className="hidden lg:flex">
        {hasItems &&
          React.Children.map(children, (child, i) => {
            return React.cloneElement(child!, { tabIndex: i })
          })}
      </div>

      <div className="lg:hidden">
        <Accordion title="Menu" watch={watch} handleWatch={handleWatch}>
          <div className="w-full">
            {hasItems &&
              React.Children.map(children, (child, i) => {
                return React.cloneElement(child!, {
                  tabIndex: i,
                  onClose: () => setWatch(false)
                })
              })}
          </div>
        </Accordion>
      </div>
    </>
  )
}

export default TabList
