// Extract token from the request and verify it
const verifyToken = require('../utils/verifyToken');

exports.extractToken = (req, res, next) => {
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1];
  const decodedToken = verifyToken(cookie);
  
  if(!decodedToken) return res.status(401).json({ error: 'Not authorized' });

  req.authorized = true;
  req.userId = decodedToken.id;

  next();
};