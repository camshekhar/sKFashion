import React, { useState, useEffect } from 'react';
import Announcement from '../components/home/Announcement'
import styled from 'styled-components';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import Newsletter from '../components/home/Newsletter';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';

const Container = styled.div`
display: flex;
height: 50vh;
margin: 10px;
${mobile({ flexDirection: "column", height: "auto", marginBottom: "30px" })}

`;
const Left = styled.div`
display: flex;
flex: 1;
margin-right: 10px;
height: 100%;
  
`;

const Hr = styled.hr`
  border: 1px solid #b92c2c;
`;
const Summary = styled.div`
  margin-left: 10px;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  padding: 20px;
  height: 100%;
  width: 100%;
  background-color: #f9cfb8;
  display: flex;
  flex-direction: column;
  ${mobile({ margin: "10px 0px" })}
`;
const SummaryTitle = styled.h3`
  font-weight: 400;
  font-size: 22px;

  text-align: center;
`;
const SummaryItem = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "600"};
`;
const SummaryItemText = styled.span``;
const MainButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: #ff6200;
  color: white;
  font-weight: 600;
  border: none;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  &:hover{
    background-color: #ff5100;
  }
  ${mobile({})}

`;


const Right = styled.div`
display: flex;
flex: 2;
width: 100%;
height: 100%;
`;
const Title = styled.h3`
  font-weight: 600;
  font-size: 25px;  
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid lightgray;
  background-color: #cce4f8;
  border-radius: 5px;
  /* justify-content: center; */
  align-items: center;
  /* margin-bottom: 10px; */
  margin-right: 10px;
  ${mobile({ margin: "20px 10px 0px 0px", height: "80vh" })}
`;

const FormData = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Input = styled.input`
  display: flex;
  flex-wrap: wrap;
  height: 40px;
  min-width: 40%;
  font-size: 0.8rem;
  border: 1px solid orange;
  border-radius: 5px;
  margin: 0px 10px 10px 0px;
`;
const TextArea = styled.textarea`
  display: flex;
  flex-wrap: wrap;
  height: 60px;
  min-width: 81%;
  font-size: 0.8rem;
  border: 1px solid orange;
  border-radius: 5px;
  margin: 10px;
  margin-left: 0px;
  ${mobile({ marginTop: "0px" })}

`;
const Checkout = () => {
  const [cartitems, setCartitems] = useState([]);
  var totalCartPrice = 0.00;
  // const navigate = useNavigate();
  useEffect(() => {
    async function getCartItems() {
      try {
        const cartitems = await axios.get("/api/cart/");
        setCartitems(cartitems.data);
        // console.log(cartitems.data);
      } catch (error) {
        // console.log(error);
      }
    }
    getCartItems();
   
  }, [cartitems]);

  cartitems.map((item, i) => {
    return totalCartPrice += item.price * item.quantity;
  })

  return (
    <>
       <Announcement/>
       <Navbar/>
       <Container>
         <Left>
         <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <Hr />
            <SummaryItem>
              <SummaryItemText>Sub Total:</SummaryItemText>

              <SummaryItemText>&#8377;{totalCartPrice}</SummaryItemText>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Estimated Shipping:</SummaryItemText>
              <SummaryItemText>&#8377;100</SummaryItemText>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount:</SummaryItemText>
              <SummaryItemText>-&#8377;100</SummaryItemText>
            </SummaryItem>
            <Hr />
            <SummaryItem type="total">
              <SummaryItemText>Total:</SummaryItemText>
              <SummaryItemText>&#8377;{totalCartPrice}</SummaryItemText>
            </SummaryItem>
            
          </Summary>

         </Left>
         <Right>
          <Form>
         <Title><u>Basic Information</u></Title>
            <FormData>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input type={"phone"} placeholder="Phone Number" />
            <Input type={"email"} placeholder="Email Address" />
            <TextArea placeholder="Full Address" />
            <Input placeholder="City" />
            <Input placeholder="State" />
            <Input placeholder="Pincode" />
            <Link to={`#`}><MainButton>Place Order</MainButton></Link>
            </FormData>
          </Form>
         </Right>
       </Container>
       <Newsletter/>
       <Footer/>
  
    </>
  )
}

export default Checkout