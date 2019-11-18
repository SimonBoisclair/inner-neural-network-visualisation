import React from 'react'

let style = {
  border: '2px solid white'
}

export default class Content extends React.Component {
  constructor(props) {
    super()
    this.state = { name: `canvas${Math.random() * 100000000000000000}` }
  }

  drawCanvas = () => {
    // console.log(this.state.name)
    let canvas1 = document.getElementById(this.state.name)

    // console.log(canvas1)
    let ctx = canvas1.getContext('2d');
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    let r = 0

    if (Array.isArray(this.props.element[0])) {
      for (let xray = 0; xray < this.props.element.length; xray++) {
        for (let yankee = 0; yankee < this.props.element[0].length; yankee++) {
          let pixel = this.props.element[xray][yankee] * 14
          pixel = pixel - 0.42
          pixel = pixel > 0 ? pixel*5 : 0 
          ctx.fillStyle = "rgba(" + r + "," + r + "," + r + "," + pixel + ")";
          ctx.fillRect(yankee * 5, xray * 5, 5, 5);
        }
      }
    } else {
      for (let xray = 0; xray < this.props.element.length; xray++) {
        let pixelExample = this.props.element[xray]
        ctx.fillStyle = "rgba(" + r + "," + 100 + "," + r + "," + ((pixelExample * 10)) + ")";
        ctx.fillRect(0, xray * 5, 5, 5);
      }
    }
  }

  componentDidUpdate(asd) {
    this.drawCanvas()
  }
  componentDidMount() {
    this.drawCanvas()
  }
  render() {
    return (
      <canvas
        id={this.state.name}
        width={
          Array.isArray(this.props.element[0])
            ? this.props.element.length * 5 + 'px'
            : '5px'
        }
        height={this.props.element.length * 5 + 'px'}
        style={style}
      />
    )
  }
}
