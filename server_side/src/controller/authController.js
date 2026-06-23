import db from '../configuration/db.js';
import bcrypt from 'bcrypt';
import crypto from "crypto"
import { pushEmailToQueue } from '../utility/producer.js';
const saltRound = 10;

export const signupController = async (req, res) => {
           const token = crypto.randomBytes(32).toString('hex');
           const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
    try {
        const name = req.body.Name;
       const email = req.body.Email; // exporting the email to utility-->EmailVerificationService 
        const password = req.body.password;
       

        bcrypt.hash(password, saltRound, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'internal error occured ....',
                });
            } else {
                try {
                    await db.query('INSERT INTO users (name,email,password,verification_token,verification_expires_at) VALUES ($1,$2,$3,$4,$5)', [
                        name,
                        email,
                        hash,
                        token,
                        expiresAt
                    ]);
                    await pushEmailToQueue(email,token)
                    return res.status(201).json({
                      success: true,
                      message: "Verification email sent"
                    });
                } catch (error) {
                    return res.status(409).json({
                        success: false,
                        message: 'Email already exits ..(Already signup with this email) ',
                    });
                }

           
            }
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            message: 'All field required..',
        });
    }
};

// VERIFYING THE EMAIL 


export const VerifyEmail = async (req,res) =>{

const {token} = req.query;

                try {
                  const user=  await db.query('SELECT id FROM  users  WHERE verification_token=$1 AND is_verified=$2',[token,false]);
                 
                  if (user.rows.length === 0) {
                      return res.status(400).json({
                          error: "Invalid or already used token"
                      });
                    }

                  if( user.rows[0].verification_expires_at && user.rows[0].verification_expires_at <new Date()){

                    return res.status(400).json({ error: 'Token expired. Request a new verification email.' })
                  }
                  await db.query('UPDATE users SET is_verified=true , verification_token =NULL , verification_expires_at =NULL  WHERE id=$1 ',[userId,false]);
                   res.json({ message: 'Email verified successfully. You can now log in.' })

                } catch (error) {
                    return res.status(409).json({
                        success: false,
                        message: error.message,
                    });
                }



}




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
