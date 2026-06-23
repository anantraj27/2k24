import express from "express"

const dashboardRoutes = express.Router();
import { dashboardData } from "../controller/adminController.js";
import { dashboardHome } from "../controller/dashboardController.js";
import { getDashboard } from "../controller/dashboardController.js";
import { geteventByStatus } from "../controller/dashboardController.js";

dashboardRoutes.get("/dashboardhome",dashboardHome);
dashboardRoutes.get("/dashboard-stats",getDashboard);
dashboardRoutes.get("/dashboard-stats/get/status",geteventByStatus);
export default dashboardRoutes;