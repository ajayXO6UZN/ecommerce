const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  console.log('adadadadaad')

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  /*************************************************************************************
  * "User validation failed: password: Password should be greater than 8 characters"    *
  *                                                                                     *
  *   convert this string into object :--->                                             *
  * e = {                                                                               *
  *   'password':'Password should be greater than 8 characters',                        *
  *   'email':'Please enter your email'                                                 *
  * }                                                                                   *
  * ************************************************************************************/

  if (err.name === "ValidationError") {
    let completeErrorMessage = err.message;
    var errAjay = {}
    const allErrors = completeErrorMessage.substring(completeErrorMessage.indexOf(':') + 1).trim();
    const allRrrorsInArrayFormat = allErrors.split(',').map(error => error.trim());
    allRrrorsInArrayFormat.forEach(errors => {
      const [key, value] = errors.split(':').map(error => error.trim())
      errAjay[key] = value;
      //  err = new ErrorHandler(err, 400);
    })
  }

  // err = new ErrorHandler(errAjay, 400);
  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "ValidationError") {
    res.status(err.statusCode).json({
      success: false,
      message: errAjay,
      //  message: console.log(e),
    });
  } else {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      //  message: console.log(e),
    });
  }
};
