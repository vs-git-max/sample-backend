/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import userRouters from "./routes/user.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import connectToDB from "./database/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(errorMiddleware);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouters);
app.use("/api/v1/subscription", subscriptionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running on port${PORT}`);
});

export default app;
