import {Component} from 'react'
import './index.css'

const languageGreetingsList = [
  {
    id: 'bfdf40eb-eec9-4a66-a493-752fe689f0d0',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/english-greetings-img.png',
    buttonText: 'English',
    imageAltText: 'english',
  },
  {
    id: '0ceda891-2a0c-49e2-8c62-68e78180bac6',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/tamil-greetings-img.png',
    buttonText: 'Tamil',
    imageAltText: 'tamil',
  },
  {
    id: '89537778-7a46-4c58-988c-0adc931d087c',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/multilingual_greeting/telugu-greetings-img.png',
    buttonText: 'Telugu',
    imageAltText: 'telugu',
  },
]

class Language extends Component {
  state = {
    selected: languageGreetingsList[0].buttonText.toLowerCase(),
  }

  changeImage = event =>
    this.setState({selected: event.target.textContent.toLowerCase()})

  render() {
    const {selected} = this.state
    console.log(selected)
    const url = `https://assets.ccbp.in/frontend/react-js/multilingual_greeting/${selected}-greetings-img.png`

    return (
      <div className="language-container">
        <h1>Multilingual Greetings</h1>
        <ul>
          {languageGreetingsList.map(eachItem => (
            <li
              key={eachItem.id}
              className={selected === eachItem.imageAltText ? 'selected' : ''}
            >
              <button
                type="button"
                onClick={this.changeImage}
                className={selected === eachItem.imageAltText ? 'selected' : ''}
              >
                {eachItem.buttonText}
              </button>
            </li>
          ))}
        </ul>
        <img src={url} alt={selected} className="image-language" />
      </div>
    )
  }
}
export default Language
