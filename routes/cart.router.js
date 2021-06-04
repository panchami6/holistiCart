const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cart.model");
const { extend } = require("lodash");

router.route("/")
.get(async (req, res) => {
	try{
		let cart = await Cart.find().populate("_id");
		cart = cart.map(item => {
			const { _id, ..._doc } = item._id._doc;
      console.log({_doc});
			 return { _id, ..._doc, quantity: _doc.quantity};
			});
		res.json({success: true, cart});
	}catch(error){
		console.log(error);
	}
})
.post(async (req, res) => {
	try{
		const newCartItem = req.body;
    const { _id, quantity } = newCartItem;
		const AddToCart = new Cart({_id, quantity})
		const saveCartProduct = await AddToCart.save();
		res.json({success: true, saveCartProduct});
	}catch(error){
		console.error(error);
	}
})

router.param("_id", async (req, res, next, _id) => {
	try{
		const product = await Cart.findById(_id);

		if(!product){
			return res.status(400).json({success: false, message: "error in getting product"})
		}
		req.product = product;
		next();
	}catch{
		res.status(400).json({success: false, message: "product not found!"})
	}	
})

router.route('/:_id')
.get( async (req, res) => {
	try{
		const { product } = req;
		res.json({ success: true, product });
	}catch(error){
		console.error(error);
	}
})

.post(async (req, res) => {
	try{
		const { _id} = req.params;
		const { quantity } = req.body;
		await Cart.findByIdAndUpdate(_id, {quantity});
		res.json({success: true, quantity });
	}catch(error){
		console.error(error);
	}
})

.delete(async (req, res) => {
	try{
		const { product } = req;
		await product.remove();
		res.json({ success: true, product});
	}catch(error){
		console.log(error);
	}
})

module.exports = router;