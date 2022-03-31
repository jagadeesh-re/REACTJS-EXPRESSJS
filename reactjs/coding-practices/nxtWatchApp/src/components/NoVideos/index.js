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
        return (
          <EmptyContainer>
            <Image
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <EmptyHeading light={light}>No Search results found</EmptyHeading>
            <EmptyParagraph>
              Try different key words or remove search filter
            </EmptyParagraph>
            <EmptyButton onClick={retry}>Retry</EmptyButton>
          </EmptyContainer>
        )
      }}
    </Bright.Consumer>
  )
}

export default NoVideos
