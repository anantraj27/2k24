import express from "express"
// import { authenticateUser } from "../middleware/authMiddleware";
import { homePage } from "../controller/pageController.js"
import { mainPage } from "../controller/pageController.js"
import { chatPage } from "../controller/pageController.js"
const router = express.Router()

router.get("/", homePage)
router.get("/home", mainPage)
router.get("/chat", chatPage)
export default router
