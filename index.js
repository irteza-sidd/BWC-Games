const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const connectToMongo = require("./config/db");

const app = express();

connectToMongo();

app.use(express.json());

const corsConfig = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsConfig));

app.get("/", (req, res) => {
  res.status(200).json("Application is running");
});

app.options("", cors(corsConfig));

app.use("/v1/api/user", userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("App is running");
});
