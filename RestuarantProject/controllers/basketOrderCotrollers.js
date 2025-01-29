const orderInBasketModel=require('../models/ordersInBasket');


const addToOrdersBasket = async (req, res) => {
    try {
        console.log(req.body);
        const { UserId, ItemId, OrderStatus } = req.body;


        if (!UserId) {
            return res.status(400).json({ message: 'User Id is required' });
        }
        if (!ItemId) {
            return res.status(400).json({ message: 'ItemId is required' });
        }
        if (!OrderStatus) {
            return res.status(400).json({ message: 'OrderStatus is required' });
        }

 
        const response = await orderInBasketModel.create({ UserId, ItemId, OrderStatus });

 
        if (response) {
            return res.status(201).json({ item: response }); 
        } else {
            return res.status(500).json({ message: 'Failed to add item to basket' });
        }
    } catch (err) {
        console.error('Error adding to orders basket:', err); 
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

const getOrder = async (req, res) => {
    const { UserId } = req.body; 

  
    console.log('Received UserId:', UserId);

    if (!UserId) {
        return res.status(400).json({ message: 'User Id is required' });
    }

    try {
        const orders = await orderInBasketModel.findAll({
            where: { UserId } 
        });
        res.json({ Orders: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const deleteBasketOrder= async (req,res)=>{

    const{UserId,ItemId}=req.body;
    if(!UserId){
        console.log('UserId is missing');
    }
    if(!ItemId){
        console.log('ItemId is missing');
    }
    try{
    await orderInBasketModel.destroy({where:{UserId,ItemId}})
    return res.status(200).json({message:'sucessfully deleted item'});
    }
    catch(err){
        return res.status(500).json({error:err});
    }
 
}
module.exports={addToOrdersBasket,getOrder,deleteBasketOrder};