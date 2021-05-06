const mongoose = require("mongoose");
const { Schema } = mongoose;
// const products = require("./product.data.js");

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
   inStock:{
    type:Boolean,
    required:true
  },
   fastDelivery:{
    type:Boolean,
    required:true
  }

  // id: Schema.Types.ObjectId,
  // name: String,
  // image: String,
  // price: Number,
  // inStock: Boolean,
  // fastDelivery: Boolean,
});

const Product = mongoose.model("Product", ProductSchema);

// one time add in db
// async function productsCollection() {
//   try {
//     dataproducts.forEach(async (product) => {
//       const newProduct = new Product(product);
//       const savedProduct = await newProduct.save();
//       console.log(savedProduct);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = { Product }