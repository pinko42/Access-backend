const express = require("express");
const usersController = require("../controllers/usersController");

const userRouter = express.Router();

userRouter.get("/", usersController.getUsers);
userRouter.post("/adduser", usersController.addUser);
//bookRouter.post("/auth/login", bookController.addBook);
userRouter.post("/newreport", usersController.newReport);
userRouter.get("/reports", usersController.getReports);




module.exports = userRouter;