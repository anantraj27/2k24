import db from '../configuration/db.js';
import bcrypt from 'bcrypt';
import  passport  from 'passport';
// import crypto from "crypto"
import { pushEmailToQueue } from '../utility/producer.js';
const saltRound = 10;

export const signupController = async (req, res) => {

    try {

        const { Name, Email, password } = req.body;

        const hash = await bcrypt.hash(password, saltRound);

        await db.query(
            "INSERT INTO users(name,email,password) VALUES($1,$2,$3)",
            [Name, Email, hash]
        );

        return res.status(201).json({
            success: true,
            message: "Account created successfully"
        });

    } catch (error) {

        if (error.code === "23505") { // PostgreSQL unique violation

            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });

        }

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// VERIFYING THE EMAIL 


// export const VerifyEmail = async (req,res) =>{

// const {token} = req.query;

//                 try {
//                   const user = await db.query(
//                         `SELECT id, verification_expires_at
//                         FROM users
//                         WHERE verification_token=$1 AND is_verified=false`,
//                         [token]
//                       );
                 
//                   if (user.rows.length === 0) {
//                       return res.status(400).json({
//                           error: "Invalid or already used token"
//                       });
//                     }
//                 const userId =user.rows[0].id; 
//                   if( user.rows[0].verification_expires_at && user.rows[0].verification_expires_at <new Date()){

//                     return res.status(400).json({ error: 'Token expired. Request a new verification email.' })
//                   }
//                   await db.query('UPDATE users SET is_verified=true , verification_token =NULL , verification_expires_at =NULL  WHERE id=$1 ',[userId]);
//                   return res.redirect("https://2k24-five.vercel.app/login.html");

//                 } catch (error) {
//                     return res.status(409).json({
//                         success: false,
//                         message: error.message,
//                     });
//                 }



// }




export const signinController = async (req, res, next) => {
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
        name: req.user.name
      })
    })
  })(req, res, next)
}
