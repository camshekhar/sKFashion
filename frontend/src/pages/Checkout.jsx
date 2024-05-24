import React, { useState, useEffect } from "react";
import Announcement from "../components/home/Announcement";
import styled from "styled-components";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import Newsletter from "../components/home/Newsletter";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../responsive";
import * as Icon from "react-bootstrap-icons";
import swal from "sweetalert";


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

  &:hover {
    background-color: #ff5100;
  }
  ${mobile({})}
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
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

// const FormData = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
//   margin-top: 10px;
//   margin-bottom: 10px;
// `;
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
// const TextArea = styled.textarea`
//   display: flex;
//   flex-wrap: wrap;
//   height: 60px;
//   min-width: 81%;
//   font-size: 0.8rem;
//   border: 1px solid orange;
//   border-radius: 5px;
//   margin: 10px;
//   margin-left: 0px;
//   ${mobile({ marginTop: "0px" })}
// `;

const SavedAddress = styled.div``;
const Address = styled.p`
  text-align: left;
  padding-left: 15px;
  padding-right: 5px;
`;


const AddButton = styled.button`
  width: 60%;
  padding: 8px;
  background-color: #d88304;
  color: white;
  font-weight: 600;
  border: none;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  &:hover {
    background-color: #ff5100;
  }
`;

const Checkout = () => {
  const [cartitems, setCartitems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const cust_id = localStorage.getItem("cust_id");
  const navigate = useNavigate();

  var totalCartPrice = 0.0;
  var count = 1;

  var add_id = -1;
  const handleAddress = () =>{
    count++;
    if(count%2 !==0 ){
      localStorage.removeItem("add_id");
    }else{
      localStorage.setItem("add_id", add_id);
    }
  }

  useEffect(() => {
    async function getCartItems() {
      try {
        const cartitems = await axios.get(`/api/cart/${cust_id}`);
        setCartitems(cartitems.data);
        // console.log(cartitems.data);
      } catch (error) {
        // console.log(error);
      }
    }
    getCartItems();
  }, [cust_id]);

  useEffect(() => {
    async function getAddress() {
      try {
        const address = await axios.get(`/api/getUserAddress/${cust_id}`);
        setAddresses(address.data);
        // console.log(cartitems.data);
      } catch (error) {
        // console.log(error);
      }
    }
    getAddress();
  }, [cust_id, addresses]);
  // console.log(cust_id);

  cartitems.map((item, i) => {
    return (totalCartPrice += item.price * item.quantity);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      id: Math.floor((Math.random() * 100) + 1),
      cust: localStorage.getItem("cust_id"),
      mobile: data.get('mobile'),
      street: data.get('street'),
      city: data.get('city'),
      email: data.get('email'),
      state: data.get('state'),
      pincode: data.get('pincode'),
      landmark: data.get('landmark'),
    };
   
    console.log(actualData);

    axios.post(`/api/addUserAddress/`, actualData).then((res) => {
      if (res.data) {
        swal("Address added Successfully", "Continue Your Shopping", "success");

        navigate("/checkout");
      }else{
        swal("Error Adding New Address", "PLease Try Again", "warning");
      }
    });
  
  }

  var savedAdd;

  if (addresses.length > 0) {
      savedAdd = ( 
      <SavedAddress className="my-4">
          <button
            className="btn btn-warning mb-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Select Saved Address <Icon.CaretDownSquareFill />
          </button>
     
        <div className="collapse  multi-collapse" id="collapseExample">
          {addresses.map((address ,i) => (
          <div className="card card-body" key={i}>
            {add_id = address.id}

            <Address>
              <input type="checkbox" name="addSelect" id="addr" onClick={handleAddress}/>
              <br />
              <strong>Address:</strong> {address.street}, ({address.landmark}), {address.city},{" "}
              {address.state} - {address.pincode}.<br />
              <strong>Mobile No:</strong> {address.mobile}<br/>
              <strong>Email:</strong> {address.email}

            </Address>
          </div>
          ))}
          <div className="mt-2 text-center">
          <Link to={`/payment`}>
        <MainButton style={{ width: "50%" }} onClick={localStorage.setItem('totalCartPrice', totalCartPrice)}>Pay Now</MainButton>
      </Link>
          </div>
        </div>
    
      </SavedAddress>
    )}
    else{
      savedAdd = (
        <SavedAddress className="my-4">
          <button
            className="btn btn-warning mb-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Select Saved Address <Icon.CaretDownSquareFill />
          </button>
     
        <div className="collapse  multi-collapse" id="collapseExample">
          <p className="text-center">No Saved Address Found!</p>
        </div>
    
      </SavedAddress>
      )
    }
  
  return (
    <>
      <Announcement />
      <Navbar />
      <hr/>
      <h1 className="text-center text-decoration-underline mb-4">Checkout Page</h1>
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
        {savedAdd}
        
        
          <div>
          <button
                className="btn btn-warning mb-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Add New Address <Icon.PlusSquareFill/>
              </button>
         
            <div className="collapse  multi-collapse" id="collapseExample">
              <div className="card card-body">
              <Form  onSubmit={handleSubmit}>
            <Title>
              <u>New Address</u>
            </Title>
            {/* <FormData> */}
              <Input type={"phone"} name="mobile" placeholder="Phone Number" />
              <Input type={"email"} name="email" placeholder="Email Address" />
              <Input placeholder="Street" name="street" />
              <Input placeholder="Landmarks" name="landmark" />
              <Input placeholder="City"  name="city"/>
              <Input placeholder="State"  name="state"/>
              <Input placeholder="Pincode" name="pincode" />
              <AddButton type="submit">Add Address</AddButton>
            {/* </FormData> */}
          </Form>
            
            </div>
          </div>
          </div>
          
        </Right>
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Checkout;
