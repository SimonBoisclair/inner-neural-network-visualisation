import React from 'react'

let style = {
  margin : '50px 100px',
  padding : '50px',
  fontSize : '50px',
  border : 'none',
  borderRadius: '20px',
  cursor : 'pointer'
}

export default (props) => {
  return (
    <button
      onClick={props.RESTART_TRAINING}
      style={style}
    >
      RESTART_TRAINING
    </button>
  )
}