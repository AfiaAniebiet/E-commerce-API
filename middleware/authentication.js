const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    console.log("Token not presente");
  }
  console.log("Token available");
  next();
};

module.exports = {
  authUser,
};
