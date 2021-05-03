require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (req.headers) {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (token == null)
        return res.status(401).json({
          message: 'Token Not Found',
        });

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          res.status(403).json({
            message: 'Invalid Token',
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({
        message: 'Token Not Found',
      });
    }
  } catch (err) {
    res.status(401).json({
      message: 'Token Not Found',
    });
  }
};