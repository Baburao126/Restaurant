import React from 'react'
import Default from './Default'

const About = () => {
  return (
    <div>
    <Default/>  

    <div className='AboutPage' style={{display:'flex',marginTop:'70px'}}>
        <div className='Abouttext' style={{width:'60%',height:'fit-content',marginLeft:'10px'}}>
            <h1>About Us</h1>
            <p style={{marginTop:'-15px'}}> we take pride in bringing the rich and diverse flavors of South Indian cuisine to your table.</p>
            <h1 style={{marginTop:'-5px'}}>Our Heritage</h1>
            <p style={{marginTop:'-15px'}}>South Indian cuisine is known for its vibrant flavors, aromatic spices, and wholesome ingredients. From the coastal delights of Kerala to the spicy curries of Andhra Pradesh, our menu is a journey through the diverse regions of South India. Each dish is crafted with love and authenticity, ensuring that every bite transports you to the bustling streets of Chennai, the serene backwaters of Kerala,</p>
            <h1 style={{marginTop:'-5px'}}>Our Menu</h1>
            <p style={{marginTop:'-15px'}}>Indulge in our extensive menu featuring a variety of dosas, idlis, vadas, and sambar, all made from the finest ingredients. Our chefs use traditional recipes and techniques to create dishes that are not only delicious but also healthy. Whether you’re craving a crispy masala dosa, a comforting bowl of rasam, or a flavorful biryani, we have something to satisfy every palate.</p>
           
        </div>
        <div className='AboutImage' style={{width:'38%',height:'fit-content'}}>
        <img style={{height:'50vh',marginTop:'20px',padding:'20px'}} alt='description' src='https://media.tacdn.com/media/attractions-splice-spp-674x446/06/74/99/1f.jpg'/>
        </div>
    </div >
    <div style={{marginTop:'-10px',marginLeft:'10px'}}>
    <h1 style={{marginTop:'5px'}}>Fast and Fresh Delivery</h1>
    <p style={{marginTop:'-20px'}}>we understand that when hunger strikes, you want your favorite South Indian dishes delivered quickly and fresh! That’s why we are proud to offer a 30-minute delivery guarantee from the moment your order is received.</p>
    </div>
    <div>
    <div style={{
      background:'#c3f4cd',
      display:'flex',
      height:'4rem'
      
    }}>
      <h1>We Accept Bulk Orders Tooo!</h1>
    </div>
    <div style={{display:'flex'}}>

      <img src='https://www.eyeonasia.gov.sg/images/india-living/food-and-cuisines-in-india.jpg' alt='newImg' style={{
        width:'50%',
        height:'20rem',
        marginTop:'1rem',
        marginLeft:'1%'
      }}/>
      <div>
        <h2 style={{marginLeft:'10rem'}}>🎉Bulk Orders for Your Special Events! 🎉</h2>
        <h3 style={{
          width:'94%',
          marginLeft:'5%',
          justifyContent:'justify',
          display:'flex'
        }}>
        Planning a party, wedding, corporate event, or any special occasion? Look no further! At Yours restuarant, we specialize in providing high-quality products and services tailored to meet your bulk order needs.

        Whether you need delicious catering, stunning decorations, or unique party favors, we’ve got you covered! Our team is dedicated to making your event unforgettable, and we’re here to help you every step of the way.
        </h3>
        <a style={{
          textDecoration:'none',
          marginLeft:'40%',
          color:'green',
          fontSize:'20px'
        }}
        href='/contact/bulkorder'>Order Here</a>
      </div>
    </div>
    </div>
    </div>
  )
}

export default About
