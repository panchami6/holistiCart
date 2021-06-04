const express = require("express");
const router = express.Router();
const { Wishlist } = require("../models/wishlist.model");
const { extend } = require("lodash");

router.route("/")
.get(async (req, res) => {
	try{
		let wishlist = await Wishlist.find().populate("_id");
		wishlist = wishlist.map(item => item._id);
		res.json({ success: true, wishlist });
	}catch(error){
		console.log(error);
	}
})
.post(async (req, res) => {
	try{
		const newWishlistItem = req.body;
		const AddToWishlist = new Wishlist(newWishlistItem)
		const saveWishlistProduct = await AddToWishlist.save();
		res.json({success: true, saveWishlistProduct});
	}catch(error){
		console.error(error);
	}
})

router.param("id", async (req, res, next, id) => {
	try{
		const product = await Wishlist.findById(id);

		if(!product){
			return res.status(400).json({success: false, message: "error in getting product"})
		}
		req.product = product;
		next();
	}catch{
		res.status(400).json({success: false, message: "product not found!"})
	}	
})

router.route('/:id')
.get( async (req, res) => {
	try{
		const { product } = req;
		res.json({ success: true, product });
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