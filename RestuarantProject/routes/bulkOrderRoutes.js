const express=require('express');
const { createBulkOrder, getBulkOrderById, getAllBulkOrder, ActionsOnBulkOrder } = require('../controllers/bulkOrderController');


const Routess=express.Router();

Routess.post('/addbulkorder',createBulkOrder);
Routess.post('/getBulkOrders',getBulkOrderById);
Routess.get('/getallbulkorders',getAllBulkOrder);
Routess.put('/actiononbulkorders/:id',ActionsOnBulkOrder);

module.exports=Routess;