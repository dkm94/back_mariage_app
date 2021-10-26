const express = require("express");

const { register,
    adminLogin, 
    guestLogin, 
    resetPassword } = require("../controllers/auth");

const router = express.Router();

router.post("/createAccount", register);
router.post("/adminLogin", adminLogin);
router.post("/guestLogin", guestLogin);
router.post("/reset-password", resetPassword);

module.exports = router;