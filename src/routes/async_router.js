const express = require("express");

const { getGuestbyName } = require("../controllers/async_controller");

const { adminAuth } = require("../middlewares");
const router = express.Router();

router.get("/", adminAuth, getGuestbyName);

module.exports = router;