import React, { useState ,useEffect} from 'react';
import Default from './Default';
import '../css/BulkOrder.css';
import BulkOrderTable from './BulkOrderTable';
import OrderSuccesfullModal from '../constants/OrderSuccesfullModal';

const BulkOrders = () => {
  const [formData, setFormData] = useState({
    sabjis: [],
    rotis: [],
    starters: [],
    sweets: [],
    iceCreams: [],
    coldDrinks: [],
    numberOfPeople: 1,
    deliveryDate: '',
    deliveryPlace: '',
    adminStatus: 'pending',
  });

    const [userData, setUserData] = useState(null); 
    const [activeLink, setActiveLink] = useState('orders'); 
    const [succesModal,setSuccessModal]=useState(false);
    const [successmessage,setSuccessMessage]=useState('succesfully Submitted data');

    useEffect(() => {
        const storedUser  = localStorage.getItem('currentUser'); 
        if (storedUser ) {
            const parsedUser  = JSON.parse(storedUser );
            setUserData(parsedUser.user); 
        }
    }, []);

  const [availableOptions] = useState({
    sabjis: [
      { value: "aloo_gobhi", label: "Aloo Gobi (Potato and Cauliflower)" },
      { value: "paneer_tikka", label: "Paneer Tikka" },
      { value: "dal_makhani", label: "Dal Makhani" },
      { value: "chana_masala", label: "Chana Masala (Chickpeas)" },
      { value: "palak_paneer", label: "Palak Paneer (Spinach and Cottage Cheese)" },
      { value: "bhindi_fry", label: "Bhindi Fry (Okra)" },
      { value: "baingan_bharta", label: "Baingan Bharta (Smoky Eggplant)" },
      { value: "mixed_vegetable", label: "Mixed Vegetable Curry" },
    ],
    rotis: [
      { value: "naan", label: "Naan" },
      { value: "roti", label: "Roti" },
      { value: "paratha", label: "Paratha" },
      { value: "missi_roti", label: "Missi Roti" },
    ],
    starters: [
      { value: "samosa", label: "Samosa" },
      { value: "paneer_tikka", label: "Paneer Tikka" },
      { value: "spring_rolls", label: "Spring Rolls" },
      { value: "dahi_puri", label: "Dahi Puri" },
    ],
    sweets: [
      { value: "gulab_jamun", label: "Gulab Jamun" },
      { value: "jalebi", label: "Jalebi" },
      { value: "rasgulla", label: "Rasgulla" },
      { value: "barfi", label: "Barfi" },
      { value: "kheer", label: "Kheer" },
    ],
    coldDrinks: [
      { value: "coke", label: "Coke" },
      { value: "sprite", label: "Sprite" },
      { value: "fanta", label: "Fanta" },
      { value: "limca", label: "Limca" },
    ],
    iceCreams: [
      { value: "vanilla", label: "Vanilla" },
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "mango", label: "Mango" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { name } = e.target;
    const value = e.target.value;

    setFormData((prev) => {
      const currentSelections = prev[name];
      if (currentSelections.includes(value)) {
        return {
          ...prev,
          [name]: currentSelections.filter(item => item !== value),
        };
      } else {
        return {
          ...prev,
          [name]: [...currentSelections, value],
        };
      }
    });

 
  };

  const handleRemoveItem = (category, item) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].filter(i => i !== item),
    }));

  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData.userId);
    console.log(userData.userName);
    console.log(userData.userEmail);
    const orderData = {
        userId: userData.userId ,
        userName: userData.userName,
        userEmail: userData.userEmail,
        sabjis: formData.sabjis,
        rotis: formData.rotis,
        starters: formData.starters,
        sweets: formData.sweets,
        iceCreams: formData.iceCreams,
        coldDrinks: formData.coldDrinks,
        numberOfPeople: formData.numberOfPeople,
        deliveryDate: formData.deliveryDate,
        deliveryPlace: formData.deliveryPlace,

        adminStatus: formData.adminStatus,
    };

    // console.log(orderData);

    try {
        const response = await fetch('http://localhost:8000/bulkorder/addbulkorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

          setSuccessMessage('Succesfully Submitted Order');
          setSuccessModal(true);
        setTimeout(() => {
            setSuccessModal(false);
        }, 1000);
        setSuccessModal(false);
        console.log('Order submitted successfully:', result);
    } catch (error) {
        console.error('Error submitting order:', error);
    }
};
  const handleCancel=()=>{
    setSuccessModal(false);
  };


  return (
 <div>
    <div>
        <div>
        <Default />
        <div className='Navlinkbar'>
          <div className='navbuttons'>
          <button className={activeLink === 'order' ? 'active' : ''} onClick={() => setActiveLink('order')}>
              Order
          </button>
          <button className={activeLink === 'orders' ? 'active' : ''} onClick={() => setActiveLink('orders')}>
              Orders details
          </button>
          </div>

        </div>
        {succesModal && <OrderSuccesfullModal message={successmessage} handleCancel={handleCancel}/>}
        {activeLink ==='order' ?(
          
        <div style={{ display: 'flex' }}>
            <div className='mainDiv'>
            <form id="bulkOrderForm" onSubmit={handleSubmit}>
                <h2>Bulk Order</h2>

                <div className='sabjiRoti'>
                <label htmlFor="sabjis">Select Sabjis:</label>
                <select
                    id="sabjis"
                    name="sabjis"
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>Select Sabji</option>
                    {availableOptions.sabjis.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <div style={{ marginLeft: '60px' }}>
                    <label htmlFor="rotis">Select Rotis:</label>
                    <select
                    id="rotis"
                    name="rotis"
                    onChange={handleSelectChange}
                    >
                    <option value="" disabled>Select Roti</option>
                    {availableOptions.rotis.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                    </select>
                </div>
                </div>

                <div className='startersSweets'>
                <label htmlFor="starters">Select Starters:</label>
                <select
                    id="starters"
                    name="starters"
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>Select Starter</option>
                    {availableOptions.starters.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <div style={{ marginLeft: '48px' }}>
                    <label htmlFor="sweets">Select Sweets:</label>
                    <select
                    id="sweets"
                    name="sweets"
                    onChange={handleSelectChange}
                    >
                    <option value="" disabled>Select Sweet</option>
                    {availableOptions.sweets.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                    </select>
                </div>
                </div>

                <div className='drinkIcecream'>
                <label htmlFor="coldDrinks">Select Cold Drinks:</label>
                <select
                    id="coldDrinks"
                    name="coldDrinks"
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>Select Cold Drink</option>
                    {availableOptions.coldDrinks.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <div style={{ marginLeft: '20px' }}>
                    <label htmlFor="iceCreams">Select Ice Creams:</label>
                    <select
                    id="iceCreams"
                    name="iceCreams"
                    onChange={handleSelectChange}
                    >
                    <option value="" disabled>Select Ice Cream</option>
                    {availableOptions.iceCreams.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                    </select>
                </div>
                </div>

                <div className='peopleDate'>
                <label htmlFor="numberOfPeople">Number of People:</label>
                <input
                    type="number"
                    id="numberOfPeople"
                    name="numberOfPeople"
                    min="1"
                    required
                    value={formData.numberOfPeople}
                    onChange={handleChange}
                />
                <div style={{ marginLeft: '5.5rem' }}>
                    <label htmlFor="deliveryDate">Delivery Date:</label>
                    <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    required
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    />
                </div>

                </div>
                <label style={{marginLeft:'-1rem'}}>Address:</label>
                <input
                    type="textarea"
                    id="deliveryPlace"
                    name="deliveryPlace"
                    required
                    value={formData.deliveryPlace}
                    onChange={handleChange}
                    style={{marginTop:'20px',height:'80px',width:'90%'}}
                    />
                <div className='button' style={{display:'flex'}}>
                <button type="submit" style={{ marginTop: '20px' }}>Submit Order</button>
                </div>
                
            </form>
            </div>

            {/* right side division */}
            <div className='selectedFoodItems'>

            <div style={{ display: 'flex' }}>
                <div style={{ marginTop: '10px' }}>
                <h4>Selected Sabjis:</h4>
                <ul>
                    {formData.sabjis.map((sabji) => (
                    <li key={sabji}>
                        {sabji.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                        <button onClick={() => handleRemoveItem('sabjis', sabji)}>X</button>
                    </li>
                    ))}
                </ul>
                </div>

                <div style={{ marginTop: '10px', marginLeft: '60px' }}>
                <h4>Selected Rotis:</h4>
                <ul>
                    {formData.rotis.map((roti) => (
                    <li key={roti}>
                        {roti.charAt(0).toUpperCase() + roti.slice(1)}
                        <button onClick={() => handleRemoveItem('rotis', roti)}>X</button>
                    </li>
                    ))}
                </ul>
                </div>
            </div>

            <div style={{ display: 'flex' }}>
                <div style={{ marginTop: '10px' }}>
                <h4>Selected Starters:</h4>
                <ul>
                    {formData.starters.map((starter) => (
                    <li key={starter}>
                        {starter.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                        <button onClick={() => handleRemoveItem('starters', starter)}>X</button>
                    </li>
                    ))}
                </ul>
                </div>

                <div style={{ marginTop: '10px', marginLeft: '60px' }}>
                <h4>Selected Sweets:</h4>
                <ul>
                    {formData.sweets.map((sweet) => (
                    <li key={sweet}>
                        {sweet.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                        <button onClick={() => handleRemoveItem('sweets', sweet)}>X</button>
                    </li>
                    ))}
                </ul>
                </div>
            </div>

            <div style={{ display: 'flex' }}>
                <div style={{ marginTop: '10px' }}>
                <h4>Selected Cold Drinks:</h4>
                <ul>
                    {formData.coldDrinks.map((coldDrink) => (
                    <li key={coldDrink}>
                        {coldDrink.charAt(0).toUpperCase() + coldDrink.slice(1)}
                        <button onClick={() => handleRemoveItem('coldDrinks', coldDrink)}>X</button>
                    </li>
                    ))}
                </ul>
                </div>

                <div style={{ marginTop: '10px', marginLeft: '40px' }}>
                <h4>Selected Ice Creams:</h4>
                <ul>
                    {formData.iceCreams.map((iceCream) => (
                    <li key={iceCream}>
                        {iceCream.charAt(0).toUpperCase() + iceCream.slice(1)}
                        <button onClick={() => handleRemoveItem('iceCreams', iceCream)}>X</button>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
           
            
            </div>
        </div>
        ):(
          <BulkOrderTable/>
        )}
        </div>
    </div>
    </div>
  );
};

export default BulkOrders;