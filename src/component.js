import React from 'react'

import ListenerComponent from 'react-listener-component'

import assign from 'object-assign'
import shallowEqual from 'shallowequal'


export default function createComponent(desc = {}) {
  class Component extends ListenerComponent {
    static defaultProps = desc.defaultProps || {}
    static contextTypes = createContextTypes(desc)

    constructor(props, context) {
      super(props, context)

      this.state = createComponentState(props, context, desc)
    }

    componentWillReceiveProps(nextProps) {
      this.setState(createComponentState(nextProps, this.context, desc))
    }

    getListeners(context) {
      return createContextChangeListeners(this, context, desc)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return (
        !shallowEqual(this.props, nextProps) ||
        !shallowEqual(this.state, nextState) ||
        !shallowEqual(this.context, nextContext)
      )
    }

    render() {
      if (!desc.render) {
        return null
      }

      return desc.render.call(null, this.props, this.state)
    }
  }

  return Component
}


function createContextTypes(desc) {
  if (!desc.contextMappers) {
    return null
  }

  const contextKeys = Object.keys(desc.contextMappers)
  const contextTypes = {}
  contextKeys.forEach((contextKey) => {
    contextTypes[contextKey] = React.PropTypes.any
  })

  return contextTypes
}


function createComponentState(props, context, desc) {
  let state = assign({}, desc.defaultState || {})

  if (desc.mapProps) {
    assign(state, desc.mapProps.call(null, props))
  }

  const contextKeys = Object.keys(desc.contextMappers || {})
  contextKeys.forEach((contextKey) => {
    const contextMapper = desc.contextMappers[contextKey]
    if (contextMapper) {
      const stateUpdate = contextMapper(context[contextKey], props)
      assign(state, stateUpdate)
    }
  })

  return state
}


function createContextChangeListeners(component, context, desc) {
  const props = component.props
  const contextKeys = Object.keys(desc.contextMappers || {})
  const contextChangeListeners = {}

  contextKeys.forEach((contextKey) => {
    contextChangeListeners[contextKey] = () => {
      const contextMapper = desc.contextMappers[contextKey]
      if (contextMapper) {
        const stateUpdate = contextMapper(context[contextKey], props)
        component.setState(stateUpdate)
      }
    }
  })

  return contextChangeListeners
}
