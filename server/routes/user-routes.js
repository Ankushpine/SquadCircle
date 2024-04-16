import express from "express";
export const router = express.Router();
import { CreateUser, LogInUser } from "../controllers/user-controller.js";
import messageRouter from "./message-routes.js";

router.post("/createuser",CreateUser);
router.post("/loginuser",LogInUser);
router.use("/user",messageRouter);









