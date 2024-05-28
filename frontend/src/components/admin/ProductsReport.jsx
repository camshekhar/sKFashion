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
    width: 80%;
    /* height: 85vh; */
    padding: 5rem;
`;
const ReportBox = styled.div`
    /* width: 150px; */
    /* background-color: #08c4c4; */
    /* color: white; */
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    height: 100px;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;

`;
const ProductsReport = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function productsReport() {
      try {
        const prods = await axios.get(`/api/productsReport`);
        setProducts(prods.data);
        // console.log(cartitems.data);
      } catch (error) {
        // console.log(error);
      }
    }
    productsReport();
  }, []);
  
  
 

  var inStock= 0;
  const total_products = products.length;
  var outOfStock = 0;

//   var weeklyGraph = {};
//   var weeklyData = [];

  products.forEach(product => {
    if(product.stockCount > 0){
        inStock += 1;
    }
    else{
        outOfStock += 1
    }
    // total_prod_sold += parseInt(order.prod.length)
    // const date = new Date(order.date);
    // const dt = { year: "numeric", month: "long", day: "numeric" };
    // const formattedDate = date.toLocaleDateString("en-US", dt);
  
    // if (formattedDate in weeklyGraph) {
    //   weeklyGraph[formattedDate] += 1;
    // } else {
    //   weeklyGraph[formattedDate] = 1;
    // }
  });

//   var week = 7;
//   var x_label = [];
//   var cnt = 0;
//   for (const key in weeklyGraph) {
//     if (week == 7) {
//       week = 6;
//       continue;
//     }
//     if (weeklyGraph.hasOwnProperty(key) && week >= 0) {
//       weeklyData.push({ x: weeklyGraph[key[cnt-1]], y: weeklyGraph[key] });
//       x_label.push(key);
//     }
//     cnt += 1;
//     week -= 1;
//   } 
// // console.log(weeklyData)
//   let monthlyGraph = {
//     "January" : 0,
//     "February" : 0,
//     "March" : 0,
//     "April" : 0,
//     "May" : 0
//   };
//   var monthlyData = [];

// sales.forEach(order => {
//   const date = new Date(order.date);
//   const options = { year: "numeric", month: "long", day: "numeric" };
//   const formattedDate = date.toLocaleDateString("en-US", options);
//   const month = date.toLocaleString('en-US', { month: 'long' });

//   if (month in monthlyGraph) {
//     monthlyGraph[month] += 1;
//   } else {
//     monthlyGraph[month] = 1;
//   }
// });

// for (const key in monthlyGraph) {
//   if (monthlyGraph.hasOwnProperty(key)) {
//     monthlyData.push({ label: key, y: monthlyGraph[key] });
//   }
// }
// // console.log()
//   const daily = {
//     animationEnabled: true,
//     exportEnabled: true,
//     theme: "light2", //"light1", "dark1", "dark2"
//     axisY: {
//         includeZero: true
//     },

//     title: {
//       text: "Weekly Sales Report"
//     },
//     axisY: {
//       title: "Increase is Sales",
//       suffix: "%"
//     },
//     axisX: {
//       title: "Weekly Date",
//       labelFormatter: function(e) {
//         return x_label[e.value];
//       },
//       interval: 1
      
//     },
//     data: [{         
//       type: "line",
// 			toolTipContent: "Weekly {x}: {y}%",
//       dataPoints: weeklyData
//     }]
//   }


//   const monthly = {
//     animationEnabled: true,
//     exportEnabled: true,
//     theme: "light1", //"light1", "dark1", "dark2"
//     axisY: {
//         includeZero: true
//     },

//     title: {
//       text: "Monthly Sales Report"
//     },
//     data: [{        
//       type: "column",  
//       dataPoints: monthlyData
//     }]
//   }

  return (
    <>

        <Navigation/>
      <div className="container-fluid d-flex gap-2 mt-2">
        <SideBar/>
        <Container>
        <h3 className="text-center text-decoration-underline">Products Report</h3>

           <div className="d-flex justify-content-between mb-4 mt-4">
           <ReportBox className="bg-warning">
               <span>Total Products:</span> 
               <span>{total_products}</span>
            </ReportBox>
            <ReportBox className="bg-warning">
               <span><Icon.CartCheckFill className="text-success"/> In Stock:</span> 
               <span>{inStock}</span>
            </ReportBox>

            <ReportBox className="bg-warning">
               <span><Icon.CartXFill className="text-danger"/> Out of Stock:</span> 
               <span>{outOfStock}</span>
            </ReportBox>
           </div>
           <section>
           
          </section>

          <section className="mt-4">
         
          </section>
        </Container>
        
      </div>
      </>
    
  );
};

export default ProductsReport;
