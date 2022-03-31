import './index.css'

const DestinationItem = props => {
  const {item} = props

  const {name, imgUrl} = item
  return (
    <li>
      <div className="list">
        <img src={imgUrl} alt={name} />
        <p>{name}</p>
      </div>
    </li>
  )
}

export default DestinationItem
