const { body, check, validationResult } = require("express-validator");
const { userList } = require("../controllers/auth.controller");
const handleError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validate = (validationRules) => {
  return [validationRules, handleError];
};

const validateUser = validate([
  body("username").isEmail(),
  body("password").isLength({ min: 5 }),
]);

const checkUserExists = validate([
  // custom validator for checking if email is in use
  check("username", "Custom valid running").custom(async (value) => {
    if (userList.some((e) => e.user == value)) {
      throw new Error("User already found");
    }
  }),
]);

module.exports = { validateUser, checkUserExists };
// exports.validateUser = [check("username").isEmail(), handleError];
