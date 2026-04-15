import passport from "passport"
import { Strategy } from "passport-local" ///  importing local

import env from "dotenv" /// library for usieng process.env.  name
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()
import db from "./db.js"

passport.use(
  "local",
  new Strategy(
    {
      /// by default  wo chhta hai kii body mej hamko , req.body.username and req.body.password  field hona chahiye , if nhi then btanna ka liya kii yeh khojo ... uska jagah
      usernameField: "Email", // 👈 YEH btana ka liya kii userb=name ka jagah yeh khojo  req body seh...
      passwordField: "password",
    },
    async function verify(Email, password, cb) {
      try {
        const result = await db.query("SELECT * FROM users WHERE  email = $1", [
          Email,
        ])
        if (result.rows.length === 0) {
          return cb(null, false, {
            message: "Enter Email is not related to password",
          })
        }

        if (result.rows.length > 0) {
          const user = result.rows[0]
          const storedPassword = result.rows[0].password

          const ismatch = await bcrypt.compare(password, storedPassword)

          if (!ismatch) {
            return cb(null, false, {
              message: "Wrong password",
            })
          }

          return cb(null, user)
        }
      } catch (error) {
        cb(error)
      }
    },
  ),
)

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id])

    done(null, result.rows[0])
    // --> req.user = result.rows[0]
  } catch (err) {
    done(err, null)
  }
})
