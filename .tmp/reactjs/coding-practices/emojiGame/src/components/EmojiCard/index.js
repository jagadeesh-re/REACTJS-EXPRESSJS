// Write your code here.

// Write your code here.
import './index.css'

const EmojiCard = props => {
  const {eachItem, emojiClick} = props
  const {id, emojiName, emojiUrl} = eachItem

  const emojiclicked = () => {
    emojiClick(id)
  }

  return (
    <li className="item">
      <button type="button" className="emoji">
        <img src={emojiUrl} alt={emojiName} onClick={emojiclicked} />
      </button>
    </li>
  )
}
export default EmojiCard
