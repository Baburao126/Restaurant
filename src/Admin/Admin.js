import React, { useState, useEffect } from 'react';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";
import '../css/AdminHome.css';
import DefaultAdmin from './DefaulAdmin';
import EditItemForm from './Edititem';

function Admin() { 
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/restuarant/get');
                const data = await response.json();
                setItems(data.Items);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleRemove = async (itemId) => {
        const item_id = { item_id: itemId };

        const response = await fetch('http://localhost:8000/restuarant/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item_id)
        });
        if (response.ok) {
            setItems(prevItems => prevItems.filter(item => item.item_id !== itemId));
        } else {
            console.error('Failed to delete the item');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
    };

    const handleUpdate = async (updatedItem) => {
        const response = await fetch(`http://localhost:8000/restuarant/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem)
        });
    
        if (response.ok) {
            const responseData = await response.json(); 
          
            if (responseData.item && responseData.item.length > 0 && typeof responseData.item[0] === 'object') {
                const newItem = responseData.item[0]; 
              
                setItems(prevItems => 
                    prevItems.map(item => 
                        item.item_id === newItem.item_id ? newItem : item
                    )
                );
                setEditingItem(null); 
            } else {
                console.error('No valid item returned from server:', responseData.item);
            }
        } else {
            console.error('Failed to update the item');
        }
    };

    const handleCancel = () => {
        setEditingItem(null); 
    };

    const filteredItems = items.filter(item => 
        item.itemName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <DefaultAdmin search={search} setSearch={setSearch} />
            <div className="container">
                {editingItem ? (
                    <EditItemForm 
                        item={editingItem} 
                        onUpdate={handleUpdate} 
                        onCancel={handleCancel}  
                    />
                ) : (
                    filteredItems.map(item => (
                        <div key={item.item_id} className="card">
                            <img src={item.itemImage} alt={item.itemName} className="card-image" />
                            <div className="card-body">
                                <div className='NamePrice'>
                                    <h2 className="card-title">{item.itemName}</h2>
                                    <p className="card-price"><LiaRupeeSignSolid height={'20px'} />{item.itemPrice}</p>
                                </div>
                                <p className="card-description">{item.itemDescription}</p>
                                <div className='ratingRemoveItem'>
                                    <button className='removeButton' onClick={() => { handleRemove(item.item_id) }}>Remove</button>
                                    <button className='editButton' onClick={() => { handleEdit(item) }} style={{ background: '#8bcd50', color: 'black' }}>Edit</button>
                                    <p className="card-rating"><FaStar color='yellow' />{item.itemRating}/5</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Admin;