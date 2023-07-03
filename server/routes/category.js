const express = require('express');
const isAdmin = require('../middleware/admin');
const fetchuser = require('../middleware/fetchuser');
const { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory } = require('../controllers/categoryController');

const router = express.Router();

//Create category -POST
router.post("/create-category",fetchuser,isAdmin,createCategory)

//Update category - PUT
router.put("/update-category/:id",fetchuser,isAdmin,updateCategory)

//Delete category -DELETE
router.delete("/delete-category/:id",fetchuser,isAdmin,deleteCategory)

//Get category -GET
router.get("/get-category/:slug",getCategory)
router.get("/get-all-category",getAllCategory)

module.exports = router;