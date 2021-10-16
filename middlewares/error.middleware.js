const ApiError = require("./api.error");
let yup = require("yup");
module.exports = function (err, req, res, next) {
  //console.error(err);
  //
  if (err instanceof ApiError) {
    // console.log("err");
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  // для ошибок,которые не предусмотрели
  return res.status(500).json({ message: "Непредвиденная ошибка:  " + err.message });
};
