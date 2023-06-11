const express = require("express")
const mongoose = require("mongoose")
const Product= require('./Models/productModel')

const app = express()

app.use(express.json())

app.get("/products", async(req,res)=>{
    try{
        const products = await Product.find({})
        res.status(200).json(products)

    }catch(error){
        res.status(500).json({message:error.message})
    }
})
app.get("/products/:id",async(req,res)=>{
    try{
        const {id} = req.params
        const productID = await Product.findById(id);
        res.status(200).json(productID)

    }catch(error){
        res.status(500).json({message:error.message})

    }
})
//update a product
app.put("/products/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        //cannot find any product in database
        if (!product){
            return res.status(404).json({message:`cannot find any product with this id`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)

    }catch(error){
        res.status(500).json({message:error.message})

    }
})

//delete a product
app.delete("/products/:id",async(req,res)=>{
    try{
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message : `cannot find any product with this id`})

        }
        res.status(200).json(product)


    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})



app.get("/",(req,res)=>{
    res.send(`Hello node api`)
})

app.get("/Clan",(req,res)=>{
    res.send(`My clan is level 5`)
})

app.post("/products",async (req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

mongoose.set('strictQuery',false)
mongoose.
connect("mongodb+srv://anupambandi:anupambandi@cluster0.nd0zbgh.mongodb.net/node-API?retryWrites=true&w=majority")
.then(()=>{
    console.log(`connected to Mongodb`)
    app.listen(3000,()=>{
        console.log(`Node API app is running on port 3000`)
    })
}).catch((error)=>
{console.log(error)})