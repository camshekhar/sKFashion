import styled from "styled-components"
import * as Icon from "react-bootstrap-icons";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";

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

const Announcement = () => {
  return (
    <Container>
      <Icon.MegaphoneFill/>
      <Icon.Soundwave style={{marginRight: "5px"}}/>
      <AnnouncementMessage>Super Deal! Free Shipping on Orders Above Rs.500. <Link to={'/register'} style={{color: "yellow"}}>Sign up Now</Link></AnnouncementMessage>
    </Container>
  )
}

export default Announcement