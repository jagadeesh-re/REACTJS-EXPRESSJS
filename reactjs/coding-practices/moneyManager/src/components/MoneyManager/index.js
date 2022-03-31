import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails/index'
import TransactionItem from '../TransactionItem/index'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transaction: [
      {title: 'Balance', amount: 0},
      {title: 'Income', amount: 0},
      {title: 'Expenses', amount: 0},
    ],
    title: '',
    amount: '',
    type: 'INCOME',
    history: [],
  }

  submit = event => {
    event.preventDefault()
    const {title, amount, type, transaction} = this.state

    const newlist = {id: uuidv4(), title, amount, type}
    let newMoneyManagerList
    if (type.toLowerCase() === 'income') {
      newMoneyManagerList = [
        {title: 'Balance', amount: transaction[0].amount + parseInt(amount)},
        {title: 'Income', amount: transaction[1].amount + parseInt(amount)},
        {title: 'Expenses', amount: transaction[2].amount},
      ]
    } else {
      newMoneyManagerList = [
        {title: 'Balance', amount: transaction[0].amount - parseInt(amount)},
        {title: 'Income', amount: transaction[1].amount},
        {title: 'Expenses', amount: transaction[2].amount + parseInt(amount)},
      ]
    }

    this.setState(prevState => ({
      transaction: newMoneyManagerList,
      history: [...prevState.history, newlist],
      title: '',
      amount: '',
      type: 'INCOME',
    }))
  }

  fundelete = unique => {
    const {history, transaction} = this.state
    const deletedamount = history.filter(eachItem => eachItem.id === unique)
    const newHistory = history.filter(eachItem => eachItem.id !== unique)
    const {amount, type} = deletedamount[0]
    console.log('money')
    console.log(amount)
    let newMoneyManagerList
    if (type.toLowerCase() === 'expenses')
      newMoneyManagerList = [
        {title: 'Balance', amount: transaction[0].amount + parseInt(amount)},
        {title: 'Income', amount: transaction[1].amount},
        {title: 'Expenses', amount: transaction[2].amount - parseInt(amount)},
      ]
    else {
      newMoneyManagerList = [
        {title: 'Balance', amount: transaction[0].amount - parseInt(amount)},
        {title: 'Income', amount: transaction[1].amount - parseInt(amount)},
        {title: 'Expenses', amount: transaction[2].amount},
      ]
    }
    this.setState({
      transaction: newMoneyManagerList,
      history: [...newHistory],
    })
  }

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeAmount = event => {
    this.setState({amount: event.target.value})
  }

  changeType = event => {
    this.setState({type: event.target.value})
  }

  render() {
    const {transaction, title, type, amount, history} = this.state

    console.log(type)
    console.log(history)

    return (
      <div className="container">
        <div className="inner-container">
          <div className="top-manager">
            <h1>Hi, Richard</h1>
            <p>
              Welcome back to your
              <span className="money-manager-heading">Money Manager</span>
            </p>
          </div>

          <ul className="middle-container">
            {transaction.map(eachItem => (
              <MoneyDetails eachItem={eachItem} key={eachItem.title} />
            ))}
          </ul>
          <div className="bottom-container">
            <div className="transaction-container">
              <form onSubmit={this.submit} className="form">
                <h1 className="bottom-heading">Add Transaction</h1>
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  id="title"
                  className="input-title"
                  onChange={this.changeTitle}
                  value={title}
                />

                <label htmlFor="amount">AMOUNT</label>
                <input
                  type="text"
                  id="amount"
                  className="input-title"
                  onChange={this.changeAmount}
                  value={amount}
                />

                <label htmlFor="type">TYPE:</label>
                <select id="type" value={type} onChange={this.changeType}>
                  {transactionTypeOptions.map(eachItem => (
                    <option value={eachItem.optionId} key={eachItem.optionId}>
                      {eachItem.displayText}
                    </option>
                  ))}
                </select>

                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>

            <ul className="unordered-list">
              <li className="transaction-list-heading">
                <h1 className="bottom-heading">History</h1>
              </li>
              <li className="list-li" key="hello">
                <p className="item">Title</p>
                <p className="item">Amount</p>
                <p className="item">Type</p>
                <p className="item">Delete</p>
              </li>
              {history[0] !== undefined
                ? history.map(eachItem => (
                    <TransactionItem
                      key={eachItem.id}
                      eachItem={eachItem}
                      fundelete={this.fundelete}
                    />
                  ))
                : ''}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
