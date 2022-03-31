import styled from 'styled-components'

export const EmptyContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const EmptyHeading = styled.h1`
  color: ${props => (props.light === true ? '#212121' : 'white')};
  font-size: 25px;
`

export const EmptyParagraph = styled.p`
  color: #616e7c;
`

export const EmptyButton = styled.button`
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
