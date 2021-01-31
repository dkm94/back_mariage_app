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
    desserts } = require("../controllers/admin_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

/* GET http://localhost:3050/api/admin */
router.get("/myAccount/:id", adminAuth, admin);
router.put("/editAccount/:id", adminAuth, updateAdmin);




// router.post("/addStarter/:id", adminAuth, newStarter);
// router.post("/addMaincourse/:id", adminAuth, newMaincourse);
// router.post("/addDessert/:id", adminAuth, newDessert);




// router.get("/weddingMenu", adminAuth, weddingMenu);




// router.get("/starters", adminAuth, starters);
// router.get("/maincourses", adminAuth, maincourses);
// router.get("/desserts", adminAuth, desserts);

// router.put("/editWedding/:id", adminAuth, updateMariage);



// router.put("/editStarter/:id", adminAuth, updateStarter);
// router.put("/editMaincourse/:id", adminAuth, updateMaincourse);
// router.put("/editDessert/:id", adminAuth, updateDessert);




// router.delete("/deleteStarter/:id", adminAuth, deleteStarter);
// router.delete("/deleteMaincourse/:id", adminAuth, deleteMaincourse);
// router.delete("/deleteDessert/:id", adminAuth, deleteDessert);

module.exports = router;
