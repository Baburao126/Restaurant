const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig');

const bulkOrderModel = sequelize.define('BulkOrders', {
    BulkOrderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    sabjis: {
        type: DataTypes.JSON,
        allowNull: false,
       
    },
    rotis: {
        type: DataTypes.JSON,
        allowNull: false,
        
    },
    starters: {
        type: DataTypes.JSON, 
        allowNull: false,
       
    },
    sweets: {
        type: DataTypes.JSON,
        allowNull: false,
        
    },
    iceCreams: {
        type: DataTypes.JSON, 
        allowNull: false,
    }, 
    coldDrinks: {
        type: DataTypes.JSON, 
        allowNull: false,
       
    },
    numberOfPeople: {
        type: DataTypes.INTEGER,
        allowNull: false,
     
    },
    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
       },
    deliveryPlace: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    adminStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        
    },
}, {
    timestamps: false,
});


module.exports = bulkOrderModel;