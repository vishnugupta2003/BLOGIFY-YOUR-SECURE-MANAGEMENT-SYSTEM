const express = require('express');
const { login, signup, resetPassword, isAuth } = require('../controller');

const authRouter = new express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.post('/resetPass', resetPassword);
authRouter.get('/isAuth', isAuth);

module.exports = { authRouter };
