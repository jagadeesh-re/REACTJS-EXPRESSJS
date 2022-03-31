import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'
import {v4 as uuidv4} from 'uuid'

import {
  Container,
  SecondContainer,
  ScoreContainer,
  ThirdContainer,
  Paragraph,
  Image,
  Button,
  IconButton,
  Result,
  Heading,
} from './style'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const gameView = {
  game: 'GAME',
  result: 'RESULT',
}

class Rock extends Component {
  state = {score: 0, status: '', game: gameView.game, user: '', opponent: ''}

  scoreDisplay = id => {
    let num = Math.floor(Math.random() * 10)
    num %= 3
    console.log(num)
    let newStatus
    let newScore
    const opponent = choicesList[num].id

    const user = id

    if (user === 'ROCK' && opponent === 'SCISSORS') {
      newStatus = 'YOU WON'
    } else if (user === 'SCISSORS' && opponent === 'ROCK') {
      newStatus = 'YOU LOSE'
    } else if (user === 'SCISSORS' && opponent === 'PAPER') {
      newStatus = 'YOU WON'
    } else if (user === 'PAPER' && opponent === 'SCISSORS') {
      newStatus = 'YOU LOSE'
    } else if (user === 'ROCK' && opponent === 'PAPER') {
      newStatus = 'YOU LOSE'
    } else if (user === 'PAPER' && opponent === 'ROCK') {
      newStatus = 'YOU WON'
    } else {
      newStatus = 'IT IS DRAW'
    }
    this.setState(prevState => {
      if (newStatus === 'YOU LOSE') newScore = prevState.score - 1
      else if (newStatus === 'YOU WON') newScore = prevState.score + 1
      else newScore = prevState.score
      return {
        status: newStatus,
        user,
        opponent,
        game: gameView.result,
        score: newScore,
      }
    })
  }

  gameDetails = () => {
    const {game} = this.state
    switch (game) {
      case gameView.game:
        return this.displayGame()
      case gameView.result:
        return this.displayResult()
      default:
        return null
    }
  }

  displayGame = () => (
    <>
      <ThirdContainer>
        <Button
          data-testid="rockButton"
          type="button"
          onClick={() => this.scoreDisplay(choicesList[0].id)}
          rps
        >
          <Image
            id={choicesList[0].id}
            src={choicesList[0].imageUrl}
            alt={choicesList[0].id}
          />
        </Button>

        <Button
          data-testid="scissorsButton"
          type="button"
          onClick={() => this.scoreDisplay(choicesList[1].id)}
          rps
        >
          <Image
            id={choicesList[1].id}
            src={choicesList[1].imageUrl}
            alt={choicesList[1].id}
          />
        </Button>

        <Button
          data-testid="paperButton"
          type="button"
          onClick={() => this.scoreDisplay(choicesList[2].id)}
          rps
        >
          <Image
            id={choicesList[2].id}
            src={choicesList[2].imageUrl}
            alt={choicesList[2].id}
          />
        </Button>
      </ThirdContainer>
      <Popup trigger={<Button type="button">RULES</Button>} modal>
        {close => (
          <>
            <IconButton
              type="button"
              className="trigger-button"
              onClick={() => close()}
            >
              <RiCloseLine />
            </IconButton>
            <Image
              up
              src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
              alt="rules"
            />
          </>
        )}
      </Popup>
    </>
  )

  game = () =>
    this.setState(prevState => ({
      score: prevState.score,
      status: '',
      game: gameView.game,
      user: '',
      opponent: '',
    }))

  displayResult = () => {
    const {status, user, opponent} = this.state

    const newList1 = choicesList.filter(eachItem => eachItem.id === user)

    const newList2 = choicesList.filter(eachItem => eachItem.id === opponent)
    console.log(newList1)
    console.log(newList2)

    return (
      <>
        <ThirdContainer>
          <Result>
            <Paragraph>YOU</Paragraph>
            <Image src={newList1[0].imageUrl} alt="your choice" />
          </Result>
          <Result>
            <Paragraph>OPPONENT</Paragraph>
            <Image src={newList2[0].imageUrl} alt="opponent choice" />
          </Result>

          <Result>
            <Paragraph>{status}</Paragraph>
            <Button type="button" onClick={this.game} play>
              PLAY AGAIN
            </Button>
          </Result>
        </ThirdContainer>
        <Popup trigger={<Button type="button">RULES</Button>} modal>
          {close => (
            <>
              <IconButton
                type="button"
                className="trigger-button"
                onClick={() => close()}
              >
                <RiCloseLine />
              </IconButton>
              <Image
                up
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
              />
            </>
          )}
        </Popup>
      </>
    )
  }

  render() {
    const {score} = this.state

    return (
      <Container>
        <SecondContainer>
          <Heading>Rock Paper Scissors</Heading>
          <ScoreContainer>
            <Paragraph scoreTrue>Score</Paragraph>
            <Paragraph scoreTrue scoreSize>
              {score}
            </Paragraph>
          </ScoreContainer>
        </SecondContainer>

        {this.gameDetails()}
      </Container>
    )
  }
}
export default Rock
