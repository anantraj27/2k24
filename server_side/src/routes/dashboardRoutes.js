import express from "express"

const dashboardRoutes = express.Router();
import { dashboardData } from "../controller/adminController.js";
import { dashboardHome } from "../controller/dashboardController.js";
import { getDashboard } from "../controller/dashboardController.js";
import { geteventByStatus } from "../controller/dashboardController.js";
import { getEvents } from "../controller/dashboardController.js";
import { searchUsers } from "../controller/dashboardController.js";
import { eventRegister } from "../controller/dashboardController.js";
import { checkAuth } from "../middleware/authMiddleware.js";

dashboardRoutes.get("/api/v1/dashboard",checkAuth,dashboardHome);
dashboardRoutes.get("/api/v1/dashboard-stats",checkAuth,checkAuth,getDashboard);
dashboardRoutes.get("/api/v1/scheduled-events",geteventByStatus);
dashboardRoutes.get("/api/v1/events",checkAuth,getEvents);
dashboardRoutes.get("/api/v1/search-users",checkAuth, searchUsers);
dashboardRoutes.post("/api/v1/register-event",checkAuth,eventRegister)

export default dashboardRoutes;