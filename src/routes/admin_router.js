const express = require("express");

const { admin, updateAdmin } = require("../controllers/admin_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.get("/myAccount/:id", adminAuth, admin);
router.put("/editAccount/:id", adminAuth, updateAdmin);

module.exports = router;
