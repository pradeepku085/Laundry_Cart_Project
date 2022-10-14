require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const ProductList = require("./models/ProductList");
const ordersList = require("./models/OrdersList");

const path = require("path");
const photo = path.join(__dirname, "./uploads");

const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("connected");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cd(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const fileNameArr = file.originalname.split(".");
    cd(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        fileNameArr[fileNameArr.length - 1]
    );
  },
});

const upload = multer({ storage: storage });

const connectDB = async () => {
  try {
    return await mongoose.connect("mongodb://localhost:27017/laundtyCart");
  } catch (error) {
    console.log(err);
    console.log("not connected");
  }
};

async function main() {
  connectDB();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static(photo));

  app.get("/api/productList", async (req, res) => {
    const products = await ProductList.find().sort({ _id: -1 });
    // console.log(products);
    // const jsonString = JSON.stringify(orders);
    // res.send(jsonString);
    res.send(products);
  });

  app.post("/api/productList", async (req, res) => {
    console.log(req.body);
    const { productType, washType } = req.body;

    const productLists = await ProductList.create({ productType, washType });
    res.send(productLists);
  });

  app.get("/api/createOrder", async (req, res) => {
    const orders = await ordersList.find();
    // console.log(orders);
    // const jsonString = JSON.stringify(orders);
    res.send(orders);
  });

  app.post("/api/createOrder", async (req, res) => {
    console.log(req.body);
    const {
      orderId,
      orderDateAndtime,
      orderAaddress,
      storeLocation,
      City,
      storePhone,
      items,
      price,
      Status,
    } = req.body;

    const order = await ordersList.create({
      orderId,
      orderDateAndtime,
      orderAaddress,
      storeLocation,
      City,
      storePhone,
      items,
      price,
      Status,
    });

    res.json(order);
    // res.send({
    //   order,
    // });
  });

  app.listen(PORT, (req, res) => {
    console.log(`Server started on Port ${PORT}.`);
  });
}

main();
