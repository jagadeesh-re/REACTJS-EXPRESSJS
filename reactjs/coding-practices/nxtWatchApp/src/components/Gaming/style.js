import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${props => (props.light ? ' #f9f9f9' : '#0f0f0f ')};
`

export const BelowPremium = styled.div`
  height: 100%;
  width: 100%;
  flex-grow: 1;
  background-color: ${props => (props.light ? '#f9f9f9 ' : '#0f0f0f ')};
`

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  width: 100%;
  background-color: ${props => (props.light ? '#f9f9f9 ' : '#0f0f0f ')};
`

export const BottomContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
`
export const HomeContainer = styled.div`
  background-color: ${props => (props.light ? '#f9f9f9 ' : '#0f0f0f ')};
`

export const HomeContainerVideosList = styled.ul`
  list-style-type: none;
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 5%;
`
export const VideoItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 20px;
  margin-right: 30px;
  @media (min-width: 768px) {
    width: 200px;
  }
  @media (max-width: 768px) {
    width: 250px;
  }
`

export const VideoParagraph = styled.p`
  color: ${props => (props.light ? '#00306e' : 'white')};
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: bold;

  width: 250px;
`
export const ChannelName = styled.p`
  color: #616e7c;
`
export const ViewCount = styled.p`
  color: #616e7c;
  margin-top: 0px;
`
