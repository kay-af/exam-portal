"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appRouter = void 0;

var _express = require("express");

var _studentAuthRouter = require("./studentAuthRouter");

var appRouter = (0, _express.Router)();
exports.appRouter = appRouter;
appRouter.use('/auth/student', _studentAuthRouter.studentAuthRouter);