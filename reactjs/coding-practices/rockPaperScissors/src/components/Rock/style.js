import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  background-color: #223a5f;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const SecondContainer = styled.div`
  @media (min-width: 768px) {
    width: 700px;
  }
  @media (max-width: 767px) {
    width: 300px;
  }

  border: solid white;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  margin-top: 15px;
`

export const ScoreContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  width: 135px;
`

export const Paragraph = styled.p`
  width: 90px;
  color: ${props => (props.scoreTrue ? '#223a5f' : 'white')};
  font-family: 'Roboto';
  font-weight: bold;
  line-height: ${props => (props.scoreTrue ? 0 : 1.5)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: ${props => (props.scoreSize ? '35px' : null)};
`

export const ThirdContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 500px;
  margin-top: 50px;
`

export const Image = styled.img`
  width: ${props => (props.up ? '100%' : '200px')};
  padding: ${props => (props.up ? '10px' : null)};
`

export const Button = styled.button`
  border: 0px;
  background-color: ${props => (props.icon ? null : 'white')};
  background-color: ${props => (props.rps ? 'transparent' : 'white')};
  color: #223a5f;
  font-family: 'Roboto';
  min-width: ${props => (props.icon ? '20px' : '80px')};
  min-height: ${props => (props.icon ? '20px' : '45px')};
  border-radius: 5px;
  font-weight: bold;
  align-self: ${props => (props.play ? null : 'flex-end')};
  margin-right: ${props => (props.play ? null : '20px')};
`

export const IconButton = styled.button``

export const Icon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

export const Result = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 200px;
`
export const Heading = styled.h1`
  width: 90px;
  color: white;
  font-family: 'Bree Serif';
  font-weight: bold;
  line-height: ${props => (props.scoreTrue ? 0 : 1.5)};
  font-size: 25px;
`
