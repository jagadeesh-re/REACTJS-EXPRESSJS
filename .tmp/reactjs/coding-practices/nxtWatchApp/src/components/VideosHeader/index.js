import './index.css'
import {BsFillBrightnessHighFill} from 'react-icons/bs'
import {Link, withRouter} from 'react-router-dom'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {VideosHeaderContainer, HeadingItem, IconContainer} from './style'
import Bright from '../Context/Bright'

const VideosHeader = props => (
  <Bright.Consumer>
    {value => {
      const {light} = value
      const {history} = props
      let title

      if (history.location.pathname === '/gaming') {
        title = 'Gaming'
      }
      if (history.location.pathname === '/trending') {
        title = 'Trending'
      }
      if (history.location.pathname === '/saved-videos') {
        title = 'Saved Videos'
      }

      const getIcon = str => {
        switch (str) {
          case 'Gaming':
            return (
              <IconContainer light={light}>
                <SiYoutubegaming className="iconClass" />
              </IconContainer>
            )
          case 'Trending':
            return (
              <IconContainer light={light}>
                <HiFire className="iconClass" />
              </IconContainer>
            )
          case 'Saved Videos':
            return (
              <IconContainer light={light}>
                <BsFillBrightnessHighFill className="iconClass" />
              </IconContainer>
            )
          default:
            return null
        }
      }
      return (
        <VideosHeaderContainer light={light}>
          <HeadingItem key={title}>{getIcon(title)}</HeadingItem>
          <Link to={history.location.pathname} className="link">
            <HeadingItem light={light} key={title}>
              <h1>{title}</h1>
            </HeadingItem>
          </Link>
        </VideosHeaderContainer>
      )
    }}
  </Bright.Consumer>
)

export default withRouter(VideosHeader)
