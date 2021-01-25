const express = require("express");
const mainRouter = express.Router();

const adminRouter = require("./admin_router");
// const groupRouter = require("./group_router");
// const guestRouter = require("./guest_router");
// const weddingRouter = require("./wedding_router");
// const dessertRouter = require("./dessert_router");
// const starterRouter = require("./starter_router");
// const guestMenuRouter = require("./guestMenu_router");
// const mainCourseRouter = require("./mainCourse_router");
// const menuRouter = require("./menu_router");
// const tableRouter = require("./table_router");


mainRouter.use("/admin", adminRouter);
// mainRouter.use("/group", groupRouter);
// mainRouter.use("/guest", guestRouter);
// mainRouter.use("/wedding", weddingRouter);
// mainRouter.use("/dessert", dessertRouter);
// mainRouter.use("/starter", starterRouter);
// mainRouter.use("/guestMenu", guestMenuRouter);
// mainRouter.use("/mainCourse", mainCourseRouter);
// mainRouter.use("/menu", menuRouter);
// mainRouter.use("/table", tableRouter);

module.exports = mainRouter;
