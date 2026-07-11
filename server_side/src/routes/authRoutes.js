import express from "express"
import { checkAuth } from "../middleware/authMiddleware.js"
import { signupController ,signinController  } from "../controller/authController.js"
// import { signinController } from "../controller/authController.js"
import passport from "passport"
import adminRoutes from "./adminRoutes.js"
// import { VerifyEmail } from "../controller/authController.js"
const authRoutes = express.Router();

// |-----------------------------------------------------------------------
//auth routes ...................



authRoutes .post("/signup", signupController)
authRoutes.get("/checkAuth", checkAuth, (req, res) => {

    res.json({
        success: true,
        name: req.user.name
    });

});
authRoutes .post("/signin", signinController)
// authRoutes.get('/verify-email',VerifyEmail)
export default authRoutes




