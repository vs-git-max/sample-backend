import { Router } from "express";
import getAllUsers from "../controllers/user/getAllUsers.js";
import getUser from "../controllers/user/getUserDetails.js";
import authorize from "../middlewares/auth.middleware.js";
const userRouters = Router();

userRouters.get("/get-user/:id", authorize, getUser);
userRouters.get("/get-all-users", getAllUsers);
userRouters.put("/update-user:id");
userRouters.post("/add-user");
userRouters.delete("/delete-user:id");

export default userRouters;
