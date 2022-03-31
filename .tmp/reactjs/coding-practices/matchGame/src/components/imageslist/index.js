import './index.css'

const ImagesList = props => {
  const {eachItem, matchfun} = props
  const {id, imageUrl, thumbnailUrl} = eachItem

  const matched = () => {
    matchfun(imageUrl)
  }
  return (
    <li className="itemsList">
      <button type="button" className="imagelist-button" onClick={matched}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnailurl" />
      </button>
    </li>
  )
}
export default ImagesList
