const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToMongo = () => {
  mongoose.connect(process.env.MONGO_URL, {
      autoIndex: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
};

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});

module.exports = connectToMongo;
