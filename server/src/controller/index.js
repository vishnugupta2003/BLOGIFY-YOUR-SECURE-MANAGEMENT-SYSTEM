const { User } = require('../model/user');
const CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');
const { uniquekey } = require('../configDatabase/constant');

const login = async (req, res) => {
  const { username, password } = req.body;

  const isUser = await User.findOne({ username });
  // console.log(isUser);
  if (!isUser) {
    return res.status(401).json({ status: 'username does not match' });
  }
  if (!isUser.authentication(password)) {
    return res.status(401).json({ status: 'password does not match' });
  }

  isUser.encry_password = undefined;
  isUser.salt = undefined;
  //jsonwevtoken
  var token = jwt.sign(
    { _id: isUser._id, username: isUser.username },
    uniquekey
  );
  res.status(200).json({ status: 'login successfully', token, user: isUser });
};

const signup = async (req, res) => {
  try {
    const data = req.body;
    //validation
    if (data.password.length < 8) {
      return res.status(400).json({ status: 'password must be 8 character' });
    }
    let isUser = await User.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });
    if (isUser) {
      return res.status(400).json({ status: 'user already exist' });
    }

    let user = User(data);
    // user.first_name = 'Hello';
    user = await user.save();
    res.status(201).json({ status: 'register successfully', user });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ status: 'Internal sever error' });
  }
};

const resetPassword = async (req, res) => {
  const { username, oldpassword, newPassword } = req.body;
  const isUser = await User.findOne({ username });
  if (!isUser || !isUser?.authentication(oldpassword))
    return res.status(400).json({ status: 'invalid details' });
  isUser.encry_password = CryptoJS.HmacSHA1(
    newPassword,
    isUser.salt
  ).toString();
  await isUser.save();
  console.log(isUser.authentication(newPassword));
  return res.json({ status: 'password reset successfully', isUser });
};

const isAuth = async (req, res) => {
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
    req.user = user;
    return res.status(200).json({ status: 'auth user', user });
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ stauts: 'Internal server error' });
  }
};
module.exports = { login, signup, resetPassword, isAuth };

// appian
