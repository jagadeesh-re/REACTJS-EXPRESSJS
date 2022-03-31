import {Component} from 'react'

import './index.css'

class Mango extends Component {
  state = {mango: 0, banana: 0}

  onIncrementMango = () =>
    this.setState(prevState => ({
      mango: prevState.mango + 1,
      banana: prevState.banana,
    }))

  onIncrementBanana = () =>
    this.setState(prevState => ({
      mango: prevState.mango,
      banana: prevState.banana + 1,
    }))

  render() {
    const {mango, banana} = this.state
    return (
      <div className="container">
        <div className="innerContainer">
          <h1 className="count">
            Bob ate <span>{mango}</span> Mangoes <span>{banana}</span> Bananas
          </h1>
          <div className="items">
            <div className="itemContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/mango-img.png"
                alt="mango"
              />
              <br />
              <button
                type="button"
                className="button"
                onClick={this.onIncrementMango}
              >
                EAt Mango
              </button>
            </div>
            <div className="itemContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/banana-img.png"
                alt="banana"
              />
              <br />
              <button
                type="button"
                className="button"
                onClick={this.onIncrementBanana}
              >
                Eat Banana
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Mango
