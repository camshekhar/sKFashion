import React, { useState } from 'react'
import styled from 'styled-components'
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import "./SideBar.css";
import { useDispatch } from 'react-redux';
import { getToken, removeToken } from "../../services/LocalStorageService";
import { unSetUserToken } from "../../features/authSlice";
import swal from 'sweetalert';
import { useGetLoggedUserQuery } from "../../services/userAuthApi";


const Container = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
    background-color: lightblue;
    flex: 2;
    max-width: 300px;
    align-items: center;
    justify-content: space-between;
    height: 85vh;
    padding: 20px;
    border-radius: 10px;
`;



const SideBar = () => {
  
const navigate = useNavigate();


const handleSalesButton = () => {
    // e.preventDefault()
  const button = document.getElementById('salesBtn');
  button.classList.toggle('active-btn')
  navigate('/admin/totalSales')
}

const handleCustomerButton = (e) => {
  e.preventDefault()
  const button = document.getElementById('customerBtn');
  button.classList.toggle('active-btn')
  navigate('/admin/customers')
}

const handleProductsButton = (e) => {
  e.preventDefault()
  const button = document.getElementById('customerBtn');
  button.classList.toggle('active-btn')
  navigate('/admin/products')
}

const dispatch = useDispatch();
const handleLogout = (e) => {
    e.preventDefault();
    dispatch(unSetUserToken({ access_token: null }))
    removeToken();
    localStorage.clear();
    sessionStorage.clear();
    navigate('/admin-login');
    swal("Logout Success", "Admin Logged Out Successfully", "success");
}
  return (
    <>
        <Container>
            <button className="btn btn-success w-100 p-4 fw-bold" id="salesBtn" onClick={handleSalesButton}>Total Sales <Icon.CaretRightFill/> </button>
            <button className="btn btn-primary w-100 p-4 fw-bold" id="customerBtn" onClick={handleCustomerButton}>Customers <Icon.CaretRightFill/> </button>
            <button className="btn btn-warning w-100 p-4 fw-bold" id="productsBtn" onClick={handleProductsButton}>Products <Icon.CaretRightFill/> </button>
            <button className="btn btn-danger w-100 p-4 fw-bold" onClick={handleLogout}><Icon.XCircle/> Logout</button>
        </Container>
    </>
  )
}

export default SideBar