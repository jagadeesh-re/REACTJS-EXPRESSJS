import './index.css'
import {AiOutlineClose} from 'react-icons/ai'
import {PremiumContainer} from './style'

const Premium = props => {
  const {closed} = props

  const bannerClosed = () => {
    closed()
  }
  return (
    <PremiumContainer data-testid="banner">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="premium-logo"
        />
        <p className="premium-heading">
          Buy Nxt Watch Premium prepaid plans with UPI
        </p>
        <button type="button" className="getPremiumButton">
          GET IT NOW
        </button>
      </div>
      <div className="close-container">
        <button data-testid="close" className="banner-close" type="button">
          <AiOutlineClose onClick={bannerClosed} />
        </button>
      </div>
    </PremiumContainer>
  )
}

export default Premium
