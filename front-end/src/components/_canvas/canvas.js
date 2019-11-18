import React from 'react'
import Canva from './canva/canva'

let containerStyle = { 
  display: 'flex' ,  
}

export default class Content extends React.Component { 
  render() { 
    return (
      <div style={containerStyle}>
        {
          this.props.element.map((el, id) => { 
            return (
              <Canva {...this.props} element={el} key={id}/>
            )
          })
        }
      </div>
    )
  }
}
