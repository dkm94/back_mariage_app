const express = require("express");
const mainRouter = express.Router();

const authRouter = require("./auth_router");
const weddingRouter = require("./wedding_router")
const adminRouter = require("./admin_router");
const groupRouter = require("./group_router");
const guestRouter = require("./guest_router");
const tableRouter = require("./table_router");
const menuRouter = require("./menu_router");
const guestMenuRouter = require("./guestMenu_router");
const starterRouter = require("./starter_router");
const mainCourseRouter = require("./mainCourse_router");
const dessertRouter = require("./dessert_router");

mainRouter.use("/auth", authRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/wedding", weddingRouter);
mainRouter.use("/groups", groupRouter);
mainRouter.use("/guests", guestRouter);
mainRouter.use("/tables", tableRouter);
mainRouter.use("/menu", menuRouter);
mainRouter.use("/guestmenu", guestMenuRouter);
mainRouter.use("/starters", starterRouter);
mainRouter.use("/maincourses", mainCourseRouter);
mainRouter.use("/desserts", dessertRouter);

module.exports = mainRouter;
