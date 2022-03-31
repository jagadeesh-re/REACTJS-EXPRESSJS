import Bright from '../Context/Bright'
import {
  EmptyContainer,
  EmptyHeading,
  Image,
  EmptyParagraph,
  EmptyButton,
} from './style'

const NoVideos = props => {
  const {retryApi} = props

  const retry = () => retryApi()

  return (
    <Bright.Consumer>
      {value => {
        const {light} = value
        const url = light
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        return (
          <EmptyContainer>
            <Image src={url} alt="not found" />
            <EmptyHeading light={light}>Page Not Found</EmptyHeading>
            <EmptyParagraph>
              we are sorry, the page you requested could not be found.
            </EmptyParagraph>
          </EmptyContainer>
        )
      }}
    </Bright.Consumer>
  )
}

export default NoVideos
