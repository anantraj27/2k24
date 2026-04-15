import db from '../configuration/db.js';
import bcrypt from 'bcrypt';
const saltRound = 10;

export const signupController = async (req, res) => {
    try {
        const name = req.body.Name;
        const email = req.body.Email;
        const password = req.body.password;
       

        bcrypt.hash(password, saltRound, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'internal error occured ....',
                });
            } else {
                try {
                    await db.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)', [
                        name,
                        email,
                        hash,
                    ]);
                } catch (error) {
                    return res.status(409).json({
                        success: false,
                        message: 'Email already exits ..(Already signup with this email) ',
                    });
                }

                return res.json({
                    success: true,
                    message: ' Successfully 🎉 Data stored , Authenticate yourself to sign in  ',
                });
            }
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            message: 'All field required..',
        });
    }
};
