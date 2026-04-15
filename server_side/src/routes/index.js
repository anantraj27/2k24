import express from "express"
// import authRoutes from './authRoutes.js';
// import notesRoutes from './noteRoutes.js';
import pageRoutes from "./pageRoutes.js"
import authRoutes from "./authRoutes.js"
// import { authenticateUser } from "../middleware/authMiddleware.js"



const router = express.Router()

router.use("/", pageRoutes)
router.use("/home", pageRoutes)
router.use("/chat", pageRoutes)
router.use("/auth", authRoutes)
router.post(
  "/verification",

  (req, res) => {
    res.status(200).json({
      success: false,
      message: "Authenticated",
    })
  },
)
export default router
//Or more clearly:
// “Attach the authRoutes router so that any request
//  starting with /auth is handled by it.”
