const express = require("express");

const { newTable,
    table,
    tables,
    updateTable,
    deleteTable,
    addGuestToTable,
    deleteGuestFromTable
} = require("../controllers/table_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/add", adminAuth, newTable);
router.get("/:id", adminAuth, table);
router.get("/", adminAuth, tables);
router.put("/edit/:id", adminAuth, updateTable);
router.put("/addGuest/:id", adminAuth, addGuestToTable);
router.put("/deleteGuest/:id", adminAuth, deleteGuestFromTable);
router.delete("/delete/:id", adminAuth, deleteTable);

module.exports = router;