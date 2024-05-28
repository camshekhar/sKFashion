import styled from "styled-components";
import * as Icon from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import {mobile} from "../../responsive";
import { Link } from "react-router-dom";
import axios from "axios";
const Container = styled.div`
  width: 100%;
  height: 45vh;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  position: relative;
  background-color: lightgray;
  overflow: hidden;
  margin: 20px 0;
  ${mobile({display: "none"})}

`;

const Arrow = styled.div`
  width: 50px;
  height: 100%;
  background-color: #230402;
  color: white;
  /* border-radius: 50%; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: 0px;
  cursor: pointer;
  opacity: 0.8;
  z-index: 3;

  :hover{
    background-color: #4f1511;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(${props=>props.slideIndex * -100}vw);
  transition: all 1s ease;
  padding: 10px;
  margin-top: 15px;
  position: absolute;
`;

const Slide = styled.div`
  width: 33.33vw;
  height: 100%;
  display: inline-flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80%;
  /* object-fit: cover; */
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
  align-items: center;
  justify-content: center;
  /* margin-bottom: 90px; */

  
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 700;
`;

const Desc = styled.p`
  margin: 25px 0px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: transparent;
  background-color: #3c1a00;
  cursor: pointer;
  color: #fff;
  border: none;

  :hover{
    background-color: #582804c8;
  }
  
`;

const CatalogueSlider = () => {
  const [product, setProduct] = useState([])
  useEffect(()=>{

    async function getAllProduct(){
      try {
        const products = await axios.get("/api/popularProducts/");
        setProduct(products.data);
        // console.log(categories.data);
      } catch (error) {
        console.log(error)
        
      };
    };
    getAllProduct();
  
  }, []);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
      if(direction==="left"){
          setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
      } else {
          setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
      }

  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <Icon.ArrowLeftShort />
      </Arrow>

      <Wrapper slideIndex={slideIndex} >
        {product.map((item, i) => (
          <Slide bg={item.bg} key={i}>
            <ImageContainer>
              <Image src={`http://localhost:8000${item.image}`}/>
            </ImageContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>
                {item.desc}
              </Desc>
              <Link to={`/${item.category}/${item.subCategory}/`}><Button>Shop Now <Icon.ArrowRight /></Button></Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <Icon.ArrowRightShort />
      </Arrow>
  
    </Container>
  );
};

export default CatalogueSlider;
