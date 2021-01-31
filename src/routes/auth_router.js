const express = require("express");

const { register, adminLogin } = require("../controllers/auth");

const router = express.Router();

router.post("/createAccount", register);
router.post("/adminLogin", adminLogin);


module.exports = router;