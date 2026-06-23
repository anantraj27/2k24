import express from "express"
// import { authenticateUser } from "../middleware/authMiddleware";
import { homePage } from "../controller/pageController.js"


import { mainPage } from "../controller/pageController.js"
import { chatPage } from "../controller/pageController.js"

const pageRoutes = express.Router()

pageRoutes.get("/", homePage)
pageRoutes.get("/home", mainPage)
// pageRoutes.get("/chat", chatPage)
export default pageRoutes
