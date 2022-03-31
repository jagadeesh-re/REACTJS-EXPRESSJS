import './index.css'
import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import Bright from '../Context/Bright'
import VideosHeader from '../VideosHeader/index'
import SideBar from '../SideBar/index'
import VideoPlayer from '../VideoPlayer/index'
import {
  Container,
  BelowPremium,
  BottomContainer,
  LoaderContainer,
  VideoContainer,
  VideoDetailsList,
  Heading,
  Paragraph,
  Ul,
  LikesContainer,
  IconButton,
  VideoDescription,
  VideoNameContainer,
  DescriptionContainer,
  ParagraphIcon,
} from './style'
import Failure from '../Failure/index'

const detailsStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetailsRoute extends Component {
  state = {
    searchInput: '',
    list: '',
    status: detailsStatus.loading,
    like: false,
    saved: false,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const eachItem = data.video_details
      console.log(data)
      const newList = {
        id: eachItem.id,
        title: eachItem.title,
        videoUrl: eachItem.video_url,
        channelName: eachItem.channel.name,
        thumbnailUrl: eachItem.thumbnail_url,
        profileImageUrl: eachItem.channel.profile_image_url,
        viewCount: eachItem.view_count,
        subscriberCount: eachItem.channel.subscriber_count,
        publishedAt: eachItem.published_at,
        description: eachItem.description,
      }

      console.log(newList)

      this.setState({list: newList, status: detailsStatus.success})
    } else {
      this.setState({list: '', status: detailsStatus.failure})
    }
  }

  switchDetails = brightClass => {
    const {status} = this.state
    switch (status) {
      case detailsStatus.loading:
        return this.loading(brightClass)
      case detailsStatus.success:
        return this.success(brightClass)
      case detailsStatus.failure:
        return <Failure retryApi={this.retryApi} />
      default:
        return null
    }
  }

  loading = light => (
    <LoaderContainer data-testid="loader" light={light}>
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </LoaderContainer>
  )

  activeLike = () =>
    this.setState(prevState => ({like: !prevState.like, dislike: false}))

  activeDisLike = () =>
    this.setState(prevState => ({dislike: !prevState.dislike, like: false}))

  success = light => {
    const {list, like, dislike, saved} = this.state

    const {
      id,
      title,
      videoUrl,
      channelName,
      thumbnailUrl,
      profileImageUrl,
      viewCount,
      subscriberCount,
      publishedAt,
      description,
    } = list

    let diffDate = formatDistanceToNow(new Date(publishedAt))

    const arrayItem = diffDate.split(' ')
    if (arrayItem.length === 2)
      diffDate = arrayItem[0].concat(' ', arrayItem[1], ' ago')
    else diffDate = arrayItem[1].concat(' ', arrayItem[2], ' ago')

    return (
      <Bright.Consumer>
        {value => {
          const {videos, savedVideos} = value

          const activeSaved = event => {
            this.setState(prevState => ({saved: !prevState.saved}))
            savedVideos(list)
          }
          const checkSaved = videos.some(eachItem => eachItem.id === id)

          return (
            <>
              <VideoContainer data-testid="videoItemDetails" light={light}>
                <VideoPlayer videoURL={videoUrl} className="videoPlayer" />

                <Heading light={light}>{title}</Heading>
                <Ul>
                  <VideoDetailsList>
                    <Paragraph>
                      {viewCount} views . {diffDate}
                    </Paragraph>
                  </VideoDetailsList>

                  <VideoDetailsList>
                    <LikesContainer>
                      <IconButton onClick={this.activeLike} active={like}>
                        <BiLike />
                      </IconButton>

                      <ParagraphIcon active={like}>Like</ParagraphIcon>

                      <IconButton onClick={this.activeDisLike} active={dislike}>
                        <BiDislike />
                      </IconButton>
                      <ParagraphIcon active={dislike}>Dislike</ParagraphIcon>
                      <IconButton onClick={activeSaved} active={checkSaved}>
                        <MdPlaylistAdd />
                      </IconButton>
                      {saved === true ? (
                        <ParagraphIcon active={checkSaved}>Saved</ParagraphIcon>
                      ) : (
                        <ParagraphIcon active={checkSaved}>Save</ParagraphIcon>
                      )}
                    </LikesContainer>
                  </VideoDetailsList>
                  <hr />
                </Ul>
                <VideoDescription>
                  <img
                    src={profileImageUrl}
                    alt="profile"
                    className="profileImage"
                  />
                  <VideoNameContainer>
                    <VideoNameContainer>
                      <Heading light={light}>{channelName}</Heading>
                      <Paragraph>{subscriberCount} subscribers</Paragraph>
                    </VideoNameContainer>
                    <DescriptionContainer>
                      <Paragraph>{description}</Paragraph>
                    </DescriptionContainer>
                  </VideoNameContainer>
                </VideoDescription>
              </VideoContainer>
            </>
          )
        }}
      </Bright.Consumer>
    )
  }

  retryAPi = () => this.getDetails()

  render() {
    return (
      <Bright.Consumer>
        {value => {
          const {light, changeBright} = value

          return (
            <>
              <Header />
              <BottomContainer>
                <SideBar />
                <Container light={light}>
                  <BelowPremium light={light}>
                    {this.switchDetails(light)}
                  </BelowPremium>
                </Container>
              </BottomContainer>
            </>
          )
        }}
      </Bright.Consumer>
    )
  }
}
export default VideoItemDetailsRoute
