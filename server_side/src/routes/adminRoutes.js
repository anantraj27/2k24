import express from "express"
import { dashboardPage } from "../controller/adminController.js";
import { event } from "../controller/adminController.js";
import { checkAdminPermission } from "../middleware/authMiddleware.js";
import { user } from "../controller/adminController.js";
import { dashboardData } from "../controller/adminController.js";
import { teams } from "../controller/adminController.js";
import { scheduledEvent } from "../controller/adminController.js";
import { getAllScheduledEvents } from "../controller/adminController.js";
import { editScheduledEvent ,declearWinner,statusScheduledEvent,deleteScheduledEvent } from "../controller/adminController.js";
import { checkRegistration } from "../controller/adminController.js";
const adminRoutes = express.Router()
adminRoutes.use(checkAdminPermission);

adminRoutes.get("/api/v1/dashboard" , dashboardPage);

adminRoutes.get("/api/v1/events" , event);
adminRoutes.get("/api/v1/users" , user);
adminRoutes.get("/api/v1/dashboard-data" , dashboardData);
adminRoutes.get("/api/v1/teams" , teams);
adminRoutes.get("/api/v1/scheduled-events",getAllScheduledEvents)
adminRoutes.post("/api/v1/scheduled-events" , scheduledEvent);
adminRoutes.patch("/api/v1/scheduled-events/:id/date-time", editScheduledEvent);// data & time 
adminRoutes.patch("/api/v1/scheduled-events/:id/winner",declearWinner);
adminRoutes.patch("/api/v1/scheduled-events/:id/status", statusScheduledEvent);// start & complete match
adminRoutes.delete("/api/v1/scheduled-events/:id", deleteScheduledEvent);
adminRoutes.get(
    "/api/v1/check-registration",
    checkRegistration
);

export  default adminRoutes;