var config = require("dotenv").config({ path: "./process.env" });
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
var cors = require("cors");

// authentication modules
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var indexRouter = require("./routes/index");
var accountRouter = require("./routes/account");
var organisationRouter = require("./routes/organisation");

var app = express();

const options = require("./knexfile.js");
const knex = require("knex")(options);
const fs = require("fs");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// logs each api request into access.log file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

app.use(logger("combined", { stream: accessLogStream }));
app.use((req, res, next) => {
  req.db = knex;
  req.bc = bcrypt;
  req.jwt = jwt;
  req.cf = config;
  next();
});

app.use("/", indexRouter);
app.use("/", accountRouter);
app.use("/", organisationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
