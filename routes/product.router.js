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

router.route("/:id")
.get(async (req, res) => {
  // let {product} = req;
  const { id } = req.params;
  let product =  await Product.findById(id);
  product.__v = undefined;
  res.json({success:true, product})
})

module.exports = router