import React from 'react';
import './OrderSuccesfullModal.css'; 

const OrderSuccesfullModal = ({ message,handleCancel }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={handleCancel}>&times;</button>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default OrderSuccesfullModal;