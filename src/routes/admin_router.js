const express = require("express");

const { admin, 
    updateAdmin, 
    mariage, 
    updateMariage,
    updateTable,
    updateGroup,
    deleteTable,
    deleteGroup,
    newGroup,
    newTable,
    table, 
    tables,
    group,
    groups } = require("../controllers/admin");
const { register, adminLogin } = require("../controllers/auth");
const { adminAuth } = require("../middlewares");

const router = express.Router();

/* GET http://localhost:3050/api/admin */
router.post("/register", register);
router.post("/adminLogin", adminLogin);
router.get("/myAccount/:id", adminAuth, admin);

router.post("/addGroup", adminAuth, newGroup);
router.post("/addTable", adminAuth, newTable);

router.get("/wedding/:id", adminAuth, mariage);
router.get("/table/:id", adminAuth, table);
router.get("/group/:id", adminAuth, group);

router.get("/tables", adminAuth, tables);
router.get("/groups", adminAuth, groups);

router.put("/editAccount/:id", adminAuth, updateAdmin);
router.put("/editWedding/:id", adminAuth, updateMariage);
router.put("/editTable/:id", adminAuth, updateTable);
// router.put("/editGroup/:id", adminAuth, updateGroup);

router.delete("/deleteTable/:id", adminAuth, deleteTable);
// router.delete("/deleteGroup/:id", adminAuth, deleteGroup);



module.exports = router;
