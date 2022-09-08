const createHttpError = require("http-errors");
const User = require("../models/User");

/**
 * @desc Get logged in User data
 * @route GET /profile
 * @access private
 **/

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.userId.aud;
    if (!userId) throw createHttpError.Unauthorized("Unauthorized user");
    const user = await User.findById(userId);
    if (!user) throw createHttpError.NotFound("User not found");

    const { email, username, full_name } = user;

    res.json({ email, username, fullName: full_name });
  } catch (error) {
    next(error);
  }
};
