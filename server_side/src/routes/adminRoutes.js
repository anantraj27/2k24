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

const adminRoutes = express.Router()
// adminRoutes.use(checkAdminPermission);

adminRoutes.get("/dashboard" , dashboardPage);

adminRoutes.get("/events" , event);
adminRoutes.get("/user" , user);
adminRoutes.get("/dashboardData" , dashboardData);
adminRoutes.get("/teams" , teams);
adminRoutes.get("/scheduled-events/all",getAllScheduledEvents)
adminRoutes.post("/scheduled-events/add" , scheduledEvent);
adminRoutes.patch("/scheduled-events/:id/edit/date-time", editScheduledEvent);// data & time 
adminRoutes.patch("/scheduled-events/:id/winner",declearWinner);
adminRoutes.patch("/scheduled-events/:id/edit/status", statusScheduledEvent);// start & complete match
adminRoutes.delete("/scheduled-events/delete:id", deleteScheduledEvent);

export  default adminRoutes;