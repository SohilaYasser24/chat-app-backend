const jwt = require("jsonwebtoken");

const signToken = (id, firstname, lastname, image, gender, email, password) => {
  return jwt.sign(
    { id, firstname, lastname, image, gender, email, password },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

module.exports = signToken;
