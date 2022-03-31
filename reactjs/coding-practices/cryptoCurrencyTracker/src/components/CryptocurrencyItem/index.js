// Write your JS code here
import './index.css'

const CryptocurrencyItem = props => {
  const {eachItem} = props
  const updatedData = {
    currencyName: eachItem.currency_name,
    usdValue: eachItem.usd_value,
    euroValue: eachItem.euro_value,
    id: eachItem.id,
    currencyLogo: eachItem.currency_logo,
  }
  const {currencyName, usdValue, euroValue, id, currencyLogo} = updatedData
  return (
    <li>
      <div className="list-item">
        <img src={currencyLogo} alt={currencyName} className="bitcoin-image" />
        <p>{currencyName}</p>
      </div>
      <p className="value">{usdValue}</p>
      <p className="value">{euroValue}</p>
    </li>
  )
}
export default CryptocurrencyItem
