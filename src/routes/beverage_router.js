const express = require("express");

const { newBeverage,
    beverages,
    updateBeverage,
    deleteBeverage } = require("../controllers/beverage_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/add", adminAuth, newBeverage);
router.get("/", adminAuth, beverages);
router.post("/edit/:id", adminAuth, updateBeverage);
router.delete("/delete/:id", adminAuth, deleteBeverage);

module.exports = router;