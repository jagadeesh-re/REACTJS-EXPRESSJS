// Write your code here
import './index.css'
import Header from '../Header/index'
import Body from '../Body/index'
import Footer from '../Footer/index'
import ConfigurationContext from '../../context/ConfigurationContext'

const Layout = () => (
  <ConfigurationContext.Consumer>
    {value => {
      const {
        showContent,
        showLeftNavbar,
        showRightNavbar,
        onToggleShowContent,
        onToggleShowLeftNavbar,
        onToggleShowRightNavbar,
      } = value
      return (
        <div className="layout">
          <Header />
          <Body
            showRightNavbar={showRightNavbar}
            showContent={showContent}
            showLeftNavbar={showLeftNavbar}
          />
          <Footer />
        </div>
      )
    }}
  </ConfigurationContext.Consumer>
)

export default Layout
