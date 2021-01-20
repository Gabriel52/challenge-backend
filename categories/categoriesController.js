const express = require('express');
const categoryModel = require('./Categories');
const router = express.Router();

router.post("/category", (req, res) =>{
    
    let {name} =req.body;
    
    categoryModel.create({
        name
    }).then(() =>{
        res.statusCode = 201;
        res.json({success: true, message:"Categoria criado com sucesso"})
    }).catch(error =>{
        console.log(error)
    })
})

router.get("/category", (req,res) =>{
    
    categoryModel.findAll({raw:true}).then(category =>{
        res.statusCode = 200;
        res.json({success:true, data:category})
    }).catch(error =>{
        res.statusCode = 400
        res.json({success:false, message:"Erro interno"})
        console.log(error)
    })
})


router.put("/category/:id", (req, res) =>{
    
    let id = req.params.id
    let {name} =req.body;

    categoryModel.findOne({where:{id}}).then(category =>{
       
        if(category == undefined || category == null || category == ""){
            res.statusCode = 400
            res.json({success:false, message:"categoria não encontrado"})
        } else{
            
            productModel.update({
                name,
            },{
                where:{id}
            }).then(data =>{
                res.statusCode = 200
                res.json({success:true, message:"categoria alterado com sucesso"})
            }).catch(error =>{
                console.log(error)
            })

        }
    }).catch(error =>{
        console.log(error)
    })
})


module.exports = router;