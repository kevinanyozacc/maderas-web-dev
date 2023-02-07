import React, { useRef, useEffect, useContext } from 'react'
import CSSTransition from './CSSTransition'

const TransitionContext = React.createContext({
  parent: {}
})

const useIsInitialRender = () => {
  const isInitialRender = useRef(true)
  useEffect(() => {
    isInitialRender.current = false
  }, [])
  return isInitialRender.current
}

const Transition = ({ show, appear, ...rest }) => {
  const isInitialRender = useIsInitialRender()
  const { parent } = useContext(TransitionContext)

  const isChild = show === undefined

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    )
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear
        }
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  )
}

export default Transition
