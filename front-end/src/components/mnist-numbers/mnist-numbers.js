import React from 'react'
import Canvas from '../_canvas/canvas'

let style = {
  display: 'flex',
  margin: '0px 100px'
}

let numberTitle = {
  fontSize: '150px',
  padding: '0px 50px'
}

let textStyle = {
  margin: '0px 100px',
  padding: '20px'
}

export default (props) => {
  return (
    <div>
      <h1 style={textStyle}> 
          Here is the distribution of the most influencial captures of the first layer according to each digit.
      </h1>
      {
        props.sortedWeights.map((el, id) => {
          let alfa = el.map((el, id) => props.weights[0][el.index]).filter((el, id) => id < 10)
          return (
            <div key={id} style={style}>
              <div style={numberTitle}>{id}</div>
              <Canvas {...props} element={alfa} />
            </div>
          )
        })
      }
    </div>
  )
}