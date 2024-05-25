import React from 'react'
import Navigation from '../components/admin/Navigation'
import styled from 'styled-components'
import SideBar from '../components/admin/SideBar';
import MainContent from '../components/admin/MainContent';
import WelcomeAdmin from '../components/admin/WelcomeAdmin';

const Main = styled.div`

`;
const Admin = () => {
  return (
    <>
    <Navigation/>
    <Main className='container-fluid d-flex gap-2 mt-2'>
        <SideBar/>
        <WelcomeAdmin/>
    </Main>
    </>
  )
}

export default Admin