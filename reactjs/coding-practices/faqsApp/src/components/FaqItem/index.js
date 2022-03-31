// Write your code here.
import './index.css'

const FaqItem = props => {
  const {eachItem, url, change} = props
  const {id, questionText, answerText} = eachItem
  const alt = url.includes('plus') ? 'plus' : 'minus'

  const changeSymbol = () => {
    change(id)
  }
  return (
    <li>
      <div className="list-item">
        <h1>{questionText}</h1>
        <img src={url} alt={alt} onClick={changeSymbol} />
      </div>

      {alt === 'minus' ? (
        <>
          <hr />
          <p>{answerText}</p>
        </>
      ) : (
        ''
      )}
    </li>
  )
}
export default FaqItem
