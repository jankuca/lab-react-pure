import createComponent from 'pure-react'
import React from 'react'


export default LayerList = createComponent({
  render(props, state) {
    return (
      <ul>
      {
        props.layers.map (layer) => {
          <li>{layer.get('name')}</li>
        }
      }
      </ul>
    )
  },
})
