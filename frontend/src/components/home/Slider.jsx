import styled from "styled-components";
import * as Icon from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import {mobile} from "../../responsive";
import { Link } from "react-router-dom";
import axios from "axios";
const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  position: relative;
  background-color: lightgray;
  overflow: hidden;
  margin: 20px 0;
  ${mobile({display: "none"})}

`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #2f1604;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 3;

  :hover{
    background-color: #fd4d2a;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${props=>props.slideIndex * -100}vw);
  transition: all 1s ease;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 90px;

  
`;

const Title = styled.h1`
  font-size: 50px;
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
    border:2px solid #37251793;
  }
  
`;

const Slider = () => {
  const [categories, setCategories] = useState([])
  useEffect(()=>{

    async function getAllCategory(){
      try {
        const categories = await axios.get("/api/categories/")
        setCategories(categories.data)
        // console.log(categories.data);
      } catch (error) {
        console.log(error)
        
      };
    };
    getAllCategory();
  
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
        {categories.map((item, i) => (
          <Slide bg={item.bg} key={i}>
            <ImageContainer>
              <Image src={`http://localhost:8000${item.image}`}/>
            </ImageContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>
                {item.desc}
              </Desc>
              <Link to={`/${item.title}/`}><Button>Shop Now <Icon.ArrowRight /></Button></Link>
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

export default Slider;
