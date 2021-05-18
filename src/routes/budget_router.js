const express = require("express");

const {
    budget,
    operations,
    operation,
    newOperation,
    updateOperation,
    deleteOperation
    } = require("../controllers/budget_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.get("/operations", adminAuth, operations);
router.post("/operations/add/:id", adminAuth, newOperation);
router.post("/operations/edit/:id", adminAuth, updateOperation);
router.delete("/operations/delete/:id", adminAuth, deleteOperation);
router.get("/operation/:id", adminAuth, operation);
router.get("/details/:id", adminAuth, budget);

module.exports = router;