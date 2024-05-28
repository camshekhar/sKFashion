import styled from "styled-components";
import { mobile } from "../../responsive";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";


const Info = styled.div`
display: flex;
flex-direction: column;
opacity: 0;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: rgba(0,0,0,0.2);
z-index: 3;
display: flex;
border-radius: 10%;
align-items: center;
transition: all 0.5s ease;
justify-content: center;
cursor: pointer;
`;

const Wrapper = styled.div`
  display: inline-flex;
  margin: 0px, 20px;
  width: 20%;
  height: 300px;
  border-radius: 50%;
  justify-content: space-around;
  align-items: center;
  position: relative;
  transform: scale(0.85);

  &:hover ${Info}{
    opacity: 1;
} 

${mobile({width: "100%", margin:"0px", display: "flex", padding: "0px"})}

`;

const Image = styled.img`
width: 100%;
height: 100%;
border-radius: 10%;
justify-content: center;
position: absolute;
  align-items: center;
object-fit: cover;
${mobile({height: "35vh"})}

`;
const Title = styled.h2`
  top: 0;
  margin-bottom: 0;
  text-align: center;
  text-shadow: 1rem;
  color: white;
  font-size: 30px;
  font-weight: 400;
  /* ${mobile({display: "none"})} */

`;
const Icons = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: #f3d267;
display: flex;
justify-content: center;
align-items: center;
font-weight: 900;
margin: 10px;
color: black;
cursor: pointer;
transition: all 0.5s ease;
&:hover{
    background-color: #c3edfa;
    transform: scale(1.1);
}

`;

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    async function getAllCategory() {
      try {
        const products = await axios.get("/api/popularProducts/");
        setPopularProducts(products.data);
        // console.log(products.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCategory();
  }, []);
  return (
    <>
      
        {popularProducts.map((item, i) => (
          <Wrapper key={i}>
            <Image src={`http://localhost:8000${item.image}`} />
            <Info>
                <Title>{item.title}</Title>
              <Icons>
                <Icon.CartPlus />
              </Icons>
              <Icons>
                <Link
                  to={`/${item.category}/${item.subCategory}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Icon.Search />{" "}
                </Link>
              </Icons>
              <Icons>
                <Icon.Heart />
              </Icons>
            </Info>
          </Wrapper>
        ))}
      ;
    </>
  );
};

export default PopularProducts;
