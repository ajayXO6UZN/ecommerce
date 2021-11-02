const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProductById } = require('../controllers/product');
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.post('/products', upload.array("productPictures"), createProduct);
router.get('/getAllProducts', getProducts);
router.post('/updateProduct', upload.array("productPictures"), updateProduct);
router.delete('/deleteProduct', deleteProductById);


module.exports = router
