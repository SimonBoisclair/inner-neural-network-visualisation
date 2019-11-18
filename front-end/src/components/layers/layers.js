import React from 'react' 
import Canvas from '../_canvas/canvas'

let style = { 
  margin : '100px'
}

let textStyle= {
  padding : '20px'
}

export default (props) => { 
  return (
    <div>
      {
        props.weights.map((el,id)=>{  
          return (
            <div key={id} style={style}> 
              <h1 style={textStyle}>
                {
                  id === 0
                  ? "Here is a pixels representation of the weights of the first layer."
                  : "Here is a pixels representation of the weights of the second layer."
                }
              </h1>
              <Canvas {...props} element={el}/> 
            </div>
          )
        })
      } 
    </div>
  )
}