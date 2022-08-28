const express = require("express");

const { newStarter, 
    starters,
    updateStarter,
    deleteStarter } = require("../controllers/starter_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/add", adminAuth, newStarter);
router.get("/", adminAuth, starters);
router.post("/edit/:id", adminAuth, updateStarter);
router.delete("/delete/:id", adminAuth, deleteStarter);

module.exports = router;