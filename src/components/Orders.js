import React, { useEffect, useState } from 'react'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";
import Default from './Default';

const Orders = () => {
    // const [userData, setUserData] = useState(null);
    const [items, setItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);
    const [user,setUser]=useState([]);
    const [address,setAddress]=useState('');
    const ordersItems=[];

    useEffect(() => {
        const storedUser   = localStorage.getItem('currentUser');
        if (storedUser ) {
            const parsedUser   = JSON.parse(storedUser );
            setUser(parsedUser.user); 
            // console.log('userid in useeffetct porders:',parsedUser.user.userId);
            const payload = {
                UserId:parsedUser.user.userId,
            };
    
            fetch('http://localhost:8000/basket/getOrders', {
                method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then(response => response.json())
            .then(data => setItems(data.Orders))
            .catch(error => console.error(error));

        }
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/restuarant/get')
        .then(response => response.json())
        .then(data => setMenuItems(data.Items))
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const itemIds = items.map(item => item.ItemId);
        const filteredMenuItems = menuItems.filter(menuItem => itemIds.includes(menuItem.item_id));
        setFilteredMenuItems(filteredMenuItems);
    }, [items, menuItems]);

    const totalPrice = filteredMenuItems.reduce((total, item) => total + item.itemPrice, 0);
    const taxRate = 0.1; 
    const tax = totalPrice * taxRate;
    const totalPay = totalPrice + tax;


    const handleSubmitClick =async ()=>{
        // console.log(filteredMenuItems)
        filteredMenuItems.forEach(item => {
            ordersItems.push(item.itemName);
        });
        const date=new Date();
        console.log(date)
        const payload={
            itemNames:ordersItems,
            totalPrice:totalPay,
            userId:user.userId,
            DateAndTime: date.toISOString(),
            DelivaryAddress:address
        }
       console.log(payload);
       try{

           const response=await fetch('http://localhost:8000/confirmorder/addItemstoorders',{
               method:'POST',
               headers:{
                   'Content-Type':'application/json',
               },
               body:JSON.stringify(payload)
           })
           if(response.ok){
               console.log('added item');
               ordersItems.length = 0;
           }
           else{
               console.log('error in adding data')
           }
       }
       catch(err){
        console.log('error',err)
       }


    }

    const handleRemove = async (itemId)=>{
        const userId=user.userId;
        const payload={
            UserId:userId,
            ItemId:itemId
        }

        const response=await fetch('http://localhost:8000/basket/deleteOrder',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(payload)

        });

        if (response.ok) {
            setItems(prevItems => prevItems.filter(item => item.ItemId !== itemId));
        } else {
            console.error('Failed to delete the item');
        }
    }
  return (
    <div>
        <Default/>
        <div style={{display:'flex',marginTop:'4rem'}}> 
        <div style={{ width: '100%', maxHeight: '90vh', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {filteredMenuItems.map(item => (
                    <div key={item.item_id} className="card"   style={{width:'60%',marginLeft:8}}>
                       <div style={{display:'flex'}}>
                        <div>
                        <img src={item.itemImage} alt={item.itemImage} height={200} width={300}/>
                        </div>
                        <div style={{marginLeft:'10px',width:'160px'}}>
                            <h1>{item.itemName}</h1>
                            <h3><LiaRupeeSignSolid/>{item.itemPrice}</h3>
                            <p className="card-rating">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <FaStar key={index} color={index < item.itemRating ? '#FFD500' : 'gray'} />
                                ))}
                            </p>
                        </div>
                        <div style={{marginLeft:'20px',marginTop:25}}>
                        <p>{item.itemDescription}</p>
                        
                        </div>
                        <div>
                            <button onClick={()=>handleRemove(item.item_id)} style={{marginRight:'auto',color:'#a10202',border:'none',cursor:'pointer',background:'none'}}>X</button>
                        </div>
                       </div>
                    </div>
                ))}
        </div>
        <div style={{marginLeft:'-33%',width:'30%',height:'fit-content' ,background:'linear-gradient(to bottom, rgba(5, 148, 100, 0.3), rgba(198, 233, 141, 0.7))' ,padding:'20px',marginTop:'30px',borderRadius:'30px',marginRight:'40px'}}>
            <div style={{justifyContent:'center',display:'flex',}}>
                <h1 style={{}}>Total Pay</h1>
            </div>
            <div>
                <div style={{display:'flex'}}>
                    <h3>Items Price: </h3>
                    <h4 style={{marginLeft:'auto'}}>{totalPrice.toFixed(2)}<LiaRupeeSignSolid /></h4>
                </div>
                <div style={{display:'flex',marginTop:'-20px'}}>
                    <h3>Tax (10%):  </h3>
                    <h4 style={{marginLeft:'auto'}}>{tax.toFixed(2)}<LiaRupeeSignSolid /></h4>
                </div>
                <div style={{display:'flex',marginTop:'-20px'}}>
                    <h3>Total Pay: </h3>
                    <h4 style={{marginLeft:'auto'}}>{totalPay.toFixed(2)}<LiaRupeeSignSolid /></h4>
                </div>
            </div>
            Add Address
            <input type='text'
            value={address}
            onChange={(e)=>{setAddress(e.target.value)}}
            style={
                {
                    height:'50px',
                    width:'100%',
                    backgroundColor:'#E9FFDB'
                }
            }   
            />
            <div style={{display:'flex',justifyContent:'center'}}>
                <button onClick={handleSubmitClick} style={{background:'#0D4D00',
                    marginTop:'10px', 
                    color:'white ',
                    borderRadius:'10px',
                    height:'35px',
                    width:'50%',
                    fontSize:'17px',
                    cursor:'pointer'}}>Confirm order</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Orders;