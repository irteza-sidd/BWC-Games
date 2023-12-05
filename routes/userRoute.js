const express = require("express");
const { signupUser, loginUser,getUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.get("/:id", getUser);

module.exports = userRouter;
