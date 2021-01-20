const Sequelize = require('sequelize');
const connection = require('../database/database');

const Categories = connection.define('categories',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Categories.sync({force:false}).then(()=>{
    console.log('created categories table')
}).catch(error=>{
    console.log(error)
})
module.exports = Categories;