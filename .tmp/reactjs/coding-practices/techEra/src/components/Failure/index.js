import './index.css'

const Failure = props => {
  const {retryApiUrl} = props

  const retry = () => retryApiUrl()

  return (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={retry}>
        Retry
      </button>
    </div>
  )
}
export default Failure
