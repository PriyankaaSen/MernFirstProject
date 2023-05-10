const express = require("express");
const router = express.Router();
// const {addCategory, getCategories} = require('../controller/category')
const {requireSignin, adminMiddleware} = require('../common-middleware')
const {createProduct,getProductsBySlug,deleteProductById,getProductDetailsById,allproducts,individualProduct} = require('../controller/product')
const multer = require ('multer')
const shortid = require('shortid')
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  }
});

const upload = multer({storage})
const Product = require("../model/productSchema");


router.get('/allproduct', allproducts);
router.post('/product/create',requireSignin, adminMiddleware,upload.array('productPictures'), createProduct);
router.get('/products/:slug', getProductsBySlug)
router.delete('/product/delete', deleteProductById);
// router.get('/category/getCategory', getCategories);
router.get('/product/:id', getProductDetailsById);
// router.get('/products/getproducts',getProducts)

// get individual product data
// router.get('/getproductsone/:id',getProductDetailsById)





module.exports = router;
