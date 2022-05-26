const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authorization = req.get('Authorization');
    if (!authorization) {
      const error = new Error('User not authencitated.');
      error.statusCode = 401;
      throw error;
    }
    const verifiedToken = jwt.verify(authorization, process.env.JWT_KEY);
    if (!verifiedToken) {
      const error = new Error('User not authencitated.');
      error.statusCode = 401;
      throw error;
    }
    req.userData = {
      email: verifiedToken.email,
      id: verifiedToken.id,
      role: verifiedToken.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};
