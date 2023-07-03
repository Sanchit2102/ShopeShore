const mongoose = require("mongoose");
const {Schema} = mongoose;

const OrderSchema = new Schema(
    {
      products: [
        {
          type: mongoose.ObjectId,
          ref: "product",
        },
      ],
      payment: {},
      buyer: {
        type: mongoose.ObjectId,
        ref: "user",
      },
      status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
      },
    },
    { timestamps: true }
  );

const Order  = mongoose.model("order",OrderSchema) 
module.exports = Order;