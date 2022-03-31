// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {eachItem} = props
  const {title, amount} = eachItem
  const url = 'https://assets.ccbp.in/frontend/react-js/money-manager/'
  const urlMoneyImage = url.concat(title.toLowerCase(), '-image.png')
  const className = `money-image-container-${title}`
  const testid = title.toLowerCase().concat('Amount')
  return (
    <li>
      <div className={className}>
        <div>
          <img
            className="money-image"
            src={urlMoneyImage}
            alt={title.toLowerCase()}
          />
        </div>
        <div>
          <p className="balance-paragraph">Your {title}</p>
          <p className="rupees" testid={testid}>
            Rs {amount}
          </p>
        </div>
      </div>
    </li>
  )
}
export default MoneyDetails
/* Write your CSS here */
