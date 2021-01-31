const express = require("express");

const { admin, 
    updateAdmin, 
    mariage, 
    updateMariage,
    updateTable,
    updateGroup,
    updateGuest,
    updateStarter,
    updateDessert,
    updateMaincourse,
    deleteTable,
    deleteGroup,
    deleteGuest,
    deleteStarter,
    deleteMaincourse,
    deleteDessert,
    newGroup,
    newGuest,
    newTable,
    newStarter,
    newMaincourse,
    newDessert,
    weddingMenu,
    table, 
    tables,
    group,
    groups,
    guest,
    guests,
    starters,
    maincourses,
    desserts } = require("../controllers/admin");
const { register, adminLogin } = require("../controllers/auth");
const { adminAuth } = require("../middlewares");

const router = express.Router();

/* GET http://localhost:3050/api/admin */
router.post("/register", register);
router.post("/adminLogin", adminLogin);
router.get("/myAccount/:id", adminAuth, admin);

router.post("/addGuest/:id", adminAuth, newGuest);
router.post("/addGroup", adminAuth, newGroup);
router.post("/addTable", adminAuth, newTable);
router.post("/addStarter/:id", adminAuth, newStarter);
router.post("/addMaincourse/:id", adminAuth, newMaincourse);
router.post("/addDessert/:id", adminAuth, newDessert);

router.get("/wedding/:id", adminAuth, mariage);
router.get("/table/:id", adminAuth, table);
router.get("/group/:id", adminAuth, group);
router.get("/guest/:id", adminAuth, guest);
router.get("/weddingMenu", adminAuth, weddingMenu);

router.get("/tables", adminAuth, tables);
router.get("/groups", adminAuth, groups);
router.get("/guests", adminAuth, guests);
router.get("/starters", adminAuth, starters);
router.get("/maincourses", adminAuth, maincourses);
router.get("/desserts", adminAuth, desserts);

router.put("/editAccount/:id", adminAuth, updateAdmin);
router.put("/editWedding/:id", adminAuth, updateMariage);
router.put("/editTable/:id", adminAuth, updateTable);
router.put("/editGroup/:id", adminAuth, updateGroup);
router.put("/editGuest/:id", adminAuth, updateGuest);
router.put("/editStarter/:id", adminAuth, updateStarter);
router.put("/editMaincourse/:id", adminAuth, updateMaincourse);
router.put("/editDessert/:id", adminAuth, updateDessert);

router.delete("/deleteTable/:id", adminAuth, deleteTable);
router.delete("/deleteGroup/:id", adminAuth, deleteGroup);
router.delete("/deleteGuest/:id", adminAuth, deleteGuest);
router.delete("/deleteStarter/:id", adminAuth, deleteStarter);
router.delete("/deleteMaincourse/:id", adminAuth, deleteMaincourse);
router.delete("/deleteDessert/:id", adminAuth, deleteDessert);

module.exports = router;
