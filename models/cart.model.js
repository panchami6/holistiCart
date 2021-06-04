const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({ 
    _id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
    }
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = { Cart }
