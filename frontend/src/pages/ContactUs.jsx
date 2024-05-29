import React from 'react'
import Announcement from '../components/home/Announcement'
import Navbar from '../components/home/Navbar'
import Footer from '../components/home/Footer'
import Newsletter from '../components/home/Newsletter'

const ContactUs = () => {
  return (
    
    <>
      <Announcement/>
      <Navbar/>
        <div className="container">
            <h2 className='text-decoration-underline text-center'>Contact Us</h2>
            <hr />
            <h3>Address: </h3>
            <span>At - DYPIMCA, Akurdi, Pune - 411035</span>
            <h3>Mobile Number: </h3>
            <span>+91-8409394478</span>
            <h3>Email: </h3>
            <span>contact@skfashion.com</span>
        </div>
        <Newsletter/>
      <Footer/>
    </>
  )
}

export default ContactUs