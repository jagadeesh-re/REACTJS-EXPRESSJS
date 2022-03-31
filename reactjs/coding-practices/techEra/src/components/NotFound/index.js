import Header from '../Header/index'
import './index.css'

const NotFound = props => (
  <div className="not-found-container">
    <Header />

    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png "
      alt="not found"
      className="not-found-image"
    />
    <h1 className="page-heading">Page Not Found</h1>
    <p className="page-paragraph">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
