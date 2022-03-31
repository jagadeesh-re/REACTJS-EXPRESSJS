// Write your code here

// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {eachItem, url, liked, deleted, classColour} = props
  const {id, name, text, time, like} = eachItem

  const className = like ? 'like-paragraph' : 'unliked'

  const likefun = () => {
    liked(id)
  }
  const deletefun = () => {
    deleted(id)
  }
  const classno = Math.ceil(((Math.random() * 10) % 8) - 1)
  return (
    <li>
      <div className="list">
        <div className={`profile ${classColour[classno]}`}>
          <p className="letter">{name.trim()[0].toUpperCase()}</p>
        </div>
        <div className="profile-container">
          <div className="profile-name">
            <p className="name-paragraph">{name}</p>
            <p className="profile-time">{formatDistanceToNow(time)}</p>
          </div>
          <p className="profile-comment">{text}</p>
        </div>
      </div>
      <div className="like-container">
        <div className="likeThumb-container">
          <img src={url} alt="like" />
          <button type="button" className="button" onClick={likefun}>
            <p className={className}>Like</p>
          </button>
        </div>
        <button
          className="button"
          type="button"
          testid="delete"
          onClick={deletefun}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}
export default CommentItem
