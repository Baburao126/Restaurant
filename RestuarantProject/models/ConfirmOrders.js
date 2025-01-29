const { DataTypes } = require('sequelize');
const sequelize = require("../config/dbconfig");

const ConfirmOrders = sequelize.define('ConfirmOrders',{
    orderId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        require:true
    },
    DelivaryAddress:{
        type:DataTypes.STRING, 
    },
    itemNames:{
        type:DataTypes.STRING,
    },
    totalPrice:{
        type:DataTypes.INTEGER,
    },
    DateAndTime:{
        type:DataTypes.DATE
    },
    Action:{
        type:DataTypes.STRING,
    }
},{
    timestamps:false,
});

module.exports=ConfirmOrders