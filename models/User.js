const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Product } = require("../models/product.model")
const { Cart } = require("../models/cart.model")
const { Wishlist } = require("../models/wishlist.model")

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3
  },
  email: {
    type: String,
    required: true,
    min: 8
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
},{
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

// module.exports = mongoose.model("User", userSchema);
module.exports = { User }