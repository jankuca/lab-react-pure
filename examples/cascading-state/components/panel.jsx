import createComponent from 'pure-react'
import React from 'react'

import LayerListFactory from './layer-list-factory'


export default Panel = createComponent({
  contextMappers: {
    activeDocumentStore(documentStore) {
      return {
        documentId: documentStore.getDocumentId(),
      }
    },
    /*
    layerStore(layerStore) {
      return {
        // FIXME: `state` is not available in a context mapper.
        layers: layerStore.getLayers(state.documentId)
      }
    },
    */
  },

  render(props, state) {
    return (
      <LayerListFactory documentId={state.documentId} />
    )
  },
})
