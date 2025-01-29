import React, { useState, useEffect } from 'react';
import '../css/EditItem.css';

const EditItemForm = ({ item, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        item_id: '',
        itemName: '',
        itemPrice: '',
        itemImage: '',
        itemRating: '',
        itemDescription: ''
    });

    useEffect(() => {
        if (item) {
            setFormData({
                item_id: item.item_id,
                itemName: item.itemName,
                itemPrice: item.itemPrice,
                itemImage: item.itemImage,
                itemRating: item.itemRating,
                itemDescription: item.itemDescription
            });
        }
    }, [item]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/restuarant/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
    
        if (response.ok) {
            const updatedItem = await response.json(); 
            console.log('Item updated successfully:', updatedItem); 
            onUpdate(updatedItem.item[0]); 
        } else {
            console.error('Failed to update the item');
        }
    };

    return (
        <form className='editForm' onSubmit={handleFormSubmit}>
            <h2>Edit Item</h2>
            <input type="hidden" name="item_id" value={formData.item_id} />
            <div className='form-group'>
                <input
                    type="text"
                    id="itemName"
                    className='form-control'
                    name="itemName"
                    placeholder='Item Name'
                    value={formData.itemName}
                    onChange={handleFormChange}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    type="number"
                    id="itemPrice"
                    className='form-control'
                    name="itemPrice"
                    placeholder='Item Price'
                    value={formData.itemPrice}
                    onChange={handleFormChange}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    type='number'
                    className='form-control'
                    name="itemRating"
                    placeholder='Ratings'
                    value={formData.itemRating}
                    onChange={handleFormChange}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    type="text"
                    id="itemImage"
                    className='form-control'
                    name="itemImage"
                    placeholder='Item Image URL'
                    value={formData.itemImage}
                    onChange={handleFormChange}
                    required
                />
            </div>
            <div className='form-group'>
                <textarea
                    id="itemDescription"
                    className='form-control'
                    name="itemDescription"
                    placeholder='Item Description'
                    value={formData.itemDescription}
                    onChange={handleFormChange}
                    required
                />
            </div>
            <div className='form-actions'>
                <button type="submit" className='btn btn-primary'>Update Item</button>
                <button type="button" className='btn btn-secondary' onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default EditItemForm;