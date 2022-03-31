import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div>
        <ul className="unordered-list">
          <Link to="/" className="home-list">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="website-logo"
              />
            </li>
          </Link>
          <Link to="/" className="home-list">
            <li>
              <p className="hide-list">Home</p>
              <AiFillHome className="show-icon" />
            </li>
          </Link>
          <Link to="/jobs" className="jobs-list">
            <li>
              <p className="hide-list">Jobs</p>
              <BsFillBriefcaseFill className="show-icon" />
            </li>
          </Link>
          <li className="logout-list">
            <button type="button" className="button hide-list" onClick={logout}>
              Logout
            </button>
            <FiLogOut className="show-icon" />
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
