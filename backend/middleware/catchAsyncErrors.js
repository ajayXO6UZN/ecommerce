module.exports = (theFunc) => (req, res, next) => {
  console.log('ajay 222');

  Promise.resolve(theFunc(req, res, next)).catch(next);
};



