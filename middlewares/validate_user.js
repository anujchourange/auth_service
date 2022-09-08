const { check, validationResult } = require("express-validator");

exports.validateRegisterData = [
  check("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Username can not be empty!")
    .bail()
    .isLength({ min: 4, max: 100 })
    .withMessage("Minimum 3 characters required!")
    .bail()
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("Username should not contain spaces.");
      }
      return true;
    }),
  check("fullName")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Full name can not be empty!")
    .bail()
    .isLength({ min: 4, max: 100 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be at least 8 characters")
    .bail(),
  check("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.validateLoginData = [
  check("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Username can not be empty!")
    .bail()
    .isLength({ min: 4, max: 100 })
    .withMessage("Minimum 3 characters required!")
    .bail()
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("Username should not contain spaces.");
      }
      return true;
    }),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be at least 8 characters")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
