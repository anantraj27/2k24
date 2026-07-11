import express from "express";

import {
    getConfessions,
    addConfession,
    reactConfession,reportConfession
} from "../controller/confessionController.js";

const confessionRoutes = express.Router();

confessionRoutes.get("/", getConfessions);

confessionRoutes.post("/", addConfession);

confessionRoutes.patch("/:id/react", reactConfession);
confessionRoutes.patch(
    "/:id/report",
    reportConfession
);
export default confessionRoutes;