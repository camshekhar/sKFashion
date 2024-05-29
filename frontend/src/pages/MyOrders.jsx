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
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: #ff5100;
  }
`;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const cust_id = localStorage.getItem("cust_id");
  const navigate = useNavigate();

  useEffect(() => {
    async function getMyOrders() {
      try {
        const order = await axios.get(`/api/getMyOrders/${cust_id}`);
        setOrders(order.data);
        // console.log(cartitems.data);
      } catch (error) {
        // console.log(error);
      }
    }
    getMyOrders();
  }, [cust_id, orders]);

  // console.log(orders);
 
// var sorted_orders = orders.reverse();

  const showInvoice = (e, order_id) =>{
    e.preventDefault();
    localStorage.setItem("order_id", order_id);
    navigate('/orderInvoice')
  }
const cancelOrder = (e, order_id) =>{
  e.preventDefault()
  axios.put(`/api/cancelOrder/${order_id}/`);
  navigate('/myOrders')
  swal("Order Cancelled", "Order Cancelled Successfully", "success");

  //  thisClicked.closest("div").remove();
}

var cancel;

  var myOrders;
  if (orders.length > 0) {
    myOrders = (
      orders.map((order, i) => (
        <div className="card my-3 mx-4" id="od" style={{ maxWidth: "100%" }}>
          <h6 className="mx-4 mt-2">Order ID: {order.id}</h6>

          {order.prod.map((prod, i) => (
            <div className="row g-0">
              <div className="col-md-3">
                <img
                  src={`http://localhost:8000${prod.image}`}
                  className="img-fluid rounded-start"
                  alt="..."
                  style={{maxHeight: "300px", marginLeft: "10px", padding: "10px", width: "200px"}}
                />
              </div>
              <div className="col-md-5">
                <div className="card-body">
                 <h5 className="card-title">Item Name: {prod.title}</h5>
                  <p className="card-text">{prod.desc}</p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      Item Price: &#8377;{prod.price}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      Item Quantity: {prod.quantity}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      Payment Status: {order.paymentStatus.toUpperCase()}
                    </small>
                  </p>
                  {/* <p 
                  {/* <p className="card-text">
                    <small className="text-body-secondary">
                      Mobile: {order.mobile}
                    </small>
                  </p> */}
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-body">

                <p>
            <small className="text-body-secondary">
              Total Order Amount: <strong>&#8377;{order.total}</strong> 
            </small>
          </p>
                  
                  <button className="btn btn-success mb-4" onClick={(e) => showInvoice(e, order.id)}>
                   <Icon.Receipt/>  Show Invoice
                  </button><br/>
                  {/* {cancel = ( " " ) ? order.transit_status.toLowerCase() == "cancelled" : cancel =( <button className="btn btn-danger mb-4" onClick={(e) => cancelOrder(e, order.id)}><Icon.XCircle /> Cancel Order</button>)}
                  {cancel} */}

{order.transit_status.toLowerCase() === "cancelled" ? (
        <span className="bg-danger text-white p-2">Order is Cancelled</span>
      ) : (
        <button className="btn btn-danger mb-4" onClick={(e) => cancelOrder(e, order.id)}>
          <Icon.XCircle /> Cancel Order
        </button>
      )}
                </div>
              </div>
            </div>
          ))}
          <h6 className="text-center">Current Tracking Status: <strong className="btn btn-warning"><Icon.Truck /> {order.transit_status}</strong></h6>

      {/* <Test/> */}
           
        </div>

      ))
    )
    
  }
  else{

    myOrders = (
      <section className="card card-body text-center">
        <h3>😔 Ohh! It Seems you didn't purchased anything yet. 😔</h3>
        <Link to={'/'}><button className="btn btn-success float-center mt-4" style={{maxWidth: "300px"}}>Continue Shopping</button></Link>
      </section>
    )
  }

  return (
    <>
      <Announcement />
      <Navbar />
      <hr />
      <div className="container">
        <h3 className="text-center text-decoration-none">My Orders</h3>
        {myOrders}
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default MyOrders;
