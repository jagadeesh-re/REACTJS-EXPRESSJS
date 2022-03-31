import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav>
    <div className="nav-container">
      <ul>
        <li className="logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/wave-logo-img.png"
            alt="wave"
            className="wave"
          />
          <p className="paragraph-wave">wave</p>
        </li>
        <li className="redirect-links">
          <Link className="link" to="/">
            Home
          </Link>

          <Link className="link" to="/about">
            About
          </Link>

          <Link className="link" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header
