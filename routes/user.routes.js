import { Router } from "express";
const userRouters = Router();

userRouters.get("/get-all-user");
userRouters.put("/update-user:id");
userRouters.post("/add-user");
userRouters.delete("/delete-user:id");

export default userRouters;
