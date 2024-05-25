import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
display: flex;
    background-color: #e2ecf6;
    flex: 3;
    width: 100%;
    padding: 10px;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
`;
const WelcomeAdmin = () => {
  return (
    <>
    <Container>
        <p>Welcome To Admin Dashboard</p>
    </Container>
    </>
  )
}

export default WelcomeAdmin