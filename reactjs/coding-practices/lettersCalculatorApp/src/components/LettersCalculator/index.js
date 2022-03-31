import {Component} from 'react'
import './index.css'

class LettersCalculator extends Component {
  state = {count: 0}

  countFunction = event => this.setState({count: event.target.value.length})

  render() {
    const {count} = this.state
    return (
      <div className="container">
        <div className="innerContainer">
          <h1 className="heading">Calculate the Letters you enter</h1>
          <label htmlFor="input">Enter the phrase</label> <br />
          <input
            type="text"
            id="input"
            placeholder="Enter the phrase"
            onChange={this.countFunction}
          />
          <p className="countLetters">No.of letters: {count}</p>
        </div>
        <div>
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/stop-watch-with-calculator-img.png"
            alt="letters calculator"
          />
        </div>
      </div>
    )
  }
}
export default LettersCalculator
