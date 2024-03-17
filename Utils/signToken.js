const { JwtSecret, expireDateToken } = require("../constants");

const jwt = require("jsonwebtoken");

const signToken = (id, firstname, lastname, image, email, password) => {
  return jwt.sign(
    { id, firstname, lastname, image, email, password },
    JwtSecret,
    {
      expiresIn: expireDateToken,
    }
  );
};

module.exports = signToken;
