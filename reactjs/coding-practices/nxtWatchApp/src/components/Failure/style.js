import styled from 'styled-components'

export const FailureContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const FailureHeading = styled.h1`
  color: ${props => (props.light === true ? '#212121' : 'white')};
  font-size: 25px;
`

export const FailureParagraph = styled.p`
  color: #616e7c;
`

export const FailureButton = styled.button`
  border: 0px;
  background-color: #4f46e5;
  width: 130px;
  height: 40px;
  color: white;
  border-radius: 5px;
  font-family: 'Roboto';
`

export const Image = styled.img`
  width: 30%;
`
