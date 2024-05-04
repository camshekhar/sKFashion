import styled from "styled-components";
import Announcement from "../components/home/Announcement";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import Newsletter from "../components/home/Newsletter";
import * as Icon from "react-bootstrap-icons";
import { mobile } from "../responsive";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { getToken } from "../services/LocalStorageService";
import Feedbacks from "../components/home/Feedbacks";


const Container = styled.div``;
const Wrapper = styled.div`
margin: 0 30px;
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImageContainer = styled.div`
  align-items: right;
  justify-content: flex-end;
  flex: 1;
`;

const Image = styled.img`
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
  width: 80%;
  max-height: 350px;
  object-fit: cover;
  ${mobile({ height: "250px" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
`;
const Desc = styled.p`
  margin: 10px 0;
  color: gray;
`;
const Price = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  margin: 20px 20px 20px 0;
`;

const FilterText = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin: 0px;
`;

const Select = styled.select`
  margin: 0 5px;
  padding: 3px;
`;
const Option = styled.option``;
const FilterColor = styled.div`
  margin-left: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
    border: 2px solid pink;
  }
`;
const AddContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const InStock = styled.div`
  width: 90px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #28f328;
  border: none;
  margin-bottom: 8px;
  font-weight: 500;
`;
const OutStock = styled.div`
  width: 100px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: red;
  color: white;
  border: none;
  margin-bottom: 8px;
  font-weight: 500;
`;
const AmountContainer = styled.div`
  display: flex;
  font-weight: 600;
  align-items: center;
`;
const AmountText = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: 5px;
`;
const Amount = styled.span`
  display: flex;
  width: 30px;
  height: 18px;
  border: 1px solid teal;
  border-radius: 10%;
  font-size: 12px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Ic = styled.button`
  border: none;
  border-radius: 30%;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  &:hover {
    background-color: #e5f8f6;
    transform: scale(1.1);
  }
`;
const Button = styled.button`
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 10px;
  border: solid 2px teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: teal;
    color: white;
    font-weight: 700;
    border: solid 2px whitesmoke;
  }
`;
const Product = () => {
  const [{id, title, image, color, size, price, category, desc, stockCount}, setProduct] = useState([]);
  const { product_slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  let navigate = useNavigate();
  const { access_token } = getToken();
const cust_id = localStorage.getItem("cust_id");

  useEffect(() => {
    async function getProduct() {
      try {
        const product = await axios.get(
          `/api/productDetails/${product_slug}`
        );
        setProduct(product.data);
      } catch (error) {
        console.log(error);
      }
      
    }
    getProduct();

  }, [product_slug]);

  localStorage.setItem("prod_id", id);

  // console.log(feeds)
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  const submitAddtoCart = (e) => {
    e.preventDefault();

    const data = {
      id: id,
      // cust_id: cust_id,
      title: title,
      color: color,
      size: size,
      image: image,
      price: price,
      quantity: quantity,
    };

    // var temp_data = [data];
    axios.post(`/api/addtoCart/`, data).then((res) => {});
    // const parsedData = JSON.stringify(data);

    // localStorage.setItem("product_data", parsedData);
  
    console.log(data);
    if (access_token) {
      swal("Item Added to Cart", `${title} Successfully Added to your cart.`, "success");
      navigate("/cart");
    }else{
      swal("Login to Proceed", `${title} Successfully Added to Cart.`, "warning");
    }
  };

  // eslint-disable-next-line
  var avail_stock;
  if (stockCount > 0) {
    avail_stock = (
      <AddContainer>
        <InStock>In Stock</InStock>
        <AmountContainer>
          <AmountText>Quantity:</AmountText>
          <Ic>
            <Icon.DashSquare onClick={handleDecrement} />
          </Ic>
          <Amount>{quantity}</Amount>
          <Ic>
            <Icon.PlusSquare onClick={handleIncrement} />
          </Ic>
          {

          }
        </AmountContainer>
        {

        }
        <Button onClick={submitAddtoCart}>ADD TO CART</Button>

      </AddContainer>
      
    );
  } else {
    avail_stock = <OutStock>Out of Stock</OutStock>;
  }
  // eslint-disable-next-line

  return (
    <>
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
       
          <ImageContainer>
            <Image src={image} />
          </ImageContainer>
          <InfoContainer>
            <Title>{title}</Title>
            <Desc>
              {category} / {desc}
            </Desc>

            <Price>&#8377;{price}</Price>
            <FilterContainer>
              <Filter>
                <FilterText>Color:</FilterText>
                <FilterColor color="black" />
                <FilterColor color="blue" />
                <FilterColor color="darkgreen" />
                <FilterColor color="gray" />
              </Filter>
              <Filter>
                <FilterText>Size:</FilterText>

                <Select defaultValue={"M"}>
                  <Option value={"L"}>L</Option>
                  <Option value={"M"}>M</Option>

                  <Option value={"S"}>S</Option>
                  <Option value={"XS"}>XS</Option>
                </Select>
              </Filter>
            </FilterContainer>

            {avail_stock}
            <hr />
       <Feedbacks/>

          </InfoContainer>
      

        </Wrapper>
   
        <Newsletter />
        <Footer />
      </Container>
    </>
  );
};

export default Product;
