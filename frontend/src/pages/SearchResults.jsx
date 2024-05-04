// import * as Icon from "react-bootstrap-icons";
// import styled from "styled-components";
// import { mobile } from "../responsive";
// import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import Announcement from "../components/home/Announcement";
// import Footer from "../components/home/Footer";
// import Navbar from "../components/home/Navbar";
// import Newsletter from "../components/home/Newsletter";
// import Products from "../components/home/Products";

// const Container = styled.div`
  
// `;

// const Title = styled.h1`
//     margin: 20px;
//     color: black;
//     font-size: 30px;
//   ${mobile({display: "none"})}

// `;

// const FilterContainer = styled.div`
//   display: flex;
//   justify-content:space-between;

// `;

// const Filter = styled.div`
//     margin: 20px;
//   ${mobile({margin: "10px 20px", display: "flex", flexDirection: "column"})}

// `;

// const FilterText = styled.span`
//     font-size: 16px;
//     font-weight: 600;

// `;

// const Select = styled.select`
//     margin-left: 5px;
//     padding: 5px;
//   ${mobile({margin: "5px 0px"})}

// `;
// const Option = styled.option`
    
// `;

// const SearchResults = () => {
//     const [product, setProduct] = useState([]);
//     const [searchParams] = useSearchParams();

//     const search_slug = searchParams.get('product')
//     // let navigate = useNavigate();

//     useEffect(() => {
//         async function getProduct() {
//         try {
//             const product = await axios.get(
//             `/api/searchResults/${search_slug}`
//             );
//             setProduct(product.data);
//         } catch (error) {
//             console.log(error);
//         }
        
//         }
//         getProduct();

//     }, [search_slug]);
//     console.log(search_slug);
//   return (
//     <>
//     <Container>
//         <Navbar/>
//         <Announcement/>

//         <Title>Product Results: {search_slug}</Title>
//         <FilterContainer>
//             <Filter>
//                 <FilterText>Filter Products:</FilterText> 
//                 <Select defaultValue={"Red"}>
                    
//                     <Option>Red</Option>
//                     <Option>Blue</Option>
//                     <Option>Yellow</Option>
//                     <Option>Green</Option>
//                     <Option>Pink</Option>
//                     <Option>Black</Option>
//                     <Option>White</Option>

//                 </Select>
//                 <Select defaultValue={"M"}>
//                     <Option>XS</Option>
//                     <Option>S</Option>
//                     <Option>M</Option>
//                     <Option>L</Option>
//                     <Option>XL</Option>
//                     <Option>XXL</Option>
//                 </Select>
//             </Filter>
//             <Filter>
//                 <FilterText>Sort Products:</FilterText>
//                 <Select defaultValue={"Popularity"}>
//                     <Option>Popularity</Option>
//                     <Option>Newest First</Option>
//                     <Option>Relevance</Option>
//                     <Option>Price (Low-High)</Option>
//                     <Option>Price (High-Low)</Option>
//                 </Select>
//             </Filter>
//         </FilterContainer>
//         {product.map((item, i) => (
//           <Products item={item} key={i} />
//         ))}
//         <Newsletter/>
//         <Footer/>
//     </Container>
//     </>
//   )
// }

// export default SearchResults