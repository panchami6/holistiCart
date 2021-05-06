// const mongoose = require("mongoose");
// const Schema = mongoose.Schema

// const cartItems = new Schema({ 
//     details: {
//         type: Schema.Types.ObjectId,
//         ref: "Product",
//         unique :"product already in cart",
//         required:"product required"
//     },
//     quantity: {
//         type: Number,
//         required:"quantity required", 
//         min:1
//     }
// });


// const CartSchema = new Schema({
//   products:[cartItems],
// }
// );

// const Cart = mongoose.model("Cart", CartShema);
// module.exports = { Cart }