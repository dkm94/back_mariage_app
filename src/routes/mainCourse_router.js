const express = require("express");

const { newMaincourse,
    maincourses,
    updateMaincourse,
    deleteMaincourse } = require("../controllers/mainCourse_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/add/:id", adminAuth, newMaincourse);
router.get("/", adminAuth, maincourses);
router.put("/edit/:id", adminAuth, updateMaincourse);
router.delete("/delete/:id", adminAuth, deleteMaincourse);

module.exports = router;