const express = require("express");

const { admin, 
    updateAdmin,
    updateMariage,
    updateTable,
    updateGuest,
    updateStarter,
    updateDessert,
    updateMaincourse,
    deleteTable,
    deleteGuest,
    deleteStarter,
    deleteMaincourse,
    deleteDessert,
    newGuest,
    newTable,
    newStarter,
    newMaincourse,
    newDessert,
    weddingMenu,
    table, 
    tables,
    guest,
    guests,
    starters,
    maincourses,
    desserts } = require("../controllers/admin");
const { adminLogin } = require("../controllers/auth");
const { adminAuth } = require("../middlewares");

const router = express.Router();

/* GET http://localhost:3050/api/admin */
// router.post("/adminLogin", adminLogin);
// router.get("/myAccount/:id", adminAuth, admin);

// router.post("/addGuest/:id", adminAuth, newGuest);

// router.post("/addTable", adminAuth, newTable);
// router.post("/addStarter/:id", adminAuth, newStarter);
// router.post("/addMaincourse/:id", adminAuth, newMaincourse);
// router.post("/addDessert/:id", adminAuth, newDessert);

// router.get("/table/:id", adminAuth, table);

// router.get("/guest/:id", adminAuth, guest);
// router.get("/weddingMenu", adminAuth, weddingMenu);

// router.get("/tables", adminAuth, tables);

// router.get("/guests", adminAuth, guests);
// router.get("/starters", adminAuth, starters);
// router.get("/maincourses", adminAuth, maincourses);
// router.get("/desserts", adminAuth, desserts);

// router.put("/editAccount/:id", adminAuth, updateAdmin);
// router.put("/editWedding/:id", adminAuth, updateMariage);
// router.put("/editTable/:id", adminAuth, updateTable);

// router.put("/editGuest/:id", adminAuth, updateGuest);
// router.put("/editStarter/:id", adminAuth, updateStarter);
// router.put("/editMaincourse/:id", adminAuth, updateMaincourse);
// router.put("/editDessert/:id", adminAuth, updateDessert);

// router.delete("/deleteTable/:id", adminAuth, deleteTable);

// router.delete("/deleteGuest/:id", adminAuth, deleteGuest);
// router.delete("/deleteStarter/:id", adminAuth, deleteStarter);
// router.delete("/deleteMaincourse/:id", adminAuth, deleteMaincourse);
// router.delete("/deleteDessert/:id", adminAuth, deleteDessert);

module.exports = router;
