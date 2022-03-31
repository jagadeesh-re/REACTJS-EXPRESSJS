import {Component} from 'react'
import './index.css'

class RandomNumberGenerator extends Component {
  state = {
    count: 0,
  }

  change = () => {
    this.setState(prevState => {
      const rand = Math.ceil(Math.random() * 100)
      return {count: rand + prevState.count}
    })
  }

  render() {
    const {count} = this.state

    return (
      <div className="container">
        <div className="innerContainer">
          <h1 className="heading">Random Number</h1>
          <p className="paragraph">
            Generate a random number in the range of 0 to 100
          </p>
          <button type="button" onClick={this.change}>
            Generate
          </button>
          <p className="count">{count}</p>
        </div>
      </div>
    )
  }
}

export default RandomNumberGenerator
