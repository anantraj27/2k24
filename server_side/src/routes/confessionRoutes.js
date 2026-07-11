import express from "express";

import {
    getConfessions,
    addConfession,
    reactConfession
} from "../controller/confessionController.js";

const confessionRoutes = express.Router();

confessionRoutes.get("/", getConfessions);

confessionRoutes.post("/", addConfession);

confessionRoutes.patch("/:id/react", reactConfession);

export default confessionRoutes;