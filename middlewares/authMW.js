const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
    }

    if (!token) {
      return res.status(401).json({
        message: "You're not logged in!",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};
