const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/user");
const sendToken = require("../utils/jwtToken");


// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  console.log('ssssssssssssssssssssssss')
  console.log(req.body)
  let userImage = [];

  if (req.files.length > 0) {
    userImage = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const { name, email, password, gender, phone } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    gender,
    phone,
    userImage
  });

 
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

