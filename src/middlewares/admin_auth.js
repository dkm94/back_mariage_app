const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token)
      const decodedToken = jwt.verify(token, jwt_secret);
      console.log("decoded", decodedToken)
      const adminId = decodedToken._id;
      if (req.body.adminId && req.body.adminId !== adminId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };