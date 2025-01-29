const express=require('express');
const {addToOrdersBasket, getOrder, deleteBasketOrder} = require('../controllers/basketOrderCotrollers');

const Routes=express.Router();

Routes.post('/addItemtoBasket',addToOrdersBasket);
Routes.post('/getOrders',getOrder);
Routes.delete('/deleteOrder',deleteBasketOrder);

module.exports=Routes;