import createComponent from 'pure-react'
import React from 'react'

import LayerList from './layer-list'


export default LayerListFactory = createComponent({
  contextMappers: {
    layerStore(layerStore, props) {
      return {
        // NOTE: The document ID is passed in via `props`.
        layers: layerStore.getLayers(props.documentId),
      }
    }
  },

  render(props, state) {
    return (
      <LayerList layers={state.layers} />
    )
  },
})
