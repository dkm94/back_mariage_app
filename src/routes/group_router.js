const express = require("express");

const { newGroup,
    group,
    groups,
    updateGroup,
    deleteGroup,
} = require("../controllers/groupe_ctrl");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/add", adminAuth, newGroup);
router.get("/:id", adminAuth, group);
router.get("/", adminAuth, groups);
router.put("/edit/:id", adminAuth, updateGroup);
router.delete("/delete/:id", adminAuth, deleteGroup);

module.exports = router;