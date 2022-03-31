import styled from 'styled-components'

export const LiItem = styled.li`
  width: 350px;
  height: 250px;
  box-shadow: 0px 0px 16px 0px #bfbfbf;
  border-radius: 20px;

  padding: 20px;

  margin-right: 20px;
  margin-bottom: 20px;
  background-color: ${props => (props.number === 0 ? '#ffc3be' : null)};
  background-color: ${props => (props.number === 1 ? '#c1dbbe' : null)};
  background-color: ${props => (props.number === 2 ? '#b99d9b' : null)};
  background-color: ${props => (props.number === 3 ? '#c3e0ff' : null)};
  background-color: ${props => (props.number === 4 ? '#a8947d' : null)};
  background-color: ${props => (props.number === 5 ? '#ffffff' : null)};
  background-color: ${props => (props.number === 6 ? '#f7fbff' : null)};

  background-color: ${props => (props.number === 7 ? '#a56041' : null)};
  background-color: ${props => (props.number === 8 ? '#9da99b' : null)};
  background-color: ${props => (props.number === 9 ? '#dee1e6' : null)};
`

export const Sh = styled.div``
