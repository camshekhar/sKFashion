import styled from "styled-components"
import * as Icon from "react-bootstrap-icons";
import { mobile } from "../../responsive";

const Container = styled.div`
height: 40px;
background-color: #3c1a00;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: 500;
${mobile({ fontSize: "12px"})}

`;
const AnnouncementMessage = styled.div`
  
`;

const SignUp = styled.a`
  color: yellow;

`;
const Announcement = () => {
  return (
    <Container>
      <Icon.MegaphoneFill/>
      <Icon.Soundwave style={{marginRight: "5px"}}/>
      <AnnouncementMessage>Super Deal! Free Shipping on Orders Above Rs.500. <SignUp>Sign up Now</SignUp></AnnouncementMessage>
    </Container>
  )
}

export default Announcement