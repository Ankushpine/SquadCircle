import express from "express";
import { getMessages, likesMessage, postMessages } from "../controllers/message-controller.js";
import jwtTokenVerification from "../middlewares/JWT-middleware.js";
 const router = express.Router();

router.get("/getmessages",jwtTokenVerification,getMessages);
router.post("/postmessages/:userID",jwtTokenVerification,postMessages);
router.post("/likemessages/:userID",jwtTokenVerification,likesMessage);

export default router;