"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controller/usercontroller");
const router = express_1.default.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    console.log("wally");
    res.status(200).json({ "solo": "respondtt with a resource" });
});
router.post("/login", usercontroller_1.LoginUser);
router.post("/signup", usercontroller_1.RegisterUser);
router.get("/allusers", usercontroller_1.getUsers);
exports.default = router;
