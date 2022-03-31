import './index.css'

const TabsList = props => {
  const {eachItem, active, displayTab} = props
  const {tabId, displayText} = eachItem

  const displayTabItem = () => displayTab(tabId)

  return (
    <li
      className={
        displayText.toLowerCase().includes(active.toLowerCase())
          ? 'tablist-bottom-color'
          : 'dummy'
      }
    >
      <button type="button" className="tablist-button" onClick={displayTabItem}>
        {displayText}
      </button>
    </li>
  )
}
export default TabsList
