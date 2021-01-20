const Sequelize = require('sequelize');
const connection = require('../database/database');
const Categories = require("../categories/Categories")

const Product = connection.define('product',{
    title:{
        type: Sequelize.STRING,
        allowNull: false,
    },description:{
        type: Sequelize.TEXT,
        allowNull: false
    },price:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
  
Categories.hasMany(Product);
Product.belongsTo(Categories);

Product.sync({force:false}).then(()=>{
    console.log('created product table')
}).catch(error=>{
    console.log(error)
})


module.exports = Product;