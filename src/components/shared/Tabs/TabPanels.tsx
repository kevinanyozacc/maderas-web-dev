import React, { ReactElement, useContext } from 'react'
import { TabContext } from '.'

interface Props {
  children?: ReactElement | ReactElement[]
}

const TabPanels = ({ children }: Props) => {
  const { activeTab } = useContext(TabContext)
  const childrenArray = React.Children.toArray(children)
  return <div>{childrenArray[activeTab]}</div>
}

export default TabPanels
