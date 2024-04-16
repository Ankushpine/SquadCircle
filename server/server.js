import express from "express";
import connectToMongoDB from "./config/db-connection.js";
import { router } from "./routes/user-routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { app, server } from "./socket/socket.js";

// const app = express();
const port = 5000

connectToMongoDB();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/",router);


server.listen(port,()=>console.log("Server running on port ::",port))