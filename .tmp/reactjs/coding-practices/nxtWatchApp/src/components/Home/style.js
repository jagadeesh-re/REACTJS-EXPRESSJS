import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${props => (props.light ? '#f9f9f9 ' : '#181818')};
`

export const BelowPremium = styled.div`
  height: 100%;
  width: 100%;
  flex-grow: 1;
  background-color: ${props => (props.light ? '#f9f9f9 ' : '#181818')};
`

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  width: 100%;
  background-color: ${props => (props.light ? '#f9f9f9 ' : '#181818')};
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
  background-color: ${props => (props.light ? '#f9f9f9 ' : '#181818')};
`

export const HomeContainerVideosList = styled.ul`
  list-style-type: none;
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`
export const VideoItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: 768px) {
    width: 350px;
  }
  @media (max-width: 768px) {
    min-width: 280px;
  }

  margin-right: 30px;
`

export const VideoParagraph = styled.p`
  color: ${props => (props.light ? '#00306e' : 'white')};
  font-family: 'Roboto';
  font-size: 15px;
  line-height: 1.5;
  width: 250px;
`
export const ChannelName = styled.p`
  color: #616e7c;
  line-height: 0;
`
export const ViewCount = styled.p`
  color: #616e7c;
  line-height: 1.5;
`
