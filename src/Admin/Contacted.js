import React, { useEffect, useState } from 'react';
import DefaultAdmin from './DefaulAdmin';
import '../css/Contacted.css';

const Contacted = () => {
    const [bulkOrders, setBulkOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeLink, setActiveLink] = useState('received'); 

    useEffect(() => {
        const fetchBulkOrders = async () => {
            try {
                const response = await fetch('http://localhost:8000/bulkorder/getallbulkorders');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBulkOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBulkOrders();
    }, []);

    useEffect(() => {
        console.log(`Current Page: ${activeLink === 'received' ? 'Orders Received' : 'Accepted Orders'}`);
    }, [activeLink]);

    // Debugging filtered orders
    const filteredOrders = bulkOrders.filter(order => {
        if (activeLink === 'received') {
            return order.adminStatus === 'pending';
        } else if (activeLink === 'accepted') {
            return order.adminStatus === 'accepted';
        } else if (activeLink === 'rejected') {
            return order.adminStatus === 'rejected';
        }
        return true;
    });

    useEffect(() => {
        console.log('Filtered Orders:', filteredOrders);
    }, [filteredOrders]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const ActionOnOrder = async (id, status) => {
        const accept = { action: status };
        const url = `http://localhost:8000/bulkorder/actiononbulkorders/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accept)
        });
        if (response.ok) {
            console.log('Order action successful');
            // Update the local state immediately
            setBulkOrders(prevOrders => {
                const updatedOrders = prevOrders.map(order => 
                    order.BulkOrderId === id ? { ...order, adminStatus: status } : order
                );
                console.log('Updated Orders:', updatedOrders); // Debugging line
                return updatedOrders;
            });
        } else {
            console.log('Failed to update the order');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'orange';
            case 'accepted':
                return 'green';
            case 'rejected':
                return 'red';
            default:
                return 'black'; 
        }
    };

    return (
        <div>
            <DefaultAdmin />
            <div className='AcceptOrderNavbar'>
                <button className={activeLink === 'received' ? 'active' : ''} onClick={() => setActiveLink('received')}>
                    Received
                </button>
                <button className={activeLink === 'accepted' ? 'active' : ''} onClick={() => setActiveLink('accepted')}>
                    Accepted
                </button>
                <button className={activeLink === 'rejected' ? 'active' : ''} onClick={() => setActiveLink('rejected')}>
                    Rejected
                </button>
            </div>
            <div className='Orderstable'>
                <h1>{activeLink === 'received' ? 'Orders Received' : activeLink === 'accepted' ? 'Accepted Orders' : 'Rejected Orders'}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Sabjis</th>
                            <th>Rotis</th>
                            <th>Starters</th>
                            <th>Sweets</th>
                            <th>Ice Creams</th>
                            <th>Cold Drinks</th>
                            <th> Number of People</th>
                            <th>Delivery Date</th>
                            <th>Delivery Place</th>
                            <th>Admin Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.BulkOrderId}>
                                <td>{order.userName}</td>
                                <td>{order.userEmail}</td>
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
                                {activeLink === 'received' && (
                                    <td>
                                        <button className='AcceptButton' onClick={() => { ActionOnOrder(order.BulkOrderId, 'accept') }}>Accept</button>
                                        <button className='RejectButton' onClick={() => { ActionOnOrder(order.BulkOrderId, 'reject') }}>Reject</button>
                                    </td>
                                )}
                                {activeLink === 'accepted' && (
                                    <td>
                                        <button className='RejectButton' onClick={() => { ActionOnOrder(order.BulkOrderId, 'reject') }}>Reject</button>
                                    </td>
                                )}
                                {activeLink === 'rejected' && (
                                    <td>
                                        <button className='AcceptButton' onClick={() => { ActionOnOrder(order.BulkOrderId, 'accept') }}>Accept</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Contacted;