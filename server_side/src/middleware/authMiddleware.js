export const checkAuth = (req, res, next) => {

    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated"
        });
    }

    next();
};
export const checkAdminPermission = (req, res, next) => {

    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated"
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied"
        });
    }

    next();
};



// send response or call next never both