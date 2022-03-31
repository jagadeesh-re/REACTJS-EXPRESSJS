// Write your code here
import './index.css'
import ConfigurationContext from '../../context/ConfigurationContext'

const ConfigurationController = () => (
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
        <div className="showListOnOff">
          <h1 className="layout-heading">Layout</h1>

          <div className="list-top">
            <input
              type="checkbox"
              id="content"
              onChange={onToggleShowContent}
              checked={showContent}
            />
            <label htmlFor="content">Content</label>
          </div>
          <div className="list-top">
            <input
              type="checkbox"
              id="leftNavbar"
              onChange={onToggleShowLeftNavbar}
              checked={showLeftNavbar}
            />
            <label htmlFor="leftNavbar">Left Navbar</label>
          </div>
          <div className="list-top">
            <input
              type="checkbox"
              id="rightNavbar"
              onChange={onToggleShowRightNavbar}
              checked={showRightNavbar}
            />
            <label htmlFor="rightNavbar">Right Navbar</label>
          </div>
        </div>
      )
    }}
  </ConfigurationContext.Consumer>
)

export default ConfigurationController
