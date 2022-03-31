// Write your JS code here
import './index.css'
import BlogItem from '../BlogItem/index'

const BlogList = props => {
  const {blogsList} = props

  return (
    <div className="blog-list-container">
      <ul className="bloglist-details">
        {blogsList.map(eachItem => (
          <BlogItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    </div>
  )
}

export default BlogList
