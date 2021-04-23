const express = require("express");

const { admin,
    admins,
    updateAdmin,
    deleteAccount } = require("../controllers/admin_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.get("/", admins);
router.get("/myAccount/:id", adminAuth, admin);
router.post("/editAccount/:id", adminAuth, updateAdmin);
router.delete("/deleteAccount/:id", adminAuth, deleteAccount);

module.exports = router;
