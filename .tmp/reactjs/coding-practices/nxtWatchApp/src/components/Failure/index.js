import Bright from '../Context/Bright'
import {
  FailureContainer,
  FailureHeading,
  Image,
  FailureParagraph,
  FailureButton,
} from './style'

const Failure = props => {
  const {retryApi} = props
  const retry = () => retryApi()
  return (
    <Bright.Consumer>
      {value => {
        const {light} = value
        const url = light
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        return (
          <FailureContainer>
            <Image src={url} alt="failure view" />
            <FailureHeading light={light}>
              Oops! Something Went Wrong
            </FailureHeading>
            <FailureParagraph>
              We are having some trouble to complete your request.
            </FailureParagraph>
            <FailureParagraph>Please try again.</FailureParagraph>
            <FailureButton onClick={retry}>Retry</FailureButton>
          </FailureContainer>
        )
      }}
    </Bright.Consumer>
  )
}
export default Failure
