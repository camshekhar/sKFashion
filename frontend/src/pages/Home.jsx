import React from "react";
import Announcement from "../components/home/Announcement";
import Categories from "../components/home/Categories";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import Newsletter from "../components/home/Newsletter";
import Slider from "../components/home/Slider";
import styled from "styled-components";
import {mobile} from "../responsive";
import PopularProducts from "../components/home/PopularProducts";
import Features from "../components/home/Features";
import CatalogueSlider from "../components/home/CatalogueSlider";

const Caption = styled.h2`
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
  text-shadow: 1rem;
  color: black;
  font-size: 40px;
  font-weight: 400;
  /* ${mobile({display: "none"})} */

`;

const Hr = styled.hr`
  margin: 5px 20px;
  border: 1px solid lightblue;
  /* ${mobile({display: "none"})} */

`;
const Home = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Slider />
      <Hr/>
      <Features/>
      <Caption>Categories</Caption>
      <Hr/>
      <Categories />
      <Hr/>
      <Caption>Trending Products</Caption>
      <Hr/>
      <CatalogueSlider />
      <Hr/>
      <Caption>Popular Products</Caption>
      <Hr/>
      <PopularProducts/>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
