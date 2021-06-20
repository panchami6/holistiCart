const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name:{
    type:String,
    required:true
  },
   image:{
    type:String,
    required:true
  },
   price:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  inStock:{
    type:Boolean,
    required:true
  },
  fastDelivery:{
    type:Boolean,
    required:true
  }
}, {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product }