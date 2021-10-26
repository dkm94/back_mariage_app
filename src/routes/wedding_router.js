const express = require("express");

const { mariage, updateMariage } = require("../controllers/mariage_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.get("/:id", adminAuth, mariage);
router.post("/edit/:id", adminAuth, updateMariage);

module.exports = router;