const express = require("express");

const { adminAuth } = require("../middlewares");
const { newFood, foods, updateFood, deleteFood } = require('../controllers/food_controller');

const router = express.Router();

router.post("/add", adminAuth, newFood);
router.get("/", adminAuth, foods);
router.post("/edit/:id", adminAuth, updateFood);
router.delete("/delete/:id", adminAuth, deleteFood);

module.exports = router;