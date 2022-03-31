import styled from 'styled-components'

export const Container = styled.div`
  border-style: solid;
  border-color: ${props => (props.light ? '#e2e8f0' : '#424242')};
  border-width: 2px;
  border-radius: 5px;
  height: 28px;
  background-color: ${props => (props.light ? '#f9f9f9 ' : '#181818')};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 261px;
  margin: 20px;
  color: ${props => (props.light ? null : 'white')};
`
export const ContainerSearch = styled.button`
  height: 25px;
  width: 52px;

  border-color: #e2e8f0;
  border-width: 1px;
  background-color: ${props => (props.light === true ? '#f1f5f9' : '#424242')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Input = styled.input`
  height: 24px;
  color: ${props => (props.light ? null : 'white')};
  outline: none;
  border: 0px;
  width: 220px;
  background-color: ${props => (props.light ? 'white' : 'transparent')};
`
