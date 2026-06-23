export const checkAuth = (req, res) => {

  if (req.session.user) {
//   console.log("isAuthenticated:", req.isAuthenticated());
//   console.log("User:", req.user);

  if (req.isAuthenticated()) {
    return res.status(200).json({
      success: true,
      
      name: req.user.name,
    });
  }

  return res.status(200).json({
    success: false,
    
    message: "Not authenticated"
  });

};
}
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