import {Heading, Nav, Ul, Li, Image} from './style'

const Header = () => (
  <Nav>
    <Ul>
      <Li>
        <Image
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
        />
        <Heading>Co-WIN</Heading>
      </Li>
    </Ul>
  </Nav>
)

export default Header
