// is auth
// is admin
// is writer
// is adminorwriter
// is reader

const { uniquekey } = require('../configDatabase/constant');
const jwt = require('jsonwebtoken');
const { User } = require('../model/user');
// next is a callback
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ status: 'token not found' });
    }
    const data = jwt.verify(token, uniquekey);
    if (!data?._id) {
      return res.status(401).json({ status: 'you are not authorized' });
    }
    const user = await User.findById(data?._id);
    if (!user) {
      return res.status(401).json({ status: 'you are unauthorize' });
    }
    // console.log(user);
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ stauts: 'Internal server error' });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(401).json({ status: 'you are not authorized' });
  }
  next();
};
module.exports = { authenticate, isAdmin };
