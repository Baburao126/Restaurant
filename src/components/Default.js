import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import '../css/Default.css';
import { useNavigate } from 'react-router-dom';

function Default({ search, setSearch }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [userData, setUserData] = useState(null); 
    const [homepage,setHomepage]=useState(false);

    const navigate=useNavigate();

    useEffect(() => {
        const storedUser  = localStorage.getItem('currentUser'); 
        if (storedUser ) {
            const parsedUser  = JSON.parse(storedUser );
            setUserData(parsedUser.user); 
        }
    }, []);

    useEffect(() => {
        const path = window.location.pathname;
        if (path === '/home') {
            setHomepage(true);
            setActiveLink('home');
        } else if (path === '/about') {
            setActiveLink('about');
        } else if (path === '/contact/bulkorder') {
            setActiveLink('contact');
        } else if (path === '/orders') {
            setActiveLink('orders');
        }
    }, []);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
        console.log('User  data from local storage:', userData);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link); 
    };
    
    const handleLogout=()=>{
        localStorage.removeItem('currentUser');
        navigate('/');
    }
    const  handleLogin=()=>{
        navigate('/');
    }
   

    return (
        <div className="app">
            <nav className="navbar">
                <div className="navbar-brand">
                    <FaUserCircle onClick={handleSidebarToggle} style={{ fontSize: '30px', margin: '10px', cursor: 'pointer' }} />
                    <h1>Restaurant App</h1>
                </div>
                <div className='inputSearch'>
                    {homepage && <input 
                        type='text'
                        placeholder='Search food item'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ background: 'none', color: 'white', textAlign: 'center' }}
                    />}
                </div>
                <ul className="navbar-nav">
                    <li className={`nav-item ${activeLink === 'home' ? 'active' : ''}`}>
                        <a href="/home" className="nav-link" onClick={() => handleLinkClick('home')}>
                            Home
                        </a>
                    </li>
                    <li className={`nav-item ${activeLink === 'about' ? 'active' : ''}`}>
                        <a href="/about" className="nav-link" onClick={() => handleLinkClick('about')}>
                            About
                        </a>
                    </li>
                    <li className={`nav-item ${activeLink === 'contact' ? 'active' : ''}`}>
                        <select 
                            name='Contacts' 
                            value={activeLink === 'contact' ? 'contact' : ''} 
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                handleLinkClick(selectedValue);
                                navigate(`/contact/${selectedValue.toLowerCase()}`); 
                            }}
                            style={{ background: 'none', color: 'white',border:'none', cursor: 'pointer',fontSize:'14px' }}
                        >
                            <option value="" disabled>Contact</option>
                            <option value="bulkOrder" style={{color:'black'}}>Bulk Order</option>
                            <option value="enquiry" style={{color:'black'}}>Enquiry</option>
                            <option value="complaint" style={{color:'black'}}>Complaint</option>
                        </select>
                    </li>
                </ul>
            </nav>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <ul className="sidebar-nav">
                    <div style={{ display: 'flex', background: '#d0f0c0', width: '120%', marginLeft: '-14px' }}>
                        <div style={{ marginBottom: '40px' }}>
                            <FaUserCircle onClick={handleSidebarToggle} style={{ fontSize: '30px', cursor: 'pointer' }} />
                        </div>
                        <div className='User ' style={{ marginLeft: '10px', marginTop: '-9px' }}>
                            {userData ? (
                                <div>
                                    <p>User Id: {userData.userId}</p>
                                    <p style={{ marginLeft: '-40px' }}>{userData.userName}</p>
                                    <p style={{ marginLeft: '-40px', marginTop: '-10px' }}>{userData.userEmail}</p>
                                </div>
                            ) : (
                                <p>Guest</p>
                            )}
                        </div>
                    </div>
                    <div style={{ marginTop: '40px' }}>
                        <li className={`sidebar-item ${activeLink === 'dashboard' ? 'active' : ''}`}>
                            {/* <a href="/home" className="sidebar-link" onClick={() => handleLinkClick('dashboard')}>
                                Dashboard
                            </a> */}
                        </li>
                        <li className={`sidebar-item ${activeLink === 'orders' ? 'active' : ''}`}>
                            <a href="/orders" className="sidebar-link" onClick={() => handleLinkClick('orders')}>
                                Orders
                            </a>
                        </li>
                        <li className={`sidebar-item ${activeLink === 'menu' ? 'active' : ''}`}>
                            {/* <a href="/home" className="sidebar-link" onClick={() => handleLinkClick('menu')}>
                                Menu
                            </a> */}
                        </li>
                    </div>
                </ul>
                {userData ? (
                
                <div className='Logout' style={{marginTop:'63vh'}}>
                   <button onClick={handleLogout}>Logout</button>
                </div>
                ):(
                    <div className='Logout' style={{marginTop:'63vh'}}>
                    <button onClick={handleLogin}>Login</button>
                 </div>
                )}
            </div>
        </div>
    );
}

export default Default;