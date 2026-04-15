export const authenticateUser = (req, res, next) => {

    return res.status(401).json({
        success: false,
        message: "Not authenticated"
    });

};



// send response or call next never both