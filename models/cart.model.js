const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({ 
  userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        productId:{
          type: Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: Number,
        name: {
          type:String,
          ref:"Product"
        },
        price: {
          type:Number,
          ref:"Product"
        },
        image:{
          type:String,
          ref:"Product"
        },
        inStock:{
          type:Boolean,
          ref:"Product"
        },
        fastDelivery:{
          type:Boolean,
          ref:"Product"
        }
      }
    ],
},{
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = { Cart }
