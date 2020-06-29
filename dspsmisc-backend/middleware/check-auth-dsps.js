const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
  try {
    // next();
    // return;
    
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.JSON_WEB_TOKEN_SERVER_KEY);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      role: decodedToken.role
    };

    // check if user has staff or admin permission
    if ( req.userData.role && (req.userData.role.isStaff || req.userData.role.isFaculty ||
        req.userData.role.isAdmin)) {
      next();
    } else {
      // not admin
      res.status(401).json({ message: "Need Staff, Faculty, or Admin permission" });
    }

  } catch (error) {
    res.status(401).json({ message: "Dsps Auth failed. User may not be signed in, or it may have expired" });
  }
};
