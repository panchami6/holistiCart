const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cart.model");
const { User } = require("../models/User");
const { extend } = require("lodash");
const authVerify = require("./verifyToken");

router.param("userId", async (req, res, next, userId) => {
  try{
    const user = await User.findById({ _id:userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this Id",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User not found",
      errorMessage: err.message,
    });
  }
})

router.route("/:userId")
.get( async (req, res) => {
   try {
    const {userId} = req.params;
    let cart = await Cart.findOne({ userId });
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
})
.post(async (req, res) => {
  const { productId, quantity, name, price, image, inStock, fastDelivery } = req.body;

  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price, image, inStock, fastDelivery});
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, name, price, image, inStock, fastDelivery }]
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});


router.route('/:userId/:productId')
// .get(authVerify, async (req, res) => {
// 	try{
// 		const { productExists } = req;
//     let cart = req.cart;
// 		res.json({ success: true, cart });
// 	}catch(error){
// 		console.error(error);
// 	}
// })
// .post(async (req, res) => {
// 	try{
// 		const { productId} = req.params;
// 		const { quantity } = req.body;
// 		await Cart.findByIdAndUpdate(productId, {quantity});
// 		res.json({success: true, quantity });
// 	}catch(error){
// 		console.error(error);
// 	}
// })
.delete(async (req, res) => {
	try{
    const { productId, userId} = req.params;
    let cart = await Cart.findOne({ userId });
    const productExists = cart.products.find(
      (product) => product.productId == productId
    )
    console.log("product",productExists)
    if(productExists){
      cart.products.remove(productExists)
    }
    let cartSaved = await cart.save();
		res.json({ success: true, productExists})
	}catch(error){
		console.log(error);
	}
})

module.exports = router;