const express = require("express");

const { newGuest,
    guest,
    guests,
    updateGuest,
    deleteGuest
} = require("../controllers/guest_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/add/:id", adminAuth, newGuest);
router.get("/:id", adminAuth, guest);
router.get("/", adminAuth, guests);
router.put("/edit/:id", adminAuth, updateGuest);
router.delete("/delete/:id", adminAuth, deleteGuest);

module.exports = router;