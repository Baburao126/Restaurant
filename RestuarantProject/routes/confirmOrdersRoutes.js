const { addItems  }=require('../controllers/confirmOrdersControllers');

const express=require('express');

const routes=express.Router();

routes.post('/addItemstoorders',addItems);

module.exports=routes;