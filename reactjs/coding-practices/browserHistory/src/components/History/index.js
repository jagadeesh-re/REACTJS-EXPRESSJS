import './index.css'

const History = props => {
  const {eachItem, deleteFunction} = props
  const {id, timeAccessed, logoUrl, title, domainUrl, ondelete} = eachItem
  const removeList = () => {
    deleteFunction(id)
  }
  return (
    <li onClick={removeList}>
      <div className="historyInformation">
        <p className="time">{timeAccessed}</p>
        <div className="logoContainer">
          <img src={logoUrl} alt="domain logo" className="logo" />
          <div className="titleContainer">
            <p className="title">{title}</p>
            <p className="domain">{domainUrl}</p>
          </div>
        </div>
      </div>
      <button type="button" testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default History
