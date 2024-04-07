import styled from "styled-components"
import * as Icon from "react-bootstrap-icons";
import { mobile } from "../../responsive";


const Container = styled.div`
height: 80px;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: 500;
padding: 20px;
margin: 20px 0;
gap: 4rem;
${mobile({ display: "none"})}

`;

const Shipping = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: #f86f06;
padding: 20px;
font-size: 16px;
font-weight: 600;
gap: 1rem;
border-radius: 10px;

`;

const Payment = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: #f86f06;
padding: 20px;
font-size: 16px;
font-weight: 600;
gap: 1rem;
border-radius: 10px;

`;

const Support = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: #f86f06;
padding: 20px;
font-size: 16px;
font-weight: 600;
gap: 1rem;
border-radius: 10px;

`;

const Features = () => {
  return (
    <Container>
        <Shipping><Icon.Box style={{color: "#812703", fontSize: "20px"}}/> Free Shipping</Shipping>
        <Payment><Icon.Wallet style={{color: "#812703", fontSize: "20px"}}/> Flexible Payment</Payment>
        <Support><Icon.Headset style={{color: "#812703", fontSize: "20px"}}/> 24x7 Support</Support>
    </Container>
  )
}

export default Features