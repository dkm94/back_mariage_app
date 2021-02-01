const express = require("express");

const { weddingMenu } = require("../controllers/menu_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.get("/", adminAuth, weddingMenu);

module.exports = router;