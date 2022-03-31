import './index.css'

const AppointmentItem = props => {
  const {eachItem, url, acceptStarred} = props
  const {id, title, date, starred} = eachItem
  const clickedStarred = () => {
    acceptStarred(id)
  }
  return (
    <li>
      <div className="appointmentItems">
        <div className="appointment-container">
          <p>{title}</p>
          <button type="button" onClick={clickedStarred} testid="star">
            <img src={url} alt="star" />
          </button>
        </div>
        <p>Date: {date}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
