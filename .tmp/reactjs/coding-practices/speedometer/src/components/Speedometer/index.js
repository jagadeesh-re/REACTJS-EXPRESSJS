import {Component} from 'react'
import './index.css'

class MySpeedMeter extends Component {
  state = {speed: 0}

  accelerate = () => {
    // eslint-disable-next-line consistent-return
    this.setState(prevState => {
      if (prevState.speed < 200) return {speed: prevState.speed + 10}

      if (prevState.speed === 200) return {speed: prevState.speed}
    })
  }

  applyBrakes = () => {
    // eslint-disable-next-line consistent-return
    this.setState(prevState => {
      if (prevState.speed > 0) return {speed: prevState.speed - 10}

      if (prevState.speed === 0) return {speed: prevState.speed}
    })
  }

  render() {
    const {speed} = this.state
    return (
      <div className="speedContainer">
        <h1 className="countHeading">SPEEDOMETER</h1>
        <img
          className="speedImage"
          src="https://assets.ccbp.in/frontend/react-js/speedometer-img.png"
          alt="speedometer"
        />
        <h1 className="count">Speed is {speed}mph</h1>
        <p>Min Limit is 0mph, Max Limit is 200mph</p>
        <div className="speedButtons">
          <button
            type="button"
            className="buttonAccelerate"
            onClick={this.accelerate}
          >
            Accelerate
          </button>
          <button
            type="button"
            className="buttonApplyBrake"
            onClick={this.applyBrakes}
          >
            Apply Brake
          </button>
        </div>
      </div>
    )
  }
}
export default MySpeedMeter
