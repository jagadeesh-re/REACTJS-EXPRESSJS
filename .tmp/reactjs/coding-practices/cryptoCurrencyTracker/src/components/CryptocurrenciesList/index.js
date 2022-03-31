// Write your JS code here
import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import CryptocurrencyItem from '../CryptocurrencyItem/index'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class CryptocurrenciesList extends Component {
  state = {cryptData: '', isDataFetched: false}

  componentDidMount() {
    this.getDate()
  }

  getDate = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()

    this.setState({cryptData: data, isDataFetched: true})
  }

  render() {
    const {cryptData, isDataFetched} = this.state

    return isDataFetched ? (
      <div className="cryptocurencylist-container">
        <h1 className="cryptocurrency-heading">Cryptocurrency Tracker</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
          className="cryptocurrency-image"
        />
        <ul className="unordered-list">
          <li key="hello" className="list-heading">
            <h1 className="coin-type-heading">Coin Type</h1>
            <h1 className="coin-heading">USD</h1>
            <h1 className="coin-heading">EURO</h1>
          </li>
          {cryptData.map(eachItem => (
            <CryptocurrencyItem eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div testid="loader">
        <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
      </div>
    )
  }
}
export default CryptocurrenciesList
