const express = require("express");
const { signupUser, loginUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);

module.exports=userRouter;