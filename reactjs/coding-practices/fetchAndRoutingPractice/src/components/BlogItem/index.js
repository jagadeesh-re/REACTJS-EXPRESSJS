// Write your JS code here
import './index.css'
import {Link} from 'react-router-dom'

const BlogItem = props => {
  const {eachItem} = props
  const {id, title, imageUrl, avatarUrl, author, topic} = eachItem
  return (
    <Link to={`/blogs/${id}`} className="link">
      <li className="listItem">
        <div>
          <img src={imageUrl} alt="react" className="bloglist-imageurl" />
        </div>
        <div>
          <p className="topic">{topic}</p>
          <h1>{title}</h1>
          <div className="profile-details">
            <img src={avatarUrl} alt="react" className="bloglist-avatarurl" />
            <p className="author">{author}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default BlogItem
