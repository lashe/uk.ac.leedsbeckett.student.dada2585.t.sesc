const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const addRequestId = require("express-request-id");
const morganMiddleware = require("./utils/morgan");
const errorHandler = require("./utils/errorHandler");
const { jsonS } = require("./utils");
const path = require('path');

const studentRoute = require("./routes/student");
const adminRoute = require("./routes/admin");

const app = express();
// create a rotating write stream
app.use(addRequestId());
app.set("trust proxy", true);

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morganMiddleware);

// Serve static files from the public directory
app.use(express.static(__dirname + "/public"));

// adding Helmet to enhance API's security
app.use(helmet());

// enabling CORS for all requests
app.options("*", cors());
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    }
  }));

app.use(
  session({ secret: "secretpass123456", saveUninitialized: true, resave: true })
);

app.use("/student", studentRoute);

app.use("/admin", adminRoute);

app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "views", "login"));
});

app.get("/register", (req, res) => {
  res.render(path.join(__dirname, "views", "register"));
});

app.get("/courses", (req, res) => {
  res.render(path.join(__dirname, "views", "courses"));
});

app.get("/enrolled-courses", (req, res) => {
  res.render(path.join(__dirname, "views", "enrolledCourses"));
});

app.get("/", (req, res) => {
  return jsonS(
    res,
    {},
    `Student Portal is Online by ${Date()} on ${req.app.get("env")} Environment `
  );
});

app.use("**", (req, res, next) => {
  let err = {};
  err.message = `${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`;
  err.code = 404;
  err.isOperational = true;
  next(err);
});

app.use(errorHandler);

module.exports = app;