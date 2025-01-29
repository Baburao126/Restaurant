import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import '../css/Default.css';
import { useNavigate } from 'react-router-dom';

function DefaultAdmin({ search, setSearch }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [serachActive,setSearchActive]=useState(false);


    const navigate=useNavigate();

    useEffect(() => {
        const path = window.location.pathname;
        if (path === '/admin') {
            setActiveLink('Items');
            setSearchActive(true);
        } else if (path === '/additem') {
            setActiveLink('about');
        } else if (path === '/contact') {
            setActiveLink('contact');
        } else if (path === '/orders') {
            setActiveLink('orders');
        }
    }, []);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link); 
    };
    
    const handleLogout=()=>{
        localStorage.removeItem('currentUser');
        navigate('/');
    }


    return (
        <div className="app">
            <nav className="navbar">
                <div className="navbar-brand">
                    <FaUserCircle onClick={handleSidebarToggle} style={{ fontSize: '30px', margin: '10px', cursor: 'pointer' }} />
                    <h1>Restaurant App</h1>
                </div>
                <div>
                    <h4 style={{marginLeft:'100px'}}>Admin Panel</h4>
                </div>
                <div style={{marginLeft:'-100px'}}>
                    {serachActive &&
                     <input type='text'
                     placeholder='search items'
                     value={search}
                     onChange={(e)=>setSearch(e.target.value)}
                     style={{
                         textAlign:'center'
                     }}
                     /> 
                    }
                   
                </div>
                <ul className="navbar-nav">
                    <li className={`nav-item ${activeLink === 'Items' ? 'active' : ''}`}>
                        <a href="/admin" className="nav-link" onClick={() => handleLinkClick('home')}>
                            Items
                        </a>
                    </li>
                    <li className={`nav-item ${activeLink === 'about' ? 'active' : ''}`}>
                        <a href="/additem" className="nav-link" onClick={() => handleLinkClick('about')}>
                            Add item
                        </a>
                    </li>
                    <li className={`nav-item ${activeLink === 'contact' ? 'active' : ''}`}>
                        <a href="/contacted" className="nav-link" onClick={() => handleLinkClick('contact')}>
                            Contacted
                        </a>
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
                                <p>Admin</p>
                        </div>
                    </div>
                    <div style={{ marginTop: '40px' }}>
                        <li className={`sidebar-item ${activeLink === 'dashboard' ? 'active' : ''}`}>
                        </li>
                        <li className={`sidebar-item ${activeLink === 'menu' ? 'active' : ''}`}>

                        </li>
                    </div>
                </ul>
                <div className='Logout' style={{marginTop:'79vh'}}>
                   <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default DefaultAdmin;