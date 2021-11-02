const Product = require('../models/product');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
//Create Product
exports.createProduct = catchAsyncErrors( async (req, res, next) => {
  // next(new ErrorHandler("Please Enter Email & Password", 400));
  const { name, price, comparePrice, brand, description, category, Stock, createdBy } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = await Product.create({
    name,
    price,
    comparePrice,
    brand,
    description,
    category,
    Stock,
    createdBy,
    productPictures
  });

  res.status(201).json({
    success: true,
    product
  })
});


exports.getProducts = catchAsyncErrors( async (req, res,next) => {
 
   // return next(new ErrorHandler("Please Enter Email & Password", 400));

  const products = await Product.find({})

    .select("_id name brand price comparePrice Stock description productPictures category status")
    .exec();

  res.status(200).json({ products });
});


exports.updateProduct = catchAsyncErrors( async (req, res, next) => {
  //  console.log(req.files)
  console.log('req.files cxcxcxc')
  const { _id,name, price, comparePrice, brand, description, category, Stock } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const updateToNewProduct = {
    name,price,comparePrice,brand,description,category,Stock,productPictures
  }

  const updatedCategory = await Product.findOneAndUpdate(
     {_id:_id} ,
    updateToNewProduct,
    { new: true }
  );
  return res.status(201).json({ updatedCategory });
});

// Delete Product

// new update
exports.deleteProductById = (req, res) => {
console.log('asdsfzccx')
  const { productId } = req.body.payload;
  console.log(productId)
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};