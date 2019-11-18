import React from 'react' 
import RestartButton from './restart-button/restart-button'
import Layers from './layers/layers'
import MnistNumbers from './mnist-numbers/mnist-numbers'
import _f from './_f'

let textStyle = {
  margin : '100px 100px'
}

export default _f((props) => {
  return (
    <div>  
      <h1 style={textStyle}>
        This is a project to display the inner layers of a fully connected 100*10 neural network while training with MNIST Data Set.  
        The goal is to display the most influencial inner neurones.
      </h1>
      <Layers {...props}/>
      <MnistNumbers {...props}/>
      <RestartButton {...props}/>
    </div>
  )
})