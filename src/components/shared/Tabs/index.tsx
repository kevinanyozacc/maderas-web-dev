import React, {
  createContext,
  ReactElement,
  useCallback,
  useState
} from 'react'

interface TabProps {
  children?: ReactElement | ReactElement[]
}

interface TabState {
  activeTab: number
}

interface TabContextValue extends TabState {
  setTabActive: (activeTab: number) => void
}

export const TabContext = createContext<TabContextValue>({
  activeTab: 0,
  setTabActive: () => {}
})

const Tabs = ({ children }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const setTabActive = useCallback((activeTab: number) => {
    setActiveTab(activeTab)
  }, [])

  return (
    <TabContext.Provider value={{ activeTab, setTabActive }}>
      {children}
    </TabContext.Provider>
  )
}

export default Tabs
