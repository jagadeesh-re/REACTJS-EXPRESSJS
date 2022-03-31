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
export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  background-color: ${props => (props.light ? '#f9f9f9 ' : '#0f0f0f ')};
`

export const Heading = styled.h1`
  color: ${props => (props.light ? ' #1e293b' : '#f9f9f9')};
  font-size: 15px;
`

export const Paragraph = styled.p`
  color: ${props => (props.light ? '#64748b' : '#909090')};
`

export const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px;
  width: 53%;
`

export const VideoDetailsList = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  margin-left: auto;
  flex-wrap: wrap;
`
export const LikesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-left: auto;
  width: 250px;
`
export const IconButton = styled.button`
  color: #909090;
  font-size: 20px;
  border: 0px;
  background-color: transparent;
  cursor: pointer;
  color: ${props => (props.active ? ' #2563eb' : '#64748b ')};
`
export const VideoDescription = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`

export const VideoNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const DescriptionContainer = styled.div`
  margin-top: 10px;
`

export const ParagraphIcon = styled.button`
  color: ${props => (props.active ? ' #2563eb' : '#64748b ')};
  border: 0px;
  background-color: transparent;
`
