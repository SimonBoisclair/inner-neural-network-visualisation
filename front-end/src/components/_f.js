import React from "react";
import { GET_WEIGHTS } from '../communications/weights'
import { RESTART_TRAINING } from '../communications/process'

function Content(ShelledComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        weights: [[],[]],
        sortedWeights: []
      }
    }

    GET_WEIGHTS = async () => {
      let weights = await GET_WEIGHTS()
      if(!weights.errors){
        this.setState({ weights })
        this.sortWeights(weights)
      }else{
        this.setState({ 
          weights: [[],[]],
          sortedWeights: []
        })
      }
    }

    sortWeights = (alfa) => {
      let bravo = alfa[1].map((EL, ID) => EL.map(
        (el, id) => {
          return {
              index: id,
                el
            }
        }).sort(function(a, b){return b.el - a.el})
      ) 
      this.setState({sortedWeights:bravo})
    }

    componentDidMount(){
      this.GET_WEIGHTS() 
      setInterval(this.GET_WEIGHTS,1000)
    }
 
 

    render() { 
      return (
        <ShelledComponent
          {...this.props}
          {...this.state}

          GET_WEIGHTS={async () => { await this.GET_WEIGHTS() }} 
          RESTART_TRAINING={async () => {
            RESTART_TRAINING()
            this.setState({ 
              weights: [[],[]],
              sortedWeights: []
            })
          }}
        />)
    }
  }
}

export default Content;