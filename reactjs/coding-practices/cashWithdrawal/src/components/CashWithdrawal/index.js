import {Component} from 'react'
import './index.css'
import DenominationItem from '../DenominationItem/index'

class CashWithdrawal extends Component {
  state = {balance: 2000}

  minusBalance = amount =>
    this.setState(prevState => ({balance: prevState.balance - amount}))

  render() {
    const {balance} = this.state
    const {denominationsList} = this.props
    return (
      <div className="container">
        <div className="innerContainer">
          <div className="profileContainer">
            <div className="profile">
              <h1>J</h1>
            </div>
            <h1 className="profileName">Jagadeesh</h1>
          </div>
          <div className="balanceContainer">
            <p className="balanceParagraph">Your Balance</p>
            <div className="balanceDisplay">
              <p className="balanceDisplayHeading">{balance}</p>
              <p className="balanceDescription">In Rupees</p>
            </div>
          </div>
          <p className="withdrawHeading">Withdraw</p>
          <p className="withdrawDescription">CHOOSE SUM (IN RUPEES)</p>

          <ul className="unordered-list">
            {denominationsList.map(eachItem => (
              <DenominationItem
                eachItem={eachItem}
                key={eachItem.id}
                clickFunction={this.minusBalance}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default CashWithdrawal
