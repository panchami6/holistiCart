const express = require("express");
const router = express.Router();
const { Wishlist } = require("../models/wishlist.model");
const { User } = require("../models/User");
const { extend } = require("lodash");
const verify = require("./verifyToken");
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
.get(async (req, res) => {
   try {
    const {userId} = req.params;
    let wishlist = await Wishlist.findOne({ userId });
    res.status(200).json({ success: true, wishlist });
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
  const { productId, name, quantity, price, image, inStock, fastDelivery } = req.body;

  const { userId } = req.params;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (wishlist) {
      //cart exists for user
      let itemIndex = wishlist.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = wishlist.products[itemIndex];
        // productItem.quantity = quantity;
        // wishlist.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        wishlist.products.push({ productId, name,quantity, price, image, inStock, fastDelivery });
      }
      wishlist = await wishlist.save();
      return res.status(201).send(wishlist);
    } else {
      //no cart for user, create new cart
      const newWishlist = await Wishlist.create({
        userId,
        products: [{ productId, name,quantity, price, image, inStock, fastDelivery }]
      });

      return res.status(201).send(newWishlist);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.route('/:userId/:productId')
.delete(async (req, res) => {
	try{
    const { productId, userId} = req.params;
    let wishlist = await Wishlist.findOne({ userId });
    const productExists = wishlist.products.find(
      (product) => product.productId == productId
    )
    if(productExists){
      wishlist.products.remove(productExists)
    }
    let wishlistSaved = await wishlist.save();
		res.json({ success: true, productExists})
	}catch(error){
		console.log(error);
	}
})

module.exports = router;