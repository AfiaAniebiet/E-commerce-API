//Importing third-party modules
const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//Database connection
const MONGODB_CONNECTION = require("./database/database");

//Routes
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const productsRoute = require("./routes/products.route");
const reviewsRoute = require("./routes/reviews.route");

//Middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/reviews", reviewsRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    // MongoDB connection
    await MONGODB_CONNECTION(process.env.MONGODB_URI);
    //Starting server
    app.listen(PORT, () => {
      console.log(`Listening to server on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
