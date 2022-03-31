import './index.css'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import SimilarProductItem from '../SimilarProductItem/index'
import Header from '../Header/index'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProductItemDetails extends Component {
  state = {list: '', similarList: '', count: 1, status: apiStatus.loading}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.success(data)
    } else {
      this.failure()
    }
  }

  failure = () => this.setState({list: '', status: apiStatus.failure})

  success = data => {
    const newDataList = {
      id: data.id,
      imageUrl: data.image_url,
      title: data.title,
      price: data.price,
      description: data.description,
      brand: data.brand,
      totalReviews: data.total_reviews,
      rating: data.rating,
      availability: data.availability,
    }

    const newSimilarProducts = data.similar_products.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      title: eachItem.title,
      style: eachItem.style,
      price: eachItem.price,
      description: eachItem.description,
      brand: eachItem.brand,
      totalReviews: eachItem.total_reviews,
      rating: eachItem.rating,
      availability: eachItem.availability,
    }))

    this.setState({
      list: newDataList,
      similarList: newSimilarProducts,
      status: apiStatus.success,
    })
  }

  increment = () => this.setState(prevState => ({count: prevState.count + 1}))

  decrement = () =>
    this.setState(prevState => ({
      count: prevState.count === 1 ? 1 : prevState.count - 1,
    }))

  continueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  viewDetails = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.loading:
        return this.loading()
      case apiStatus.success:
        return this.show()
      case apiStatus.failure:
        return this.error()
      default:
        return null
    }
  }

  error = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="error-image"
      />
      <h1>Product Not Found</h1>

      <button
        type="button"
        className="shopping-button"
        onClick={this.continueShopping}
      >
        Continue Shopping
      </button>
    </div>
  )

  loading = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  show = () => {
    const {list, similarList, count} = this.state
    const {
      price,
      rating,
      title,
      imageUrl,
      totalReviews,
      description,
      availability,
      brand,
    } = list
    console.log(similarList)
    return (
      <div>
        <div className="details-container">
          <div className="details">
            <img src={imageUrl} alt="product" className="detail-image" />
            <div>
              <h1 className="title">{title}</h1>
              <p className="price">Rs {price}/-</p>
              <div className="rating-details">
                <div className="rating">
                  <p>{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png "
                    alt="star"
                    className="star"
                  />
                </div>
                <div>
                  <p className="reviews">{totalReviews} Reviews</p>
                </div>
              </div>
              <p className="description">{description}</p>
              <p className="available-paragraph">Available {availability}</p>
              <p className="available-paragraph">Brand {brand}</p>
              <hr />
              <div className="count-container">
                <button
                  type="button"
                  onClick={this.decrement}
                  className="button"
                  testid="minus"
                >
                  <BsDashSquare />
                </button>
                <p>{count}</p>
                <button
                  type="button"
                  onClick={this.increment}
                  className="button"
                  testid="plus"
                >
                  <BsPlusSquare />
                </button>
              </div>
              <button type="button" className="add-to-cart">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <div className="similar-container">
          <h1 className="similar-product-heading">Similar Products</h1>
          {similarList[0] !== undefined ? (
            <ul className="unordered-list">
              {similarList.map(eachItem => (
                <SimilarProductItem key={eachItem.id} eachItem={eachItem} />
              ))}
            </ul>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        {this.viewDetails()}
      </>
    )
  }
}
export default ProductItemDetails
