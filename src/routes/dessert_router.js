const express = require("express");

const { newDessert,
    desserts,
    updateDessert,
    deleteDessert } = require("../controllers/dessert_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/add/:id", adminAuth, newDessert);
router.get("/", adminAuth, desserts);
router.put("/edit/:id", adminAuth, updateDessert);
router.delete("/delete/:id", adminAuth, deleteDessert);

module.exports = router;