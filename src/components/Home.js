import React, { useState, useEffect } from 'react';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";
import '../css/Home.css';
import Default from './Default';

function Home() { 
    const [search, setSearch]=useState('');
    const [items, setItems] = useState([]);
    const [userData, setUserData] = useState(null); 
    const [messages, setMessages] = useState({}); 

    useEffect(() => {
        fetch('http://localhost:8000/restuarant/get')
            .then(response => response.json())
            .then(data => setItems(data.Items))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const storedUser  = localStorage.getItem('currentUser'); 
        if (storedUser ) {
            const parsedUser  = JSON.parse(storedUser );
            // console.log('parsed user',parsedUser)
            setUserData(parsedUser.user); 
        }
    }, []);

    const handleAddOrderItem = (item) => {
        if (!userData) {
            alert("Please log in to add items to your order.");
            return; 
        }
        console.log("user data is from home:", userData);
        console.log('userid is:', userData.userId);
        const payload = {
            UserId: userData.userId,
            ItemId: item.item_id,
            OrderStatus: "INPROGRESS"
        };

        fetch('http://localhost:8000/basket/addItemtoBasket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Item added to basket:', data);
            setMessages(prevMessages => ({
                ...prevMessages,
                [item.item_id]: 'Item added to OrdersBasket'
            }));


            setTimeout(() => {
                setMessages(prevMessages => ({
                    ...prevMessages,
                    [item.item_id]: ''
                }));
            }, 3000);
        })
        .catch(()=> {
            setMessages(prevMessages => ({
                ...prevMessages,
                [item.item_id]: 'Item is already added to Orders'
            }));
            
            setTimeout(() => {
                setMessages(prevMessages => ({
                    ...prevMessages,
                    [item.item_id]: ''
                }));
            }, 3000);
        });
    };

    const SortedItems = items.filter(item => 
        item.itemName.toLowerCase().includes(search.toLowerCase())
    );



    return (
        <div>
            <Default search={search} setSearch={setSearch}/>
            <div className="container">
                {SortedItems.map(item => (
                    <div key={item.item_id} className="card">
                        <img src={item.itemImage} alt={item.itemName} className="card-image" />
                        <div className="card-body">
                            <div className='NamePrice'>
                                <h2 className="card-title">{item.itemName}</h2>
                                <p className="card-price"><LiaRupeeSignSolid height={'20px'} />{item.itemPrice}</p>
                            </div>
                            <p className="card-description">{item.itemDescription}</p>
                            <div className='ratingAddtocart'>
                                <button onClick={() => handleAddOrderItem(item)} style={{ cursor: 'pointer' }}>Add to Orders</button>
                                <p className="card-rating"><FaStar color='yellow' />{item.itemRating}/5</p>
                            </div>
                            {messages[item.item_id] && <p className="success-message" style={{fontSize:'10px'}}>{messages[item.item_id]}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;