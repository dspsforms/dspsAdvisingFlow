const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
  try {
    console.log("req.headers", req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.JSON_WEB_TOKEN_SERVER_KEY);
    console.log("decodedToken", decodedToken);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      role: decodedToken.role
    };

    // check if user has admin permission
    if (req.userData.role && req.userData.role.isInstructor) {
      next();
    } else {
      // not instructor
      console.log("instructor perm failed");
      res.status(401).json({ message: "Need instructor permission" });
    }

  } catch (error) {
    res.status(401).json({ message: "Auth failed. User may not be signed in, or it may have expired" });
  }
};
