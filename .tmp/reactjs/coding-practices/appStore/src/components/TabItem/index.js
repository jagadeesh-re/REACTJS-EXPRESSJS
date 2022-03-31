import './index.css'

const TabItem = props => {
  const {tabItem, className, changeColour} = props
  const {tabId} = tabItem

  const change = () => {
    changeColour(tabId)
  }
  return (
    <li className={className} onClick={change}>
      <button type="button">{tabItem.displayText}</button>
    </li>
  )
}
export default TabItem
