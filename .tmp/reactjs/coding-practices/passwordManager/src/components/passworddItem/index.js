import './index.css'

const PasswordItem = props => {
  const {eachItem, deleteRequest, passwordshow} = props
  const {id, website, username, password} = eachItem
  const profileLetter = username.trim()[0].toUpperCase()
  const colorsClassNames = [
    'color1',
    'color2',
    'color3',
    'color4',
    'color5',
    'color6',
    'color7',
    'color8',
    'color9',
  ]
  const pickedNo = Math.ceil(Math.random() * 10)
  const deleted = () => deleteRequest(id)
  return (
    <li>
      <div className="item">
        <div className={`profile-container ${colorsClassNames[pickedNo]}`}>
          <p className="profile-letter">{profileLetter}</p>
        </div>
        <div className="website-details">
          <p>{website}</p>
          <p>{username}</p>
          {passwordshow ? (
            <p>{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars-image"
            />
          )}
        </div>

        <button
          type="button"
          className="delete-password-button"
          testId="delete"
          onClick={deleted}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}
export default PasswordItem
