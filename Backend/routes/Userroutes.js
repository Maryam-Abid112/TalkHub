const express = require("express");
const router = express.Router();

const { registerUser, loginUser,alluser,update } = require("../controller/userController.js");
const protect =require("../middleauth/userauth.js")

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

router.get("/getalluser",protect,alluser);


router.put("/update",protect,update);

module.exports = router;