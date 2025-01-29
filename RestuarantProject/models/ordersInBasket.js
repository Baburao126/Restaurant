const { DataTypes } = require('sequelize');
const sequelize=require('../config/dbconfig');

const orderInBasket= sequelize.define('BasketOrders',{
    UserId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    ItemId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    OrderStatus:{
        type:DataTypes.STRING,
    }
},{
    timestamps:false,
});

module.exports=orderInBasket;

