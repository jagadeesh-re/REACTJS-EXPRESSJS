import {Component} from 'react'
import './index.css'

class CoinToss extends Component {
  state = {
    total: 0,
    heads: 0,
    tails: 0,
    url: 'https://assets.ccbp.in/frontend/react-js/heads-img.png',
  }

  countToss = () => {
    const tossResult = Math.floor(Math.random() * 2)

    if (tossResult === 0)
      this.setState(prevState => ({
        total: prevState.total + 1,
        heads: prevState.heads + 1,
        tails: prevState.tails,
        url: 'https://assets.ccbp.in/frontend/react-js/heads-img.png',
      }))
    else
      this.setState(prevState => ({
        total: prevState.total + 1,
        heads: prevState.heads,
        tails: prevState.tails + 1,
        url: 'https://assets.ccbp.in/frontend/react-js/tails-img.png',
      }))
  }

  render() {
    const {total, heads, tails, url} = this.state
    return (
      <div className="container">
        <div className="innerContainer">
          <h1>Coin Toss Game</h1>
          <p className="toss-paragraph">Heads (or) Tails</p>
          <img className="tossImage" src={url} alt="toss result" />
          <button type="button" onClick={this.countToss}>
            Toss Coin
          </button>
          <div className="result-container">
            <p className="paragraph">Total:{total}</p>
            <p className="paragraph">Heads:{heads}</p>
            <p className="paragraph">Tails:{tails}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default CoinToss
