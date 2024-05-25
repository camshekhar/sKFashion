import React, { useState, useEffect } from "react";
import styled from "styled-components";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../../responsive";
import * as Icon from "react-bootstrap-icons";
import swal from "sweetalert";

import CanvasJSReact from '@canvasjs/react-charts';
import Navigation from "./Navigation";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #e2ecf6;
    flex: 3;
    width: 100%;
    height: 85vh;
    padding: 2rem;
`;
const ReportBox = styled.div`
    width: 150px;
    background-color: teal;
    color: white;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 500;

`;
const Customers = () => {
  const [customers, setcustomers] = useState([]);

  useEffect(() => {
    async function getCustomers() {
      try {
        const customer = await axios.get(`/api/customers`);
        setcustomers(customer.data);
        // console.log(cartitems.data);
      } catch (error) {
        // console.log(error);
      }
    }
    getCustomers();
  }, []);

  const total_customers = customers.length;

  // customers.forEach(order => {
  //   total_revenue += parseInt(order.total);
  //   total_prod_sold += parseInt(order.prod.length)
  // });

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    axisY: {
        includeZero: true
    },

    title: {
      text: "Weekly Sales Report"
    },
    data: [{        
      type: "column",  
      dataPoints: [
        { label: "Monday",  y: 10  },
        { label: "Tuesday", y: 15  },
        { label: "Wednesday", y: 25  },
        { label: "Thursday",  y: 30  },
        { label: "Friday",  y: 28  },
        { label: "Saturday",  y: 28  },
        { label: "Sunday",  y: 28  },
      ]
    }]
  }

  return (
    <>

        <Navigation/>
      <div className="container-fluid d-flex gap-2 mt-2">
        <SideBar/>
        <Container>
        <h3 className="text-center text-decoration-none">Registered Customers</h3>

           <div className="d-flex justify-content-between mb-4 mt-4">
           <ReportBox>
               <span>Total Customers:</span> 
               <span>{total_customers}</span>
            </ReportBox>
            <ReportBox>
               <span>Total Revenue:</span> 
               {/* <span>&#8377;{total_revenue}</span> */}
            </ReportBox>

            <ReportBox>
               <span>Products Sold:</span> 
               {/* <span>{total_prod_sold}</span> */}
            </ReportBox>
           </div>
            <CanvasJSChart options={options} />
    
        </Container>
        
      </div>
      </>
    
  );
};

export default Customers;
