const User = require("../Models/User");
const { JwtSecret } = require("../constants");

const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      const decode = await jwt.verify(token, JwtSecret);
      req.user = await User.findById(decode.id).select("-password");
    }

    if (!token) {
      return res.status(401).json({
        message: "You're not logged in!",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, token failed",
      error: error.message,
    });
  }
};
