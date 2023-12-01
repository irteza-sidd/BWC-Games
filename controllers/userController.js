const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User Already Exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt); //HASH PASSWORD

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        return res.status(200).json({
          success: true,
          message: "Login Successfull",
          user,
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Inavlid Credentials" });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: "User don't exists" });
    }
  } catch (error) {}
};

module.exports = { signupUser, loginUser };
