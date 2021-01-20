const { response } = require('express');
const express = require('express');
const productModel = require('./Product');
const router = express.Router();

router.post("/product", (req, res) =>{
    
    let {title, description, price, categoryId} =req.body;
    
    productModel.create({
        title,
        description,
        price,
        categoryId
    }).then(() =>{
        res.statusCode = 201;
        res.json({success: true, message:"Produto criado com sucesso"})
    }).catch(error =>{
        console.log(error)
    })
})


router.get("/product", (req,res) =>{
    
    productModel.findAll({raw:true}).then(product =>{
        res.statusCode = 200;
        res.json({success:true, data:product})
    }).catch(error =>{
        res.statusCode = 400
        res.json({success:false, message:"Erro interno"})
        console.log(error)
    })
})


router.put("/product/:id", (req, res) =>{
    
    let id = req.params.id
    let {title, description, price, categoryId} =req.body;

    console.log(title, description, price, categoryId)

    productModel.findOne({where:{id}}).then(product =>{
       
        if(product == undefined || product == null || product == ""){
            res.statusCode = 400
            res.json({success:false, message:"Produto não encontrado"})
        } else{
            
            productModel.update({
                title,
                description,
                price,
                categoryId        
            },{
                where:{id}
            }).then(data =>{
                res.statusCode = 200
                res.json({success:true, message:"Produto alterado com sucesso"})
            }).catch(error =>{
                console.log(error)
            })

        }
    }).catch(error =>{
        console.log(error)
    })
})

router.get("product/filter",(req,res) =>{

    let {title} = req.body

    productModel.findOne({where:{title}}).then(product =>{
        res.statusCode = 200
        res.json({success:true, data: product})
    }).catch(error =>{
        console.log(error)
        res.statusCode = 400
        res.json({success: false, message:"erro interno"})
    })

})

router.delete("/product/:id", (req,res) =>{

    let id = req.params.id

    productModel.destroy({where:{id}}).then(response =>{
        res.statusCode = 200;
        res.json({success:true, message:"Produto excluido com sucesso" })
    }).catch(error =>{
        console.log(error)
    })

})

module.exports = router;