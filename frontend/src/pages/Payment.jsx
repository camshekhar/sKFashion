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

import QR from "../images/my-qr-code.jpg";
import { isDisabled } from "@testing-library/user-event/dist/utils";


const Container = styled.div`
  display: flex;
  /* height: 50vh; */
  margin: 1rem;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column", height: "auto", marginBottom: "30px" })}
`;
const Left = styled.div`
  display: flex;
  flex: 1;
  margin-left: 1rem;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Hr = styled.hr`
  border: 1px solid #b92c2c;
`;

const MainButton = styled.button`
  width: 70%;
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
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 100%;
  margin-left: 1rem;
  /* justify-content: center; */
  /* align-items: center; */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px;
  border: 1px solid lightgray;
  background-color: #e0ecf7;
  margin-bottom: 1rem;
  border-radius: 5px;
  /* justify-content: center; */
  align-items: center;
  /* margin-bottom: 10px; */
  margin-right: 10px;
  ${mobile({ margin: "20px 10px 0px 0px", height: "10vh" })}
`;

const QRCode = styled.img`
    max-width: 50%;
    margin-bottom: 1rem;
    /* max-height: 400px; */
`;
const Input = styled.input`
  display: flex;
  flex-wrap: wrap;
  height: 40px;
  max-width: 70%;
  font-size: 0.8rem;
  border: 1px solid #89c1f6;
  border-radius: 5px;
  margin: 0px 10px 10px 0px;
`;



const ConfirmOrder = styled.button`
  width: 60%;
  padding: 8px;
  background-color: #d88304;
  color: white;
  font-weight: 600;
  border: none;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;

  &:hover {
    background-color: #ff5100;
  }
`;

const Payment = () => {
  const [cartitems, setCartitems] = useState([]);
//   const [addresses, setAddresses] = useState([]);
  const cust_id = localStorage.getItem("cust_id");
  const navigate = useNavigate();
  var ccount = 1;
  var Qcount = 1;

    

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


  

  const handleTID = () =>{
    var tid = document.getElementById('transaction_id').value;
    localStorage.setItem("transaction_id", tid);
  }

  const handleQRMode = () =>{
    const temp = document.getElementById('transaction_id')
    temp.disabled = false
      localStorage.setItem("paymentMode", "UPI QR Code");
   
  }

  const handleCODMode = () =>{

    const temp = document.getElementById('transaction_id')
    temp.disabled = true
      localStorage.setItem("paymentMode", "COD");
      localStorage.setItem("transaction_id", "000000000000")

  }

  const handleConfirmOrder = (e) => {
    
    e.preventDefault();
    var subtotal = 0;
    var total = 0;
    var products = [];

    cartitems.map((item, i) => {
        products.push(item)
        subtotal = subtotal+parseInt(item.price, 10);
        total += (item.price*item.quantity);
    });

    // var paymentMode
  
    const actualData = {
    //   id: Math.floor((Math.random() * 100) + 1),
      cust: localStorage.getItem("cust_id"),
      prod: products,
      add: localStorage.getItem("add_id"),
      subTotal: subtotal,
      discount: 0,
      total: total,
      paymentMode: localStorage.getItem("paymentMode"),
      transaction_id: localStorage.getItem("transaction_id"),
    };
   
    console.log(actualData);

    cartitems.forEach(cartitem => {
     
        // async function getStock() {
        //   try {
          var stock;
            axios.get(`/api/getStockCount/${cartitem.prod}`).then(res =>{
              // console.log(res.data)
              if(res.data > 0){
                axios.post(`/api/saveOrderDetail/`, actualData).then((res) => {
                  if (res.data) {
                    swal("Order Placed SuccessFully", "Thanks For Shopping With Us", "success");
                    cartitems.forEach(cartitem => {
                      axios.put(`/api/updateProdStock/${cartitem.prod}/${cartitem.quantity}/`);
                    });
                    axios.delete(`/api/emptyOrderedCart/${cust_id}/`);
                    localStorage.removeItem("paymentMode")
                    localStorage.removeItem("add_id")
                    localStorage.removeItem("transaction_id")
                    localStorage.removeItem("totalCartPrice")
            
                    navigate("/myOrders");
                  }else{
                    navigate("/cart");
                    swal("Order Not Placed!", "Something Went Wrong. Try Again", "warning");
            
                  }
                });
              }
              else{
                navigate("/cart");

                swal("Order Not Placed!", "Some Item is Out of Stock", "error");

              }
            });
          
            console.log(stock);
        //   } catch (error) {
        //     // console.log(error);
        //   }
        // }
        // getStock();
      })

    
  
  }
  return (
    <>
      <Announcement />
      <Navbar />
      <hr/>
      <h3 className="text-center text-decoration-underline mb-4">Choose Your Payment Mode: </h3>
      <h4 className="text-center text-success">Total Order Amount: <strong>&#8377;{localStorage.getItem("totalCartPrice")}</strong></h4>
      <Container>
      <Form className="form-control">
        <Left>
            
          <p>
          <input type="radio" id="qr" name="paymentMode" onClick={handleQRMode}/> Pay Using QR Code</p>
          <QRCode src={QR}/>
       
            <label> Transaction ID:</label>
            <Input className="form-control" id = "transaction_id" placeholder="Enter 12-digit Transaction ID" onChange={handleTID} maxLength={12}/>

        </Left>
        <Right>
            <p>Other Payment Options: </p>
 

          <h3 style={{fontSize: "1.2rem"}}><input type="radio" id="cod" name="paymentMode" onClick={handleCODMode}/> Cash On Delivery(COD)</h3>

          
        </Right>
        </Form>
        
      </Container>
      <div className="text-center">
<ConfirmOrder onClick={handleConfirmOrder}>Confirm Order</ConfirmOrder>

</div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Payment;
