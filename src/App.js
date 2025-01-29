import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; // Assuming you have a Login component
import Orders from './components/Orders';
import About from './components/About';
import Admin from './Admin/Admin';
import AddItemForm from './Admin/Additems';
import BulkOrders from './components/BulkOrders';
import Contacted from './Admin/Contacted';
import Enquiry from './components/Enquiry';

function App() {
  

  return (
    <Router>
      <div>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/orders" element={<Orders/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/additem' element={<AddItemForm/>}/>
            <Route path='/contact/bulkOrder' element={<BulkOrders/>}/>
            <Route path='/contacted' element={<Contacted/>}/>
            <Route path='/contact/enquiry' element={<Enquiry/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;