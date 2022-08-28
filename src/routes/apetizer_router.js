const express = require("express");

const { newApetizer,
    apetizers,
    updateApetizer,
    deleteApetizer } = require("../controllers/apetizer_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/add", adminAuth, newApetizer);
router.get("/", adminAuth, apetizers);
router.post("/edit/:id", adminAuth, updateApetizer);
router.delete("/delete/:id", adminAuth, deleteApetizer);

module.exports = router;