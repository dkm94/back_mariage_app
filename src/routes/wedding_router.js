const express = require("express");

const { mariage } = require("../controllers/mariage");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.get("/:id", adminAuth, mariage);

module.exports = router;