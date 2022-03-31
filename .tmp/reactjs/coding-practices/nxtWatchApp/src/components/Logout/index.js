import 'reactjs-popup/dist/index.css'
import Popup from 'reactjs-popup'
import {FiLogOut} from 'react-icons/fi'
import Bright from '../Context/Bright'

import {Button, Paragraph} from './style'
import './index.css'

const Logout = props => {
  const {logout} = props
  const log = () => {
    logout()
  }
  return (
    <Bright.Consumer>
      {value => {
        const {light} = value
        const iconColor = light === true ? null : 'iconColor'
        const popupContent = light === true ? null : 'popup-content'
        return (
          <div>
            <Popup
              modal
              trigger={
                <Button type="button" light={light}>
                  Logout
                </Button>
              }
              className={`popup-content ${popupContent}`}
            >
              {close => (
                <>
                  <Paragraph>Are you sure, you want to logout</Paragraph>
                  <div className="pop">
                    <Button type="button" light={light} onClick={() => close()}>
                      Cancel
                    </Button>
                    <Button type="button" light={light} onClick={log}>
                      Confirm
                    </Button>
                    <FiLogOut
                      className={`hide-menu icon-size ${iconColor}`}
                      onClick={logout}
                    />
                  </div>
                </>
              )}
            </Popup>
          </div>
        )
      }}
    </Bright.Consumer>
  )
}

export default Logout
