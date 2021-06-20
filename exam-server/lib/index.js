"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _appRouter = require("./routers/appRouter");

var _config = _interopRequireDefault(require("./config.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])());
app.use(_appRouter.appRouter);

_mongoose["default"].connect(_config["default"].database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, function (err) {
  if (err) {
    console.log("Could not connect to database");
    return console.log(err.message);
  }

  console.log("Connected to database!");
  app.listen(_config["default"].port, function () {
    console.log("Server started at port: ".concat(_config["default"].port));
  });
});