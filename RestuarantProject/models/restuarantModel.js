const { DataTypes } = require('sequelize');
const sequelize=require('../config/dbconfig');

const restuarantModel= sequelize.define('foodItems',{
    item_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    itemName:{
        type:DataTypes.STRING,
 
    
    },
    itemPrice:{
        type:DataTypes.FLOAT,

    },
    itemImage:{
        type:DataTypes.STRING,

    },
    itemRating:{
        type:DataTypes.INTEGER,

    },
    itemDescription:{
        type:DataTypes.STRING,
   
    },
},{
    timestamps:false,
});
module.exports=restuarantModel;