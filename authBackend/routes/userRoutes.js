import express from "express";
import { allUsers, signinHandler, signupHandler } from "../controllers/usercontroller.js";
import authenticateUser from "../middlewares/authenticateUser.js";

const route = express.Router();

route.post("/signup" , signupHandler);
route.post("/signin" , signinHandler);

route.get("/all-users" , authenticateUser , allUsers);

export default route;