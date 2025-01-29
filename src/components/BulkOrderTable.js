import React, { useEffect, useState } from 'react';
import '../css/BulkOrder.css';

const BulkOrderTable = () => {
    const [orderData, setOrderData] = useState([]);
    const [error, setError] = useState(null); 


    useEffect(() => {
        const fetchBulkOrders = async () => {
            const storedUser  = localStorage.getItem('currentUser');
            if (storedUser ) {
                const parsedUser  = JSON.parse(storedUser );
                console.log('parsed user 2',parsedUser)
                const userId = parsedUser.user.userId; 
                console.log('User  ID:', userId);
                const url = 'http://localhost:8000/bulkorder/getBulkOrders';
                const requestBody = { userId: userId };

                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json(); 
                    setOrderData(data); 
                } catch (err) {
                    setError('Error fetching bulk orders: ' + err.message);
                    console.error(err);
                }
            } else {
                setError('No user found in local storage.');
            }
        };

        fetchBulkOrders();
    }, []); 

    if (error) {
        return <div>{error}</div>;
    }

    if (orderData.length === 0) {
        return <div>Loading...</div>;
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'orange';
            case 'accepted':
                return 'green';
            case 'canceled':
                return 'red';
            default:
                return 'black'; 
        }
    };

    return (
        <div className='BulkOrderTable'>
            <h2>Bulk Order Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>Sabjis</th>
                        <th>Rotis</th>
                        <th>Starters</th>
                        <th>Sweets</th>
                        <th>Ice Creams</th>
                        <th>Cold Drinks</th>
                        <th>Number of People</th>
                        <th>Delivery Date</th>
                        <th>Delivery Place</th>
                        <th>Admin Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData.map(order => (
                        <tr key={order.BulkOrderId}>
                            <td>{order.BulkOrderId}</td>
                            <td>{order.sabjis.join(', ')}</td>
                            <td>{order.rotis.join(', ')}</td>
                            <td>{order.starters.join(', ')}</td>
                            <td>{order.sweets.join(', ')}</td>
                            <td>{order.iceCreams.join(', ')}</td>
                            <td>{order.coldDrinks.join(', ')}</td>
                            <td>{order.numberOfPeople}</td>
                            <td>{new Date(order.deliveryDate).toLocaleString()}</td>
                            <td>{order.deliveryPlace}</td>
                            <td style={{ color: getStatusColor(order.adminStatus) }}>
                                {order.adminStatus.toUpperCase()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BulkOrderTable;