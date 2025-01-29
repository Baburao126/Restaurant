import React, { useState } from 'react';
import '../css/Enquiry.css'
import Default from './Default';
const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guests: '',
    products: [],
    notes: '',
    contactMethod: '',
    contactTime: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => {
        const newProducts = checked
          ? [...prevData.products, value]
          : prevData.products.filter((product) => product !== value);
        return { ...prevData, products: newProducts };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      guests: '',
      products: [],
      notes: '',
      contactMethod: '',
      contactTime: '',
    });
  };

  return (
    <div>

    <Default/>
    <div className='mainEnquiry'>
      <h2 style={{textAlign:'center'}}>Enquiry Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='formDiv'>

       
        <div className='leftdiv'>
        <label>
          Name:
        </label><br></br>
        <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        <br></br>
        <label >
          Email:
          
        </label><br></br>
        <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        <div className='numberEvent'>
        <label>
          Phone Number:
        </label><br>
        </br>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
    <br></br>
        <label>
          Type of Event:
        </label><br></br>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
          >
            <option value="">Select an event type</option>
            <option value="birthday">Birthday Party</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate Event</option>
            <option value="babyShower">Baby Shower</option>
            <option value="other">Other</option>
          </select>
        </div>

        <label>
          Date of Event:
        </label><br></br>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
           <label>
          Best Time to Reach You:
          <input
            type="text"
            name="contactTime"
            value={formData.contactTime}
            onChange={handleChange}
            placeholder="Enter your preferred contact time"
          />
        </label>
        </div>
        <div className='rightdiv'>

        <label style={{marginLeft:'10px'}}>
          Estimated Number of Guests:
        </label><br></br>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
            placeholder="Enter the estimated number of guests"
          />
        <br></br>
        <div style={{ display:'flex'}}>

        <div className='checkbox'>
        <label>What do you need?</label><br></br>
            <input
              type="checkbox"
              name="products"
              value="catering"
              checked={formData.products.includes('catering')}
              onChange={handleChange}
              style={{marginLeft:'-9rem'}}
            />
        <label style={{marginLeft:'-9rem',display:'inline-block'}}>
            Catering
        </label>
        <br>
        </br>
            <input
              type="checkbox"
              name="products"
              value="decorations"
              checked={formData.products.includes('decorations')}
              onChange={handleChange}
              style={{marginLeft:'-9rem'}}
            />
          <label style={{marginLeft:'-9rem'}}>
            Decorations
          </label>
          <br></br>
            <input
              type="checkbox"
              name="products"
              value="favors"
              checked={formData.products.includes('favors')}
              onChange={handleChange}
              style={{marginLeft:'-9rem'}}
            />
          <label style={{marginLeft:'-9rem'}}>
            Party Favors
          </label>
          <br></br>
            <input
              type="checkbox"
              name="products"
              value="beverages"
              checked={formData.products.includes('beverages')}
              onChange={handleChange}
              style={{marginLeft:'-9rem'}}
            />
          <label style={{marginLeft:'-9rem'}}>
            Beverages
          </label>
          <br>
          </br>
            <input
              type="checkbox"
              name="products"
              value="other"
              checked={formData.products.includes('other')}
              onChange={handleChange}
              style={{marginLeft:'-9rem'}}
            />
          <label style={{marginLeft:'-9rem'}}>
            Other
          </label><br></br>
        <button type="submit"
        style={{marginTop:'20px' ,marginLeft:'20px'}}>Submit Inquiry</button>
        </div>
        </div> 
        </div>
        </div>
      
      </form>
    </div>
    </div>
  );
};

export default Enquiry;