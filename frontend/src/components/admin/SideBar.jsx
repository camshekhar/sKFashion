import React from 'react'
import styled from 'styled-components'
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import "./SideBar.css";


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


const handleSalesButton = (e) => {
    e.preventDefault()
    const button = document.getElementById('salesBtn');
    button.classList.add('active');
    navigate('/admin/totalSales')
   

}

const handleCustomerButton = (e) => {
  e.preventDefault()
  const button = document.getElementById('customerBtn');
  button.classList.add('active');
  navigate('/admin/customers')

}

  return (
    <>
        <Container>
            <button className="btn btn-success w-100 p-4" id="salesBtn" onClick={handleSalesButton}>Total Sales <Icon.CaretRightFill/> </button>
            <button className="btn btn-primary w-100 p-4" id="customerBtn" onFocus={handleCustomerButton}>Customers <Icon.CaretRightFill/> </button>
            <button className="btn btn-warning w-100 p-4">Orders <Icon.CaretRightFill/> </button>
            <button className="btn btn-secondary w-100 p-4">Products <Icon.CaretRightFill/> </button>
            <button className="btn btn-danger w-100 p-4"><Icon.XCircle/> Logout</button>
        </Container>
    </>
  )
}

export default SideBar