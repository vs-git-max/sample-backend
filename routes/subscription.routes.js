import { Router } from "express";

const subscriptionRoutes = Router();

subscriptionRoutes.delete("/delete-subscription/:id");
subscriptionRoutes.put("/update-subscription/:id");
subscriptionRoutes.get("/get-subscriptions");
subscriptionRoutes.get("/get-subscription-details/:id");
subscriptionRoutes.post("/create-subscriptions");
subscriptionRoutes.get("/user/:id");
subscriptionRoutes.put("/:id/cancel-subscription");
subscriptionRoutes.get("/upcoming-renewals");

export default subscriptionRoutes;
