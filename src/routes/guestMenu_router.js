const express = require("express");

const { menu } = require("../controllers/guestMenu_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.get("/:id", adminAuth, menu);

module.exports = router;