import styled from 'styled-components'

export const Button = styled.button`
  border-color: ${props => (props.light === true ? '#3b82f6' : 'white')};
  width: 100px;
  color: ${props => (props.light === true ? '#3b82f6' : 'white')};
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
export const NavContainer = styled.ul`
  padding: 20px;
  background-color: ${props => (props.light === true ? 'white' : '#0f0f0f')};

  @media (min-width: 768px) {
    margin-bottom: 0px;
  }
  @media (max-width: 767px) {
    min-height: 15vh;
  }
`
export const Hello = styled.h1`
  color: ${props => (props.light === true ? 'red' : '#0f0f0f')};
`
export const IconButton = styled.button`
  color: ${props => (props.light === true ? null : '#ffffff')};
  background-color: transparent;
  border: 0px;
  font-size: 25px;
  cursor: pointer;
`
