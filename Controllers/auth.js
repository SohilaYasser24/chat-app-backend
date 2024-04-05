const User = require("../Models/User");
const signToken = require("../Utils/signToken");
const { userValidation, updateUserValidation } = require("../Validators/user");
const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
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
  } catch (error) {
    res.status(500).json({
      message: "Registration Failed",
      error: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Invalid craditional",
      });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({
        message: "Incorrect email or password!",
      });
    }

    const { _id, firstname, lastname, image } = user;

    const token = signToken(
      user._id,
      user.firstname,
      user.lastname,
      user.image,
      user.email,
      user.password
    );
    res.status(200).json({
      token,
      data: {
        _id,
        firstname,
        lastname,
        image,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
      error: error.message,
    });
  }
};

const userDetails = async (req, res, next) => {
  try {
    const { id } = req.user;

    const userData = await User.findById(id);
    res.status(201).json({
      userData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    let { firstname, lastname, email, image /* , password */ } = req.body;

    const validation = updateUserValidation.validate(req.body);

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

    // const hashedPassword = await bcrypt.hash(password, 7);
    const updatedData = {
      firstname,
      lastname,
      email,
      image,
      // password: hashedPassword,
    };

    const userData = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(201).json({
      message: "Update user successfull",
      userData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { signUp, login, userDetails, updateUser, deleteUser };
