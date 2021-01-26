const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, jwt_secret);
      const adminId = decodedToken.id;
      res.locals.adminId = adminId;
      const mariageID = decodedToken.mariageID;
      res.locals.mariageID = mariageID;
      if (req.body.adminId && req.body.adminId !== adminId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json("token invalide");
    }
  };