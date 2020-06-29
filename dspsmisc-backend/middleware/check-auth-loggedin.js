const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
  try {

    // next();
    // return;
    
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.JSON_WEB_TOKEN_SERVER_KEY);
    
    // check if user is logged in 
    if (decodedToken && decodedToken.userId) {
        req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId,
            role: decodedToken.role
        };

        next();

    } else {
      // not logged in
      res.status(401).json({ message: "User may not be signed in, or it may have expired " });
    }

  } catch (error) {
    res.status(401).json({ message: "Dsps Auth failed. User may not be signed in, or it may have expired" });
  }
};
