import React from 'react'
import { CSSTransition as ReactCSSTransition } from 'react-transition-group'

const CSSTransition = ({
  show,
  enter = '',
  enterStart = '',
  enterEnd = '',
  leave = '',
  leaveStart = '',
  leaveEnd = '',
  appear,
  unmountOnExit,
  tag = 'div',
  children,
  ...rest
}) => {
  const enterClasses = enter.split(' ').filter((s) => s.length)
  const enterStartClasses = enterStart.split(' ').filter((s) => s.length)
  const enterEndClasses = enterEnd.split(' ').filter((s) => s.length)
  const leaveClasses = leave.split(' ').filter((s) => s.length)
  const leaveStartClasses = leaveStart.split(' ').filter((s) => s.length)
  const leaveEndClasses = leaveEnd.split(' ').filter((s) => s.length)
  const removeFromDom = unmountOnExit

  const addClasses = (node, classes) => {
    classes.length && node.classList.add(...classes)
  }

  const removeClasses = (node, classes) => {
    classes.length && node.classList.remove(...classes)
  }

  const nodeRef = React.useRef(null)
  const Component = tag

  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={(done) => {
        nodeRef.current.addEventListener('transitionend', done, false)
      }}
      onEnter={() => {
        if (!removeFromDom) nodeRef.current.style.display = null
        addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses])
      }}
      onEntering={() => {
        removeClasses(nodeRef.current, enterStartClasses)
        addClasses(nodeRef.current, enterEndClasses)
      }}
      onEntered={() => {
        removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses])
      }}
      onExit={() => {
        addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses])
      }}
      onExiting={() => {
        removeClasses(nodeRef.current, leaveStartClasses)
        addClasses(nodeRef.current, leaveEndClasses)
      }}
      onExited={() => {
        removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses])
        if (!removeFromDom) nodeRef.current.style.display = 'none'
      }}
    >
      <Component
        ref={nodeRef}
        {...rest}
        style={{ display: !removeFromDom ? 'none' : null }}
      >
        {children}
      </Component>
    </ReactCSSTransition>
  )
}

export default CSSTransition
