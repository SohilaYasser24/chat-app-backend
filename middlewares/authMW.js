const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "You're not logged in!",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};
