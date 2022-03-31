// Write your JS code here
import './index.css'

const BlogItem = props => {
  const {eachItem} = props
  const {title, description, publishedDate} = eachItem
  return (
    <li>
      <div className="blogitem-details">
        <h1 className="title-heading">{title}</h1>
        <p className="date-paragraph">{publishedDate}</p>
      </div>
      <p className="content-paragraph">{description}</p>
      <hr />
    </li>
  )
}
export default BlogItem
