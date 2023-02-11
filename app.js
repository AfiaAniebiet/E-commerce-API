//Importing third-party modules
const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("rate-limiter");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

//Database connection
const MONGODB_CONNECTION = require("./database/database");

//Routes
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const productsRoute = require("./routes/products.route");
const reviewsRoute = require("./routes/reviews.route");
const orderRoute = require("./routes/order.route");

//Middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/reviews", reviewsRoute);
app.use("/api/v1/orders", orderRoute);

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
