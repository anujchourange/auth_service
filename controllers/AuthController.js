const { validateUser } = require("../middlewares/validate_user");
const createHttpError = require("http-errors");
const { signAccessToken } = require("../helpers/jwt_helper");
const User = require("../models/User");

/**
 * @desc Register New User
 * @route POST /auth/register
 * @access public
 **/
exports.register = async (req, res, next) => {
  try {
    const { username, fullName, email, password } = req.body;
    //console.log(username);
    const doesExist = await User.findOne({ username: username });
    //console.log(doesExist);
    if (doesExist)
      throw createHttpError.Conflict(`username or email already exists`);

    const user = new User({ username, full_name: fullName, email, password });

    let savedUser = await user.save();

    const accessToken = await signAccessToken(savedUser.id);
    res.send({ accessToken: accessToken });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Login User and return the jwt token
 * @route POST /auth/login
 * @response accessToken
 * @access public
 **/

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) throw createHttpError.NotFound(`User not registered`);

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      throw createHttpError.Unauthorized("username/password is not valid");

    const accessToken = await signAccessToken(user.id);
    res.send({ accessToken: accessToken });
  } catch (error) {
    next(error);
  }
};
