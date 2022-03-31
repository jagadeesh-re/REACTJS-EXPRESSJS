import './index.css'

const DenominationItem = props => {
  const {eachItem, clickFunction} = props
  const {value} = eachItem
  const withDraw = () => {
    clickFunction(value)
  }

  return (
    <li onClick={withDraw}>
      <button>{value}</button>
    </li>
  )
}

export default DenominationItem
