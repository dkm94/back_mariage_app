const express = require("express");

const { newDessert,
    desserts,
    updateDessert,
    deleteDessert } = require("../controllers/dessert_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/add", adminAuth, newDessert);
router.get("/", adminAuth, desserts);
router.post("/edit/:id", adminAuth, updateDessert);
router.delete("/delete/:id", adminAuth, deleteDessert);

module.exports = router;