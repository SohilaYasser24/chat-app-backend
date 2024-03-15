const User = require("../model/User");
const signToken = require("../utils/token");
const userValidation = require("../utils/userValidation");
const bcrypt = require("bcryptjs");

require("dotenv").config();

exports.signUp = async (req, res, next) => {
  try {
    const { firstname, lastname, email, image, gender, password } = req.body;

    const validation = userValidation.validate(req.body);
    if (validation.error) {
      return res.status(400).json({
        message: validation.error.details[0].message,
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
      gender: gender,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "Register successfully",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Register Failed",
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
        message: new AppError("User not found", 401),
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
      user.fullName,
      user.email,
      user.image,
      user.role,
      user.status,
      user.phone,
      user.password
    );
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
      error: error.message,
    });
  }
};
