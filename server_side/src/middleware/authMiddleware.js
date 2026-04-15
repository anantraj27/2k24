export const authenticateUser = (req, res, next) => {

    return res.status(401).json({
        success: false,
        message: "Not authenticated"
    });

};
export const checkAuth = (req, res) => {

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

// send response or call next never both