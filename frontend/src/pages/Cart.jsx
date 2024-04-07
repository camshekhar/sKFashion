import Announcement from "../components/home/Announcement";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import Newsletter from "../components/home/Newsletter";
import * as Icon from "react-bootstrap-icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from 'sweetalert';


const Container = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h2`
  text-decoration: underline;
  font-weight: 400;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;
const TopButton = styled.button`
  padding: 5px;
  font-weight: 400;
  cursor: pointer;
  border: none;
  background-color: ${(props) =>
    props.type === "filled" ? "#ff6200" : "teal"};
  color: white;

  &:hover {
    font-weight: 500;
    border: none;
    background-color: ${(props) =>
      props.type === "continueShopping" ? "teal" : "#ff5100"};
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border: 1px solid lightgray;
  padding: 5px;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  max-height: 200px;
  object-fit: cover;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span`
  ${mobile({ fontSize: "14px" })}
`;
const ProductId = styled.span`
  ${mobile({ fontSize: "12px" })}
`;
const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: ${(props) => props.color};
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    border: 1px solid gray;
  }
`;
const ProductSize = styled.span``;
const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({margin: "10px", flexDirection: "row", justifyContent: "space-between", alignItems: "center" })}
`;

const Remove = styled.button`
  border: none;
  background-color: red;
  color: white;
  font-weight: bolder;
  width: 50px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  &:hover {
    transform: scale(1.1);
  }
  ${mobile({margin: "0px"})}

`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  ${mobile({margin: "0px"})}

`;

const Ic = styled.button`
  border: none;
  border-radius: 30%;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  &:hover {
    background-color: #e5f8f6;
    transform: scale(1.1);
  }
`;
const ProductAmount = styled.span`
  display: flex;
  width: 30px;
  height: 18px;
  border: 1px solid teal;
  border-radius: 10%;
  font-size: 12px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const ProductPrice = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const Hr = styled.hr`
  border: 0.5px solid #a7a2a2;
`;
const Summary = styled.div`
  margin-left: 10px;
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  padding: 20px;
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${mobile({ margin: "10px 0px 0px 0px" })}
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

  &:hover{
    background-color: #ff5100;
  }
`;



const Cart = () => {
  const [cartitems, setCartitems] = useState([]);
  var totalCartPrice = 0.00;
  const navigate = useNavigate();

// Handling Increment and Decrement of products in Cart.
  const handleDecrement = (cart_id) => {
    setCartitems(cartitems =>
      cartitems.map((item) =>
        cart_id === item.id ? {...item, quantity: parseInt(item.quantity) - (parseInt(item.quantity) > 1 ? 1:0)} : item
      )
      );
      updateCartQuantity(cart_id, "dec")
  }
  const handleIncrement = (cart_id) => {
    setCartitems(cartitems =>
      cartitems.map((item) =>
        cart_id === item.id ? {...item, quantity: parseInt(item.quantity) + (parseInt(item.quantity) < 10 ? 1:0)} : item
      )      
      );
      updateCartQuantity(cart_id, "inc" )
  }



  useEffect(() => {
    async function getCartItems() {
      try {
        const cartitems = await axios.get("/api/cart/");
        setCartitems(cartitems.data);
        // console.log(cartitems.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCartItems();
    
  }, [cartitems]);

  function updateCartQuantity(cart_id, scope ){
   axios.put(`/api/updateCartQty/${cart_id}/${scope}/`).then(res =>{
     if (res.data.status === 200) {
       swal("Success","Quantity Changed" , "success");
     }
 
   })
 }

const deleteCartItem = (e, cart_id) =>{
  e.preventDefault();
  
  // const thisClicked = e.currentTarget[0];
  axios.delete(`/api/deleteCartItem/${cart_id}/`);
  navigate('/cart')
  swal("Item Removed", "Item removed from Cart.", "success");

  //  thisClicked.closest("div").remove();
}


  var cartHTML = "";
  if (cartitems.length > 0) {
    cartHTML = (
      <div>
      <Title>Cart Details</Title>
        <Top>
          <Link to="/">
            <TopButton type="continueShopping">Continue Shopping</TopButton>
          </Link>
          <TopTexts>
          <Link to="/cart">
            <TopText>Shopping Bag({cartitems.length})</TopText>
          </Link>

            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <Link to={`/checkout`}><TopButton type="filled">Checkout Now</TopButton></Link>
        </Top>
        <Bottom>
          <Info>
            {cartitems.map((item, i) => {
              totalCartPrice += item.price * item.quantity;
              return(
              <Product key={i}>
                <ProductDetails>
                  <Image src={item.image} />
                  <Details>
                    <ProductName>
                      <b>Product: </b>
                      {item.title}
                    </ProductName>
                    <ProductId>
                      <b>ID: </b>
                      {item.id}
                    </ProductId>
                    <ProductColor color={item.color} />
                    <ProductSize>
                      <b>Size: </b>
                      {item.size}
                    </ProductSize>
                  </Details>
                </ProductDetails>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Ic>
                      <Icon.DashSquare onClick={ () => handleDecrement(item.id)} />
                    </Ic>
                    <ProductAmount>{parseInt(item.quantity)}</ProductAmount>
                    <Ic>
                      <Icon.PlusSquare onClick={() => handleIncrement(item.id)}/>
                    </Ic>
                  </ProductAmountContainer>
                  <ProductPrice>&#8377;{(parseFloat(item.price) * parseInt(item.quantity))}</ProductPrice>
                  <Remove title="Remove Item" onClick={(e) => deleteCartItem(e, item.id)}>
                    <Icon.CartX />
                  </Remove>
                </PriceDetail>
              </Product>
            )})}
          </Info>

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
            <Link to={`/checkout`}><MainButton>CHECKOUT NOW</MainButton></Link>
          </Summary>
        </Bottom>
      </div>
    );
  } else {
     cartHTML = ( <div>
      <Title>Your Cart is Empty</Title>
      <Link to="/">
        <TopButton type="continueShopping">Continue Shopping</TopButton>
      </Link>
    </div>
     );
  }
  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <Wrapper>
        {cartHTML}
        </Wrapper>
        <Newsletter />
        <Footer />
      </Container>
    </>
  );

 
};

export default Cart;

