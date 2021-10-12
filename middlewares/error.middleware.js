const ApiError = require("../service/api.error");
let yup = require("yup");
module.exports = function (err, req, res, next) {
  //console.error(err);
  /*   if (err instanceof yup.ValidationError) {
    err.inner.forEach((error) => {
      validationErrors[error.path] = error.message;
    });
  } */
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  // для ошибок,которые не предусмотрели
  return res.status(500).json({ message: "Непредвиденная ошибка:  " + err.message });
};
