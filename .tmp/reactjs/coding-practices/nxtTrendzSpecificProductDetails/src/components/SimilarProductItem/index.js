// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {eachItem} = props
  const {
    price,
    rating,
    title,
    imageUrl,
    totalReviews,
    description,
    availability,
    brand,
  } = eachItem
  return (
    <li className="similar-item">
      <img src={imageUrl} alt="similar product" className="similar-imageurl" />
      <h1 className="similar-title">{title}</h1>
      <p className="similar-brand">{brand}</p>
      <div>
        <p className="similar-price">Rs {price}/-</p>
        <div className="similar-rating">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png "
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
