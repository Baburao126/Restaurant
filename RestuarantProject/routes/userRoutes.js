const express = require('express');
const {addUser,getUser} = require('../controllers/userControllers');


const Routes=express.Router();

Routes.post('/adduser',addUser)
Routes.post('/getuser',getUser)

module.exports=Routes;