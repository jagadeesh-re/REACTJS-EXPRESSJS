import './index.css'

const SuggestionItem = props => {
  const {eachItem, clickFunction} = props
  const {suggestion} = eachItem
  const clickArrow = () => {
    clickFunction(suggestion)
  }

  return (
    <li>
      <p>{suggestion}</p>
      <img
        className="left-arrow"
        src="https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png"
        alt="arrow"
        onClick={clickArrow}
      />
    </li>
  )
}

export default SuggestionItem
