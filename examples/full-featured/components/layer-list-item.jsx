import createComponent from 'pure-react'
import React from 'react'


export default LayerListItem = createComponent({
  defaultProps: {
    layer: null,
    layerStates: immutable.Map(),
    selectedLayerIds: immutable.Set(),
  },

  mapProps(props) {
    const layerState = props.layerStates.get(props.layer.get('id'))
    const visible = (layerState) ? layerState.get('visible') : false

    return {
      selected: props.selectedLayerIds.contains(props.layer.get('id')),
      visible: visible,

      handleLayerVisibilityToggleRequest() {
        const nextVisible = !visible
        props.onLayerVisibilitySetRequest(props.layer.get('id'), nextVisible)
      },

      handleChildLayerVisibilitySetRequest(childLayerId, nextChildVisible) {
        if (!visible) {
          props.onLayerVisibilitySetRequest(props.layer.get('id'), true)
        } else {
          props.onLayerVisibilitySetRequest(childLayerId, nextChildVisible)
        }
      },
    }
  },

  render(props, state) {
    return (
      <div
        className={classNames(
          'layer-list__item': true
          'layer-list__item--selected': state.selected
        )}
      >
        <div className='layer-list__item-header'>
          <span className='layer-list__layer-name'>
            {props.layer.get('name')}
          </span>
          <span
            className={classNames(
              'layer-list__visibility-toggle': true
              'layer-list__visibility-toggle--active': state.visible
            )}
            onClick={state.handleLayerVisibilityToggleRequest}
          />
        </div>
        {
          props.layer.get('layers') ?
            <LayerList
              layers={props.layer.get('layers')}
              layerStates={props.layerStates}
              selectedLayerIds={props.selectedLayerIds}
              onLayerVisibilitySetRequest={state.handleChildLayerVisibilitySetRequest}
            />
          : null
        }
      </div>
    )
  },
})
