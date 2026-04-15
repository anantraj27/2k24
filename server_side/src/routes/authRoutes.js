import express from "express"
import { checkAuth } from "../middleware/authMiddleware.js"
import { signupController } from "../controller/authController.js"
import passport from "passport"
const router = express.Router();

// |-----------------------------------------------------------------------
//auth routes ...................

router.post("/signup", signupController);
router.post("/checkAuth",checkAuth);


// |-----------------------------------------------------------------------
router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      })
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || "Invalid credentials",
      })
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Login failed",
        })
      }

      return res.json({
        success: true,
        message: "Login successful",
      })
    })
  })(req, res, next)
})
export default router
