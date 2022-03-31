import styled from 'styled-components'

export const VideosHeaderContainer = styled.ul`
  background-color: ${props => (props.light ? '#ebebeb' : '#181818')};
  display: flex;
  flex-direction: row;
  list-style-type: none;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10%;
  color: ${props => (props.light ? '#ebebeb' : ' #313131')};
`
export const HeadingItem = styled.li`
  margin-left: 10px;
  color: ${props => (props.light ? '#0f0f0f' : 'white')};
`
export const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  color: red;
  background-color: ${props => (props.light ? '#cbd5e1' : '#0f0f0f')};
`
