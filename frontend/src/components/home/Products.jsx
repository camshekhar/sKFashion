import styled from "styled-components";
import Product from "./Product";


const Container = styled.div`
  padding: 20px;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: space-between;
`;

const Products = ({item}) => {
  return (
    <>
      
      <Container>
     
          <Product item={item}/>

      </Container>
    </>
  );
};

export default Products;
