const express = require("express");
const mainRouter = express.Router();

const authRouter = require("./auth_router");
const weddingRouter = require("./wedding_router")
const adminRouter = require("./admin_router");
const invitationRouter = require("./invitation_router");
const guestRouter = require("./guest_router");
// const asyncRouter = require("./async_router");
const tableRouter = require("./table_router");
const menuRouter = require("./menu_router");
const guestMenuRouter = require("./guestMenu_router");
const starterRouter = require("./starter_router");
const mainCourseRouter = require("./mainCourse_router");
const dessertRouter = require("./dessert_router");
const budgetRouter = require("./budget_router");
const todolistRouter = require("./todolist_router");

mainRouter.use("/auth", authRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/wedding", weddingRouter);
mainRouter.use("/invitation", invitationRouter);
// mainRouter.use("/guest", asyncRouter);
mainRouter.use("/guests", guestRouter);
mainRouter.use("/tables", tableRouter);
mainRouter.use("/menu", menuRouter);
mainRouter.use("/budget", budgetRouter);
mainRouter.use("/todolist", todolistRouter);
mainRouter.use("/guestmenu", guestMenuRouter);
mainRouter.use("/menu/starters", starterRouter);
mainRouter.use("/menu/maincourses", mainCourseRouter);
mainRouter.use("/menu/desserts", dessertRouter);

module.exports = mainRouter;
