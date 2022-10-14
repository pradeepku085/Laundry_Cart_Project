const mongoose = require("mongoose");

const productList = mongoose.Schema({
  productType: String,
  washType: [
    {
      typeName: String,
      pricePeriTem: Number,
      default: 0,
    },
  ],
});

let ProductList = mongoose.model("ProductList", productList);

module.exports = ProductList;
