const express = require("express");
const mainRouter = express.Router();

const authRouter = require("./auth_router");
const weddingRouter = require("./wedding_router")
const adminRouter = require("./admin_router");
const guestRouter = require("./guest_router");
const tableRouter = require("./table_router");
const budgetRouter = require("./budget_router");
const todolistRouter = require("./todolist_router");
const foodRouter = require("./food_router");

mainRouter.use("/auth", authRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/wedding", weddingRouter);
mainRouter.use("/guests", guestRouter);
mainRouter.use("/tables", tableRouter);
mainRouter.use("/budget", budgetRouter);
mainRouter.use("/todolist", todolistRouter);
mainRouter.use("/reception/food", foodRouter);

module.exports = mainRouter;
