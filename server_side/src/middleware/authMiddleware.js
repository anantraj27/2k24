export const authenticateUser = (req, res, next) => {

    return res.status(401).json({
        success: false,
        message: "Not authenticated"
    });

};
export const checkAuth = (req, res) => {

  if (req.session.user) {
    return res.status(200).json({
      success: true,
      name : req.session.user.name,
    });
  }

  return res.status(200).json({
    success: false
  });

};

// send response or call next never both