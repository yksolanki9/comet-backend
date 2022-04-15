const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const accessToken = req.headers['x-access-token'];
  if (!accessToken) {
    return res.status(403).send('Please provide an authentication token');
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.TOKEN_SECRET);
    req.user = decoded;
  } catch(err) {
    return res.status(401).send('Invalid authentication token');
  }
  return next();
}

module.exports = verifyToken;