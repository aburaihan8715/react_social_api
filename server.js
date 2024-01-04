const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();
const serverPort = process.env.SERVER_PORT || 5001;

mongoose
  .connect(process.env.MONGO_ATLAS_URI)
  .then(() => {
    console.log("Db is connected");
  })
  .catch((error) => {
    console.log("Db connection error");
  });

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(serverPort, () => {
  console.log(`Server is running at http://localhost:${serverPort}`);
});
