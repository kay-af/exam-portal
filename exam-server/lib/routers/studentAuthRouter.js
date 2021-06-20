"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.studentAuthRouter = void 0;

var _studentModel = require("../models/studentModel");

var _express = require("express");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var studentAuthRouter = (0, _express.Router)();
exports.studentAuthRouter = studentAuthRouter;
studentAuthRouter.post('/login', function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  _studentModel.StudentModel.findOne({
    email: email
  }).then(function (doc) {
    if (doc === null) return res.status(404).json({
      'error': 'UNKNOWN_USER'
    });
    var passwordHash = doc.password;

    _bcrypt["default"].compare(password, passwordHash, function (err, same) {
      if (err) {
        console.log(err.message);
        return res.sendStatus(500);
      }

      if (!same) return res.status(403).json({
        'error': 'PASSWORD_MISMATCH'
      });

      _jsonwebtoken["default"].sign({
        userId: doc._id
      });

      return res.sendStatus(200);
    });
  })["catch"](function (err) {
    console.log(err.message);
    return res.sendStatus(500);
  });
});
studentAuthRouter.post('/create', function (req, res) {
  var _req$body2 = req.body,
      firstName = _req$body2.firstName,
      lastName = _req$body2.lastName,
      email = _req$body2.email,
      password = _req$body2.password;

  _bcrypt["default"].hash(password, 10, function (err, encrypted) {
    if (err) return res.sendStatus(500);

    _studentModel.StudentModel.create({
      name: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: encrypted
    }, function (err, _) {
      if (err) {
        if (err.code === 11000) {
          return res.status(400).json({
            'error': 'DUPLICATE',
            'elements': Object.keys(err.keyPattern)
          });
        }

        return res.sendStatus(500);
      }

      return res.sendStatus(201);
    });
  });
});