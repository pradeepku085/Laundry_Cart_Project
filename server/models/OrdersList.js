const mongoose = require("mongoose");

const ordersList = mongoose.Schema({
  orderId: String,
  orderDateAndtime: String,
  orderAaddress: String,
  storeLocation: String,
  City: String,
  storePhone: String,
  items: Number,
  price: Number,
  Status: String,
});

let OrdersList = mongoose.model("OrdersList", ordersList);

module.exports = OrdersList;
