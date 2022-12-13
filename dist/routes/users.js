"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controller/usercontroller");
const router = express_1.default.Router();
router.post("/login", usercontroller_1.LoginUser);
router.post("/signup", usercontroller_1.RegisterUser);
exports.default = router;
