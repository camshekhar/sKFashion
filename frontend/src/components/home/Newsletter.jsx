import * as Icon from "react-bootstrap-icons";
import styled from "styled-components";
import {mobile} from "../../responsive";

const Container = styled.div`
  height: auto;
  width: 100%;
  background-color: #dae9fb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 40px;
  padding-top: 40px;

`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  color: black;
${mobile({fontSize: "40px"})}

`;

const Description = styled.p`
font-size: 24px;
font-weight: 300;
margin-bottom: 20px;
${mobile({textAlign: "center", fontSize: "20px"})}

`;

const InputContainer = styled.div`
width: 50%;
height: 40px;
background-color: white;
display: flex;
justify-content: space-between;
border: 1px solid lightgray;
${mobile({width: "80%"})}

`;

const Input = styled.input`
border: none;
flex: 8;
padding-left: 20px;
margin-right: 4px;

`;

const Button = styled.button`
flex: 1;
border: none;
background-color: teal;
color: white;
padding-right: 10px;
padding-left: 10px;


`;

const Newsletter = () => {
  return (
    <>
      <Container>
        <Title>Newsletter</Title>
        <Description>
          Get timely updates about your favourite products.
        </Description>
        <InputContainer>
          <Input placeholder="Your Email" />
          <Button>
            <Icon.SendFill />
          </Button>
        </InputContainer>
      </Container>
    </>
  );
};

export default Newsletter;
