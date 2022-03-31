import './index.css'
import {AiFillDelete} from 'react-icons/ai'

const SongsList = props => {
  const {eachItem, deleteItem} = props
  const {id, imageUrl, name, genre, duration} = eachItem

  const deleteList = () => deleteItem(id)

  return (
    <li className="list-item">
      <img src={imageUrl} alt="track" className="image-song" />
      <div className="song-container">
        <p>{name}</p>
        <p>{genre}</p>
      </div>
      <p>{duration}</p>
      <button type="button" testid="delete" onClick={deleteList}>
        <AiFillDelete className="delete-icon" />
      </button>
    </li>
  )
}
export default SongsList
