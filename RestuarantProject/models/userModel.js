const { DataTypes } = require('sequelize');
const sequelize=require('../config/dbconfig');

const userModel= sequelize.define('Users',{
    userId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    userName:
    {
        type:DataTypes.STRING,
        allowNull:false,
    },
    userEmail:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    userPassword:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{
    timestamps:false,
});

module.exports=userModel;