const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/user");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");


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

  const { name, email, password, gender, phone, status, role, checked } = req.body;
  console.log('bfbfbfbfb')

  const user = await User.create({
    name,
    email,
    password,
    gender,
    phone,
    userImage,
    role,
    status
  });

  // SEND EMAIL TO THE USER
  if (checked) {
    sendEmail(email);
  }

  console.log(user)
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body)
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


exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {

  // return next(new ErrorHandler("Please Enter Email & Password", 400));

  const users = await User.find({})

    .select("_id name email phone gender userImage role status")
    .exec();

  res.status(200).json({ users });
});


exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req.files)
  console.log(req.body)
  //  console.log(req.files)
  console.log('req.files users')
  const { _id, name, email, phone, status, role, gender, change } = req.body;

  if (change == 'change') {
    let userImage = [];

    if (req.files && req.files.length > 0) {
      userImage = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    const updateToNewUser = {
      _id, name, email, phone, userImage, status, role, gender
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      updateToNewUser,
      { new: true }
    );
    return res.status(201).json({ updatedUser });

  } else {

    const updateToNewUser = {
      _id, name, email, phone, status, role, gender
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      updateToNewUser,
      { new: true }
    );
    return res.status(201).json({ updatedUser });
  }
});