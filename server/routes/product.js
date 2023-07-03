const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const isAdmin = require("../middleware/admin");
const { createProduct, getAllProducts, getProduct, getProductPhoto, deleteProduct, updateProduct, productFilters, productCount, productList, productSearch, relatedProducts, productByCategory, braintreeToken, braintreePayments } = require("../controllers/productContoller");
const formidable = require('express-formidable')

//Routes
const router = express.Router();

//Create Product - POST
router.post("/create-product",fetchuser,isAdmin,formidable(),createProduct)

//Get Products - GET
router.get("/get-products",getAllProducts)

//Get single Product - GET
router.get("/get-product/:slug",getProduct)

//Update Product
router.put("/update-product/:pid",fetchuser,isAdmin,formidable(),updateProduct)

//Delete Product - DElETE
router.delete("/delete-product/:pid",fetchuser,isAdmin,deleteProduct)

//Get photo-GET
router.get("/get-photo/:pid",getProductPhoto)

//Search Product
router.get("/search/:keyword",productSearch)

//similar product
router.get("/related/:pid/:cid",relatedProducts)

//category wise product
router.get("/productByCategory/:Id",productByCategory)

//Payment route - 
//get token
router.get("/braintree/token",braintreeToken)

//payments
router.post("/braintree/payment",fetchuser,braintreePayments)


module.exports = router;