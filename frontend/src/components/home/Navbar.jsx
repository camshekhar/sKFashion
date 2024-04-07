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
  height: 60px;
  width: 100%;
  margin-bottom: 20px;
  background-color: #fff;
  ${mobile({ height: "40px" })}
`;

const Wrapper = styled.div`
  width: 100%;
  bottom: 2px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px", width: "100%" })};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  ${mobile({ flex: "2" })}
`;
const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 1px solid gray;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 25px 8px 25px;
  padding: 5px;
  margin-bottom: 10px;
  background-color: white;
`;

const Input = styled.input`
  border: none;
  width: 150%;
  margin-right: 4px;
  background-color: white;
  ${mobile({ width: "100%", fontSize: "12px" })}
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  text-align: center;
  justify-content: center;
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
const Right = styled.div`
  flex: 1;
  display: flex;
  padding-bottom: 10px;
  align-items: center;
  margin-right: 15px;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: 2 })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
  align-items: center;
  justify-content: center;
  ${mobile({ fontSize: "12.5px", marginLeft: "10px" })}
`;
const ProfileButton = styled.button`
  background-color: transparent;
  color: black;
  padding: 5px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  transition: all 0.5s ease;
  ${mobile({ fontSize: "12px"})}

`;
const ProfileInfo = styled.div`
  display: none;
  position: absolute;
  background-color: #e4f1fb;
  width: 150px;
  align-items: center;
  justify-content: center;
  left: -20px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  ${mobile({ width: "130px", left: "-15px", fontSize: "12px" })}
`;
const Profile = styled.div`
  position: relative;
  display: inline-block;
  
  &:hover ${ProfileInfo} {
    display: flex;
    flex-direction: column;
  }
  &:hover ${ProfileButton} {
    background-color: #67b9fc;
  }
`;

const ProfileLinks = styled.span`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: center;

  

  &:hover {
    background-color: #bcdffc;
    width: 100%;
    color: black;
  }
`;
const LogoutButton = styled.button`
  background-color: red;
  width: 100%;
  height: 30px;
  border: none;
  color: white;
`;

const CartBadge = styled.span`
  position: absolute;
  display: inline-block;
  background-color: #3c1a00;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 600;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  transform: translate(-50%, -50%);
  border-radius: 50rem;

`;

const Navbar = () => {
  const { access_token } = getToken();
  const {data, isSuccess} = useGetLoggedUserQuery(access_token);
  const [userData, setUserData] = useState({
     email: "",
     name: "",
     fname: "",
     lname: "",
     username: ""
  });

  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        fname: data.fname,
        lname: data.lname,
        username: data.username,
      })
      
    }
  }, [data, isSuccess]);
 

  const [cartitems, setCartitems] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    async function getAllCategory() {
      try {
        const cartitems = await axios.get("/api/cart/");
        setCartitems(cartitems.data);
        // console.log(cartitems.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCategory();
    // console.log(cartitems)
  }, []);
 
  // console.log(cartitems.length)
  var cartCount = 0;
  for (let count = 0; count < cartitems.length; count++) {
    cartCount += 1;
  }
  //  console.log(cartCount)
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const handleLogout = (e) => {
      e.preventDefault();
      dispatch(unSetUserToken({ access_token: null }))
      removeToken();
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
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                 sKart
              </Link>
            </Logo>
          </Center>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search.." />
              <Icon.Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
         
          {access_token ? (
            <Right>
              <MenuItem>
                <Profile>
                   <ProfileButton>
                   Hello, {userData.fname.charAt(0).toUpperCase() + userData.fname.slice(1)} {/* <Icon.CaretDownFill/>  */}
                  </ProfileButton>
                  <ProfileInfo>
                    <ProfileLinks>My Orders</ProfileLinks>
                    <Link to="/changePassword" style={{textDecoration: "none"}}><ProfileLinks>Change Password</ProfileLinks></Link>
                    <ProfileLinks>
                      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                    </ProfileLinks>
                  </ProfileInfo>
                </Profile>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Icon.Cart3 />
                  <CartBadge>{cartCount}</CartBadge>
                </Link>
              </MenuItem>
            </Right>
          ) : (
            <Right>
              <MenuItem>
             
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Register
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Login
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to= "/cart"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Icon.Cart3 />
                  <CartBadge>{cartCount}</CartBadge>
                </Link>
              </MenuItem>
            </Right>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
