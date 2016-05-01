import createComponent from 'pure-react'
import React from 'react'

import LayerListItem from './layer-list-item'


export default LayerList = createComponent({
  defaultProps: {
    layers: immutable.List(),
    layerStates: immutable.Map(),
    selectedLayerIds: immutable.Set(),
  },

  render(props) {
    return (
      <div className='layer-list'>
      {
        props.layers.map (layer) => {
          <LayerListItem
            layer={layer}
            layerStates={props.layerStates}
            selectedLayerIds={props.selectedLayerIds}
            onLayerSelectRequest={props.onLayerSelectRequest}
            onLayerVisibilitySetRequest={props.onLayerVisibilitySetRequest}
          />
        }
      }
      </div>
    )
  },
})
