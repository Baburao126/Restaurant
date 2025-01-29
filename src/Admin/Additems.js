import React, { useState } from 'react';
import DefaultAdmin from './DefaulAdmin';
import '../css/AddItem.css';
import { useNavigate } from 'react-router-dom';

const AddItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemImage, setItemImage] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [rating,setRating]=useState('');
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            itemName,
            itemPrice: parseFloat(itemPrice),
            itemImage,
            itemDescription,
            itemRating:rating,
        };

        try {
            const response = await fetch('http://localhost:8000/restuarant/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                throw new Error('Failed to add item');
            }

            const result = await response.json();
            console.log('Item added successfully:', result);

            setItemName('');
            setItemPrice('');
            setItemImage('');
            setItemDescription('');
            setRating('');

            navigate('/admin');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleCancel=()=>{
        navigate('/admin')
    }
    return (
        <div className='addbody'>
            <DefaultAdmin/>
        <div className='AddForm' style={{ marginBottom: '20px' }}>
            <h2>Add Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="itemName"
                        placeholder='Item Name'
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                </div>
                <div style={{width:'20px'}}>
                    <input
                        type="number"
                        id="itemPrice"
                        placeholder='Item Price'
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                        required
                    />
                    <input type='number'
                    placeholder='Ratings'
                    value={rating}
                    onChange={(e)=>setRating(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="itemImage"
                        placeholder='Item Image URL'
                        value={itemImage}
                        onChange={(e) => setItemImage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <textarea
                        id="itemDescription"
                        placeholder='Item Description'
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Item</button>
                <button onClick={handleCancel}>cancel</button>
            </form>
        </div>
        </div>
    );
};

export default AddItemForm;