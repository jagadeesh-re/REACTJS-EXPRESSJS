import styled from 'styled-components'

export const SideBarContainer = styled.ul`
  list-style-type: none;
  background-color: ${props => (props.light === true ? 'white' : ' #231f20')};

  padding: 0px;
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) {
    width: 18vw;
    margin-top: 0px;
  }
`
export const Li = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 15px;
  color: ${props => (props.light ? '#0f0f0f' : ' #f9f9f9')};

  background-color: ${props =>
    (props.light === true && props.home === true) ||
    (props.light === true && props.trend === true) ||
    (props.light === true && props.game === true) ||
    (props.light === true && props.saved === true)
      ? '#f1f1f1'
      : null};
  background-color: ${props =>
    (props.light === true && props.home === false) ||
    (props.light === true && props.trend === false) ||
    (props.light === true && props.game === false) ||
    (props.light === true && props.saved === false)
      ? 'transparent'
      : null};
  background-color: ${props =>
    (props.light === false && props.home === true) ||
    (props.light === false && props.trend === true) ||
    (props.light === false && props.game === true) ||
    (props.light === false && props.saved === true)
      ? '#383838'
      : null};
  background-color: ${props =>
    (props.light === false && props.home === false) ||
    (props.light === false && props.trend === false) ||
    (props.light === false && props.game === false) ||
    (props.light === false && props.saved === false)
      ? 'transparent'
      : null};
`
export const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 10px;
  width: 18vw;

  background-color: ${props => (props.light === true ? 'white' : ' #231f20')};
  @media (max-width: 767px) {
    display: none;
  }
`

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 200px;
`

export const SocialIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`
export const Paragraph = styled.p`
  color: ${props => (props.light === true ? '#00306e' : 'white')};
  font-family: 'Roboto';
  font-weight:${props => (props.contact === true ? 'bold' : null)}
  font-size: 13px;
`
