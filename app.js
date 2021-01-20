const express = require("express");
const app = express()
const bodyParser = require("body-parser")
// DATABASE 
const database = require("./database/database")

// Controller
const categoryController = require("./categories/categoriesController")
const productController = require("./product/productController")

// Setting packges
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

database
    .authenticate()
    .then(()=>{
        console.log('Conexão feita com sucesso');
    }).catch((error)=>{
        console.log('Erro: '+error);
    });

// exporting routes
app.use("/api/v1", categoryController)
app.use("/api/v1", productController)

var port = 3000
app.listen(port, ()=>{
    console.log(`application running on the door ${port}`)
})
