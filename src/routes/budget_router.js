const express = require("express");

const {
    operations,
    operation,
    newOperation,
    updateOperation,
    deleteOperation
    } = require("../controllers/budget_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.get("/operations/", adminAuth, operations);
router.post("/operations/add", adminAuth, newOperation);
router.post("/operations/edit/:id", adminAuth, updateOperation);
router.delete("/operations/delete/:id", adminAuth, deleteOperation);
router.get("/operation/:id", adminAuth, operation);

module.exports = router;