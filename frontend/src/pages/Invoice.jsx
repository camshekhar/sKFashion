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
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import swal from "sweetalert";
import logo from "../images/logo.png";
import { getToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/userAuthApi";

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

const Logo = styled.h1`
  font-weight: bold;
  letter-spacing: 2.5px;
  padding-bottom: 5px;
`;
const LogoImg = styled.img`
  max-height: 45px;
  ${mobile({ maxHeight: "40px" })}
`;

const Invoice = () => {
  const [invoice, setInvoice] = useState([]);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState([]);


  const cust_id = localStorage.getItem("cust_id");
  const order_id = localStorage.getItem("order_id");

  // const invoice = [];

  useEffect(() => {
    async function getMyOrder() {
      try {
        const order = await axios.get(`/api/getInvoiceDetails/${order_id}`);
        setInvoice(order.data);
        setProducts(order.data.prod);
      } catch (error) {
        // console.log(error);
      }
    }
    getMyOrder();
  }, [order_id]);

  const date = new Date(invoice.date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const add_id = invoice.add
  console.log(add_id)

  // useEffect(() => {
  //   async function getCustomer() {
  //     try {
  //       const user = await axios.get(`/api/userProfile`);
  //       setCustomer(user.data);
  //     } catch (error) {
  //       // console.log(error);
  //     }
  //   }
  //   getCustomer();
  // }, [cust_id]);
  const { access_token } = getToken();
  const {data, isSuccess} = useGetLoggedUserQuery(access_token);
  // const cust_id = localStorage.getItem("cust_id");

  const [userData, setUserData] = useState({
    id: null,
    email: "",
    name: "",
    fname: "",
    lname: "",
    username: ""
  });

  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        id: data.id,
        email: data.email,
        fname: data.fname,
        lname: data.lname,
        username: data.username,
      })
      
    }
  }, [data, isSuccess]);

  console.log(userData)
  useEffect(() => {
    async function getAddress() {
      try {
        const add = await axios.get(`/api/getOrderAddress/${add_id}`);
        setAddress(add.data);
      } catch (error) {
        // console.log(error);
      }
    }
    getAddress();
  }, [add_id]);
  // console.log(invoice.prod)
 

  const generateInvoice = (e) => {
    e.preventDefault();

    const res = document.getElementById("od");

    html2canvas(res).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 50;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 15, 5, pdfWidth, pdfHeight);
      pdf.save(`OD${order_id}_download.pdf`);
    });
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <hr />
      <div className="container-fluid">
        <div id="od">
          <header
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <LogoImg src={logo} />
            <Logo>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                SkFashion
              </Link>
            </Logo>
          </header>
          <hr />
          <h3 className="text-center text-decoration-underline">
            Order Invoice
          </h3>

          <section className="d-flex justify-content-between mt-4">
            <h4 className="h3">Order ID: {invoice.id}</h4>
            <span className="float-end">Order Date: {formattedDate}</span>
          </section>

          <section className="card my-3 mx-4 p-4">
          <span className="text-end">Transaction ID: <strong>{invoice.transaction_id}</strong></span>

            <span>Customer Name: <strong>{userData.fname} {userData.lname} </strong></span>
            <span>Customer Name: <strong>{userData.email}</strong></span>

            <span>Customer Mobile: <strong>{address.mobile}</strong></span>
            <span>Customer Address: <strong>{address.street}, {address.city}, {address.state} - {address.pincode} </strong> </span>
            <span className="text-end">Payment Type: <strong>{invoice.paymentMode}</strong></span>
        
          </section>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Prod ID</th>
                <th scope="col">Prod Name</th>
                <th scope="col">Color</th>
                <th scope="col">Size</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">SubTotal</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {products.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{item.id}</th>
                  <td>{item.title}</td>
                  <td>{item.color}</td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>&#8377;{item.price}</td>
                  <td>&#8377;{item.price * item.quantity}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Shipping Charges:</td>
                <td>&#8377;{invoice.shippingCharge}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Discount:</td>
                <td> -&#8377;{invoice.shippingCharge}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total Amount:</td>
                <td> &#8377;{invoice.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-success text-center mb-4"
          onClick={generateInvoice}
        >
          Download Invoice <Icon.ArrowDownCircle />
        </button>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Invoice;
