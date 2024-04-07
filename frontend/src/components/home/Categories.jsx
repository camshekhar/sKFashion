import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import {mobile} from "../../responsive";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
display: flex;
padding: 0 20px;
justify-content: space-between;
${mobile({padding: "0px", flexDirection: "column"})}


`;

const Categories = () => {
  const [categories, setCategories] = useState([])
  useEffect(()=>{

    async function getAllCategory(){
      try {
        const categories = await axios.get("/api/categories/")
        setCategories(categories.data)
        // console.log(categories.data);
      } catch (error) {
        // console.log(error)
        
      };
    };
    getAllCategory();
  
  }, []);
  return (
    <>
    
    <Container>
      
        {categories.map((item, i) => (
            <CategoryItem item={item} key={i}/>
           
        ))}

    </Container>;
    </>
  )
};

export default Categories