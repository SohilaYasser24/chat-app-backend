const User = require("../Models/User");
const signToken = require("../Utils/signToken");
const { userValidation } = require("../validators");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
  try {
    const { firstname, lastname, email, image, password } = req.body;

    const validation = userValidation.validate(req.body);

    if (validation.error) {
      let errorMessage = "";
      for (const err of validation.error.details) {
        errorMessage += `${err.path.join(" > ")} ${err.message.slice(
          err.message.lastIndexOf('"') + 1
        )}`;
      }
      return res.status(400).json({
        message: errorMessage,
      });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newUser = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      image: image,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "Registration successfully",
    });
    next();
  } catch (error) {
    res.status(500).json({
      message: "Registration Failed",
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({
        message: "Incorrect email or password!",
      });
    }

    const token = signToken(
      user._id,
      user.firstname,
      user.lastname,
      user.image,
      user.email,
      user.password
    );
    res.status(200).json({
      status: "Login successfully",
      token,
    });
    next();
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
      error: error.message,
    });
  }
};
