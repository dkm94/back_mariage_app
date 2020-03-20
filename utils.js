const jwt_secret = process.env.JWT_SECRET_KEY,
jwt = require('jsonwebtoken');

exports.validateToken = function(token) {
    jwt.verify(token, jwt_secret, function(err, decoded) {
        if (err)
            return false;
        else
            return true;
    });
}

exports.isAdmin = function(token) {
    jwt.verify(token, jwt_secret, function(err, decoded) {
        if (err)
            return false;
        else if (decoded.role.admin)
            return true;
        else
            return false;
    });
}

exports.getTokenData = function(token) {
    jwt.verify(token, jwt_secret, function(err, decoded) {
        if (err)
            return false;
        else
            return decoded;
    });
}
