import styled from "styled-components";
import * as Icon from "react-bootstrap-icons"
import { Link } from "react-router-dom";
// import { mobile } from "../../responsive";

const Info = styled.div`
opacity: 0;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: rgba(0,0,0,0.2);
z-index: 3;
display: inline-flex;
align-items: center;
transition: all 0.5s ease;
justify-content: center;
cursor: pointer;
`;

const Container = styled.div`
display: flex;
flex-wrap: wrap;
padding: 2px;
margin: 4px;
width: 100%;
height: 350px;
align-items: center;
justify-content: center;
background-color: #c4daf8;
position: relative;
border-radius: 5%;
&:hover ${Info}{
    opacity: 1;
}
`;

const Circle = styled.div`
width: 280px;
height: 280px;
border-radius: 60%;
background-color: white;
position: absolute;

`;
const Image = styled.img`
max-width: 250px;
max-height: 250px;
object-fit: cover;
border-radius: 30%;
align-items: center;
z-index: 2;
`;


const Icons = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
display: flex;
justify-content: center;
align-items: center;
font-weight: 900;
margin: 10px;
color: black;
cursor: pointer;
transition: all 0.5s ease;
&:hover{
    background-color: #a4e6fa;
    transform: scale(1.1);
}

`;

// const Title = styled.h1`
//     top: 0;
//     left: 0;

//     color: black;
//     font-size: 30px;
//   ${mobile({display: "none"})}

// `;

const Product = ({item}) => {
  return (
    <>
    <Container>
        <Circle/>
        <Image src={item.image}/>
        <Info>
            
            <Icons>
                <Icon.CartPlus/>
               
            </Icons>
            <Icons>
            <Link to={`/${item.category}/${item.title}`} style={{textDecoration: "none", color: "black"}}><Icon.Search />  </Link>
               
            </Icons>
            <Icons>
                <Icon.Heart/>
            </Icons>
            
        </Info>
       
    </Container>
  
    
    </>
  )
}

export default Product