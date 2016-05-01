import createComponent from 'pure-react'
import React from 'react'

import LayerList from './layer-list'


export default LayerListPanel = createComponent({
  defaultProps: {
    layerType: 'document',
  },

  defaultState: {
    layers: immutable.List(),
    layerStates: immutable.Map(),
    selectedLayerIds: immutable.Set(),
  },

  contextMappers: {
    activeDocumentLayerStore(layerStore, props) {
      return {
        layers: layerStore.getLayers(props.layerType),
      }
    },

    activeDocumentLayerStateStore(layerStateStore, props) {
      return {
        layerStates: layerStateStore.getLayerStates(props.layerType),
      }
    },

    activeDocumentSelectionStore(selectionStore, props) {
      const layerType = selectionStore.getSelectedLayerType()
      if (layerType == props.layerType) {
        return {
          layers: selectionStore.getSelectedLayerIds(),
        }
      }
    },

    activeDocumentSelectionManager(selectionManager, props) {
      return {
        handleLayerSelectRequest(layerId) {
          manager.selectLayer(layerId, props.layerType)
        },
      }
    },

    activeDocumentLayerStateStore(layerStateManager, props) {
      return {
        handleLayerVisibilitySetRequest(layerId, nextVisible) {
          layerStateManager.selectLayer(layerId, nextVisible)
        },
      }
    },
  },

  render(props, state) {
    return (
      <LayerList
        layers={state.layers}
        layerStates={state.layerStates}
        selectedLayerIds={state.selectedLayerIds}
        onLayerSelectRequest={state.handleLayerSelectRequest}
        onLayerVisibilitySetRequest={state.handleLayerVisibilitySetRequest}
      />
    )
  },
})
