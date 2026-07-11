export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);  // server logs mein full error dikhega

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

    if(err.customError){
        return res.status(statusCode).json({
        success: false,
        data: null,
        error: message,
    });
  }
  console.error(err.stack);  
    return res.status(500).json({
        success: false,
        data: null,
        error: "Something went wrong",  
    });



};