import React from "react";
import styled from "styled-components";
import * as Icon from "react-bootstrap-icons";
import { mobile } from "../../responsive";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { getToken, removeToken } from "../../services/LocalStorageService";
import { unSetUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux/es/exports";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";
import swal from 'sweetalert';
import logo from '../../images/logo.png';

const Container = styled.div`
  height: 70px;
  width: 100%;
  margin-bottom: 5px;
  background-color: lightgray;
  ${mobile({ height: "40px" })}
`;

const Wrapper = styled.div`
  width: 100%;
  bottom: 2px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px", width: "100%" })};
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  text-align: center;
  justify-content: start;
  gap: 0.5rem;
`;

const Logo = styled.h1`
  font-weight: bold;
 letter-spacing: 2.5px;
  padding-bottom: 5px;
${mobile({ display: "none"})}

`;
const LogoImg = styled.img`
  max-height: 45px;
${mobile({ maxHeight: "40px"})}

`;


const Navigation = () => {
  const { access_token } = getToken();
  const {data, isSuccess} = useGetLoggedUserQuery(access_token);
  // const cust_id = localStorage.getItem("cust_id");

  const [userData, setUserData] = useState({
    id: null,
    email: "",
    name: "",
    fname: "",
    lname: "",
   
  });

  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        id: data.id,
        email: data.email,
        fname: data.fname,
        lname: data.lname,
      })
      
    }
  }, [data, isSuccess]);

  const navigate = useNavigate();
  // console.log(userData.id)
//   useEffect(() => {
//     async function getAllCategory() {
//       try {
//         if(cust_id !== null){
//           const cartitems = await axios.get(`/api/`);
//           setCartitems(cartitems.data);
//         }

//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getAllCategory();
//     // console.log(cartitems)
//   }, []);
 
  const dispatch = useDispatch();
  const handleLogout = (e) => {
      e.preventDefault();
      dispatch(unSetUserToken({ access_token: null }))
      removeToken();
      localStorage.clear();
      sessionStorage.clear();
      navigate('/');
      swal("Logout Success", "You Logged Out Successfully", "success");
  }

  return (
    <>
      <Container>
        <Wrapper>
        <Center>
        <LogoImg src={logo}/>
            <Logo>
              <Link to="/admin" style={{ textDecoration: "none", color: "black" }}>
                 Admin Dashboard
              </Link>
            </Logo>
          </Center>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navigation;
