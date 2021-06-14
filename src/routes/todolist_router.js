const express = require("express");

const { newTodo,
    todos,
    updateTodo,
    deleteTodo
} = require("../controllers/todolist_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/add", adminAuth, newTodo);
router.get("/", adminAuth, todos);
router.post("/edit/:id", adminAuth, updateTodo);
router.delete("/delete/:id", adminAuth, deleteTodo);

module.exports = router;