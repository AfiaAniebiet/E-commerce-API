const CustomError = require("../errors");

const checkPermissions = (requestUser, requestUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === requestUserId.toString()) return;
  throw new CustomError.UnauthorizedError("You're not authorized to request the reourc");
};

module.exports = checkPermissions;
