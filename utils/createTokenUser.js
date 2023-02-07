const createTokenUser = (user) => {
  return { fullName: userModel.fullName, userId: user._id, role: user.role };
};

module.exports = {
  createTokenUser,
};
