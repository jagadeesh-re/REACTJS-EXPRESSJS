import './index.css'

const AppItem = props => {
  const {eachItem} = props
  const {imageUrl, appName} = eachItem
  return (
    <li className="list-item">
      <img src={imageUrl} alt={appName} />
      <p>{appName}</p>
    </li>
  )
}

export default AppItem
