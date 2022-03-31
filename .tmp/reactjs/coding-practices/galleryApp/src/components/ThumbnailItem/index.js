import './index.css'

const ThumbnailItem = props => {
  const {eachItem, clickImg, className, isActive} = props
  const {id, thumbnailUrl, thumbnailAltText} = eachItem

  const clickImage = () => {
    clickImg(id)
  }
  const active = isActive ? '' : className
  console.log(className)
  return (
    <li className={active}>
      <button type="button">
        <img src={thumbnailUrl} alt={thumbnailAltText} onClick={clickImage} />
      </button>
    </li>
  )
}

export default ThumbnailItem
