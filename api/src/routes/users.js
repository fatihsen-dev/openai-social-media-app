"use strict";
exports.__esModule = true;
var express_1 = require("express");
var users_1 = require("../controllers/users");
var router = express_1["default"].Router();
router.get("/", users_1.login);
router.get("/", users_1.register);
exports["default"] = router;
