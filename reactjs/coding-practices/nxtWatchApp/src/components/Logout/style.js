import styled from 'styled-components'

export const Button = styled.button`
  border-color: ${props => (props.light === true ? '#3b82f6' : 'white')};
  width: 100px;
  color: ${props => (props.light === true ? '#3b82f6' : '#ffffff')};
  font-weight: bold;
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  height: 30px;
  margin-left: 10px;
  background-color: transparent;
  @media (max-width: 767px) {
    display: none;
  }
`

export const Paragraph = styled.p`
  color: ${props => (props.light === true ? null : 'white')};
`
