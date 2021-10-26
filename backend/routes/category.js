const express = require('express');
const router = express.Router();
const { addCategory,getCategories,updateCategories,deleteCategories } = require('../controllers/category');
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.post('/addCategory', upload.single("categoryImage"), addCategory);
router.get('/getCategory', getCategories);
router.post('/updateCategory',upload.array('categoryImage'),updateCategories);
router.post("/category/delete",deleteCategories);

module.exports = router;