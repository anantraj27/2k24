import express from "express"
// import authRoutes from './authRoutes.js';
// import notesRoutes from './noteRoutes.js';
import pageRoutes from "./pageRoutes.js"
import authRoutes from "./authRoutes.js"
import adminRoutes from "./adminRoutes.js"
import dashboardRoutes from "./dashboardRoutes.js"
import confessionRoutes from "./confessionRoutes.js"
// import { authenticateUser } from "../middleware/authMiddleware.js"



const router = express.Router();

router.use("/page", pageRoutes)
router.use("/auth", authRoutes)
router.use("/user",dashboardRoutes)
router.use("/admin" , adminRoutes)
router.use("/confession" , confessionRoutes)

// router.post(
//   "/verification",

//   (req, res) => {
//     res.status(200).json({
//       success: false,
//       message: "Authenticated",
//     })
//   },
// )
export default router
//Or more clearly:
// “Attach the authRoutes router so that any request
//  starting with /auth is handled by it.”
