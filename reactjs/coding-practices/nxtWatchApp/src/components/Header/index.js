import './index.css'
import {Component} from 'react'

import {HiFire} from 'react-icons/hi'

import {RiMenuAddLine} from 'react-icons/ri'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {AiOutlineMenu, AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBrightnessHighFill} from 'react-icons/bs'
import Bright from '../Context/Bright'

import {Button, NavContainer, IconButton} from './style'
import Logout from '../Logout/index'

class Header extends Component {
  state = {display: false}

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  hide = () => this.setState(prevState => ({display: !prevState.display}))

  render() {
    const {display} = this.state

    return (
      <Bright.Consumer>
        {value => {
          const {light, changeBright} = value
          const websiteurl = light
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          const iconColor = light === true ? null : 'iconColor'
          return (
            <NavContainer light={light}>
              <ul className="unordered-list">
                <Link to="/">
                  <li>
                    <img
                      src={websiteurl}
                      alt="website logo"
                      className="website-logo"
                    />
                  </li>
                </Link>
                <li>
                  <div className="header-top-container">
                    {light === true ? (
                      <IconButton
                        type="button"
                        onClick={changeBright}
                        light={light}
                        data-testid="theme"
                      >
                        <FaMoon />
                      </IconButton>
                    ) : (
                      <IconButton
                        type="button"
                        onClick={changeBright}
                        data-testid="theme"
                        light={light}
                      >
                        <BsFillBrightnessHighFill />
                      </IconButton>
                    )}
                    <AiOutlineMenu
                      className={`${iconColor} hide-menu icon-size`}
                      onClick={this.hide}
                    />
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                      className="profile"
                    />

                    <Logout logout={this.logout} />
                  </div>
                </li>
              </ul>
              {display ? (
                <ul className={`slide ${iconColor}`}>
                  <Link to="/" className={`link ${iconColor}`}>
                    <li>
                      <div className="list-item">
                        <AiFillHome className="menu-icon" />
                        <p>Home</p>
                      </div>
                    </li>
                  </Link>
                  <Link to="/trending" className={`link ${iconColor}`}>
                    <li>
                      <div className="list-item">
                        <HiFire className="menu-icon" />
                        <p>Trending</p>
                      </div>
                    </li>
                  </Link>
                  <Link to="/gaming" className={`link ${iconColor}`}>
                    <li>
                      <div className="list-item">
                        <SiYoutubegaming className="menu-icon" />
                        <p>Gaming</p>
                      </div>
                    </li>
                  </Link>
                  <Link to="/saved-videos" className={`link ${iconColor}`}>
                    <li>
                      <div className="list-item">
                        <RiMenuAddLine className="menu-icon" />
                        <p>Saved videos</p>
                      </div>
                    </li>
                  </Link>
                </ul>
              ) : (
                ''
              )}
            </NavContainer>
          )
        }}
      </Bright.Consumer>
    )
  }
}

export default withRouter(Header)
