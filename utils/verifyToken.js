const config = require('../config/index');
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  //const stringToken = token.toStirng();
  const decoded = jwt.verify(token, config.SECRET_KEY); // decode token
  return decoded;
};

module.exports = verifyToken;