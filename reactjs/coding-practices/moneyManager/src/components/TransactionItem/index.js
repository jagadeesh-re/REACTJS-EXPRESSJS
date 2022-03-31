// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachItem, fundelete} = props
  const {id, title, amount, type} = eachItem
  const deleted = () => {
    fundelete(id)
  }

  return (
    <li className="list-li">
      <p className="item">{title}</p>
      <p className="item">{amount}</p>
      <p className="item">{type}</p>
      <button
        type="button"
        className="delete"
        onClick={deleted}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          alt="delete"
          className="deleteImage"
        />
      </button>
    </li>
  )
}
export default TransactionItem
/* Write your CSS here */
