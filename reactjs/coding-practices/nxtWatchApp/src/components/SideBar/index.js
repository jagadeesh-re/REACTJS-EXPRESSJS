import {FaMoon} from 'react-icons/fa'
import {Component} from 'react'
import {AiOutlineMenu, AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBrightnessHighFill} from 'react-icons/bs'

import {Link, withRouter} from 'react-router-dom'
import {HiFire} from 'react-icons/hi'
import {RiMenuAddLine} from 'react-icons/ri'
import {SiYoutubegaming} from 'react-icons/si'
import {
  SideBarContainer,
  Li,
  FullContainer,
  ContactContainer,
  Paragraph,
  SocialIcons,
} from './style'

import Bright from '../Context/Bright'
import './index.css'

class SideBar extends Component {
  state = {home: false, trend: false, game: false, saved: false}

  componentDidMount() {
    const {history} = this.props
    if (history.location.pathname === '/gaming') this.setState({game: true})
    else if (history.location.pathname === '/trending')
      this.setState({trend: true})
    else if (history.location.pathname === '/') this.setState({home: true})
    else if (history.location.pathname === '/saved-videos')
      this.setState({saved: true})
  }

  clickHome = () =>
    this.setState(prevState => ({
      home: !prevState.home,
      trend: false,
      game: false,
      saved: false,
    }))

  clickTrending = () =>
    this.setState(prevState => ({
      home: false,
      trend: !prevState.trend,
      game: false,
      saved: false,
    }))

  clickGame = () =>
    this.setState(prevState => ({
      home: false,
      trend: false,
      game: !prevState.game,
      saved: false,
    }))

  clickSaved = () =>
    this.setState(prevState => ({
      home: false,
      trend: false,
      game: false,
      saved: !prevState.saved,
    }))

  render() {
    const {home, trend, game, saved} = this.state
    return (
      <Bright.Consumer>
        {value => {
          const {light} = value
          const brightHomeClass = home ? 'brightHomeClass' : null
          const brightTrendClass = trend ? 'brightTrendClass' : null
          const brightGameClass = game ? 'brightGameClass' : null
          const brightSavedClass = saved ? 'brightSavedClass' : null
          return (
            <FullContainer light={light}>
              <SideBarContainer light={light}>
                <Link to="/" className="link">
                  <Li onClick={this.clickHome} light={light} home={home}>
                    <div className="list-item">
                      <AiFillHome className={`menu-icon ${brightHomeClass}`} />
                      <p>Home</p>
                    </div>
                  </Li>
                </Link>
                <Link to="/trending" className="link">
                  <Li onClick={this.clickTrending} light={light} trend={trend}>
                    <div className="list-item">
                      <HiFire className={`menu-icon ${brightTrendClass}`} />
                      <p>Trending</p>
                    </div>
                  </Li>
                </Link>
                <Link to="/gaming" className="link">
                  <Li onClick={this.clickGame} light={light} game={game}>
                    <div className="list-item">
                      <SiYoutubegaming
                        className={`menu-icon ${brightGameClass}`}
                      />
                      <p>Gaming</p>
                    </div>
                  </Li>
                </Link>
                <Link to="/saved-videos" className="link">
                  <Li onClick={this.clickSaved} light={light} saved={saved}>
                    <div className="list-item">
                      <RiMenuAddLine
                        className={`menu-icon ${brightSavedClass}`}
                      />
                      <p>Saved videos</p>
                    </div>
                  </Li>
                </Link>
              </SideBarContainer>
              <ContactContainer>
                <Paragraph light={light} contact>
                  CONTACT US
                </Paragraph>
                <SocialIcons>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="social-icons"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                    alt="twitter logo"
                    className="social-icons"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt=" linked in logo"
                    className="social-icons"
                  />
                </SocialIcons>
                <Paragraph light={light}>
                  Enjoy! Now to see your channels and recommendations!
                </Paragraph>
              </ContactContainer>
            </FullContainer>
          )
        }}
      </Bright.Consumer>
    )
  }
}

export default withRouter(SideBar)
