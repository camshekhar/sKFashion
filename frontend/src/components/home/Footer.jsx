import styled from "styled-components";
import * as Icon from "react-bootstrap-icons";
import {mobile} from "../../responsive";
import { Link } from "react-router-dom";
import payImg from "../../images/pay.png"

const Container = styled.div`
    display: flex;
    margin: 20px;
    align-items: center;
    background-color: #3c1a00;
    color: #fff;
    justify-content: center;
  ${mobile({flexDirection: "column", margin: "0px", width: "100%"})}

`;

const Left = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h2`
    font-size: 30px;
    font-weight: 900;
  ${mobile({textAlign: "center"})}

`;

const Desc = styled.p`
margin: 10px 0px;
${mobile({textAlign: "center"})}

`;

const SocialContainer = styled.div`
    display: flex;
  ${mobile({justifyContent: "center"})}

`;

const SocialIcon = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #${props=>props.color};
    color: white;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-right: 20px;
`;
const Center = styled.div`
    width: 100%;
    flex: 1;
    padding: 20px;
  ${mobile({display: "none"})}

`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
  ${mobile({backgroundColor: "#f8efef", width: "100%"})}

    
`;

const Title = styled.h3`
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem = styled.li`
    width: 50%;
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    /* color: black; */
`;

const ContactItem = styled.div`
    margin: 10px 0;
    font-weight: 500;
    display: flex;
    align-items: center;
    /* color: black; */
`; 

const Payment = styled.img`
    max-width: 200px;
    max-height: 60px;
    top: 0;
    left: 0;
`;
const Footer = () => {
    const menFashion = "Men's Wear";
    const womenFashion = "Women's Wear";
    const accessories = "Accessories";


  return (
    <>
      <Container>
          <Left>
              <Logo>SkFashion</Logo>
              <Desc>“SkFashion” is a web application designed for online selling of Fashion products (like Clothing, Footwear, and apparel) for both Men and Women. </Desc>
              <SocialContainer>
                  <SocialIcon color="3B5999">
                      <Icon.Facebook/>
                  </SocialIcon >
                  <SocialIcon color="0077b5">
                      <Icon.Linkedin/>
                  </SocialIcon>
                  <SocialIcon color="E4405F">
                      <Icon.Instagram/>
                  </SocialIcon>
                  <SocialIcon color="55ACEE">
                      <Icon.Twitter/>
                  </SocialIcon>
              </SocialContainer>
          </Left>
          <Center>
              <Title>Useful Links</Title>
              <List>
                  <ListItem><Link to="/" style={{textDecoration: "none", color: "#fff"}}>Home</Link></ListItem>
                  <ListItem><Link to="/cart" style={{textDecoration: "none", color: "#fff"}}>Cart</Link></ListItem>
                  <ListItem><Link to={`/${menFashion}`} style={{textDecoration: "none", color: "#fff"}}>Men's Fashion</Link></ListItem>
                  <ListItem><Link to={`/${womenFashion}`} style={{textDecoration: "none", color: "#fff"}}>Women's Fashion</Link></ListItem>
                  <ListItem><Link to={`/${accessories}`} style={{textDecoration: "none", color: "#fff"}}>Accessories</Link></ListItem>
                  <ListItem><Link to="/login" style={{textDecoration: "none", color: "#fff"}}>My Account</Link></ListItem>
                  <ListItem><Link to="/myOrders" style={{textDecoration: "none", color: "#fff"}}>Order Tracking</Link></ListItem>
                  <ListItem>Wishlist</ListItem>
                  <ListItem><Link to={'/admin-login'} style={{textDecoration: "none", color: "#fff"}}>Admin</Link></ListItem>
                  <ListItem><Link to={'/contact-us'} style={{textDecoration: "none", color: "#fff"}}>Contact Us</Link></ListItem>
              </List>
          </Center>
          <Right>
              <Title>Contact</Title>
              <ContactItem>
                 <Icon.GeoAltFill style={{marginRight:"10px"}}/> At - DYPIMCA, Akurdi, Pune - 411035
              </ContactItem>
              <ContactItem>
               <Icon.TelephoneForwardFill style={{marginRight:"10px"}}/> +91-<a href="tel:9999999999" style={{textDecoration: "None"}}>9999999999</a>
              </ContactItem>
              <ContactItem>
              <Icon.EnvelopeOpenFill style={{marginRight:"10px"}}/><a href="mailto:contact@skfashion.com" style={{textDecoration: "None"}}>contact@skfashion.com</a>
              </ContactItem>
              <Payment src={payImg}/>
          </Right>
      </Container>
    </>
  );
};

export default Footer;
