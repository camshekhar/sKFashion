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
    /* height: 85vh; */
    padding: 2rem;
`;
const ReportBox = styled.div`
    /* width: 150px; */
    /* background-color: teal; */
    color: white;
    padding: 15px;
    border-radius: 50%;
    height: 200px;

    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    font-weight: 500;

`;
const Customers = () => {
  const [customers, setcustomers] = useState([]);
  const [custAdd, setcustAdd] = useState([]);


  useEffect(() => {
    async function getCustomers() {
      try {
        const customer = await axios.get(`/api/getCustomers`);
        setcustomers(customer.data);
        // console.log(cartitems.data);
      } catch (error) {
        // console.log(error);
      }
    }
    getCustomers();
  }, []);

  const total_customers = customers.length;
  var weeklyRegistration = {};
  var weeklyData = [];

  customers.forEach(customer => {
    // console.log(customer.created_at)
    const date = new Date(customer.created_at);
    const dt = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", dt);
  
    if (formattedDate in weeklyRegistration) {
      weeklyRegistration[formattedDate] += 1;
    } else {
      weeklyRegistration[formattedDate] = 1;
    }
})

  for (const key in weeklyRegistration) {
    if (weeklyRegistration.hasOwnProperty(key)) {
      weeklyData.push({ label: key, y: weeklyRegistration[key] });
    }
  }

  const weekly = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    axisY: {
        includeZero: true
    },

    title: {
      text: "Weekly Customer Registration"
    },
    data: [{        
      type: "column",  
      dataPoints: weeklyData
    }]
  }


  useEffect(() => {
    async function getUserAddressReport() {
      try {
        const add = await axios.get(`/api/getUserAddressReport`);
        setcustAdd(add.data);
      } catch (error) {
      }
    }
    getUserAddressReport();
  }, []);


  let locationGraph = {};
  var locationData = [];
  // fname.charAt(0).toUpperCase() + userData.fname.slice(1)
custAdd.forEach(location => {
  // let city = location.city.toLowerCase().charAt(0).toUpperCase() + location.city.slice(1);
  let city = location.city.toUpperCase();
  if (city in locationGraph) {
    locationGraph[city] += 1;
  } else {
    locationGraph[city] = 1;
  }
});

for (const key in locationGraph) {
  if (locationGraph.hasOwnProperty(key)) {
    locationData.push({ label: key, y: locationGraph[key] });
  }
}
  const location = {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
      text: "Customers By Locations"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: locationData
    }]
  }


  return (
    <>

        <Navigation/>
      <div className="container-fluid d-flex gap-2 mt-2">
        <SideBar/>
        <Container>
        <h3 className="text-center text-decoration-underline">Customers Report</h3>

           <div className="d-flex justify-content-center mb-4 mt-4">
           <ReportBox className="bg-primary">
           <span>Total Registered Customers: <span className="text-warning">{total_customers}</span> 
            </span>
            </ReportBox>
           </div>
           <section>
            <CanvasJSChart options={weekly} />

           </section>
           <section className="mt-4">
            <CanvasJSChart options={location} />
            </section>

    
        </Container>
        
      </div>
      </>
    
  );
};

export default Customers;
