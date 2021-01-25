const express = require("express");

const { myAccount } = require("../controllers/admin");
const { register, adminLogin } = require("../controllers/auth");
const { adminAuth } = require("../middlewares");

const router = express.Router();

/* GET http://localhost:8080/api/djs/ */
router.get("/:id", adminAuth, myAccount);
router.post("/", register);
router.post("/", adminLogin);

module.exports = router;
