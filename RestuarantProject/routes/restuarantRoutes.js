const express =require('express');
const {addItems,getItems, deleteItem, editItem} = require('../controllers/addItemController');


const routes=express.Router();

routes.post('/add',addItems);
routes.get('/get',getItems)
routes.delete('/delete',deleteItem);
routes.put('/update',editItem);

module.exports=routes;