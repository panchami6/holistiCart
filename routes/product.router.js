const express = require("express");
const router = express.Router();
const { Product } = require("../models/product.model")
const {extend} = require("lodash");

router.route("/")
.get(async (req, res) => {
  try {
    const products = await Product.find({});
  res.json({ success: true, products })
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
  }
  
})
.post(async (req, res) => {
  try {
    const product = req.body;
    console.log(product);
    const NewProduct = new Product(product);
    const savedProduct = await NewProduct.save();
    res.json({ success: true, product: savedProduct })
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message})
  }
})

router.param("id", async (req, res, next, id)  => {
  try{
    const product = await Product.findById(id)

    if(!product){
      return res.status(400).json({success:false, message:"Error getting the product"})
    }
    req.product = product;
    next();
  }catch{
    res.status(400).json({success:false, message:"Error while retrieving the product"})
  }
 
})

router.route("/:id")
.get((req, res) => {
  let {product} = req;
  product.__v = undefined;
  res.json({success:true, product})
})
.post(async (req, res) => {
  const productUpdates = req.body;
  let {product} = req;

  product = extend(product, productUpdates);
  product = await product.save();
  
  res.json({success:true,product})
})
.delete( async (req, res) =>{
  let {product} = req;
  await product.remove();
  res.json({success:true, product})
})


module.exports = router